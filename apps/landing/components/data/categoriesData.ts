export interface Category {
  name: string;
  image: string;
  alt: string;
}

export const allCategories: Category[] = [
  { name: 'Cleaning', image: '/landing-clean.png', alt: 'Cleaning Services' },
  { name: 'Tutor', image: '/cat-tutor.jpg', alt: 'Tutoring Services' },
  { name: 'Errand', image: '/cat-errand.jpg', alt: 'Errand Services' },
  {
    name: 'Babysitting',
    image: '/cat-babysit.jpg',
    alt: 'Babysitting Services',
  },
  { name: 'Catering', image: '/cat-cater.jpg', alt: 'Catering Services' },
  { name: 'Events', image: '/cat-event.jpg', alt: 'Event Services' },
  { name: 'Health', image: '/cat-health.jpg', alt: 'Health Services' },
  { name: 'Personal', image: '/cat-personal.jpg', alt: 'Personal Services' },
  { name: 'Repairs', image: '/cat-repair.jpg', alt: 'Repair Services' },
  {
    name: 'Transport',
    image: '/landing-delivery.jpg',
    alt: 'Transport Services',
  },
  {
    name: 'Auto Repair',
    image: '/cat-auto.jpg',
    alt: 'Auto Repair Services',
  },
  { name: 'Gardening', image: '/cat-garden.jpg', alt: 'Gardening Services' },
  {
    name: 'Tech Support',
    image: '/cat-tech.jpg',
    alt: 'Tech Support Services',
  },
  { name: 'Laundry', image: '/landing-laundry.jpg', alt: 'Laundry Services' },
  { name: 'Plumbing', image: '/cat-plumbing.jpg', alt: 'Plumbing Services' },
  { name: 'Legal', image: '/cat-legal.jpg', alt: 'Legal Services' },
];
