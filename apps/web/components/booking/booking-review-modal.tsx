'use client';

import { Button } from '@hanapp-ph/commons';
import { X } from 'lucide-react';

interface Service {
  name: string;
  price: number;
  description?: string;
}

interface ScheduleInfo {
  location: string;
  date: string;
  time: string;
}

interface BookingData {
  id: string | number;
  listingTitle: string;
  providerName?: string;
  clientName?: string;
  selectedServices: Service[];
  customServices: Service[];
  schedule: ScheduleInfo;
  total: number;
  status: string;
}

interface BookingReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingData | null;
}

export function BookingReviewModal({
  isOpen,
  onClose,
  bookingData,
}: BookingReviewModalProps) {
  if (!isOpen || !bookingData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-semibold text-hanapp-secondary">
              Booking Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {bookingData.listingTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Provider/Client Info */}
          <div className="flex items-center justify-between">
            {bookingData.providerName && (
              <div>
                <p className="text-sm text-gray-500">Provider</p>
                <p className="font-medium text-hanapp-secondary">
                  {bookingData.providerName}
                </p>
              </div>
            )}
            {bookingData.clientName && (
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="font-medium text-hanapp-secondary">
                  {bookingData.clientName}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  bookingData.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : bookingData.status === 'Accepted'
                      ? 'bg-green-100 text-green-800'
                      : bookingData.status === 'Completed'
                        ? 'bg-blue-100 text-blue-800'
                        : bookingData.status === 'Rejected' ||
                            bookingData.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                }`}
              >
                {bookingData.status}
              </span>
            </div>
          </div>

          {/* Selected Services */}
          {bookingData.selectedServices.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-3">
                Selected Services
              </h3>
              <div className="space-y-3">
                {bookingData.selectedServices.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start gap-4 p-3 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1">
                      <span className="text-hanapp-secondary font-medium">
                        {service.name}
                      </span>
                      {service.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {service.description}
                        </p>
                      )}
                    </div>
                    <span className="font-semibold text-hanapp-primary whitespace-nowrap">
                      ₱{service.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom/Additional Services */}
          {bookingData.customServices.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-3">
                Additional Services
              </h3>
              <div className="space-y-3">
                {bookingData.customServices.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start gap-4 p-3 rounded-lg border border-gray-200 bg-blue-50"
                  >
                    <div className="flex-1">
                      <span className="text-hanapp-secondary font-medium">
                        {service.name}
                      </span>
                      {service.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {service.description}
                        </p>
                      )}
                    </div>
                    <span className="font-semibold text-hanapp-primary whitespace-nowrap">
                      ₱{service.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-3">
              Schedule & Location
            </h3>
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Location</span>
                <span className="text-hanapp-secondary font-medium">
                  {bookingData.schedule.location}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date</span>
                <span className="text-hanapp-secondary font-medium">
                  {bookingData.schedule.date}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time</span>
                <span className="text-hanapp-secondary font-medium">
                  {bookingData.schedule.time}
                </span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center bg-hanapp-primary/10 p-4 rounded-lg">
              <span className="font-semibold text-hanapp-secondary text-lg">
                Total Amount
              </span>
              <span className="text-2xl font-bold text-hanapp-primary">
                ₱{bookingData.total.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              All payments are handled directly with the provider.
            </p>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full mt-4 border-hanapp-primary text-hanapp-primary hover:bg-hanapp-primary hover:text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
