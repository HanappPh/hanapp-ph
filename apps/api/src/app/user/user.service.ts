import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { SemaphoreService } from '../services/semaphore.service';
import { SupabaseService } from '../services/supabase.service';

import { SignUpDto, LoginDto, UpdateProfileDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private semaphoreService: SemaphoreService;

  constructor(private readonly supabaseService: SupabaseService) {
    this.semaphoreService = new SemaphoreService();
  }

  // ============================================
  // OTP MANAGEMENT
  // ============================================

  async sendOtp(phone: string) {
    // Validate phone number
    if (!this.semaphoreService.validatePhoneNumber(phone)) {
      throw new HttpException(
        'Invalid phone number format',
        HttpStatus.BAD_REQUEST
      );
    }

    // Generate OTP
    const otp = this.semaphoreService.generateOTP();

    // Set expiration time (5 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Save OTP to database
    const { error: dbError } = await this.supabaseService
      .from('otp_verifications')
      .insert({
        phone,
        otp_code: otp,
        expires_at: expiresAt.toISOString(),
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new HttpException(
        'Failed to generate OTP',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    // Send OTP via Semaphore
    const smsResult = await this.semaphoreService.sendOTP(phone, otp);

    if (!smsResult.success) {
      throw new HttpException(
        smsResult.message || 'Failed to send OTP',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return {
      success: true,
      message: 'OTP sent successfully',
    };
  }

  async verifyOtp(phone: string, otp: string) {
    // Get the latest OTP for this phone number
    const { data: otpRecord, error: fetchError } = await this.supabaseService
      .from('otp_verifications')
      .select('*')
      .eq('phone', phone)
      .eq('verified', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !otpRecord) {
      throw new HttpException(
        'No OTP found for this phone number',
        HttpStatus.NOT_FOUND
      );
    }

    // Check if OTP has expired
    if (new Date(otpRecord.expires_at) < new Date()) {
      throw new HttpException('OTP has expired', HttpStatus.BAD_REQUEST);
    }

    // Check attempt limit (max 5 attempts)
    if (otpRecord.attempts >= 5) {
      throw new HttpException(
        'Too many attempts. Please request a new OTP.',
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    // Verify OTP
    if (otpRecord.otp_code !== otp) {
      // Increment attempts
      await this.supabaseService
        .from('otp_verifications')
        .update({ attempts: otpRecord.attempts + 1 })
        .eq('id', otpRecord.id);

      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }

    // Mark OTP as verified
    await this.supabaseService
      .from('otp_verifications')
      .update({ verified: true })
      .eq('id', otpRecord.id);

    // Check if user already exists with this phone number
    const { data: existingUser } = await this.supabaseService
      .from('users')
      .select('id, email, phone')
      .eq('phone', phone)
      .single();

    return {
      success: true,
      message: 'OTP verified successfully',
      userExists: !!existingUser,
      user: existingUser || null,
    };
  }

  // ============================================
  // AUTHENTICATION
  // ============================================

  async signUp(signUpDto: SignUpDto) {
    // Check if phone is verified
    const { data: verifiedOtp } = await this.supabaseService
      .from('otp_verifications')
      .select('*')
      .eq('phone', signUpDto.phone)
      .eq('verified', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!verifiedOtp) {
      throw new HttpException(
        'Phone number not verified. Please verify your phone first.',
        HttpStatus.BAD_REQUEST
      );
    }

    // Create user in Supabase Auth
    const { data: authData, error: signUpError } =
      await this.supabaseService.auth.signUp({
        email: signUpDto.email,
        password: signUpDto.password,
        options: {
          data: {
            full_name: signUpDto.fullName,
            phone: signUpDto.phone,
            user_type: signUpDto.userType,
          },
        },
      });

    if (signUpError) {
      throw new HttpException(signUpError.message, HttpStatus.BAD_REQUEST);
    }

    // Update user record to mark phone as verified
    if (authData.user) {
      await this.supabaseService
        .from('users')
        .update({ phone_verified: true })
        .eq('id', authData.user.id);
    }

    return {
      success: true,
      message: 'Account created successfully',
      user: authData.user,
    };
  }

  async login(loginDto: LoginDto) {
    const { data, error } = await this.supabaseService.auth.signInWithPassword({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }

    return {
      success: true,
      message: 'Logged in successfully',
      user: data.user,
      session: data.session,
    };
  }

  async logout() {
    const { error } = await this.supabaseService.auth.signOut();

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  // ============================================
  // USER PROFILE MANAGEMENT
  // ============================================

  async getProfile(userId: string) {
    const { data, error } = await this.supabaseService
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new HttpException(
        'Failed to fetch user profile',
        HttpStatus.NOT_FOUND
      );
    }

    return data;
  }

  async updateProfile(userId: string, updates: UpdateProfileDto) {
    const { data, error } = await this.supabaseService
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new HttpException(
        'Failed to update profile',
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      success: true,
      message: 'Profile updated successfully',
      user: data,
    };
  }
}
