import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import type { User } from '@supabase/supabase-js';

import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard, Public } from '../guards/auth.guard';

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
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ============================================
  // OTP ENDPOINTS (Public - No Auth Required)
  // ============================================

  @Public()
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

  @Public()
  @Post('verify-otp')
  @ApiOperation({
    summary: 'Verify OTP code and return bearer token for existing users',
  })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({
    status: 200,
    description:
      'OTP verified successfully. Returns bearer token if user exists.',
    schema: {
      example: {
        success: true,
        message: 'OTP verified successfully',
        userExists: true,
        user: {
          id: 'uuid',
          email: 'user@example.com',
          phone: '09171234567',
        },
        session: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.userService.verifyOtp(verifyOtpDto.phone, verifyOtpDto.otp);
  }

  // ============================================
  // AUTHENTICATION ENDPOINTS (Public - No Auth Required)
  // ============================================

  @Public()
  @Post('signup')
  @ApiOperation({
    summary: 'Register a new user account and return bearer token',
  })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully with bearer token',
    schema: {
      example: {
        success: true,
        message: 'Account created successfully',
        user: {
          id: 'uuid',
          email: 'user@example.com',
          phone: '09171234567',
        },
        session: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
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

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Login with email and password and receive bearer token',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully with bearer token',
    schema: {
      example: {
        success: true,
        message: 'Logged in successfully',
        user: { id: 'uuid', email: 'user@example.com' },
        session: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Public()
  @Post('create-session')
  @ApiOperation({
    summary: 'Create session for OTP-verified user and return bearer token',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: 'uuid' },
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Session created successfully with bearer token',
    schema: {
      example: {
        success: true,
        message: 'Session created successfully',
        session: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        user: { id: 'uuid', email: 'user@example.com' },
      },
    },
  })
  async createSession(
    @Body() body: { userId: string; email: string; password: string }
  ) {
    return this.userService.createSession(
      body.userId,
      body.email,
      body.password
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Post('logout')
  @ApiOperation({ summary: 'Logout current user (requires authentication)' })
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - No valid bearer token',
  })
  async logout(@CurrentUser() user: User) {
    return this.userService.logout(user.id);
  }

  // ============================================
  // USER PROFILE ENDPOINTS (Protected - Auth Required)
  // ============================================

  @ApiBearerAuth('JWT-auth')
  @Get('profile/:userId')
  @ApiOperation({ summary: 'Get user profile by ID (requires authentication)' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - No valid bearer token',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getProfile(@Param('userId') userId: string, @CurrentUser() user: User) {
    return this.userService.getProfile(userId, user);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch('profile/:userId')
  @ApiOperation({ summary: 'Update user profile (requires authentication)' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - No valid bearer token',
  })
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updates: UpdateProfileDto,
    @CurrentUser() user: User
  ) {
    return this.userService.updateProfile(userId, updates, user);
  }
}
