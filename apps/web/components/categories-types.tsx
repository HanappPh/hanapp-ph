export type Job = {
  id: string;
  title: string;
  category: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  categories: string[];
};

export type SortOption =
  | 'Location'
  | 'Price: Low to High'
  | 'Price: High to Low'
  | 'Rating: Low to High'
  | 'Rating: High to Low';
