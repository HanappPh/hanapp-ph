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
  Send,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';

import { FormStepper } from '../../../../components/request-job-listing/form-stepper';
import { ImageUploadSection } from '../../../../components/request-job-listing/request-media';
import {
  fetchLguOptions,
  type LguOption,
} from '../../../../lib/constants/lgus';
import { useAuth } from '../../../../lib/hooks/useAuth';

interface FormData {
  title: string;
  categoryId: string;
  description: string;
  additionalRequirements: string;
  rate: string;
  contact: string;
  jobLocation: string;
  jobDate: string;
  jobTimeStart: string;
  jobTimeEnd: string;
  images: string[];
}

type FieldErrors = Partial<Record<keyof FormData | 'terms', string>>;

const CATEGORY_OPTIONS = [
  { value: '1', label: 'Laundry' },
  { value: '2', label: 'Transportation' },
  { value: '3', label: 'Babysitting' },
  { value: '4', label: 'Errands' },
  { value: '5', label: 'Pet Care' },
  { value: '6', label: 'Catering' },
  { value: '7', label: 'Construction' },
  { value: '8', label: 'Plumbing' },
  { value: '9', label: 'Auto Repair' },
  { value: '10', label: 'Tech Support' },
  { value: '11', label: 'Gardening' },
  { value: '12', label: 'Legal' },
  { value: '13', label: 'Painting' },
  { value: '14', label: 'Home Services' },
  { value: '15', label: 'Electrical' },
  { value: '16', label: 'Moving' },
  { value: '17', label: 'Professional Services' },
];

const PREFERRED_TIME_RANGE_ERROR =
  'Preferred time range must stay within the same day. Start time must be earlier than end time.';

const stepOneSchema = z.object({
  title: z.string().trim().min(1, 'Job title is required'),
  categoryId: z
    .string()
    .trim()
    .min(1, 'Category is required')
    .refine(value => CATEGORY_OPTIONS.some(option => option.value === value), {
      message: 'Please select a valid category',
    }),
  description: z.string().trim().min(1, 'Job description is required'),
  additionalRequirements: z.string(),
  images: z.array(z.string()),
});

const stepTwoSchema = z
  .object({
    jobLocation: z.string().trim().min(1, 'Job location is required'),
    contact: z
      .string()
      .trim()
      .regex(/^\+63\d{7,12}$/, 'Please enter a valid contact number'),
    jobDate: z.string(),
    jobTimeStart: z.string(),
    jobTimeEnd: z.string(),
    rate: z
      .string()
      .trim()
      .min(1, 'Proposed budget is required')
      .refine(value => Number(value) > 0, {
        message: 'Proposed budget must be greater than 0',
      }),
  })
  .superRefine((data, ctx) => {
    if (
      data.jobTimeStart &&
      data.jobTimeEnd &&
      data.jobTimeStart >= data.jobTimeEnd
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['jobTimeStart'],
        message: PREFERRED_TIME_RANGE_ERROR,
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['jobTimeEnd'],
        message: PREFERRED_TIME_RANGE_ERROR,
      });
    }
  });

const submitSchema = stepOneSchema.merge(stepTwoSchema);

export default function RequestServicePage() {
  const router = useRouter();
  const { user } = useAuth();
  const topRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [lguOptions, setLguOptions] = useState<LguOption[]>([]);
  const [isLoadingLgus, setIsLoadingLgus] = useState(false);
  const [jobLocationQuery, setJobLocationQuery] = useState('');
  const [showJobLocationOptions, setShowJobLocationOptions] = useState(false);

  const steps = [
    { label: 'Job Details', icon: ClipboardList },
    { label: 'Schedule & Budget', icon: CalendarClock },
    { label: 'Review & Submit', icon: Send },
  ];

  const [formData, setFormData] = useState<FormData>({
    title: '',
    categoryId: '',
    description: '',
    additionalRequirements: '',
    rate: '',
    contact: '',
    jobLocation: '',
    jobDate: '',
    jobTimeStart: '',
    jobTimeEnd: '',
    images: [],
  });

  const selectedCategory =
    CATEGORY_OPTIONS.find(option => option.value === formData.categoryId)
      ?.label || '-';

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setGeneralError(null);
    setFieldErrors(prev => {
      if (!prev[field as keyof FieldErrors]) {
        return prev;
      }

      const next = { ...prev };
      delete next[field as keyof FieldErrors];
      return next;
    });
  };

  const mapIssuesToFieldErrors = (issues: z.ZodIssue[]): FieldErrors => {
    const nextErrors: FieldErrors = {};

    for (const issue of issues) {
      const path = issue.path[0];
      if (typeof path === 'string' && !nextErrors[path as keyof FormData]) {
        nextErrors[path as keyof FormData] = issue.message;
      }
    }

    return nextErrors;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

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

  useEffect(() => {
    setJobLocationQuery(formData.jobLocation);
  }, [formData.jobLocation]);

  const filteredJobLocationOptions = useMemo(() => {
    const query = jobLocationQuery.trim().toLowerCase();
    if (!query) {
      return [] as LguOption[];
    }

    return lguOptions
      .filter(option => option.searchText.includes(query))
      .slice(0, 12);
  }, [jobLocationQuery, lguOptions]);

  const handleSelectJobLocation = (option: LguOption) => {
    updateFormData('jobLocation', option.name);
    setJobLocationQuery(option.name);
    setShowJobLocationOptions(false);
  };

  const validateCurrentStep = (step: number) => {
    const result =
      step === 0
        ? stepOneSchema.safeParse(formData)
        : stepTwoSchema.safeParse(formData);

    if (!result.success) {
      const nextFieldErrors = mapIssuesToFieldErrors(result.error.issues);
      const hasTimeRangeError = result.error.issues.some(
        issue => issue.message === PREFERRED_TIME_RANGE_ERROR
      );

      setFieldErrors(nextFieldErrors);
      setGeneralError(
        hasTimeRangeError
          ? PREFERRED_TIME_RANGE_ERROR
          : 'Please fill in all required fields.'
      );
      return false;
    }

    setFieldErrors({});
    setGeneralError(null);
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep(currentStep)) {
      return;
    }

    setAgreedToTerms(false);
    setFieldErrors({});
    setDirection('next');
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const previousStep = () => {
    setGeneralError(null);
    setAgreedToTerms(false);
    setFieldErrors({});
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setGeneralError(null);
    setFieldErrors({});

    try {
      const validation = submitSchema.safeParse(formData);
      if (!validation.success) {
        const nextFieldErrors = mapIssuesToFieldErrors(validation.error.issues);
        const hasTimeRangeError = validation.error.issues.some(
          issue => issue.message === PREFERRED_TIME_RANGE_ERROR
        );

        setFieldErrors(nextFieldErrors);
        setGeneralError(
          hasTimeRangeError
            ? PREFERRED_TIME_RANGE_ERROR
            : 'Please fill in all required fields.'
        );
        setIsSubmitting(false);
        return;
      }

      if (!agreedToTerms) {
        setFieldErrors({
          terms: 'You must agree to the terms before submitting',
        });
        setGeneralError('Please fill in all required fields.');
        setIsSubmitting(false);
        return;
      }

      if (!user?.id) {
        throw new Error('You must be logged in to create a service request');
      }

      const {
        data: { session },
      } = await (
        await import('../../../../lib/supabase/client')
      ).supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error('No valid session found');
      }

      const port = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${port}/api/service-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          clientId: user.id,
          categoryId: Number(formData.categoryId),
          title: formData.title,
          description: formData.description,
          additional_requirements: formData.additionalRequirements,
          rate: Number(formData.rate),
          contact: formData.contact,
          jobLocation: formData.jobLocation,
          jobDate: formData.jobDate,
          jobTime: formData.jobTimeStart,
          jobTime2: formData.jobTimeEnd,
          images: formData.images,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message
          ? Array.isArray(errorData.message)
            ? errorData.message.join(', ')
            : errorData.message
          : `Failed to create service request: ${response.status}`;

        throw new Error(errorMessage);
      }

      router.push('/bookings?refresh=true');
    } catch (err) {
      setGeneralError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedTimeRange =
    formData.jobTimeStart || formData.jobTimeEnd
      ? `${formData.jobTimeStart || '--:--'} - ${formData.jobTimeEnd || '--:--'}`
      : '-';

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-6 py-12 mobile-scale">
        <div ref={topRef} className="bg-white rounded-lg shadow-sm p-8 md:p-10">
          <div className="text-center">
            <h1
              className="text-6xl font-bold mb-1"
              style={{
                background: 'linear-gradient(to right, #102E50, #2469B6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Request A Service
            </h1>
            <p className="text-lg text-gray-500 mt-3">
              Describe what you need and get matched with providers
            </p>
          </div>

          <div className="mt-8">
            <FormStepper steps={steps} currentStep={currentStep} />
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
                  <h2
                    className="text-4xl font-medium"
                    style={{
                      background:
                        'linear-gradient(to right, #1b4779ff, #2469B6)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Job Details
                  </h2>
                  <p className="text-m text-gray-600 mb-6">
                    Job information, service type, and reference images
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="md:col-span-3">
                      <label className="block text-base font-medium text-gray-700 mb-3">
                        Job Title <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="e.g. Tutor for Integral Calculus"
                        className={`w-full h-12 font-light text-base border-gray-300 ${
                          fieldErrors.title ? 'border-red-500' : ''
                        }`}
                        value={formData.title}
                        onChange={e => updateFormData('title', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-base font-medium text-gray-700 mb-3">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.categoryId}
                        onValueChange={value =>
                          updateFormData('categoryId', value)
                        }
                      >
                        <SelectTrigger
                          className={`h-12 font-light text-base border-gray-300 ${
                            fieldErrors.categoryId ? 'border-red-500' : ''
                          }`}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORY_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
                    <div className="md:col-span-3">
                      <label className="block text-base font-medium text-gray-700 mb-3">
                        Job Description <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        placeholder="Describe the service you need in detail"
                        className={`min-h-[110px] font-light resize-none text-base border-gray-300 ${
                          fieldErrors.description ? 'border-red-500' : ''
                        }`}
                        value={formData.description}
                        onChange={e =>
                          updateFormData('description', e.target.value)
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-base font-medium text-gray-700 mb-3">
                        Additional Requirements
                      </label>
                      <Textarea
                        placeholder="Describe any additional requirements"
                        className="min-h-[110px] font-light resize-none text-base border-gray-300"
                        value={formData.additionalRequirements}
                        onChange={e =>
                          updateFormData(
                            'additionalRequirements',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-base font-medium text-gray-700 mb-3">
                      Reference Images
                    </label>
                    <ImageUploadSection
                      formData={formData}
                      updateFormData={updateFormData}
                      embedded
                      compact
                    />
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <h2
                    className="text-4xl font-medium"
                    style={{
                      background:
                        'linear-gradient(to right, #1b4779ff, #2469B6)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Schedule & Budget
                  </h2>
                  <p className="text-m text-gray-600 mb-6">
                    Set your location, contact details, preferred schedule, and
                    budget
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Job Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          className={`w-full h-12 font-light text-base border-gray-300 ${
                            fieldErrors.jobLocation ? 'border-red-500' : ''
                          }`}
                          value={jobLocationQuery}
                          placeholder="Search city or municipality"
                          onFocus={() => setShowJobLocationOptions(true)}
                          onBlur={() => {
                            window.setTimeout(() => {
                              setShowJobLocationOptions(false);
                            }, 120);
                          }}
                          onChange={e => {
                            setJobLocationQuery(e.target.value);
                            setShowJobLocationOptions(true);
                            setGeneralError(null);
                          }}
                          onKeyDown={e => {
                            if (
                              e.key === 'Enter' &&
                              filteredJobLocationOptions.length > 0
                            ) {
                              e.preventDefault();
                              handleSelectJobLocation(
                                filteredJobLocationOptions[0]
                              );
                            }
                          }}
                        />

                        {showJobLocationOptions && jobLocationQuery.trim() && (
                          <div className="absolute z-30 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
                            {isLoadingLgus ? (
                              <div className="px-3 py-2 text-sm text-gray-500">
                                Loading locations...
                              </div>
                            ) : filteredJobLocationOptions.length > 0 ? (
                              filteredJobLocationOptions.map(option => (
                                <button
                                  key={option.psgcCode}
                                  type="button"
                                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between"
                                  onMouseDown={e => {
                                    e.preventDefault();
                                    handleSelectJobLocation(option);
                                  }}
                                >
                                  <span>{option.name}</span>
                                  {formData.jobLocation === option.name && (
                                    <Check className="w-4 h-4 text-hanapp-primary" />
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
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Contact No. <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <span
                          className={`inline-flex items-center px-3 rounded-l-md border border-r-0 text-gray-500 text-sm ${
                            fieldErrors.contact
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        >
                          +63
                        </span>
                        <Input
                          placeholder="*** *** ****"
                          className={`rounded-l-none h-12 font-light text-base border-gray-300 ${
                            fieldErrors.contact ? 'border-red-500' : ''
                          }`}
                          value={formData.contact.replace('+63', '')}
                          onChange={e =>
                            updateFormData('contact', `+63${e.target.value}`)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <Input
                        type="date"
                        className="w-full h-12 font-light text-base border-gray-300"
                        value={formData.jobDate}
                        onChange={e =>
                          updateFormData('jobDate', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Preferred Time Range
                      </label>
                      <div className="flex gap-2 items-center">
                        <Input
                          type="time"
                          className={`w-full h-12 font-light text-base border-gray-300 ${
                            fieldErrors.jobTimeStart ? 'border-red-500' : ''
                          }`}
                          value={formData.jobTimeStart}
                          onChange={e =>
                            updateFormData('jobTimeStart', e.target.value)
                          }
                        />
                        <span className="text-gray-500 flex-shrink-0">-</span>
                        <Input
                          type="time"
                          className={`w-full h-12 font-light text-base border-gray-300 ${
                            fieldErrors.jobTimeEnd ? 'border-red-500' : ''
                          }`}
                          value={formData.jobTimeEnd}
                          onChange={e =>
                            updateFormData('jobTimeEnd', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-3">
                        Proposed Budget <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <span
                          className={`inline-flex items-center px-3 rounded-l-md border border-r-0 text-gray-500 text-sm ${
                            fieldErrors.rate
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        >
                          ₱
                        </span>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Enter amount"
                          className={`w-full rounded-l-none h-12 font-light text-base border-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                            fieldErrors.rate ? 'border-red-500' : ''
                          }`}
                          value={formData.rate}
                          onChange={e => updateFormData('rate', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="hidden md:block" />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h2
                    className="text-4xl font-medium"
                    style={{
                      background:
                        'linear-gradient(to right, #1b4779ff, #2469B6)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Submit Request
                  </h2>
                  <p className="text-m text-gray-600 mb-6">
                    Review all information before posting your request
                  </p>

                  <div className="rounded-lg border border-gray-200 p-4 space-y-4">
                    <h3 className="text-2xl font-semibold text-black">
                      Request Summary
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-[170px_minmax(0,1fr)] gap-y-3 gap-x-4 text-sm md:text-base">
                      <div className="text-gray-500">Title</div>
                      <div>{formData.title || '-'}</div>
                      <div className="text-gray-500">Description</div>
                      <div>{formData.description || '-'}</div>
                      <div className="text-gray-500">Category</div>
                      <div>{selectedCategory}</div>
                      <div className="text-gray-500">
                        Additional Requirements
                      </div>
                      <div>{formData.additionalRequirements || '-'}</div>
                      <div className="text-gray-500">Job Location</div>
                      <div>{formData.jobLocation || '-'}</div>
                      <div className="text-gray-500">Contact</div>
                      <div>{formData.contact || '-'}</div>
                      <div className="text-gray-500">Preferred Date</div>
                      <div>{formData.jobDate || '-'}</div>
                      <div className="text-gray-500">Preferred Time Range</div>
                      <div>{formattedTimeRange}</div>
                      <div className="text-gray-500">Proposed Budget</div>
                      <div>{formData.rate ? `₱${formData.rate}` : '-'}</div>
                      <div className="text-gray-500">Images</div>
                      <div>{formData.images.length} file(s)</div>
                    </div>

                    {formData.images.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">
                          Uploaded Images
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
                          {formData.images.map(url => (
                            <div key={`thumb-${url}`} className="max-w-[9rem]">
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
                  </div>

                  <div className="mt-6 flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      className="mt-1"
                      checked={agreedToTerms}
                      onCheckedChange={checked => {
                        setAgreedToTerms(checked === true);
                        setGeneralError(null);
                        setFieldErrors(prev => {
                          if (!prev.terms) {
                            return prev;
                          }

                          const next = { ...prev };
                          delete next.terms;
                          return next;
                        });
                      }}
                    />
                    <div>
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-600 leading-relaxed"
                      >
                        By clicking Post, you agree to the{' '}
                        <a href="#" className="text-blue-600 underline">
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
              disabled={isSubmitting}
              className="gap-2 border border-hanapp-primary bg-white text-hanapp-primary hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="text-white px-6 bg-hanapp-primary hover:bg-hanapp-primary transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-md"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !agreedToTerms}
                className="text-white px-6 bg-hanapp-primary hover:bg-hanapp-primary transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-md"
              >
                {isSubmitting ? 'Posting...' : 'Post Request'}
              </Button>
            )}
          </div>
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

        @media (max-width: 455px) {
          .mobile-scale {
            transform: scale(0.9);
            transform-origin: top center;
            width: 110%;
            margin-left: -5%;
          }
        }

        @media (max-width: 410px) {
          .mobile-scale {
            transform: scale(0.78);
            width: 120%;
            margin-left: -10%;
          }
        }

        @media (max-width: 380px) {
          .mobile-scale {
            transform: scale(0.65);
            width: 150%;
            margin-left: -25%;
          }
        }
      `}</style>
    </div>
  );
}
