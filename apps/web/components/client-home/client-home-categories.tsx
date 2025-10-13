import { Button } from '@hanapp-ph/commons';
import {
  Sparkles,
  User,
  Wrench,
  Car,
  Heart,
  Calendar,
  ShoppingBag,
  Briefcase,
  Truck,
  TreePine,
  WashingMachine,
  Scale,
  LucideIcon,
} from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface ClientHomeCategoriesProps {
  categories?: Category[];
  onCategoryClick?: (categoryId: string) => void;
  onPostAll?: () => void;
}

const defaultCategories: Category[] = [
  { id: 'cleaning', name: 'Cleaning', icon: Sparkles },
  { id: 'tutor', name: 'Tutor', icon: User },
  { id: 'repairs', name: 'Repairs', icon: Wrench },
  { id: 'transport', name: 'Transport', icon: Truck },
  { id: 'errands', name: 'Errands', icon: ShoppingBag },
  { id: 'babysitting', name: 'Babysitting', icon: Heart },
  { id: 'gardening', name: 'Gardening', icon: TreePine },
  { id: 'catering', name: 'Catering', icon: Calendar },
  { id: 'events', name: 'Events', icon: Briefcase },
  { id: 'auto-repair', name: 'Auto repair', icon: Car },
  { id: 'tech-support', name: 'Tech Support', icon: Wrench },
  { id: 'laundry', name: 'Laundry', icon: WashingMachine },
  { id: 'health', name: 'Health', icon: Heart },
  { id: 'personal', name: 'Personal', icon: User },
  { id: 'plumbing', name: 'Plumbing', icon: Wrench },
  { id: 'legal', name: 'Legal', icon: Scale },
];

export function ClientHomeCategories({
  categories = defaultCategories,
  onCategoryClick,
  onPostAll,
}: ClientHomeCategoriesProps) {
  return (
    <section className="container mx-auto px-4 py-6 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
        <Button
          variant="outline"
          size="sm"
          className="bg-yellow-400 hover:bg-yellow-500 border-none text-gray-800 font-semibold"
          onClick={onPostAll}
        >
          + Post to All
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryClick?.(category.id)}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <Icon className="w-8 h-8 text-gray-700 mb-2" />
              <span className="text-xs text-gray-700 text-center">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
