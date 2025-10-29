import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@hanapp-ph/commons';

interface JobDetailsSectionProps {
  formData: {
    title: string;
    categoryId: string;
    description: string;
    expertise: string;
  };
  updateFormData: (field: string, value: string) => void;
}

export function JobDetailsSection({
  formData,
  updateFormData,
}: JobDetailsSectionProps) {
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
        Job Details
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Job information and service type needed
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <label className="block text-base font-medium text-gray-700 mb-3">
            Job Title
          </label>
          <Input
            placeholder="e.g. Tutor for Integral Calculus"
            className="w-full font-light text-base"
            style={{ backgroundColor: '#F3F5F9' }}
            value={formData.title}
            onChange={e => updateFormData('title', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-base font-medium text-gray-700 mb-3">
            Category
          </label>
          <Select
            value={formData.categoryId}
            onValueChange={value => updateFormData('categoryId', value)}
          >
            <SelectTrigger
              className="font-light text-sm"
              style={{ backgroundColor: '#F3F5F9' }}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Cleaning</SelectItem>
              <SelectItem value="2">Tutoring</SelectItem>
              <SelectItem value="3">Repair</SelectItem>
              <SelectItem value="4">Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
        <div className="md:col-span-3">
          <label className="block text-base font-medium text-gray-700 mb-3">
            Job Description
          </label>
          <Textarea
            placeholder="Describe the service you need in detail"
            className="min-h-[80px] font-light resize-none text-base"
            style={{ backgroundColor: '#F3F5F9' }}
            value={formData.description}
            onChange={e => updateFormData('description', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-base font-medium text-gray-700 mb-3">
            Expertise
          </label>
          <Textarea
            placeholder="Describe the expertise you require"
            className="min-h-[80px] font-light resize-none text-base"
            style={{ backgroundColor: '#F3F5F9' }}
            value={formData.expertise}
            onChange={e => updateFormData('expertise', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
