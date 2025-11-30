import { Input } from '@hanapp-ph/commons';

interface LocationAvailabilitySectionProps {
  formData: {
    jobLocation: string;
    jobDate: string;
    jobTimeStart: string;
    jobTimeEnd: string;
  };
  updateFormData: (field: string, value: string) => void;
}

export function LocationAvailabilitySection({
  formData,
  updateFormData,
}: LocationAvailabilitySectionProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2
        className="text-3xl font-medium"
        style={{
          background: 'linear-gradient(to right, #1b4779ff, #2469B6)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Location and Availability
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        When and where you want your service to be given
      </p>

      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Job Location
            </label>
            <Input
              className="w-full font-light text-sm"
              style={{ backgroundColor: '#F3F5F9' }}
              value={formData.jobLocation}
              onChange={e => updateFormData('jobLocation', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Date
            </label>
            <Input
              type="date"
              className="w-full font-light text-sm"
              style={{ backgroundColor: '#F3F5F9' }}
              value={formData.jobDate}
              onChange={e => updateFormData('jobDate', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Time Range
          </label>
          <div className="flex gap-2 items-center max-w-md">
            <Input
              type="time"
              className="w-full font-light text-sm"
              style={{ backgroundColor: '#F3F5F9' }}
              value={formData.jobTimeStart}
              onChange={e => updateFormData('jobTimeStart', e.target.value)}
            />
            <span className="text-gray-500 flex-shrink-0">-</span>
            <Input
              type="time"
              className="w-full font-light text-sm"
              style={{ backgroundColor: '#F3F5F9' }}
              value={formData.jobTimeEnd}
              onChange={e => updateFormData('jobTimeEnd', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
