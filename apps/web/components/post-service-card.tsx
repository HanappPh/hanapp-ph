'use client';

import { Pencil, Trash2 } from 'lucide-react';

interface ServiceType {
  service_name: string;
  description: string;
  rate: number;
  rate_type: string;
  category: string;
  is_addon: boolean;
  images?: string[];
}

export function ServiceCard({
  service,
  onDelete,
  onEdit,
}: {
  service: ServiceType;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {service.service_name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {service.description}
            </p>
          </div>
          <div className="text-right ml-4">
            <div className="text-2xl font-bold text-gray-900">
              ₱{service.rate.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            {service.is_addon && (
              <div className="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium">
                Add-on Service
              </div>
            )}
          </div>

          <div className="flex space-x-2 ml-4">
            <button
              onClick={onEdit}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Edit service"
            >
              <Pencil size={18} className="text-gray-600" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete service"
            >
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
