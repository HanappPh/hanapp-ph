'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { CreateListingForm } from '../../../components/post-create-service';
import { ServiceCard } from '../../../components/post-service-card';
import { ServiceForm } from '../../../components/post-service-form';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
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

    setIsSubmitting(true);

    // Simulate posting to backend with a delay
    setTimeout(() => {
      // Data would be sent to backend here: listingData, services

      setSuccessMessage(
        'Listing and services posted successfully! (Frontend simulation)'
      );
      setServices([]);
      setListingData({});

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      setIsSubmitting(false);
    }, 1500); // Simulate network delay
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            List Your Service
          </h1>
          <p className="text-gray-600">
            Create your service listing and add individual services
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
            {successMessage}
          </div>
        )}

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
                  ? 'bg-gray-600 text-white'
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
          <div className="text-xs text-gray-600 bg-gray-50 p-4 rounded-lg text-center">
            By clicking &quot;Post&quot;, you agree to the{' '}
            <a href="#" className="text-amber-600 hover:underline">
              Terms and Conditions
            </a>{' '}
            of Hanapp and swear that all the info you filled up is true and
            legitimate
          </div>
          <button
            onClick={handlePostAll}
            disabled={isSubmitting}
            className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-amber-300 text-gray-900 font-bold py-4 rounded-lg transition-colors text-lg"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
