export interface JobData {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  status: string;
  description: string;
  detailedDescription: string;
  services: string[];
  experience: string;
  responseTime: string;
  warranty: string;
}

export const jobsData: JobData[] = [
  {
    id: 1,
    title: 'Plumbing Services',
    subtitle: 'Emergency repairs • Installation',
    price: 'Starting ₱500/hour',
    status: 'Available',
    description: 'Professional plumbers for all your water and pipe needs.',
    detailedDescription:
      'Our certified plumbers provide comprehensive plumbing services including emergency repairs, pipe installation, leak detection, and water heater maintenance. Available 24/7 for urgent repairs.',
    services: [
      'Emergency leak repairs',
      'Pipe installation & replacement',
      'Water heater services',
      'Drain cleaning',
      'Bathroom & kitchen plumbing',
    ],
    experience: '5+ years average experience',
    responseTime: 'Within 2 hours',
    warranty: '6-month service warranty',
  },
  {
    id: 2,
    title: 'Electrical Work',
    subtitle: 'Wiring • Fixtures • Repairs',
    price: 'Starting ₱600/hour',
    status: 'Available',
    description:
      'Licensed electricians for safe and reliable electrical services.',
    detailedDescription:
      'Licensed electrical professionals providing safe and code-compliant electrical work for residential and commercial properties. All work comes with safety certification.',
    services: [
      'Electrical wiring & rewiring',
      'Light fixture installation',
      'Circuit breaker repair',
      'Outlet installation',
      'Electrical safety inspections',
    ],
    experience: '7+ years average experience',
    responseTime: 'Same day service',
    warranty: '1-year electrical work warranty',
  },
  {
    id: 3,
    title: 'House Cleaning',
    subtitle: 'Deep clean • Regular maintenance',
    price: 'Starting ₱300/hour',
    status: 'Available',
    description: 'Professional cleaning services for your home or office.',
    detailedDescription:
      'Thorough and reliable cleaning services using eco-friendly products. Our trained professionals ensure your space is spotless and sanitized.',
    services: [
      'Deep house cleaning',
      'Regular maintenance cleaning',
      'Move-in/move-out cleaning',
      'Office cleaning',
      'Post-construction cleanup',
    ],
    experience: '3+ years average experience',
    responseTime: 'Next day booking',
    warranty: 'Satisfaction guarantee',
  },
  {
    id: 4,
    title: 'Aircon Services',
    subtitle: 'Cleaning • Repair • Installation',
    price: 'Starting ₱800/service',
    status: 'Available',
    description:
      'Keep your AC running efficiently with our expert technicians.',
    detailedDescription:
      'Specialized air conditioning services to keep your units running efficiently. Our technicians are trained on all major AC brands and models.',
    services: [
      'AC cleaning & maintenance',
      'AC repair & diagnostics',
      'New AC installation',
      'Freon refilling',
      'Filter replacement',
    ],
    experience: '6+ years average experience',
    responseTime: 'Within 4 hours',
    warranty: '3-month service warranty',
  },
  {
    id: 5,
    title: 'Carpentry',
    subtitle: 'Furniture • Repairs • Custom work',
    price: 'Starting ₱700/hour',
    status: 'Available',
    description:
      'Skilled carpenters for all your woodwork and furniture needs.',
    detailedDescription:
      'Expert carpentry services for custom furniture, repairs, and woodwork projects. We work with various wood types and can match existing finishes.',
    services: [
      'Custom furniture building',
      'Furniture repair & restoration',
      'Cabinet installation',
      'Door & window installation',
      'Wooden flooring',
    ],
    experience: '8+ years average experience',
    responseTime: '2-3 day scheduling',
    warranty: '2-year craftsmanship warranty',
  },
  {
    id: 6,
    title: 'Painting Services',
    subtitle: 'Interior • Exterior • Touch-ups',
    price: 'Starting ₱400/hour',
    status: 'Available',
    description: 'Professional painters to refresh and protect your property.',
    detailedDescription:
      'Professional painting services using premium paints and materials. Our painters ensure clean, even coverage and proper surface preparation.',
    services: [
      'Interior house painting',
      'Exterior wall painting',
      'Ceiling painting',
      'Touch-up work',
      'Color consultation',
    ],
    experience: '4+ years average experience',
    responseTime: 'Next day consultation',
    warranty: '1-year paint warranty',
  },
];
