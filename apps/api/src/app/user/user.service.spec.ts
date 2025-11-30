import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { SupabaseService } from '../services/supabase.service';
import {
  LoginDto,
  SignUpDto,
  SendOtpDto,
  UpdateProfileDto,
} from './dto/user.dto';

// Mock SupabaseService
const mockSupabaseService = {
  from: jest.fn(),
  auth: {
    signUp: jest.fn(),
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
  },
  adminAuth: {
    admin: {
      updateUserById: jest.fn(),
    },
  },
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: SupabaseService,
          useValue: mockSupabaseService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  describe('normalizePhoneNumber', () => {
    it('should normalize phone numbers starting with 0', () => {
      const result = (service as any).normalizePhoneNumber('09123456789');
      expect(result).toBe('+639123456789');
    });

    it('should normalize phone numbers starting with 9', () => {
      const result = (service as any).normalizePhoneNumber('9123456789');
      expect(result).toBe('+639123456789');
    });

    it('should normalize phone numbers starting with 63', () => {
      const result = (service as any).normalizePhoneNumber('639123456789');
      expect(result).toBe('+639123456789');
    });
  });

  describe('sendOtp', () => {
    it('should throw error for invalid phone number', async () => {
      const dto = new SendOtpDto();
      dto.phone = 'invalid';

      await expect(service.sendOtp(dto.phone)).rejects.toThrow(
        new HttpException('Invalid phone number format', HttpStatus.BAD_REQUEST)
      );
    });

    it('should successfully send OTP', async () => {
      mockSupabaseService.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: null }),
      });

      const dto = new SendOtpDto();
      dto.phone = '09123456789';

      const result = await service.sendOtp(dto.phone);
      expect(result.success).toBe(true);
      expect([
        'OTP sent successfully',
        'OTP sent successfully (Test Mode)',
      ]).toContain(result.message);
    });
  });

  describe('login', () => {
    it('should successfully log in user', async () => {
      const mockUser = { id: '1', email: 'test@test.com' };
      const mockSession = { access_token: 'token' };

      mockSupabaseService.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      const loginDto = new LoginDto();
      loginDto.email = 'test@test.com';
      loginDto.password = 'password';

      const result = await service.login(loginDto);

      expect(result.success).toBe(true);
      expect(result.user).toBe(mockUser);
      expect(result.session).toBe(mockSession);
    });

    it('should throw error for invalid credentials', async () => {
      mockSupabaseService.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: { message: 'Invalid credentials' },
      });

      const loginDto = new LoginDto();
      loginDto.email = 'test@test.com';
      loginDto.password = 'wrong';

      await expect(service.login(loginDto)).rejects.toThrow(
        new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
      );
    });
  });

  describe('logout', () => {
    it('should successfully log out user', async () => {
      // Mock the users table update chain used in logout
      mockSupabaseService.from.mockReturnValue({
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),
      });

      const result = await service.logout('1');
      expect(result.success).toBe(true);
      expect(result.message).toBe('Logged out successfully');
    });

    it('should still return success even if update fails', async () => {
      // Make the update chain throw to simulate internal failure; logout should catch it
      mockSupabaseService.from.mockImplementation(() => {
        return {
          update: jest.fn(() => {
            throw new Error('update failure');
          }),
        } as any;
      });

      // Spy on console.error to assert the error was logged (optional)
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = await service.logout('1');
      expect(result.success).toBe(true);
      expect(result.message).toBe('Logged out successfully');

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('signUp', () => {
    it('should successfully create a new user', async () => {
      // Create chainable mock for OTP verification
      const otpMock = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { verified: true },
          error: null,
        }),
      };

      // Create chainable mock for users table operations
      const usersMock = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { phone_verified: true },
          error: null,
        }),
      };

      // Mock from to return different mocks based on table name
      mockSupabaseService.from.mockImplementation(table => {
        if (table === 'otp_verifications') return otpMock;
        if (table === 'users') return usersMock;
        return {}; // Default case
      });

      const mockUser = {
        id: '1',
        email: 'test@test.com',
        user_metadata: {
          full_name: 'Test User',
          phone: '+639123456789',
          user_type: 'client',
        },
      };

      mockSupabaseService.auth.signUp.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      // Ensure subsequent signIn after signup succeeds so service returns the logged in user
      mockSupabaseService.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: {} },
        error: null,
      });

      mockSupabaseService.adminAuth.admin.updateUserById.mockResolvedValue({
        error: null,
      });

      const signUpDto = new SignUpDto();
      signUpDto.email = 'test@test.com';
      signUpDto.password = 'Password123';
      signUpDto.fullName = 'Test User';
      signUpDto.phone = '09123456789';
      signUpDto.userType = 'client';

      const result = await service.signUp(signUpDto);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Account created successfully');
      expect(result.user).toBe(mockUser);

      // Verify all expected Supabase calls were made
      expect(mockSupabaseService.from).toHaveBeenCalledWith(
        'otp_verifications'
      );
      expect(mockSupabaseService.from).toHaveBeenCalledWith('users');
      expect(mockSupabaseService.auth.signUp).toHaveBeenCalled();
      expect(
        mockSupabaseService.adminAuth.admin.updateUserById
      ).toHaveBeenCalledWith(mockUser.id, { email_confirm: true });
      expect(usersMock.update).toHaveBeenCalledWith({ phone_verified: true });
    });

    it('should throw error if phone is not verified', async () => {
      mockSupabaseService.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: null,
        }),
      });

      const signUpDto = new SignUpDto();
      signUpDto.email = 'test@test.com';
      signUpDto.password = 'Password123';
      signUpDto.fullName = 'Test User';
      signUpDto.phone = '09123456789';
      signUpDto.userType = 'client';

      await expect(service.signUp(signUpDto)).rejects.toThrow(
        new HttpException('Phone number not verified', HttpStatus.BAD_REQUEST)
      );
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const mockProfile = { id: '1', full_name: 'Test User' };
      mockSupabaseService.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockProfile, error: null }),
      });

      const mockAuthUser = { id: '1', user_metadata: {} } as any;
      const result = await service.getProfile('1', mockAuthUser);
      expect(result).toEqual(mockProfile);
    });

    it('should throw error if profile not found', async () => {
      mockSupabaseService.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest
          .fn()
          .mockResolvedValue({ data: null, error: { message: 'Not found' } }),
      });

      const mockAuthUser = { id: '1', user_metadata: {} } as any;
      await expect(service.getProfile('1', mockAuthUser)).rejects.toThrow(
        new HttpException('Failed to fetch user profile', HttpStatus.NOT_FOUND)
      );
    });
  });

  describe('updateProfile', () => {
    it('should successfully update user profile', async () => {
      const updateDto = new UpdateProfileDto();
      updateDto.full_name = 'Updated Name';
      updateDto.bio = 'New bio';
      updateDto.location = 'New Location';

      const mockUpdatedProfile = {
        id: '1',
        full_name: 'Updated Name',
        bio: 'New bio',
        location: 'New Location',
      };

      mockSupabaseService.from.mockReturnValue({
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest
          .fn()
          .mockResolvedValue({ data: mockUpdatedProfile, error: null }),
      });

      const mockAuthUser = { id: '1', user_metadata: {} } as any;
      const result = await service.updateProfile('1', updateDto, mockAuthUser);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Profile updated successfully');
      expect(result.user).toEqual(mockUpdatedProfile);
    });

    it('should throw error if profile update fails', async () => {
      const updateDto = new UpdateProfileDto();
      updateDto.full_name = 'Updated Name';

      mockSupabaseService.from.mockReturnValue({
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Update failed' },
        }),
      });

      const mockAuthUser = { id: '1', user_metadata: {} } as any;
      await expect(
        service.updateProfile('1', updateDto, mockAuthUser)
      ).rejects.toThrow(
        new HttpException('Failed to update profile', HttpStatus.BAD_REQUEST)
      );
    });
  });
});
