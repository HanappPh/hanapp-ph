import {
  Injectable,
  HttpException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '@supabase/supabase-js';

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
  // HELPER METHODS
  // ============================================

  private normalizePhoneNumber(phone: string): string {
    let cleaned = phone.replace(/\D/g, '');

    if (cleaned.startsWith('0')) {
      cleaned = '63' + cleaned.substring(1);
    } else if (cleaned.startsWith('9')) {
      cleaned = '63' + cleaned;
    } else if (!cleaned.startsWith('63')) {
      cleaned = '63' + cleaned;
    }

    return '+' + cleaned;
  }

  // ============================================
  // OTP AUTHENTICATION FLOW
  // ============================================

  async sendOtp(phone: string) {
    if (!this.semaphoreService.validatePhoneNumber(phone)) {
      throw new HttpException(
        'Invalid phone number format',
        HttpStatus.BAD_REQUEST
      );
    }

    const normalizedPhone = this.normalizePhoneNumber(phone);

    // Test mode: Use fixed OTP for testing (supports multiple test numbers)
    const testPhone1 = process.env.TEST_PHONE_NUMBER;
    const testPhone2 = process.env.TEST_PHONE_NUMBER_2;
    const testOtp = process.env.TEST_OTP || '123456';

    const isTestMode =
      (testPhone1 &&
        normalizedPhone === this.normalizePhoneNumber(testPhone1)) ||
      (testPhone2 && normalizedPhone === this.normalizePhoneNumber(testPhone2));

    // Debug: Show what's happening
    if (testPhone1 || testPhone2) {
      // eslint-disable-next-line no-console
      console.log('Test Mode Check:', {
        input: phone,
        normalized: normalizedPhone,
        testPhone1,
        testPhone2,
        matches: isTestMode,
      });
    }

    const otp = isTestMode ? testOtp : this.semaphoreService.generateOTP();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Save OTP to database
    const { error: dbError } = await this.supabaseService
      .from('otp_verifications')
      .insert({
        phone: normalizedPhone,
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

    // Send OTP via SMS (skip for test mode)
    if (!isTestMode) {
      const smsResult = await this.semaphoreService.sendOTP(phone, otp);

      if (!smsResult.success) {
        throw new HttpException(
          smsResult.message || 'Failed to send OTP',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }

    return {
      success: true,
      message: isTestMode
        ? 'OTP sent successfully (Test Mode)'
        : 'OTP sent successfully',
    };
  }

  async verifyOtp(phone: string, otp: string) {
    const normalizedPhone = this.normalizePhoneNumber(phone);

    // Check all possible phone formats for OTP
    const phoneFormats = [
      normalizedPhone,
      normalizedPhone.substring(1),
      '0' + normalizedPhone.substring(3),
    ];

    let otpRecord = null;
    for (const phoneFormat of phoneFormats) {
      const result = await this.supabaseService
        .from('otp_verifications')
        .select('*')
        .eq('phone', phoneFormat)
        .eq('otp_code', otp)
        .eq('verified', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (result.data) {
        otpRecord = result.data;
        break;
      }
    }

    if (!otpRecord) {
      throw new HttpException('Invalid or expired OTP', HttpStatus.BAD_REQUEST);
    }

    // Check if OTP expired
    if (new Date(otpRecord.expires_at) < new Date()) {
      throw new HttpException('OTP has expired', HttpStatus.BAD_REQUEST);
    }

    // Mark OTP as verified
    await this.supabaseService
      .from('otp_verifications')
      .update({ verified: true })
      .eq('id', otpRecord.id);

    // Check if user exists
    let existingUser = null;
    for (const phoneFormat of phoneFormats) {
      const result = await this.supabaseService
        .from('users')
        .select('id, email, phone, user_type, full_name')
        .eq('phone', phoneFormat)
        .maybeSingle();

      if (result.data) {
        existingUser = result.data;
        break;
      }
    }

    if (existingUser) {
      // Existing user - ensure their email is confirmed
      await this.supabaseService.adminAuth.admin.updateUserById(
        existingUser.id,
        { email_confirm: true }
      );

      // For existing users, return their information
      // They should use the login endpoint with their password to get a session token
      return {
        success: true,
        message: 'OTP verified successfully. Please login with your password.',
        userExists: true,
        user: existingUser,
      };
    }

    return {
      success: true,
      message: 'OTP verified successfully. Please complete signup.',
      userExists: false,
      user: null,
    };
  }

  async createSession(userId: string, email: string, password: string) {
    try {
      // First, ensure email is confirmed
      await this.supabaseService.adminAuth.admin.updateUserById(userId, {
        email_confirm: true,
      });

      // Create session using password
      const { data, error } =
        await this.supabaseService.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        throw new HttpException(
          'Failed to create session: ' + error.message,
          HttpStatus.UNAUTHORIZED
        );
      }

      return {
        success: true,
        message: 'Session created successfully',
        session: data.session,
        user: data.user,
      };
    } catch (error) {
      console.error('Error creating session:', error);
      throw new HttpException(
        'Failed to create session',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // ============================================
  // USER MANAGEMENT
  // ============================================

  async signUp(signUpDto: SignUpDto) {
    const normalizedPhone = this.normalizePhoneNumber(signUpDto.phone);

    // Check if phone is verified
    const { data: verifiedOtp } = await this.supabaseService
      .from('otp_verifications')
      .select('*')
      .eq('phone', normalizedPhone)
      .eq('verified', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!verifiedOtp) {
      throw new HttpException(
        'Phone number not verified',
        HttpStatus.BAD_REQUEST
      );
    }

    // Create user in Supabase Auth with auto-confirmed email
    const { data: authData, error: signUpError } =
      await this.supabaseService.auth.signUp({
        email: signUpDto.email,
        password: signUpDto.password,
        options: {
          data: {
            full_name: signUpDto.fullName,
            phone: normalizedPhone,
            user_type: signUpDto.userType,
          },
        },
      });

    if (signUpError) {
      throw new HttpException(signUpError.message, HttpStatus.BAD_REQUEST);
    }

    // Auto-confirm email since phone is verified
    if (authData.user) {
      await this.supabaseService.adminAuth.admin.updateUserById(
        authData.user.id,
        { email_confirm: true }
      );

      await this.supabaseService
        .from('users')
        .update({ phone_verified: true })
        .eq('id', authData.user.id);
    }

    // Sign in the user to get the session with bearer token
    const { data: loginData, error: loginError } =
      await this.supabaseService.auth.signInWithPassword({
        email: signUpDto.email,
        password: signUpDto.password,
      });

    if (loginError) {
      // User created but login failed, still return success
      return {
        success: true,
        message: 'Account created successfully. Please login.',
        user: authData.user,
      };
    }

    return {
      success: true,
      message: 'Account created successfully',
      user: loginData.user,
      session: loginData.session,
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

  async logout(userId: string) {
    // Supabase handles session invalidation automatically
    // We can add additional cleanup here if needed

    // Optional: Mark any user-specific data as logged out
    // For example, update last_logout timestamp
    try {
      await this.supabaseService
        .from('users')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', userId);
    } catch (error) {
      // Log error but don't fail the logout
      console.error('Error updating user logout timestamp:', error);
    }

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  // ============================================
  // PROFILE MANAGEMENT
  // ============================================

  async getProfile(userId: string, authenticatedUser: User) {
    // Users can only access their own profile or admins can access any profile
    if (authenticatedUser.id !== userId) {
      // Check if user is admin (you can add admin check logic here)
      const isAdmin = authenticatedUser.user_metadata?.role === 'admin';

      if (!isAdmin) {
        throw new ForbiddenException('You can only access your own profile');
      }
    }

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

  async updateProfile(
    userId: string,
    updates: UpdateProfileDto,
    authenticatedUser: User
  ) {
    // Users can only update their own profile or admins can update any profile
    if (authenticatedUser.id !== userId) {
      // Check if user is admin (you can add admin check logic here)
      const isAdmin = authenticatedUser.user_metadata?.role === 'admin';

      if (!isAdmin) {
        throw new ForbiddenException('You can only update your own profile');
      }
    }

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
