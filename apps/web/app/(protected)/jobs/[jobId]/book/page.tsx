'use client';
import { useState } from 'react';

import { CostBreakdownCard } from '../../../../../components/book-job/book-cost-breakdown';
import { CustomServices } from '../../../../../components/book-job/book-custom-services';
import ScheduleService from '../../../../../components/book-job/book-schedule';
import { SelectServices } from '../../../../../components/book-job/book-select-services';
const data = {
  id: '1',
  title: '1-2 HP Split/Window AC Deep Clean',
  services: [
    {
      id: 1,
      name: 'Window Type Servicing',
      description:
        'Complete cleaning for all window types of air conditioning units',
      rate: 800,
    },
    {
      id: 2,
      name: 'Split Type Servicing',
      description:
        'Complete cleaning for all split types of air conditioning units',
      rate: 1200,
    },
    {
      id: 3,
      name: 'AC Installation',
      description:
        'Professional Installation of new air conditioning units with warranty',
      rate: 2500,
    },
    {
      id: 4,
      name: 'Freon Top-up',
      description: 'R32/R410a Freon Top-up',
      rate: 1000,
    },
  ],
  extras: [
    {
      id: 1,
      name: 'Refrigerator Freon Top-Up',
      rate: 1000,
      description:
        'Refill refrigerant for 1–2 HP AC units to improve cooling efficiency.',
    },
  ],
  isActive: true,
};

// interface Data {
//   id: string;
//   title: string;
//   services: Service[];
//   extras: Service[];
//   isActive: boolean;
// }

interface Service {
  id: number;
  name: string;
  description: string;
  rate: number;
}

export default function BookServicePage() {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [customServices, setCustomServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  const baseTotal = selectedServices.reduce((sum, serviceId) => {
    const service = data.services.find(s => s.id === serviceId);
    return sum + (service?.rate || 0);
  }, 0);

  const customTotal = customServices.reduce(
    (sum, service) => sum + (Number(service.rate) || 0),
    0
  );

  const total = baseTotal + customTotal;

  const toggleService = (serviceId: number) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const addCustomService = () => {
    const newService: Service = {
      id: customServices.length + 1,
      name: '',
      description: '',
      rate: 0,
    };
    setCustomServices(prev => [...prev, newService]);
  };
  const updateCustomService = (
    id: number,
    field: keyof Service,
    value: string | number
  ) => {
    setCustomServices(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };
  const removeCustomService = (id: number) => {
    setCustomServices(prev => prev.filter(service => service.id !== id));
  };
  return (
    <div className="bg-[#F3F5F9]">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-[#102E50]">
          Book Service: {data.title}
        </h1>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <SelectServices
              services={data.services}
              selectedServices={selectedServices}
              toggleService={toggleService}
            />

            {/* Custom Services */}
            <CustomServices
              customServices={customServices}
              addCustomService={addCustomService}
              updateCustomService={updateCustomService}
              removeCustomService={removeCustomService}
            />

            <ScheduleService
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />
          </div>

          {/* Cost Breakdown */}
          <div className="lg:col-span-1">
            <CostBreakdownCard
              selectedServices={data.services.filter(s =>
                selectedServices.includes(s.id)
              )}
              customServices={customServices}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
