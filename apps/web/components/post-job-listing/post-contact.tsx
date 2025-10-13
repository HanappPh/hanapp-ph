'use client';

import { Input } from '@hanapp-ph/commons';
import React, { useState } from 'react';

export function ContactInfoForm({
  onSubmit,
  _isSubmitting = false,
  onChange,
}: {
  onSubmit?: Function;
  _isSubmitting?: boolean;
  onChange?: Function;
}) {
  const [contactNumber, setContactNumber] = useState('');
  const countryCode = '+63';
  const [otherContactLink, setOtherContactLink] = useState('');

  const notifyParent = (
    newContactNumber = contactNumber,
    newCountryCode = countryCode,
    newOtherContactLink = otherContactLink
  ) => {
    if (onChange && newContactNumber) {
      onChange({
        contact_number: `${newCountryCode}${newContactNumber}`,
        other_contact_link: newOtherContactLink || undefined,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!onSubmit) {
      return;
    }

    if (!contactNumber) {
      alert('Please enter a contact number');
      return;
    }

    const provider = {
      contact_number: `${countryCode}${contactNumber}`,
      other_contact_link: otherContactLink || undefined,
    };

    onSubmit(provider);
  };

  const isForm = !!onSubmit;

  const content = (
    <>
      <h2 className="text-3xl font-medium">Contact Information</h2>
      <p className="text-sm text-gray-400 mb-6">
        Set up for more modes of communication
      </p>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-3">
            Contact No.
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 text-gray-500 text-sm mb-3">
              +63
            </span>
            <Input
              type="tel"
              value={contactNumber}
              onChange={e => {
                const newContactNumber = e.target.value;
                setContactNumber(newContactNumber);
                notifyParent(newContactNumber, countryCode, otherContactLink);
              }}
              placeholder="*** *** ****"
              className="rounded-l-none font-light text-sm mb-3"
              style={
                {
                  backgroundColor: '#F3F5F9',
                  '--tw-ring-color': 'rgb(245 158 11)',
                } as React.CSSProperties
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-3">
            Other Contact Link
          </label>
          <Input
            type="text"
            value={otherContactLink}
            onChange={e => {
              const newOtherContactLink = e.target.value;
              setOtherContactLink(newOtherContactLink);
              notifyParent(contactNumber, countryCode, newOtherContactLink);
            }}
            placeholder="Messenger / Telegram /..."
            className="w-full font-light text-sm"
            style={
              {
                backgroundColor: '#F3F5F9',
                '--tw-ring-color': 'rgb(245 158 11)',
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </>
  );

  if (isForm) {
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 shadow-sm"
      >
        {content}
      </form>
    );
  }

  return content;
}
