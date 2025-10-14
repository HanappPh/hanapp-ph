import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hanapp-ph/commons';

export function PricingInformationSection() {
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
        Pricing Information
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Set your rates and mode of payment
      </p>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-3">
            Your Rate
          </label>
          <Input
            style={{ backgroundColor: '#F3F5F9' }}
            placeholder="Peso"
            className="w-full font-light text-sm mb-3"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-3">
            Mode of Payment
          </label>
          <Select>
            <SelectTrigger
              className="font-light text-sm"
              style={{ backgroundColor: '#F3F5F9' }}
            >
              <SelectValue placeholder="e.g. Gcash, Maya" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gcash">GCash</SelectItem>
              <SelectItem value="maya">Maya</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="bank">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
