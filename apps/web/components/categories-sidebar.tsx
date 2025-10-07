'use client';

import { Checkbox, Label } from '@hanapp-ph/commons';

interface CategoriesSidebarProps {
  categories: string[];
  selectedCategories: string[];
  categoryCounts: Record<string, number>;
  onToggleCategory: (category: string) => void;
  onClearFilters: () => void;
}

export function CategoriesSidebar({
  categories,
  selectedCategories,
  categoryCounts,
  onToggleCategory,
  onClearFilters,
}: CategoriesSidebarProps) {
  return (
    <aside className="w-72 flex-shrink-0 overflow-y-auto">
      <div className="p-6 border-r border-gray-200 h-full">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Filter by</h2>

        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-900">Category</h3>
          <div className="space-y-3">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-3">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => onToggleCategory(category)}
                  className="border-gray-300"
                />
                <Label
                  htmlFor={category}
                  className="text-sm font-normal cursor-pointer leading-none text-gray-900 flex-1"
                >
                  {category}{' '}
                  <span className="text-gray-500">
                    ({categoryCounts[category]})
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        {selectedCategories.length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:underline mt-6 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>
    </aside>
  );
}
