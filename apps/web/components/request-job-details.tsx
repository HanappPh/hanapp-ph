import { Input } from '@hanapp-ph/commons/';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../libs/commons/src/components/ui/select';
import { Textarea } from '../../../libs/commons/src/components/ui/textarea';

export function JobDetailsSection() {
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
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-base font-medium text-gray-700 mb-3">
            Category
          </label>
          <Select>
            <SelectTrigger
              className="font-light text-sm"
              style={{ backgroundColor: '#F3F5F9' }}
            >
              <SelectValue placeholder="Cleaning" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="tutoring">Tutoring</SelectItem>
              <SelectItem value="repair">Repair</SelectItem>
              <SelectItem value="delivery">Delivery</SelectItem>
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
          />
        </div>
      </div>
    </div>
  );
}
