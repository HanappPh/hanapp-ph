import { Input } from '@hanapp-ph/commons';

interface ContactInformationSectionProps {
  formData: {
    contact: string;
    contactLink: string;
  };
  updateFormData: (field: string, value: string) => void;
}

export function ContactInformationSection({
  formData,
  updateFormData,
}: ContactInformationSectionProps) {
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
        Contact Information
      </h2>
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
              placeholder="*** *** ****"
              className="rounded-l-none font-light text-sm mb-3"
              style={{ backgroundColor: '#F3F5F9' }}
              value={formData.contact.replace('+63', '')}
              onChange={e => updateFormData('contact', `+63${e.target.value}`)}
            />
          </div>
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-3">
            Other Contact Link
          </label>
          <Input
            placeholder="Messenger / Telegram /..."
            className="w-full font-light text-sm"
            style={{ backgroundColor: '#F3F5F9' }}
            value={formData.contactLink}
            onChange={e => updateFormData('contactLink', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
