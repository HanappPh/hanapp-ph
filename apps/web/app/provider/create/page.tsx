'use client';

import { Button, Checkbox } from '@hanapp-ph/commons';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { ServiceCard } from '../../../components/post-job-listing/post-service-card';
import { CreateListingForm } from '../../../components/post-job-listing/post-service-create';
import { ServiceForm } from '../../../components/post-job-listing/post-service-form';

interface ServiceType {
  service_name: string;
  description: string;
  rate: number;
  rate_type: string;
  category: string;
  is_addon: boolean;
  images?: string[];
}

function App() {
  const [viewMode, setViewMode] = useState('listing');
  const [services, setServices] = useState<ServiceType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [listingData, setListingData] = useState<Record<string, unknown>>({});

  const handleAddService = (service: ServiceType) => {
    if (editingIndex !== null) {
      const updatedServices = [...services];
      updatedServices[editingIndex] = service;
      setServices(updatedServices);
      setEditingIndex(null);
    } else {
      setServices([...services, service]);
    }
    setShowForm(false);
  };

  const handleEditService = (index: number) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setShowForm(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingIndex(null);
  };

  const handlePostAll = () => {
    if (
      !listingData.service_title ||
      !listingData.category ||
      !listingData.description
    ) {
      alert('Please fill in all required listing information');
      return;
    }

    if (!listingData.contact_number) {
      alert('Please fill in contact information');
      return;
    }

    if (!listingData.availability) {
      alert('Please fill in availability information');
      return;
    }

    if (services.length === 0) {
      alert('Please add at least one service');
      return;
    }

    setServices([]);
    setListingData({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            List Your Service
          </h1>
          <p className="text-gray-600">
            Create your service listing and add individual services
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full bg-gray-200 p-1">
            <button
              onClick={() => setViewMode('listing')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                viewMode === 'listing'
                  ? 'bg-amber-400 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Create Listing
            </button>
            <button
              onClick={() => setViewMode('services')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                viewMode === 'services'
                  ? 'bg-amber-400 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Create Service
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {viewMode === 'listing' ? (
            <CreateListingForm onListingChange={setListingData} />
          ) : (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Your Services
                  </h2>
                  <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
                    {services.length}{' '}
                    {services.length === 1 ? 'service' : 'services'}
                  </span>
                </div>

                {services.length > 0 && (
                  <div className="space-y-4 mb-6">
                    {services.map((service, index) => (
                      <ServiceCard
                        key={index}
                        service={service}
                        onDelete={() => handleDeleteService(index)}
                        onEdit={() => handleEditService(index)}
                      />
                    ))}
                  </div>
                )}

                {showForm ? (
                  <ServiceForm
                    onAddService={handleAddService}
                    onCancel={handleCancelForm}
                    editingService={
                      editingIndex !== null ? services[editingIndex] : undefined
                    }
                  />
                ) : (
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg py-8 hover:border-amber-400 hover:bg-amber-50 transition-colors flex flex-col items-center justify-center space-y-2 text-gray-500 hover:text-amber-600"
                  >
                    <Plus size={32} />
                    <span className="text-lg font-medium">
                      Add another service
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-8 space-y-4">
          <div className="flex items-start space-x-2 ">
            <Checkbox
              id="terms"
              className="mt-1 border-yellow-500 data-[state=checked]:bg-yellow-500"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 leading-relaxed"
            >
              By clicking Post, you agree to the{' '}
              <a href="#" className="text-yellow-600 underline">
                Terms and Conditions
              </a>{' '}
              of Hanapp and confirm that all information provided is true and
              legitimate
            </label>
          </div>

          <Button
            onClick={handlePostAll}
            className="w-full text-white py-3 text-lg font-medium border-0"
            style={{
              background: 'linear-gradient(to bottom, #FFDD8E, #F5C45E)',
            }}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
