// Utility function to get category-based filler images
export function getCategoryFillerImage(category: string): string {
  const categoryImageMap: Record<string, string> = {
    Laundry: '/laundry-service.png',
    laundry: '/laundry-service.png',
    Transportation: '/delivery-rider-on-motorcycle.jpg',
    transportation: '/delivery-rider-on-motorcycle.jpg',
    Babysitting: '/nanny-with-child.jpg',
    babysitting: '/nanny-with-child.jpg',
    Errands: '/delivery-person-parcel.jpg',
    errands: '/delivery-person-parcel.jpg',
    'Pet Care': '/pet-grooming.png',
    'pet care': '/pet-grooming.png',
    Catering: '/catering-buffet-food-service.jpg',
    catering: '/catering-buffet-food-service.jpg',
    Construction: '/construction-worker-tools.jpg',
    construction: '/construction-worker-tools.jpg',
    Plumbing: '/plumber-fixing-drain.png',
    plumbing: '/plumber-fixing-drain.png',
    'Auto Repair': '/mechanic-repairing-car.jpg',
    'auto repair': '/mechanic-repairing-car.jpg',
    'Tech Support': '/phone-and-tablet-repair.png',
    'tech support': '/phone-and-tablet-repair.png',
    Gardening: '/landscaper-cutting-grass.jpg',
    gardening: '/landscaper-cutting-grass.jpg',
    Legal: '/notary-public-professional.jpg',
    legal: '/notary-public-professional.jpg',
    Painting: '/home-repair-tools.jpg',
    painting: '/home-repair-tools.jpg',
    'Home Services': '/handyman-repair.jpg',
    'home services': '/handyman-repair.jpg',
    Electrical: '/home-repair-tools.jpg',
    electrical: '/home-repair-tools.jpg',
    Moving: '/moving-truck-and-movers.jpg',
    moving: '/moving-truck-and-movers.jpg',
    'Professional Services': '/notary-public-professional.jpg',
    'professional services': '/notary-public-professional.jpg',
  };

  const normalizedCategory = category.toLowerCase().trim();
  return (
    categoryImageMap[normalizedCategory] ||
    categoryImageMap[category] ||
    '/placeholder.svg'
  );
}
