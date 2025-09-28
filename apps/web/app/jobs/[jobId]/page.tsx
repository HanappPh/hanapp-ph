'use client';
import { JobIdBg } from '../../../components/jobid-bg';
import { Navigation } from '../../../components/jobid-navigation';
import { ReviewsSection } from '../../../components/jobid-review-section';
import { ServiceHeader } from '../../../components/jobid-service-header';
import { ServicesSection } from '../../../components/jobid-service-section';

export default function Home() {
  // Sample data for the professionally refactored components
  const serviceHeaderData = {
    title: 'AC Specialist',
    rating: 4.8,
    totalReviews: 128,
    responseTime: 'Usually responds within 2 hours',
    location: 'Tanza, Cavite',
    isOwnerView: false,
  };

  const services = [
    {
      id: '1',
      title: '1-2 HP Split/Window AC Deep Clean',
      price: '₱899',
      description:
        'Full dismantle, chemical cleaning, fin & blower wash, drain flush.',
      features: [
        'Includes basic check-up & recommendations',
        'Free filter wash; minor leaks report',
      ],
      isActive: true,
    },
    {
      id: '2',
      title: 'Window-Type Quick Clean',
      price: '₱499',
      description:
        'Front cover removal, filter & coil surface clean, drain check.',
      features: ['Budget-friendly maintenance', 'Ideal between deep cleans'],
      isActive: true,
    },
    {
      id: '3',
      title: 'AC Installation (Split/Window)',
      price: 'From ₱2,500',
      description:
        'Standard install. Brackets, copper tubing, and electricals billed as needed.',
      features: [
        'Includes vacuum, pressure test, commissioning',
        'Wall drilling and sealing',
      ],
      note: 'Site check required',
      isActive: true,
    },
    {
      id: '4',
      title: 'Freon Top-up (R32/R410a)',
      price: 'By Assessment',
      description: 'Leak test not included. Charged per gram after assessment.',
      features: [
        'Pressure & performance check',
        'Warranty depends on leak status',
      ],
      note: 'Add-on service',
      isActive: true,
    },
  ];

  const expectations = [
    'Technicians bring basic tools & cleaning solutions',
    'Protective covers used to keep your space clean',
    'Before/After photo sent upon request',
    "Parking fees, condo permits are customer's responsibility",
    'Additional materials quoted on-site for installs',
    'Service warranty: 7 days for workmanship issues',
  ];

  const reviews = [
    {
      id: '1',
      name: 'Carla D.',
      rating: 5,
      comment: 'Super linis ng gawa. Mabait at maayos kausap. Recommended!',
      date: '2 days ago',
      isEditable: false,
    },
    {
      id: '2',
      name: 'Jonas R.',
      rating: 5,
      comment: 'On time, mabilis, at maingat sa gamit. Hinga na ulit ang AC!',
      date: '1 week ago',
      isEditable: false,
    },
    {
      id: '3',
      name: 'Maria S.',
      rating: 4,
      comment:
        'Very professional and thorough. AC is working like new again. Will book again next time!',
      date: '3 days ago',
      isEditable: false,
    },
    {
      id: '4',
      name: 'John L.',
      rating: 5,
      comment: 'Life is often described as a journey',
      date: '5 days ago',
      isEditable: false,
    },
    {
      id: '5',
      name: 'Lisa T.',
      rating: 4,
      comment: 'Good work and fair pricing. AC is much cooler now. Thank you!',
      date: '1 week ago',
      isEditable: false,
    },
    {
      id: '6',
      name: 'Mark P.',
      rating: 5,
      comment:
        'Amazing service! Very detailed cleaning and the technician explained everything clearly.',
      date: '4 days ago',
      isEditable: false,
    },
    {
      id: '7',
      name: 'Anna C.',
      rating: 5,
      comment:
        'Fast, reliable, and affordable. My AC feels brand new! Will definitely use this service again.',
      date: '6 days ago',
      isEditable: false,
    },
    {
      id: '8',
      name: 'Roberto M.',
      rating: 4,
      comment:
        'Professional work and clean up after service. Good value for money.',
      date: '1 week ago',
      isEditable: false,
    },
    {
      id: '9',
      name: 'Grace F.',
      rating: 5,
      comment:
        'Superb cleaning service! Very thorough and the AC is working perfectly now.',
      date: '3 days ago',
      isEditable: false,
    },
    {
      id: '10',
      name: 'David K.',
      rating: 4,
      comment:
        'Great service and very friendly technician. AC maintenance was done efficiently.',
      date: '2 days ago',
      isEditable: false,
    },
    {
      id: '11',
      name: 'Sarah W.',
      rating: 5,
      comment:
        'Outstanding work! Very detailed and professional. Highly satisfied with the service.',
      date: '1 week ago',
      isEditable: false,
    },
    {
      id: '12',
      name: 'Miguel A.',
      rating: 5,
      comment:
        'Excellent AC cleaning service! Very thorough and my unit is running much better now.',
      date: '5 days ago',
      isEditable: false,
    },
    {
      id: '13',
      name: 'Ella V.',
      rating: 5,
      comment: 'Quick response and very professional. Highly recommended!',
      date: '2 days ago',
      isEditable: false,
    },
    {
      id: '14',
      name: 'Paul G.',
      rating: 4,
      comment: 'Good service, technician was polite and efficient.',
      date: '3 days ago',
      isEditable: false,
    },
    {
      id: '15',
      name: 'Nina S.',
      rating: 5,
      comment: 'AC is working perfectly after the cleaning. Will book again!',
      date: '1 day ago',
      isEditable: false,
    },
    {
      id: '16',
      name: 'Leo M.',
      rating: 4,
      comment: 'Technician arrived on time and did a thorough job.',
      date: '4 days ago',
      isEditable: false,
    },
    {
      id: '17',
      name: 'Jessa T.',
      rating: 5,
      comment: 'Very satisfied with the service. Friendly staff!',
      date: '2 days ago',
      isEditable: false,
    },
    {
      id: '18',
      name: 'Rico D.',
      rating: 5,
      comment: 'Excellent job! My AC is now running smoothly.',
      date: '3 days ago',
      isEditable: false,
    },
  ];

  const sidebarData = {
    pricing: {
      startingPrice: '499',
      currency: '₱',
    },
    availability: {
      schedule: 'Mon–Sun, 9:00 AM – 7:00 PM',
      notes: 'Same-day slots subject to confirmation.',
    },
    serviceAreas: [
      { id: '1', name: 'Tanza' },
      { id: '2', name: 'GenTri' },
      { id: '3', name: 'Imus' },
      { id: '4', name: 'Bacoor' },
    ],
    safetyFeatures: [
      { id: '1', text: 'Verified provider (ID + Face)', verified: true },
      { id: '2', text: 'Jobs are GPS-tagged', verified: true },
      { id: '3', text: 'Report issues anytime', verified: true },
    ],
    faqs: [
      {
        id: '1',
        question: 'Do I need to provide water and power?',
        answer: "Yes, please ensure there's a nearby faucet and outlet.",
      },
      {
        id: '2',
        question: 'Is chemical cleaning safe?',
        answer: 'We use AC-safe solutions and rinse thoroughly.',
      },
    ],
  };

  return (
    <JobIdBg>
      <div className="min-h-screen w-full overflow-x-hidden">
        <Navigation />
        <ServiceHeader {...serviceHeaderData} />
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <ServicesSection
            services={services}
            expectations={expectations}
            sidebarData={sidebarData}
          />
          <div className="w-full mt-8 sm:mt-10 lg:mt-12">
            <ReviewsSection reviews={reviews} />
          </div>
        </div>
      </div>
    </JobIdBg>
  );
}
