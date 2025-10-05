'use client';

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
  const [countryCode, setCountryCode] = useState('+63');
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
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Contact Information
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Set up for more modes of communication
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact No.
          </label>
          <div className="flex space-x-2">
            <select
              value={countryCode}
              onChange={e => {
                const newCountryCode = e.target.value;
                setCountryCode(newCountryCode);
                notifyParent(contactNumber, newCountryCode, otherContactLink);
              }}
              className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="+63">+63</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+86">+86</option>
            </select>
            <input
              type="tel"
              value={contactNumber}
              onChange={e => {
                const newContactNumber = e.target.value;
                setContactNumber(newContactNumber);
                notifyParent(newContactNumber, countryCode, otherContactLink);
              }}
              placeholder="999 *** ****"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Other Contact Link
          </label>
          <input
            type="text"
            value={otherContactLink}
            onChange={e => {
              const newOtherContactLink = e.target.value;
              setOtherContactLink(newOtherContactLink);
              notifyParent(contactNumber, countryCode, newOtherContactLink);
            }}
            placeholder="Messenger / Telegram / WhatsApp"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </div>
    </>
  );

  if (isForm) {
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
      >
        {content}
      </form>
    );
  }

  return content;
}
