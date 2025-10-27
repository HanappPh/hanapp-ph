import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import {
  SendOtpDto,
  VerifyOtpDto,
  SignUpDto,
  LoginDto,
  UpdateProfileDto,
} from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ============================================
  // OTP ENDPOINTS
  // ============================================

  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP verification code to phone' })
  @ApiBody({ type: SendOtpDto })
  @ApiResponse({
    status: 200,
    description: 'OTP sent successfully',
    schema: {
      example: {
        success: true,
        message: 'OTP sent successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid phone number format' })
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.userService.sendOtp(sendOtpDto.phone);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP code' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({
    status: 200,
    description: 'OTP verified successfully',
    schema: {
      example: {
        success: true,
        message: 'OTP verified successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.userService.verifyOtp(verifyOtpDto.phone, verifyOtpDto.otp);
  }

  // ============================================
  // AUTHENTICATION ENDPOINTS
  // ============================================

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully',
    schema: {
      example: {
        success: true,
        message: 'Account created successfully',
        user: {
          id: 'uuid',
          email: 'user@example.com',
          phone: '09171234567',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Phone not verified or user already exists',
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully',
    schema: {
      example: {
        success: true,
        message: 'Logged in successfully',
        user: { id: 'uuid', email: 'user@example.com' },
        session: { access_token: 'jwt_token', refresh_token: 'jwt_token' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout current user' })
  @ApiResponse({
    status: 200,
    description: 'Logged out successfully',
    schema: {
      example: {
        success: true,
        message: 'Logged out successfully',
      },
    },
  })
  async logout() {
    return this.userService.logout();
  }

  // ============================================
  // USER PROFILE ENDPOINTS
  // ============================================

  @Get('profile/:userId')
  @ApiOperation({ summary: 'Get user profile by ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getProfile(@Param('userId') userId: string) {
    return this.userService.getProfile(userId);
  }

  @Patch('profile/:userId')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
  })
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updates: UpdateProfileDto
  ) {
    return this.userService.updateProfile(userId, updates);
  }
}
