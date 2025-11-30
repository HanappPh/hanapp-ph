interface SemaphoreResponse {
  success: boolean;
  message?: string;
}

export class SemaphoreService {
  private apiKey: string;
  private apiUrl = 'https://api.semaphore.co/api/v4/messages';

  constructor() {
    this.apiKey = process.env.SEMAPHORE_API_KEY || '';
    if (!this.apiKey) {
      console.error('SEMAPHORE_API_KEY is not set');
    }
  }

  /**
   * Generate a 6-digit OTP code
   */
  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Send OTP via Semaphore SMS
   */
  async sendOTP(phoneNumber: string, otp: string): Promise<SemaphoreResponse> {
    try {
      // Format phone number to PH format (e.g., 639171234567)
      const formattedPhone = this.formatPhoneNumber(phoneNumber);

      const message = `Your HanApp verification code is: ${otp}. Valid for 5 minutes. Do not share this code.`;

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          apikey: this.apiKey,
          number: formattedPhone,
          message,
          sendername: 'HanApp',
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (response.ok) {
        return {
          success: true,
          message: 'OTP sent successfully',
        };
      } else {
        return {
          success: false,
          message: data.message || 'Failed to send OTP',
        };
      }
    } catch (error) {
      console.error('Semaphore API error:', error);
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.',
      };
    }
  }

  /**
   * Format phone number to Philippine format (639XXXXXXXXX)
   */
  private formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');

    // Handle different formats
    if (cleaned.startsWith('0')) {
      // 09171234567 -> 639171234567
      cleaned = '63' + cleaned.substring(1);
    } else if (cleaned.startsWith('9')) {
      // 9171234567 -> 639171234567
      cleaned = '63' + cleaned;
    } else if (!cleaned.startsWith('63')) {
      // Add 63 prefix if missing
      cleaned = '63' + cleaned;
    }

    return cleaned;
  }

  /**
   * Validate Philippine phone number format
   */
  validatePhoneNumber(phone: string): boolean {
    const phoneRegex = /^(09|\+639|639)\d{9}$/;
    return phoneRegex.test(phone);
  }
}
