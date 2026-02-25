// Centralized category management
// Both service_requests and service_listings use integer category IDs (1-17)

export interface Category {
  integerId: number; // Integer ID (1-17)
  name: string;
  slug: string;
}

export const CATEGORIES: Category[] = [
  { integerId: 1, name: 'Laundry', slug: 'laundry' },
  { integerId: 2, name: 'Transportation', slug: 'transportation' },
  { integerId: 3, name: 'Babysitting', slug: 'babysitting' },
  { integerId: 4, name: 'Errands', slug: 'errands' },
  { integerId: 5, name: 'Pet Care', slug: 'pet-care' },
  { integerId: 6, name: 'Catering', slug: 'catering' },
  { integerId: 7, name: 'Construction', slug: 'construction' },
  { integerId: 8, name: 'Plumbing', slug: 'plumbing' },
  { integerId: 9, name: 'Auto Repair', slug: 'auto-repair' },
  { integerId: 10, name: 'Tech Support', slug: 'tech-support' },
  { integerId: 11, name: 'Gardening', slug: 'gardening' },
  { integerId: 12, name: 'Legal', slug: 'legal' },
  { integerId: 13, name: 'Painting', slug: 'painting' },
  { integerId: 14, name: 'Home Services', slug: 'home-services' },
  { integerId: 15, name: 'Electrical', slug: 'electrical' },
  { integerId: 16, name: 'Moving', slug: 'moving' },
  {
    integerId: 17,
    name: 'Professional Services',
    slug: 'professional-services',
  },
];

// Get category by integer ID
export const getCategoryByIntegerId = (
  integerId: number
): Category | undefined => {
  return CATEGORIES.find(cat => cat.integerId === integerId);
};

// Get category by name
export const getCategoryByName = (name: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.name.toLowerCase() === name.toLowerCase());
};

// Get category by slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.slug === slug);
};

// Get category name by integer ID
export const getCategoryName = (integerId: number): string => {
  const category = getCategoryByIntegerId(integerId);
  return category?.name || 'Other';
};

// Get all category names
export const getAllCategoryNames = (): string[] => {
  return CATEGORIES.map(cat => cat.name);
};

// Get all categories for dropdown/select
export const getAllCategories = (): Category[] => {
  return CATEGORIES;
};
