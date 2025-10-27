/**
 * Form data interface for sign-up form
 */
export interface FormData {
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  email: string;
}

/**
 * Props for SignUpForm component
 */
export interface SignUpFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
  initialPhone?: string; // Pre-filled phone number from OTP verification
}

/**
 * Ref interface for SignUpForm component
 * Exposes methods that parent components can call
 */
export interface SignUpFormRef {
  submitForm: () => boolean;
  validateForm: () => boolean;
}

/**
 * Form errors type - partial record of FormData keys to error messages
 */
export type FormErrors = Partial<Record<keyof FormData, string>>;

/**
 * Supported country codes for phone number validation
 */
export type CountryCode = '+63' | '+1' | '+44';

/**
 * Country information for phone number input
 */
export interface Country {
  code: CountryCode;
  flag: string;
  name: string;
}
