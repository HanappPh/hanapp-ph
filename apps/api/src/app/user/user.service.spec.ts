import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { SupabaseService } from '../services/supabase.service';
import { SemaphoreService } from '../services/semaphore.service';

describe('UserService', () => {
  let service: UserService;
  let supabaseService: SupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: SupabaseService,
          useValue: {
            from: jest.fn(),
            auth: {
              signUp: jest.fn(),
              signInWithPassword: jest.fn(),
              getUser: jest.fn(),
            },
          },
        },
        {
          provide: SemaphoreService,
          useValue: {
            validatePhoneNumber: jest.fn(),
            generateOTP: jest.fn(),
            sendOTP: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    supabaseService = module.get<SupabaseService>(SupabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendOtp', () => {
    it('should throw error for invalid phone number', async () => {
      const semaphoreService = service['semaphoreService'];
      jest
        .spyOn(semaphoreService, 'validatePhoneNumber')
        .mockReturnValue(false);

      await expect(service.sendOtp('invalid')).rejects.toThrow(HttpException);
    });

    it('should use test OTP for test phone number', async () => {
      // Set test environment variables
      process.env.TEST_PHONE_NUMBER = '+639123456789';
      process.env.TEST_OTP = '123456';

      const semaphoreService = service['semaphoreService'];
      jest.spyOn(semaphoreService, 'validatePhoneNumber').mockReturnValue(true);

      const mockFrom = jest.fn().mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: null }),
      });
      jest.spyOn(supabaseService, 'from').mockImplementation(mockFrom as any);

      const result = await service.sendOtp('+639123456789');

      expect(result.success).toBe(true);
      expect(result.message).toContain('Test Mode');
      // Should NOT call sendOTP for test mode
      expect(semaphoreService.sendOTP).not.toHaveBeenCalled();
    });

    it('should send real OTP for non-test phone number', async () => {
      // Clear test environment variables
      delete process.env.TEST_PHONE_NUMBER;

      const semaphoreService = service['semaphoreService'];
      jest.spyOn(semaphoreService, 'validatePhoneNumber').mockReturnValue(true);
      jest.spyOn(semaphoreService, 'generateOTP').mockReturnValue('654321');
      jest.spyOn(semaphoreService, 'sendOTP').mockResolvedValue({
        success: true,
        message: 'OTP sent',
      });

      const mockFrom = jest.fn().mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: null }),
      });
      jest.spyOn(supabaseService, 'from').mockImplementation(mockFrom as any);

      const result = await service.sendOtp('+639111111111');

      expect(result.success).toBe(true);
      expect(result.message).toBe('OTP sent successfully');
      // Should call sendOTP for real phone
      expect(semaphoreService.sendOTP).toHaveBeenCalled();
    });
  });

  describe('normalizePhoneNumber', () => {
    it('should normalize phone starting with 0', () => {
      const result = service['normalizePhoneNumber']('09123456789');
      expect(result).toBe('+639123456789');
    });

    it('should normalize phone starting with 9', () => {
      const result = service['normalizePhoneNumber']('9123456789');
      expect(result).toBe('+639123456789');
    });

    it('should handle phone already with +63', () => {
      const result = service['normalizePhoneNumber']('639123456789');
      expect(result).toBe('+639123456789');
    });

    it('should keep properly formatted phone', () => {
      const result = service['normalizePhoneNumber']('+639123456789');
      expect(result).toBe('+639123456789');
    });
  });

  describe('verifyOtp', () => {
    it('should throw error for invalid OTP', async () => {
      const mockFrom = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                order: jest.fn().mockReturnValue({
                  limit: jest.fn().mockReturnValue({
                    maybeSingle: jest.fn().mockResolvedValue({ data: null }),
                  }),
                }),
              }),
            }),
          }),
        }),
      });
      jest.spyOn(supabaseService, 'from').mockImplementation(mockFrom as any);

      await expect(
        service.verifyOtp('+639123456789', '000000')
      ).rejects.toThrow('Invalid or expired OTP');
    });

    it('should throw error for expired OTP', async () => {
      const expiredDate = new Date();
      expiredDate.setMinutes(expiredDate.getMinutes() - 10); // 10 minutes ago

      const mockFrom = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                order: jest.fn().mockReturnValue({
                  limit: jest.fn().mockReturnValue({
                    maybeSingle: jest.fn().mockResolvedValue({
                      data: {
                        id: 1,
                        otp_code: '123456',
                        expires_at: expiredDate.toISOString(),
                        verified: false,
                      },
                    }),
                  }),
                }),
              }),
            }),
          }),
        }),
      });
      jest.spyOn(supabaseService, 'from').mockImplementation(mockFrom as any);

      await expect(
        service.verifyOtp('+639123456789', '123456')
      ).rejects.toThrow('OTP has expired');
    });
  });
});
