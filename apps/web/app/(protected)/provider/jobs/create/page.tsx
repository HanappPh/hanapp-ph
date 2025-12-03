'use client';

import { Button, Checkbox } from '@hanapp-ph/commons';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { PostListingSuccessDialog } from '../../../../../components/post-job-listing/post-listing-success-dialog';
import { ServiceCard } from '../../../../../components/post-job-listing/post-service-card';
import { CreateListingForm } from '../../../../../components/post-job-listing/post-service-create';
import { ServiceForm } from '../../../../../components/post-job-listing/post-service-form';
import { PostServiceSuccessDialog } from '../../../../../components/post-job-listing/post-service-success-dialog';
import { useAuth } from '../../../../../lib/hooks/useAuth';

interface DayAvailability {
  available: boolean;
  start: string; // e.g. "08:00"
  end: string; // e.g. "17:00"
}

export interface Availability {
  date_range_start?: string;
  date_range_end?: string;
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}

interface Listing {
  service_title: string;
  category: string;
  description: string;
  // contact_number: string;
  availability: Availability;
  images: string[];
  locations: string[];
}

interface ServiceType {
  service_name: string;
  description: string;
  rate: number;
  rate_type: string;
  is_addon: boolean;
  images?: string[];
  isNew?: boolean;
}

export default function CreateServicePage() {
  const [viewMode, setViewMode] = useState('listing');
  const [services, setServices] = useState<ServiceType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [listingId, setListingId] = useState<string | null>(null);
  // for resetting the form (unused for now)
  // const [resetTrigger, setResetTrigger] = useState(0);
  const [listingData, setListingData] = useState<Listing>({
    service_title: '',
    category: '',
    description: '',
    // contact_number: '',
    availability: {
      monday: { available: false, start: '08:00', end: '17:00' },
      tuesday: { available: false, start: '08:00', end: '17:00' },
      wednesday: { available: false, start: '08:00', end: '17:00' },
      thursday: { available: false, start: '08:00', end: '17:00' },
      friday: { available: false, start: '08:00', end: '17:00' },
      saturday: { available: false, start: '08:00', end: '17:00' },
      sunday: { available: false, start: '08:00', end: '17:00' },
    },
    images: [] as string[],
    locations: [] as string[],
  });
  // const router = useRouter();
  const { user } = useAuth();
  const env = process.env;

  const handleAddService = (service: ServiceType) => {
    if (editingIndex !== null) {
      const updatedServices = [...services];
      updatedServices[editingIndex] = service;
      setServices(updatedServices);
      setEditingIndex(null);
    } else {
      setServices([...services, { ...service, isNew: true }]);
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

  const handleListingChange = (updatedData: Partial<Listing>) => {
    setListingData(prevData => ({ ...prevData, ...updatedData }));
  };

  const handlePostListing = async (
    listingData: Listing,
    accessToken: string
  ) => {
    if (
      !listingData.service_title ||
      !listingData.category ||
      !listingData.description
    ) {
      throw new Error('Please fill in all required listing information');
    }

    // if (!listingData.contact_number) {
    //   throw new Error('Please fill in contact information');
    // }

    if (!listingData.availability) {
      throw new Error('Please fill in availability information');
    }

    if (!listingData.locations || listingData.locations.length === 0) {
      throw new Error('Please add at least one service location');
    }

    if (!user?.id) {
      throw new Error('You must be logged in to create a service listing');
    }

    // Map category name to ID - in real app, fetch from API or use a constant map

    const payload = {
      providerId: user.id, // must exist
      categoryId: '6e51140f-6299-49f3-b7a3-a6d034398cff', // hardcoded for now
      title: listingData.service_title,
      description: listingData.description,
      availabilitySchedule: JSON.stringify(listingData.availability),
      serviceAreas: listingData.locations,
      images: listingData.images, // array of uploaded image URLs
    };

    try {
      const apiUrl = env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/service-listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `Failed to create service listing: ${response.status} ${errorData}`
        );
      }

      const createdListing = await response.json();
      setDialogOpen(true);
      setListingId(createdListing.id);
      // setResetTrigger(prev => prev + 1);
      return createdListing;
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('There was an error creating your listing. Please try again.');
      throw error;
    }
  };

  const handlePostServices = async (
    services: ServiceType[],
    accessToken: string
  ) => {
    if (services.length === 0 || !Array.isArray(services)) {
      throw new Error('Please add at least one service');
    }
    if (!listingId) {
      throw new Error('Invalid listing ID');
    }

    const newServices = services.filter(service => service.isNew);
    if (newServices.length === 0) {
      throw new Error('No new services to add');
    }

    try {
      for (const service of services) {
        if (!service.isNew) {
          continue;
        }

        const payload = {
          title: service.service_name,
          description: service.description,
          rate: Number(service.rate),
          charge: service.rate_type,
          isAddon: service.is_addon,
          listingId,
        };

        const apiUrl = env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/services`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
          cache: 'no-store',
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error('Failed to create service');
        }

        service.isNew = false;
      }
      setServiceDialogOpen(true);
    } catch (error) {
      console.error('Error creating services:', error);
      alert('There was an error creating your services. Please try again.');
      throw error;
    }
  };

  const handlePost = async () => {
    const {
      data: { session },
    } = await (
      await import('../../../../../lib/supabase/client')
    ).supabase.auth.getSession();

    if (!session?.access_token) {
      alert('No valid session found.');
      return;
    }

    // Validate that both listing data and services are ready
    if (
      !listingData.service_title ||
      !listingData.category ||
      !listingData.description
    ) {
      alert('Please complete the listing information first.');
      setViewMode('listing');
      return;
    }

    if (services.length === 0) {
      alert('Please add at least one service before posting.');
      setViewMode('services');
      return;
    }

    try {
      // Step 1: Create the listing (if not already created)
      let currentListingId = listingId;
      if (!currentListingId) {
        const createdListing = await handlePostListing(
          listingData,
          session.access_token
        );
        currentListingId = createdListing.id;
      }

      // Step 2: Post all services
      await handlePostServices(services, session.access_token);

      // Success - both listing and services posted
      alert('Your service listing has been posted successfully!');
    } catch (error: unknown) {
      // Narrow error type to Error to safely access message
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to post');
      }
    }
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
              Create Listing {listingData.service_title && '✓'}
            </button>
            <button
              onClick={() => {
                if (
                  !listingData.service_title ||
                  !listingData.category ||
                  !listingData.description
                ) {
                  alert('Please fill in the listing details first');
                  return;
                }
                setViewMode('services');
              }}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                viewMode === 'services'
                  ? 'bg-amber-400 text-gray-900'
                  : listingData.service_title &&
                      listingData.category &&
                      listingData.description
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-gray-400 cursor-not-allowed'
              }`}
              disabled={
                !listingData.service_title ||
                !listingData.category ||
                !listingData.description
              }
            >
              Create Service {services.length > 0 && `(${services.length})`}
            </button>
          </div>
        </div>

        {!listingData.service_title && viewMode === 'listing' && (
          <div className="max-w-4xl mx-auto mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Step 1:</strong> Fill in your service listing details, then
            add services. Both are required before posting.
          </div>
        )}

        {viewMode === 'services' && services.length === 0 && (
          <div className="max-w-4xl mx-auto mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
            <strong>Step 2:</strong> Add at least one service. Once you have
            both listing info and services, click Post Complete Listing to
            publish.
          </div>
        )}

        {services.length > 0 && listingData.service_title && (
          <div className="max-w-4xl mx-auto mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            <strong>Ready to post!</strong> You have {services.length} service
            {services.length > 1 ? 's' : ''} added. Check the terms and click
            &quot;Post Complete Listing&quot; to publish.
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className={viewMode === 'listing' ? 'block' : 'hidden'}>
            <CreateListingForm
              onListingChange={handleListingChange}
              // resetTrigger={resetTrigger}
            />
          </div>

          <div className={viewMode === 'services' ? 'block' : 'hidden'}>
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
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 space-y-4">
          <div className="flex items-start space-x-2 ">
            <Checkbox
              id="terms"
              className="mt-1 border-yellow-500 data-[state=checked]:bg-yellow-500"
              checked={agreedToTerms}
              onCheckedChange={checked => setAgreedToTerms(checked === true)}
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
            onClick={handlePost}
            disabled={
              !agreedToTerms ||
              !listingData.service_title ||
              !listingData.category ||
              !listingData.description ||
              !listingData.locations ||
              listingData.locations.length === 0 ||
              services.length === 0
            }
            className="w-full text-white py-3 text-lg font-medium border-0 bg-gradient-to-b from-[#FFDD8E] to-[#F5C45E] hover:bg-gradient-to-b hover:from-yellow-400 hover:to-yellow-600
             transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Complete Listing
          </Button>

          <PostListingSuccessDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />

          <PostServiceSuccessDialog
            open={serviceDialogOpen}
            onOpenChange={setServiceDialogOpen}
          />
        </div>
      </div>
    </div>
  );
}
