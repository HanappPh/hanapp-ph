'use client';
import {
  Label,
  Input,
  Calendar,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hanapp-ph/commons';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
interface DateTimePickerProps {
  selectedDate: Date;
  selectedTime: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
}

export default function ScheduleService({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  // Get minimum date (today)
  const [open, setOpen] = React.useState(false);

  const isPastDate = (date: Date) => {
    const todayOnly = new Date();
    todayOnly.setHours(0, 0, 0, 0); // set to midnight
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0); // ignore time
    return checkDate < todayOnly;
  };
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-hanapp-secondary mb-4">
        Schedule Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Location */}
        <div className="space-y-2">
          <Label
            htmlFor="service-location"
            className="text-base font-semibold text-hanapp-primary"
          >
            Service Location
          </Label>
          <Input
            type="text"
            id="service-location"
            placeholder="Enter service location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Date Picker */}
        <div className="space-y-2">
          <Label
            htmlFor="service-date"
            className="text-base font-semibold text-hanapp-primary"
          >
            Preferred Date
          </Label>
          <Button
            variant="outline"
            className="w-full text-left text-hanapp-secondary justify-start px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setOpen(prev => !prev)}
          >
            <CalendarIcon className="inline mb-1 text-hanapp-secondary" />
            {selectedDate
              ? new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Select a date'}
          </Button>
          {open && (
            <div className="space-y-2 flex justify-left">
              <Calendar
                mode="single"
                selected={selectedDate ? new Date(selectedDate) : undefined}
                onSelect={date => {
                  if (date) {
                    onDateChange(date);
                  }
                  setOpen(false);
                }}
                disabled={isPastDate} // disable past dates
              />
            </div>
          )}
        </div>

        {/* Time Picker */}
        <div className="space-y-2">
          <Label
            htmlFor="service-time"
            className="text-base font-semibold text-hanapp-primary"
          >
            Preferred Time
          </Label>
          <Select value={selectedTime} onValueChange={onTimeChange}>
            <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-blue-50 transition-colors">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="08:00">8:00 AM</SelectItem>
              <SelectItem value="09:00">9:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="12:00">12:00 PM</SelectItem>
              <SelectItem value="13:00">1:00 PM</SelectItem>
              <SelectItem value="14:00">2:00 PM</SelectItem>
              <SelectItem value="15:00">3:00 PM</SelectItem>
              <SelectItem value="16:00">4:00 PM</SelectItem>
              <SelectItem value="17:00">5:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This is your preferred schedule. The provider
          will confirm availability and may suggest an alternative time if
          needed.
        </p>
      </div>
    </section>
  );
}
