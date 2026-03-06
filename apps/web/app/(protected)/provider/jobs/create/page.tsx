'use client';

import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@hanapp-ph/commons';
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Check,
  ClipboardList,
  ListChecks,
  Plus,
  Send,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';

import { PostServiceSuccessDialog } from '../../../../../components/post-job-listing/post-service-success-dialog';
import { FormStepper } from '../../../../../components/request-job-listing/form-stepper';
import { ImageUploadSection } from '../../../../../components/request-job-listing/request-media';
import { getAllCategories } from '../../../../../lib/constants/categories';
import {
  fetchLguOptions,
  type LguOption,
} from '../../../../../lib/constants/lgus';
import { useAuth } from '../../../../../lib/hooks/useAuth';

interface DayAvailability {
  available: boolean;
  start: string;
  end: string;
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
  isNew?: boolean;
}

interface ServiceDraft {
  service_name: string;
  description: string;
  rate: string;
  rate_type: string;
}

type DayKey = keyof Pick<
  Availability,
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
>;

type FieldErrors = Partial<
  Record<
    | 'service_title'
    | 'category'
    | 'description'
    | 'locations'
    | 'availability'
    | 'service_name'
    | 'service_description'
    | 'service_rate'
    | 'service_rate_type'
    | 'services'
    | 'terms',
    string
  >
>;

const DAYS: DayKey[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const DAY_LABELS: Record<DayKey, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

const RATE_TYPES = [
  'per unit',
  'per hour',
  'per day',
  'per project',
  'per sqm',
  'per visit',
];

const AVAILABILITY_TIME_RANGE_ERROR =
  'Preferred time range must stay within the same day. Start time must be earlier than end time.';

const defaultAvailability = (): Availability => ({
  monday: { available: false, start: '08:00', end: '17:00' },
  tuesday: { available: false, start: '08:00', end: '17:00' },
  wednesday: { available: false, start: '08:00', end: '17:00' },
  thursday: { available: false, start: '08:00', end: '17:00' },
  friday: { available: false, start: '08:00', end: '17:00' },
  saturday: { available: false, start: '08:00', end: '17:00' },
  sunday: { available: false, start: '08:00', end: '17:00' },
});

const listingSchema = z.object({
  service_title: z.string().trim().min(1, 'Service title is required'),
  category: z.string().trim().min(1, 'Category is required'),
  description: z.string().trim().min(1, 'Description is required'),
  locations: z
    .array(z.string())
    .min(1, 'At least one accepted area is required'),
});

const serviceDraftSchema = z.object({
  service_name: z.string().trim().min(1, 'Service name is required'),
  description: z.string().trim().min(1, 'Service description is required'),
  rate: z
    .string()
    .trim()
    .min(1, 'Rate is required')
    .refine(value => Number(value) > 0, {
      message: 'Rate must be greater than 0',
    }),
  rate_type: z.string().trim().min(1, 'Charge type is required'),
});

const dayAvailabilitySchema = z
  .object({
    available: z.boolean(),
    start: z.string(),
    end: z.string(),
  })
  .superRefine((day, ctx) => {
    if (day.available && day.start >= day.end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['end'],
        message: AVAILABILITY_TIME_RANGE_ERROR,
      });
    }
  });

const availabilitySchema = z.object({
  monday: dayAvailabilitySchema,
  tuesday: dayAvailabilitySchema,
  wednesday: dayAvailabilitySchema,
  thursday: dayAvailabilitySchema,
  friday: dayAvailabilitySchema,
  saturday: dayAvailabilitySchema,
  sunday: dayAvailabilitySchema,
});

export default function CreateServicePage() {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [lguOptions, setLguOptions] = useState<LguOption[]>([]);
  const [isLoadingLgus, setIsLoadingLgus] = useState(false);
  const [showAreaOptions, setShowAreaOptions] = useState(false);

  const [services, setServices] = useState<ServiceType[]>([]);
  const [showServiceForm, setShowServiceForm] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [serviceDraft, setServiceDraft] = useState<ServiceDraft>({
    service_name: '',
    description: '',
    rate: '',
    rate_type: '',
  });

  const [currentLocation, setCurrentLocation] = useState('');
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [listingId, setListingId] = useState<string | null>(null);

  const [listingData, setListingData] = useState<Listing>({
    service_title: '',
    category: '',
    description: '',
    availability: defaultAvailability(),
    images: [],
    locations: [],
  });

  const steps = [
    { label: 'Listing Info', icon: ClipboardList },
    { label: 'Availability', icon: CalendarClock },
    { label: 'Services', icon: ListChecks },
    { label: 'Review & Submit', icon: Send },
  ];

  const categories = getAllCategories();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (!serviceDialogOpen || !listingId) {
      return;
    }

    const timeout = window.setTimeout(() => {
      router.push(`/jobs/${listingId}`);
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [serviceDialogOpen, listingId, router]);

  useEffect(() => {
    let mounted = true;

    const loadLgus = async () => {
      setIsLoadingLgus(true);
      try {
        const options = await fetchLguOptions();
        if (mounted) {
          setLguOptions(options);
        }
      } catch {
        if (mounted) {
          setGeneralError('Unable to load city and municipality list.');
        }
      } finally {
        if (mounted) {
          setIsLoadingLgus(false);
        }
      }
    };

    void loadLgus();

    return () => {
      mounted = false;
    };
  }, []);

  const clearFieldError = (key: keyof FieldErrors) => {
    setFieldErrors(prev => {
      if (!prev[key]) {
        return prev;
      }
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const updateListingField = (
    field: keyof Listing,
    value: string | string[] | Availability
  ) => {
    setListingData(prev => ({ ...prev, [field]: value }));
    setGeneralError(null);
    if (
      field === 'service_title' ||
      field === 'category' ||
      field === 'description' ||
      field === 'locations'
    ) {
      clearFieldError(field as keyof FieldErrors);
    }
  };

  const filteredAreaOptions = useMemo(() => {
    const query = currentLocation.trim().toLowerCase();
    if (!query) {
      return [] as LguOption[];
    }

    return lguOptions
      .filter(
        option =>
          option.searchText.includes(query) &&
          !listingData.locations.includes(option.name)
      )
      .slice(0, 12);
  }, [currentLocation, lguOptions, listingData.locations]);

  const selectAcceptedArea = (option: LguOption) => {
    if (listingData.locations.includes(option.name)) {
      return;
    }

    updateListingField('locations', [...listingData.locations, option.name]);
    setCurrentLocation('');
    setShowAreaOptions(false);
  };

  const updateListingImages = (field: string, value: string[]) => {
    if (field !== 'images') {
      return;
    }

    updateListingField('images', value);
  };

  const removeLocation = (index: number) => {
    const next = listingData.locations.filter((_, idx) => idx !== index);
    updateListingField('locations', next);
  };

  const toggleDay = (day: DayKey, open: boolean) => {
    const next = {
      ...listingData.availability,
      [day]: {
        ...listingData.availability[day],
        available: open,
      },
    };
    updateListingField('availability', next);
    clearFieldError('availability');
  };

  const updateDayTime = (
    day: DayKey,
    field: 'start' | 'end',
    value: string
  ) => {
    const next = {
      ...listingData.availability,
      [day]: {
        ...listingData.availability[day],
        [field]: value,
      },
    };
    updateListingField('availability', next);
    clearFieldError('availability');
  };

  const openDaysCount = DAYS.filter(
    day => listingData.availability[day].available
  ).length;

  const resetServiceDraft = () => {
    setServiceDraft({
      service_name: '',
      description: '',
      rate: '',
      rate_type: '',
    });
    setEditingIndex(null);
  };

  const handleEditService = (index: number) => {
    const item = services[index];
    setServiceDraft({
      service_name: item.service_name,
      description: item.description,
      rate: item.rate.toString(),
      rate_type: item.rate_type,
    });
    setEditingIndex(index);
    setShowServiceForm(true);
    setGeneralError(null);
  };

  const handleDeleteService = (index: number) => {
    setServices(prev => prev.filter((_, i) => i !== index));
    clearFieldError('services');
    setGeneralError(null);
    if (editingIndex === index) {
      resetServiceDraft();
    }
  };

  const saveService = () => {
    const result = serviceDraftSchema.safeParse(serviceDraft);
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (key === 'service_name') {
          next.service_name = issue.message;
        }
        if (key === 'description') {
          next.service_description = issue.message;
        }
        if (key === 'rate') {
          next.service_rate = issue.message;
        }
        if (key === 'rate_type') {
          next.service_rate_type = issue.message;
        }
      }
      setFieldErrors(prev => ({ ...prev, ...next }));
      setGeneralError('Please fill in all required fields.');
      return;
    }

    const payload: ServiceType = {
      service_name: serviceDraft.service_name,
      description: serviceDraft.description,
      rate: Number(serviceDraft.rate),
      rate_type: serviceDraft.rate_type,
      is_addon: false,
      isNew: editingIndex === null,
    };

    if (editingIndex !== null) {
      setServices(prev =>
        prev.map((item, idx) =>
          idx === editingIndex ? { ...payload, isNew: item.isNew } : item
        )
      );
    } else {
      setServices(prev => [...prev, payload]);
    }

    clearFieldError('service_name');
    clearFieldError('service_description');
    clearFieldError('service_rate');
    clearFieldError('service_rate_type');
    clearFieldError('services');
    setGeneralError(null);
    setShowServiceForm(false);
    resetServiceDraft();
  };

  const validateStep = (step: number) => {
    if (step === 0) {
      const result = listingSchema.safeParse({
        service_title: listingData.service_title,
        category: listingData.category,
        description: listingData.description,
        locations: listingData.locations,
      });

      if (!result.success) {
        const next: FieldErrors = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0];
          if (key === 'service_title') {
            next.service_title = issue.message;
          }
          if (key === 'category') {
            next.category = issue.message;
          }
          if (key === 'description') {
            next.description = issue.message;
          }
          if (key === 'locations') {
            next.locations = issue.message;
          }
        }
        setFieldErrors(prev => ({ ...prev, ...next }));
        setGeneralError('Please fill in all required fields.');
        return false;
      }
    }

    if (step === 1 && openDaysCount === 0) {
      setFieldErrors(prev => ({
        ...prev,
        availability: 'At least one day must be open.',
      }));
      setGeneralError('Have at least 1 available day.');
      return false;
    }

    if (step === 1) {
      const availabilityValidation = availabilitySchema.safeParse(
        listingData.availability
      );
      if (!availabilityValidation.success) {
        setFieldErrors(prev => ({
          ...prev,
          availability: AVAILABILITY_TIME_RANGE_ERROR,
        }));
        setGeneralError(AVAILABILITY_TIME_RANGE_ERROR);
        return false;
      }
    }

    if (step === 2 && services.length === 0) {
      setFieldErrors(prev => ({
        ...prev,
        services: 'Add at least one service.',
      }));
      setGeneralError('Add at least one service.');
      return false;
    }

    setGeneralError(null);
    return true;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      return;
    }
    setAgreedToTerms(false);
    setDirection('next');
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const previousStep = () => {
    setGeneralError(null);
    setAgreedToTerms(false);
    setDirection('prev');
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleCancel = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push('/');
  };

  const handlePostListing = async (
    currentListingData: Listing,
    accessToken: string
  ) => {
    if (!user?.id) {
      throw new Error('You must be logged in to create a service listing');
    }

    const payload = {
      providerId: user.id,
      categoryId: parseInt(currentListingData.category, 10),
      title: currentListingData.service_title,
      description: currentListingData.description,
      availabilitySchedule: JSON.stringify(currentListingData.availability),
      serviceAreas: currentListingData.locations,
      images: currentListingData.images,
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
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
    setListingId(createdListing.id);
    return createdListing;
  };

  const handlePostServices = async (
    currentServices: ServiceType[],
    accessToken: string,
    currentListingId: string
  ) => {
    const newServices = currentServices.filter(service => service.isNew);
    if (newServices.length === 0) {
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    for (const service of newServices) {
      const payload = {
        title: service.service_name,
        description: service.description,
        rate: Number(service.rate),
        charge: service.rate_type,
        listingId: currentListingId,
      };

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
        throw new Error(`Failed to create service: ${errorText}`);
      }
    }

    setServices(prev => prev.map(service => ({ ...service, isNew: false })));
    setServiceDialogOpen(true);
  };

  const handlePost = async () => {
    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) {
      return;
    }

    if (!agreedToTerms) {
      setFieldErrors(prev => ({
        ...prev,
        terms: 'You must agree to the terms before posting.',
      }));
      setGeneralError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setGeneralError(null);

    try {
      const {
        data: { session },
      } = await (
        await import('../../../../../lib/supabase/client')
      ).supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error('No valid session found.');
      }

      let currentListingId = listingId;
      if (!currentListingId) {
        const createdListing = await handlePostListing(
          listingData,
          session.access_token
        );
        currentListingId = createdListing.id;
      }

      if (!currentListingId) {
        throw new Error('Failed to resolve listing ID.');
      }

      await handlePostServices(
        services,
        session.access_token,
        currentListingId
      );
    } catch (error: unknown) {
      setGeneralError(
        error instanceof Error
          ? error.message
          : 'Failed to post complete listing.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-6 py-12 mobile-scale">
        <div ref={topRef} className="bg-white rounded-lg shadow-sm p-8 md:p-10">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-1 text-black">
              List Your Service
            </h1>
            <p className="text-lg text-gray-500 mt-3">
              Create your listing and add individual services
            </p>
          </div>

          <div className="mt-8">
            <FormStepper
              steps={steps}
              currentStep={currentStep}
              theme="accent"
            />
          </div>

          {generalError && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {generalError}
            </div>
          )}

          <div className="mt-6 px-1 md:px-2">
            <div
              key={currentStep}
              style={{
                animation:
                  direction === 'next'
                    ? 'slideInFromRight 260ms ease'
                    : 'slideInFromLeft 260ms ease',
              }}
            >
              {currentStep === 0 && (
                <>
                  <h2 className="text-4xl font-medium text-black">
                    Listing Info
                  </h2>
                  <p className="text-m text-gray-600 mb-6">
                    Basic information about your service listing
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-3">
                        Service Title <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={listingData.service_title}
                        onChange={e =>
                          updateListingField('service_title', e.target.value)
                        }
                        placeholder="e.g. Home Cleaning Service"
                        className={`w-full h-12 font-light text-base border-gray-300 ${
                          fieldErrors.service_title ? 'border-red-500' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-3">
                        Service Category <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={listingData.category}
                        onValueChange={value =>
                          updateListingField('category', value)
                        }
                      >
                        <SelectTrigger
                          className={`h-12 font-light text-base border-gray-300 ${
                            fieldErrors.category ? 'border-red-500' : ''
                          }`}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem
                              key={cat.integerId}
                              value={cat.integerId.toString()}
                            >
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-base font-medium text-gray-700 mb-3">
                      Service Description{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={listingData.description}
                      onChange={e =>
                        updateListingField('description', e.target.value)
                      }
                      placeholder="Describe the service you are offering in detail"
                      className={`min-h-[120px] font-light resize-none text-base border-gray-300 ${
                        fieldErrors.description ? 'border-red-500' : ''
                      }`}
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-base font-medium text-gray-700 mb-3">
                      Accepted Areas <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        value={currentLocation}
                        onFocus={() => setShowAreaOptions(true)}
                        onBlur={() => {
                          window.setTimeout(() => {
                            setShowAreaOptions(false);
                          }, 120);
                        }}
                        onChange={e => {
                          setCurrentLocation(e.target.value);
                          setShowAreaOptions(true);
                          setGeneralError(null);
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && filteredAreaOptions.length) {
                            e.preventDefault();
                            selectAcceptedArea(filteredAreaOptions[0]);
                          }
                        }}
                        placeholder="Search city or municipality"
                        className={`w-full h-12 font-light text-base border-gray-300 ${
                          fieldErrors.locations ? 'border-red-500' : ''
                        }`}
                      />

                      {showAreaOptions && currentLocation.trim() && (
                        <div className="absolute z-30 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
                          {isLoadingLgus ? (
                            <div className="px-3 py-2 text-sm text-gray-500">
                              Loading locations...
                            </div>
                          ) : filteredAreaOptions.length > 0 ? (
                            filteredAreaOptions.map(option => (
                              <button
                                key={option.psgcCode}
                                type="button"
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between"
                                onMouseDown={e => {
                                  e.preventDefault();
                                  selectAcceptedArea(option);
                                }}
                              >
                                <span>{option.name}</span>
                                {listingData.locations.includes(
                                  option.name
                                ) && (
                                  <Check className="w-4 h-4 text-hanapp-accent" />
                                )}
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">
                              No matching city or municipality.
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {listingData.locations.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {listingData.locations.map((location, index) => (
                          <span
                            key={`${location}-${index}`}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                          >
                            {location}
                            <button
                              onClick={() => removeLocation(index)}
                              className="hover:text-red-600"
                              type="button"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <label className="block text-base font-medium text-gray-700 mb-3">
                      Reference Images
                    </label>
                    <ImageUploadSection
                      formData={{ images: listingData.images }}
                      updateFormData={updateListingImages}
                      embedded
                      compact
                    />
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <h2 className="text-4xl font-medium text-black">
                    Availability
                  </h2>
                  <p className="text-m text-gray-600 mb-6">
                    Set your available days and hours
                  </p>

                  <div
                    className={`space-y-3 border rounded-lg p-4 ${
                      fieldErrors.availability
                        ? 'border-red-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-700">
                      Available Days & Hours{' '}
                      <span className="text-red-500">*</span>
                    </p>

                    {DAYS.map(day => (
                      <div
                        key={day}
                        className="flex flex-col md:flex-row md:items-center gap-3 py-3 border-b border-gray-200 last:border-b-0"
                      >
                        <span className="w-28 text-sm font-medium text-gray-800">
                          {DAY_LABELS[day]}
                        </span>

                        <div className="flex items-center gap-2 md:ml-auto">
                          <button
                            type="button"
                            onClick={() => toggleDay(day, false)}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                              !listingData.availability[day].available
                                ? 'bg-gray-300 text-gray-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            Closed
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleDay(day, true)}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                              listingData.availability[day].available
                                ? 'bg-hanapp-accent text-gray-900'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            Open
                          </button>
                        </div>

                        {listingData.availability[day].available && (
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              className="w-28 h-9 text-xs border-gray-300"
                              value={listingData.availability[day].start}
                              onChange={e =>
                                updateDayTime(day, 'start', e.target.value)
                              }
                            />
                            <span className="text-gray-500 text-xs">–</span>
                            <Input
                              type="time"
                              className="w-28 h-9 text-xs border-gray-300"
                              value={listingData.availability[day].end}
                              onChange={e =>
                                updateDayTime(day, 'end', e.target.value)
                              }
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h2 className="text-4xl font-medium text-black">Services</h2>
                  <p className="text-m text-gray-600 mb-6">
                    Add at least one service to your listing
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      Your Services
                    </h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {services.length}{' '}
                      {services.length === 1 ? 'service' : 'services'}
                    </span>
                  </div>

                  {services.length > 0 && (
                    <div className="space-y-3 mb-6">
                      {services.map((service, index) => (
                        <div
                          key={`${service.service_name}-${index}`}
                          className="border border-gray-200 rounded-lg p-4 flex items-start justify-between"
                        >
                          <div>
                            <p className="text-base font-semibold text-gray-900">
                              {service.service_name}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {service.description}
                            </p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              ₱{service.rate.toLocaleString()}{' '}
                              {service.rate_type}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditService(index)}
                              className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteService(index)}
                              className="p-2 rounded-md hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {(services.length === 0 || showServiceForm) && (
                    <div className="border border-gray-200 rounded-lg p-5 space-y-4 mb-5">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {editingIndex !== null
                          ? 'Edit Service'
                          : 'Add New Service'}
                      </h3>

                      <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                          Service Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={serviceDraft.service_name}
                          onChange={e => {
                            setServiceDraft(prev => ({
                              ...prev,
                              service_name: e.target.value,
                            }));
                            setGeneralError(null);
                            clearFieldError('service_name');
                          }}
                          placeholder="Enter service name"
                          className={`h-12 text-base border-gray-300 ${
                            fieldErrors.service_name ? 'border-red-500' : ''
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          value={serviceDraft.description}
                          onChange={e => {
                            setServiceDraft(prev => ({
                              ...prev,
                              description: e.target.value,
                            }));
                            setGeneralError(null);
                            clearFieldError('service_description');
                          }}
                          placeholder="Describe your service"
                          className={`min-h-[90px] resize-none text-base border-gray-300 ${
                            fieldErrors.service_description
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-base font-medium text-gray-700 mb-2">
                            Rate <span className="text-red-500">*</span>
                          </label>
                          <div className="flex">
                            <span
                              className={`inline-flex items-center px-3 rounded-l-md border border-r-0 text-gray-500 text-sm ${
                                fieldErrors.service_rate
                                  ? 'border-red-500'
                                  : 'border-gray-300'
                              }`}
                            >
                              ₱
                            </span>
                            <Input
                              type="number"
                              min="0"
                              value={serviceDraft.rate}
                              onChange={e => {
                                setServiceDraft(prev => ({
                                  ...prev,
                                  rate: e.target.value,
                                }));
                                setGeneralError(null);
                                clearFieldError('service_rate');
                              }}
                              placeholder="Enter rate"
                              className={`rounded-l-none h-12 text-base border-gray-300 ${
                                fieldErrors.service_rate ? 'border-red-500' : ''
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-base font-medium text-gray-700 mb-2">
                            Charge Type <span className="text-red-500">*</span>
                          </label>
                          <Select
                            value={serviceDraft.rate_type}
                            onValueChange={value => {
                              setServiceDraft(prev => ({
                                ...prev,
                                rate_type: value,
                              }));
                              setGeneralError(null);
                              clearFieldError('service_rate_type');
                            }}
                          >
                            <SelectTrigger
                              className={`h-12 text-base border-gray-300 ${
                                fieldErrors.service_rate_type
                                  ? 'border-red-500'
                                  : ''
                              }`}
                            >
                              <SelectValue placeholder="Select charge type" />
                            </SelectTrigger>
                            <SelectContent>
                              {RATE_TYPES.map(type => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="ghost"
                          className="flex-1"
                          onClick={() => {
                            if (services.length > 0) {
                              setShowServiceForm(false);
                            }
                            resetServiceDraft();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={saveService}
                          className="flex-1 bg-hanapp-accent text-gray-900 hover:bg-hanapp-accent"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {editingIndex !== null
                            ? 'Update Service'
                            : 'Add Service'}
                        </Button>
                      </div>
                    </div>
                  )}

                  {services.length > 0 && !showServiceForm && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowServiceForm(true);
                        resetServiceDraft();
                      }}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg py-8 hover:border-hanapp-accent hover:bg-yellow-50 transition-colors flex flex-col items-center justify-center space-y-2 text-gray-500 hover:text-gray-900"
                    >
                      <Plus size={32} />
                      <span className="text-lg font-medium">
                        Add another service
                      </span>
                    </button>
                  )}
                </>
              )}

              {currentStep === 3 && (
                <>
                  <h2 className="text-4xl font-medium text-black">
                    Review & Submit
                  </h2>
                  <p className="text-m text-gray-600 mb-6">
                    Review all information before posting your service listing
                  </p>

                  <div className="rounded-lg border border-gray-200 p-5 space-y-4">
                    <h3 className="text-2xl font-semibold text-black">
                      Request Summary
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-[190px_minmax(0,1fr)] gap-y-3 gap-x-4 text-sm md:text-base">
                      <div className="text-gray-500">Listing Title</div>
                      <div>{listingData.service_title || '-'}</div>
                      <div className="text-gray-500">Category</div>
                      <div>
                        {categories.find(
                          cat =>
                            cat.integerId.toString() === listingData.category
                        )?.name || '-'}
                      </div>
                      <div className="text-gray-500">Description</div>
                      <div>{listingData.description || '-'}</div>
                      <div className="text-gray-500">Accepted Areas</div>
                      <div>
                        {listingData.locations.length
                          ? listingData.locations.join(', ')
                          : '-'}
                      </div>
                      <div className="text-gray-500">Open Days</div>
                      <div>{openDaysCount}</div>
                      <div className="text-gray-500">Services Added</div>
                      <div>{services.length}</div>
                      <div className="text-gray-500">Images</div>
                      <div>{listingData.images.length} file(s)</div>
                    </div>

                    {listingData.images.length > 0 && (
                      <div>
                        <h4 className="text-base font-semibold text-gray-800 mb-2">
                          Uploaded Images
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
                          {listingData.images.map(url => (
                            <div
                              key={`summary-image-${url}`}
                              className="max-w-[9rem]"
                            >
                              <div
                                className="w-full aspect-square bg-gray-100 rounded-md overflow-hidden border border-gray-200 bg-center bg-cover"
                                style={{ backgroundImage: `url(${url})` }}
                              />
                              <p className="mt-1 text-xs text-slate-500 truncate">
                                {decodeURIComponent(
                                  url.split('/').pop()?.split('?')[0] || url
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-base font-semibold text-gray-800 mb-2">
                        Individual Services
                      </h4>
                      {services.length > 0 ? (
                        <div className="space-y-2">
                          {services.map((service, index) => (
                            <div
                              key={`${service.service_name}-${index}-summary`}
                              className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2"
                            >
                              <span className="text-sm text-gray-800">
                                {service.service_name}
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                ₱{service.rate.toLocaleString()}{' '}
                                {service.rate_type}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">
                          No services added
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      className="mt-1 border-hanapp-accent data-[state=checked]:bg-hanapp-accent"
                      checked={agreedToTerms}
                      onCheckedChange={checked => {
                        setAgreedToTerms(checked === true);
                        setGeneralError(null);
                        clearFieldError('terms');
                      }}
                    />
                    <div>
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-600 leading-relaxed"
                      >
                        By clicking Post, you agree to the{' '}
                        <a href="#" className="text-hanapp-accent underline">
                          Terms and Conditions
                        </a>{' '}
                        of Hanapp and confirm that all information provided is
                        true and legitimate
                      </label>
                      {fieldErrors.terms && (
                        <p className="text-xs text-red-600 mt-1">
                          {fieldErrors.terms}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={currentStep === 0 ? handleCancel : previousStep}
              className="gap-2 border border-hanapp-accent bg-white text-gray-900 hover:bg-yellow-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="px-6 bg-hanapp-accent text-gray-900 hover:bg-hanapp-accent transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-md"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handlePost}
                disabled={!agreedToTerms || isSubmitting}
                className="px-6 bg-hanapp-accent text-gray-900 hover:bg-hanapp-accent transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-md"
              >
                {isSubmitting ? 'Posting...' : 'Post Listing'}
              </Button>
            )}
          </div>

          <PostServiceSuccessDialog
            open={serviceDialogOpen}
            onOpenChange={open => {
              setServiceDialogOpen(open);
              if (!open && listingId) {
                router.push(`/jobs/${listingId}`);
              }
            }}
          />
        </div>
      </main>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 453px) {
          .mobile-scale {
            transform: scale(0.9);
            transform-origin: top center;
            width: 111.1111%;
            margin-left: -5.55555%;
          }
        }

        @media (max-width: 407px) {
          .mobile-scale {
            transform: scale(0.84);
            width: 119.0476%;
            margin-left: -9.5238%;
          }
        }

        @media (max-width: 380px) {
          .mobile-scale {
            transform: scale(0.65);
            width: 153.8462%;
            margin-left: -26.9231%;
          }
        }
      `}</style>
    </div>
  );
}
