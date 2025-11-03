'use client';

import { Checkbox } from '@hanapp-ph/commons';

export interface Service {
  id: number;
  name: string;
  description: string;
  rate: number;
}

interface SelectServicesProps {
  services: Service[];
  selectedServices: number[];
  toggleService: (id: number) => void;
}

export function SelectServices({
  services,
  selectedServices,
  toggleService,
}: SelectServicesProps) {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-[#102E50] mb-4">
        Select Services
      </h2>

      <div className="space-y-4">
        {services.map(service => (
          <div
            key={service.id}
            className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => toggleService(service.id)}
          >
            <Checkbox
              id={`service-${service.id}`}
              checked={selectedServices.includes(service.id)}
              onCheckedChange={() => toggleService(service.id)}
              className="mt-1"
            />

            <div className="flex-1 min-w-0">
              <label
                htmlFor={`service-${service.id}`}
                className="font-medium cursor-pointer block text-hanapp-secondary"
              >
                {service.name}
              </label>
              {service.description && (
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              )}
            </div>

            <div className="text-right whitespace-nowrap text-hanapp-primary text-lg">
              <p className="font-semibold">₱{service.rate}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
