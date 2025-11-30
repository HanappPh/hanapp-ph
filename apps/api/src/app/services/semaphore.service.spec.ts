import { SemaphoreService } from './semaphore.service';

describe('SemaphoreService', () => {
  let service: SemaphoreService;
  beforeEach(() => {
    service = new SemaphoreService();
  });

  it('should generate a 6-digit OTP', () => {
    const otp = service.generateOTP();
    expect(otp).toMatch(/^\d{6}$/);
  });

  describe('formatPhoneNumber', () => {
    it('should format phone numbers starting with 0', () => {
      const result = (service as any).formatPhoneNumber('09123456789');
      expect(result).toBe('639123456789');
    });

    it('should format phone numbers starting with 9', () => {
      const result = (service as any).formatPhoneNumber('9123456789');
      expect(result).toBe('639123456789');
    });

    it('should format phone numbers starting with 63', () => {
      const result = (service as any).formatPhoneNumber('639123456789');
      expect(result).toBe('639123456789');
    });
  });

  describe('validatePhoneNumber', () => {
    it('should validate correct Philippine phone number formats', () => {
      expect(service.validatePhoneNumber('09123456789')).toBe(true);
      expect(service.validatePhoneNumber('+639123456789')).toBe(true);
      expect(service.validatePhoneNumber('639123456789')).toBe(true);
      expect(service.validatePhoneNumber('9123456789')).toBe(false);
      expect(service.validatePhoneNumber('1234567890')).toBe(false);
    });
  });
});
