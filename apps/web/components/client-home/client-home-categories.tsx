'use client';

import { Button } from '@hanapp-ph/commons';
import {
  Wrench,
  Car,
  Heart,
  Calendar,
  ShoppingBag,
  Truck,
  TreePine,
  WashingMachine,
  Scale,
  Paintbrush,
  Home,
  Zap,
  Package,
  type LucideIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useRef, useState } from 'react';

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
  { id: 'laundry', name: 'Laundry', icon: WashingMachine },
  { id: 'transportation', name: 'Transportation', icon: Truck },
  { id: 'babysitting', name: 'Babysitting', icon: Heart },
  { id: 'errands', name: 'Errands', icon: ShoppingBag },
  { id: 'pet-care', name: 'Pet Care', icon: Heart },
  { id: 'catering', name: 'Catering', icon: Calendar },
  { id: 'construction', name: 'Construction', icon: Wrench },
  { id: 'plumbing', name: 'Plumbing', icon: Wrench },
  { id: 'auto-repair', name: 'Auto Repair', icon: Car },
  { id: 'tech-support', name: 'Tech Support', icon: Wrench },
  { id: 'gardening', name: 'Gardening', icon: TreePine },
  { id: 'legal', name: 'Legal', icon: Scale },
  { id: 'painting', name: 'Painting', icon: Paintbrush },
  { id: 'home-services', name: 'Home Services', icon: Home },
  { id: 'electrical', name: 'Electrical', icon: Zap },
  { id: 'moving', name: 'Moving', icon: Package },
];

export function ClientHomeCategories({
  categories = defaultCategories,
  onCategoryClick,
  onPostAll,
}: ClientHomeCategoriesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // 16 categories total, display 8 per page (4 columns x 2 rows)
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const scroll = (direction: 'left' | 'right') => {
    const newPage =
      direction === 'left'
        ? Math.max(0, currentPage - 1)
        : Math.min(totalPages - 1, currentPage + 1);

    setCurrentPage(newPage);

    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: newPage * containerWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedId(categoryId);
    onCategoryClick?.(categoryId);
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
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

      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="flex-shrink-0 p-2 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Carousel Container - Two Rows, 4 Columns per Page */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-hidden"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex snap-x snap-mandatory">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="w-full flex-shrink-0 snap-start grid grid-cols-4 grid-rows-2 gap-2"
              >
                {categories
                  .slice(
                    pageIndex * ITEMS_PER_PAGE,
                    (pageIndex + 1) * ITEMS_PER_PAGE
                  )
                  .map(category => {
                    const Icon = category.icon;
                    const isSelected = selectedId === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all ${
                          isSelected
                            ? 'bg-white border-3 border-gray-800 shadow-md'
                            : 'bg-blue-100 border-3 border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-center w-14 h-14 bg-white rounded-full mb-2">
                          <Icon className="w-7 h-7 text-gray-700" />
                        </div>
                        <span className="text-xs font-medium text-gray-800 text-center leading-tight">
                          {category.name}
                        </span>
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="flex-shrink-0 p-2 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentPage(index);
              if (scrollContainerRef.current) {
                const containerWidth = scrollContainerRef.current.clientWidth;
                scrollContainerRef.current.scrollTo({
                  left: index * containerWidth,
                  behavior: 'smooth',
                });
              }
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentPage === index ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
