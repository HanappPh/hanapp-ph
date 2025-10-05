'use client';

import { useState } from 'react';

const DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

const DAY_LABELS: Record<(typeof DAYS)[number], string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

export function AvailabilityForm({
  onAvailabilityChange,
}: {
  onAvailabilityChange: Function;
}) {
  const [availability, setAvailability] = useState({
    monday: { available: false, start: '08:00', end: '17:00' },
    tuesday: { available: false, start: '08:00', end: '17:00' },
    wednesday: { available: false, start: '08:00', end: '17:00' },
    thursday: { available: false, start: '08:00', end: '17:00' },
    friday: { available: false, start: '08:00', end: '17:00' },
    saturday: { available: false, start: '08:00', end: '17:00' },
    sunday: { available: false, start: '08:00', end: '17:00' },
  });

  const toggleDay = (day: string) => {
    const dayKey = day as keyof typeof availability;
    const newAvailability = {
      ...availability,
      [day]: {
        ...availability[dayKey],
        available: !availability[dayKey].available,
      },
    };
    setAvailability(newAvailability);
    updateParent(newAvailability);
  };

  const updateDayTime = (day: string, field: string, value: string) => {
    const dayKey = day as keyof typeof availability;
    const newAvailability = {
      ...availability,
      [day]: {
        ...availability[dayKey],
        [field]: value,
      },
    };
    setAvailability(newAvailability);
    updateParent(newAvailability);
  };

  const updateParent = (avail: typeof availability) => {
    onAvailabilityChange({
      date_range_start: '',
      date_range_end: '',
      monday: avail.monday,
      tuesday: avail.tuesday,
      wednesday: avail.wednesday,
      thursday: avail.thursday,
      friday: avail.friday,
      saturday: avail.saturday,
      sunday: avail.sunday,
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Availability</h3>
      <p className="text-sm text-gray-500 mb-4">
        Set your available days and hours
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Days & Hours
          </label>
          <div className="space-y-2">
            {DAYS.map(day => (
              <div key={day} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {DAY_LABELS[day]}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1 text-xs rounded ${
                        !availability[day].available
                          ? 'bg-gray-400 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      Closed
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1 text-xs rounded ${
                        availability[day].available
                          ? 'bg-amber-400 text-gray-900'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      Open
                    </button>
                  </div>
                </div>

                {availability[day].available && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        From
                      </label>
                      <input
                        type="time"
                        value={availability[day].start}
                        onChange={e =>
                          updateDayTime(day, 'start', e.target.value)
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        To
                      </label>
                      <input
                        type="time"
                        value={availability[day].end}
                        onChange={e =>
                          updateDayTime(day, 'end', e.target.value)
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
