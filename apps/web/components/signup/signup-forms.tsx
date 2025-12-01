'use client';

import { Input, Label } from '@hanapp-ph/commons';
import React, { useState, useImperativeHandle, forwardRef } from 'react';

import {
  FormData,
  SignUpFormProps,
  SignUpFormRef,
} from '../../types/signupinterface';

const SignUpForm = forwardRef<SignUpFormRef, SignUpFormProps>(
  ({ onSubmit, initialPhone }, ref) => {
    // Parse the initial phone to extract just the number part
    const parseInitialPhone = (phone: string | undefined) => {
      if (!phone) {
        return '';
      }
      // Remove country code and leading zeros
      // If phone is like '0912345678', return '912345678'
      // If phone is like '+639123456789', return '9123456789'
      const cleanNumber = phone.replace(/\D/g, ''); // Remove non-digits
      if (cleanNumber.startsWith('639')) {
        return cleanNumber.substring(2); // Remove '63'
      } else if (cleanNumber.startsWith('09')) {
        return cleanNumber.substring(1); // Remove leading '0'
      } else if (cleanNumber.startsWith('9')) {
        return cleanNumber; // Already in correct format
      }
      return cleanNumber;
    };

    const [formData, setFormData] = useState<FormData>({
      firstName: '',
      lastName: '',
      displayName: '',
      phoneNumber: parseInitialPhone(initialPhone), // Use parsed phone
      email: '',
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof FormData, string>>
    >({});
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

    const validateForm = () => {
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

      // Skip phone validation if it's a pre-filled verified phone
      if (!initialPhone) {
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
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      submitForm: () => {
        if (validateForm()) {
          onSubmit(formData);
          return true;
        }
        return false;
      },
      validateForm,
    }));

    const handleFieldChange = (field: keyof FormData, value: string) => {
      let processedValue = value;

      // Special processing for phone number
      if (field === 'phoneNumber') {
        processedValue = value.replace(/\D/g, '');
        if (selectedCountryCode === '+63') {
          processedValue = formatPhilippineNumber(processedValue);
        }
      }

      setFormData(prev => ({ ...prev, [field]: processedValue }));

      // Clear existing error
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }

      // Real-time validation for email and phone
      if (field === 'email' && value.trim() && !validateEmail(value)) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address',
        }));
      }

      if (
        field === 'phoneNumber' &&
        processedValue.trim() &&
        !validatePhoneNumber(processedValue, selectedCountryCode)
      ) {
        const errorMessage =
          selectedCountryCode === '+63'
            ? 'Please enter a valid Philippine mobile number (9XX XXX XXXX)'
            : selectedCountryCode === '+1'
              ? 'Please enter a valid US/Canadian phone number (10 digits)'
              : selectedCountryCode === '+44'
                ? 'Please enter a valid UK phone number (10-11 digits)'
                : 'Please enter a valid phone number';

        setErrors(prev => ({ ...prev, phoneNumber: errorMessage }));
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
      if (validateForm()) {
        onSubmit(formData);
      }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange('firstName', e.target.value)
            }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange('lastName', e.target.value)
            }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange('displayName', e.target.value)
            }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange('email', e.target.value)
            }
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
            Phone Number{' '}
            {initialPhone && (
              <span className="text-xs text-green-600">(Verified ✓)</span>
            )}
          </Label>
          <div className="flex mt-1">
            <select
              className="w-24 bg-gray-50/70 border-gray-300 rounded-r-none border border-r-0 px-3 py-2 focus:border-[#102E50] focus:ring-[#102E50]/20"
              value={selectedCountryCode}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleCountryCodeChange(e.target.value)
              }
              aria-label="Country code selection"
              disabled={!!initialPhone}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFieldChange('phoneNumber', e.target.value)
              }
              className={`flex-1 bg-gray-50/70 border-gray-300 rounded-l-none border-l-0 focus:border-[#102E50] focus:ring-[#102E50]/20 ${
                errors.phoneNumber ? 'border-red-500 focus:border-red-500' : ''
              } ${initialPhone ? 'bg-green-50/50 cursor-not-allowed' : ''}`}
              placeholder="Enter phone number"
              required
              readOnly={!!initialPhone}
              disabled={!!initialPhone}
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
          )}
          {initialPhone && (
            <p className="mt-1 text-xs text-green-600">
              This phone number has been verified and cannot be changed
            </p>
          )}
        </div>
      </form>
    );
  }
);

SignUpForm.displayName = 'SignUpForm';

export default SignUpForm;
