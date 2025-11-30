import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

// ============================================
// OTP DTOs
// ============================================

export class SendOtpDto {
  @ApiProperty({ example: '09171234567' })
  @IsString()
  @IsNotEmpty()
  phone!: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '09171234567' })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  otp!: string;
}

// ============================================
// AUTHENTICATION DTOs
// ============================================

export class SignUpDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'SecurePassword123' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ example: 'Juan Dela Cruz' })
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({ example: '09171234567' })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({ example: 'client', enum: ['client', 'provider', 'both'] })
  @IsString()
  @IsNotEmpty()
  userType!: 'client' | 'provider' | 'both';
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'SecurePassword123' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

// ============================================
// USER PROFILE DTOs
// ============================================

export class UpdateProfileDto {
  @ApiProperty({ required: false, example: 'Juan Dela Cruz' })
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiProperty({ required: false, example: 'https://example.com/avatar.jpg' })
  @IsString()
  @IsOptional()
  avatar_url?: string;

  @ApiProperty({ required: false, example: 'Software Developer' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ required: false, example: 'Manila, Philippines' })
  @IsString()
  @IsOptional()
  location?: string;
}
