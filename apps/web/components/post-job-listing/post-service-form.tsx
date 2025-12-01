'use client';

import { Plus } from 'lucide-react';
import React, { useState } from 'react';

interface ServiceType {
  service_name: string;
  description: string;
  rate: number;
  rate_type: string;
  is_addon: boolean;
  images?: string[];
}

const RATE_TYPES = [
  'per unit',
  'per hour',
  'per day',
  'per project',
  'per sqm',
  'per visit',
];

export function ServiceForm({
  onAddService,
  onCancel,
  editingService,
}: {
  onAddService: (service: ServiceType) => void;
  onCancel: () => void;
  editingService?: ServiceType;
}) {
  const [serviceName, setServiceName] = useState(
    editingService?.service_name || ''
  );
  const [description, setDescription] = useState(
    editingService?.description || ''
  );
  const [rate, setRate] = useState(editingService?.rate.toString() || '');
  const [rateType, setRateType] = useState(
    editingService?.rate_type || 'per unit'
  );

  const [isAddon, setIsAddon] = useState(editingService?.is_addon || false);
  const [images] = useState<string[]>(() => editingService?.images || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceName || !description || !rate) {
      alert('Please fill in all required fields');
      return;
    }

    onAddService({
      service_name: serviceName,
      description,
      rate: parseFloat(rate),
      rate_type: rateType,
      is_addon: isAddon,
      images: images || [],
    });

    setServiceName('');
    setDescription('');
    setRate('');
    setRateType('per unit');
    setIsAddon(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {editingService ? 'Edit Service' : 'Add New Service'}
      </h3>

      <div className="space-y-4">
        <div className="gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Name
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={e => setServiceName(e.target.value)}
              placeholder="Enter service name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe your service"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-600">₱</span>
              <input
                type="number"
                value={rate}
                onChange={e => setRate(e.target.value)}
                placeholder="Enter rate"
                step="0.01"
                min="0"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Charge
            </label>
            <select
              value={rateType}
              onChange={e => setRateType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {RATE_TYPES.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAddon}
              onChange={e => setIsAddon(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
          <div>
            <span className="text-sm font-medium text-gray-700">
              Add-on Service
            </span>
            <p className="text-xs text-gray-500">
              This is an add-on to a main service
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Plus size={20} />
            <span>{editingService ? 'Update Service' : 'Add Service'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
