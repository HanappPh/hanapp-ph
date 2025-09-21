'use client';

import { Input, Label } from '@hanapp-ph/commons';
import React, { useState, useCallback } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  email: string;
}

interface SignUpFormProps {
  onSubmit?: (data: FormData) => void;
  validateTrigger?: boolean;
}

export default function SignUpForm({
  onSubmit,
  validateTrigger,
}: SignUpFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    displayName: '',
    phoneNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [selectedCountryCode, setSelectedCountryCode] = useState('+63');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string, countryCode: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');

    switch (countryCode) {
      case '+63': // Philippines
        // Valid formats: 9XX XXX XXXX (10 digits starting with 9)
        return /^9\d{9}$/.test(cleanNumber);
      case '+1': // US/Canada
        // Valid format: 10 digits
        return /^\d{10}$/.test(cleanNumber);
      case '+44': // UK
        // Valid format: 10-11 digits
        return /^\d{10,11}$/.test(cleanNumber);
      default:
        return cleanNumber.length >= 7 && cleanNumber.length <= 15;
    }
  };

  const formatPhilippineNumber = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');

    // If starts with 09, convert to 9 (remove the leading 0)
    if (cleanNumber.startsWith('09')) {
      return cleanNumber.substring(1); // Remove the leading 0
    }

    return cleanNumber;
  };

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Input is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Input is required';
    }
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Input is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Input is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Input is required';
    } else if (
      !validatePhoneNumber(formData.phoneNumber, selectedCountryCode)
    ) {
      switch (selectedCountryCode) {
        case '+63':
          newErrors.phoneNumber =
            'Please enter a valid Philippine mobile number (9XX XXX XXXX)';
          break;
        case '+1':
          newErrors.phoneNumber =
            'Please enter a valid US/Canadian phone number (10 digits)';
          break;
        case '+44':
          newErrors.phoneNumber =
            'Please enter a valid UK phone number (10-11 digits)';
          break;
        default:
          newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, selectedCountryCode]);

  React.useEffect(() => {
    if (validateTrigger) {
      validateForm();
    }
  }, [validateTrigger, validateForm]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleEmailChange = (value: string) => {
    setFormData(prev => ({ ...prev, email: value }));
    // Real-time email validation
    if (value.trim() && !validateEmail(value)) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
    } else {
      // Clear error if email is valid or empty
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    // Only allow numbers - remove any non-numeric characters
    let numericValue = value.replace(/\D/g, '');

    // Apply Philippine number formatting if country code is +63
    if (selectedCountryCode === '+63') {
      numericValue = formatPhilippineNumber(numericValue);
    }

    setFormData(prev => ({ ...prev, phoneNumber: numericValue }));

    // Real-time phone number validation
    if (
      numericValue.trim() &&
      !validatePhoneNumber(numericValue, selectedCountryCode)
    ) {
      switch (selectedCountryCode) {
        case '+63':
          setErrors(prev => ({
            ...prev,
            phoneNumber:
              'Please enter a valid Philippine mobile number (9XX XXX XXXX)',
          }));
          break;
        case '+1':
          setErrors(prev => ({
            ...prev,
            phoneNumber:
              'Please enter a valid US/Canadian phone number (10 digits)',
          }));
          break;
        case '+44':
          setErrors(prev => ({
            ...prev,
            phoneNumber: 'Please enter a valid UK phone number (10-11 digits)',
          }));
          break;
        default:
          setErrors(prev => ({
            ...prev,
            phoneNumber: 'Please enter a valid phone number',
          }));
      }
    } else {
      // Clear error if phone number is valid or empty
      if (errors.phoneNumber) {
        setErrors(prev => ({ ...prev, phoneNumber: undefined }));
      }
    }
  };

  const handleCountryCodeChange = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    // Re-validate phone number with new country code
    if (formData.phoneNumber.trim()) {
      const numericValue = formData.phoneNumber.replace(/\D/g, '');
      if (!validatePhoneNumber(numericValue, countryCode)) {
        switch (countryCode) {
          case '+63':
            setErrors(prev => ({
              ...prev,
              phoneNumber:
                'Please enter a valid Philippine mobile number (9XX XXX XXXX)',
            }));
            break;
          case '+1':
            setErrors(prev => ({
              ...prev,
              phoneNumber:
                'Please enter a valid US/Canadian phone number (10 digits)',
            }));
            break;
          case '+44':
            setErrors(prev => ({
              ...prev,
              phoneNumber:
                'Please enter a valid UK phone number (10-11 digits)',
            }));
            break;
          default:
            setErrors(prev => ({
              ...prev,
              phoneNumber: 'Please enter a valid phone number',
            }));
        }
      } else {
        setErrors(prev => ({ ...prev, phoneNumber: undefined }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <Label
          htmlFor="firstName"
          className="text-sm font-medium text-[#102E50]"
        >
          First Name
        </Label>
        <Input
          id="firstName"
          value={formData.firstName}
          // @ts-ignore
          onChange={e => handleInputChange('firstName', e.target.value)}
          className={`mt-1 bg-gray-50/70 border-gray-300 focus:border-[#102E50] focus:ring-[#102E50]/20 ${
            errors.firstName ? 'border-red-500 focus:border-red-500' : ''
          }`}
          required
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
        )}
      </div>

      <div>
        <Label
          htmlFor="lastName"
          className="text-sm font-medium text-[#102E50]"
        >
          Last Name
        </Label>
        <Input
          id="lastName"
          value={formData.lastName}
          // @ts-ignore
          onChange={e => handleInputChange('lastName', e.target.value)}
          className={`mt-1 bg-gray-50/70 border-gray-300 focus:border-[#102E50] focus:ring-[#102E50]/20 ${
            errors.lastName ? 'border-red-500 focus:border-red-500' : ''
          }`}
          required
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
        )}
      </div>

      <div>
        <Label
          htmlFor="displayName"
          className="text-sm font-medium text-[#102E50]"
        >
          Display Name
        </Label>
        <Input
          id="displayName"
          value={formData.displayName}
          // @ts-ignore
          onChange={e => handleInputChange('displayName', e.target.value)}
          className={`mt-1 bg-gray-50/70 border-gray-300 focus:border-[#102E50] focus:ring-[#102E50]/20 ${
            errors.displayName ? 'border-red-500 focus:border-red-500' : ''
          }`}
          required
        />
        {errors.displayName && (
          <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-medium text-[#102E50]">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          // @ts-ignore
          onChange={e => handleEmailChange(e.target.value)}
          className={`mt-1 bg-gray-50/70 border-gray-300 focus:border-[#102E50] focus:ring-[#102E50]/20 ${
            errors.email ? 'border-red-500 focus:border-red-500' : ''
          }`}
          placeholder="Enter your email address"
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <Label
          htmlFor="phoneNumber"
          className="text-sm font-medium text-[#102E50]"
        >
          Phone Number
        </Label>
        <div className="flex mt-1">
          <select
            className="w-24 bg-gray-50/70 border-gray-300 rounded-r-none border border-r-0 px-3 py-2 focus:border-[#102E50] focus:ring-[#102E50]/20"
            value={selectedCountryCode}
            // @ts-ignore
            onChange={e => handleCountryCodeChange(e.target.value)}
            aria-label="Country code selection"
          >
            <option value="+63">🇵🇭 +63</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
          </select>
          <Input
            id="phoneNumber"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={formData.phoneNumber}
            // @ts-ignore
            onChange={e => handlePhoneNumberChange(e.target.value)}
            className={`flex-1 bg-gray-50/70 border-gray-300 rounded-l-none border-l-0 focus:border-[#102E50] focus:ring-[#102E50]/20 ${
              errors.phoneNumber ? 'border-red-500 focus:border-red-500' : ''
            }`}
            placeholder="Enter phone number"
            required
          />
        </div>
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
        )}
      </div>
    </form>
  );
}
