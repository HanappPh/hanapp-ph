import { Button, Input, Label } from '@hanapp-ph/commons';
import { Plus, Trash2 } from 'lucide-react';

import { Service } from './book-select-services';

interface CustomServicesProps {
  customServices: Service[];
  addCustomService: () => void;
  updateCustomService: (
    id: number,
    field: keyof Service,
    value: string | number
  ) => void;
  removeCustomService: (id: number) => void;
}

export function CustomServices({
  customServices,
  addCustomService,
  updateCustomService,
  removeCustomService,
}: CustomServicesProps) {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-hanapp-secondary mb-4">
            Additional Services
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Need something not listed? Add it here after discussing with the
            provider.
          </p>
        </div>
        <Button
          onClick={addCustomService}
          className="bg-hanapp-primary text-white rounded-lg hover:bg-hanapp-secondary transition-colors"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {customServices.length > 0 && (
        <div className="space-y-3 mt-4">
          {customServices.map(service => (
            <div
              key={service.id}
              className="border border-gray-200 shadow-sm rounded-lg p-4"
            >
              <div className="flex gap-3 items-center">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-md text-hanapp-primary mb-1">
                      Service Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Service description (e.g., Custom pipe installation)"
                      value={service.name}
                      onChange={e =>
                        updateCustomService(service.id, 'name', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                  </div>
                  <div>
                    <Label className="text-md text-hanapp-primary mb-1">
                      Agreed Rate (₱)
                    </Label>
                    <Input
                      type="number"
                      placeholder="Agreed rate (₱)"
                      value={service.rate}
                      onChange={e =>
                        updateCustomService(
                          service.id,
                          'rate',
                          Number(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => removeCustomService(service.id)}
                  className="text-red-400 hover:text-red p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {customServices.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No additional services added yet
        </div>
      )}
    </section>
  );
}
