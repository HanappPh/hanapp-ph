'use client';

import Image from 'next/image';

interface Category {
  name: string;
  image: string;
  alt: string;
}

interface CategoriesSectionProps {
  showAllCategories: boolean;
  setShowAllCategories: (show: boolean) => void;
  allCategories: Category[];
}

const CategoriesSection = ({
  showAllCategories,
  setShowAllCategories,
  allCategories,
}: CategoriesSectionProps) => {
  const categoriesToShow = showAllCategories
    ? allCategories
    : allCategories.slice(0, 8);

  return (
    <>
      <h2 className="mt-24 ml-16 text-left text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        Browse <span className="text-hanapp-accent">categories</span>
      </h2>
      {/* Browse Categories Section */}
      <section id="categories" className="pb-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center"></div>

          {/* Categories Grid with Toggle */}
          <div className="max-w-6xl mx-auto bg-[#f3f5f9] p-3 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* First 8 categories - always visible */}
              {categoriesToShow.slice(0, 8).map(category => (
                <div
                  key={category.name}
                  className="relative cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[7/5] relative">
                      <Image
                        src={category.image}
                        alt={category.alt}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-[#000000]/10 group-hover:opacity-0 transition-opacity duration-300"></div>
                      <div className="absolute">
                        <span className="bg-[#ffc13a]/60 text-white px-3 py-1 text-lg font-bold">
                          {category.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Additional categories - animated by row */}
              <div
                className={`col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-3 transition-all duration-1000 ease-in-out ${
                  showAllCategories
                    ? 'opacity-100 max-h-96 transform translate-y-0'
                    : 'opacity-0 max-h-0 transform -translate-y-8 overflow-hidden'
                }`}
                style={{
                  transitionDelay: showAllCategories ? '0ms' : '400ms',
                }}
              >
                {categoriesToShow.slice(8).map((category, index) => {
                  const rowIndex = Math.floor(index / 4); // Row 0 or Row 1
                  return (
                    <div
                      key={category.name}
                      className={`relative cursor-pointer group transition-all duration-800 ${
                        showAllCategories
                          ? 'opacity-100 transform translate-y-0 scale-100 ease-out'
                          : 'opacity-0 transform -translate-y-6 scale-90 ease-in'
                      }`}
                      style={{
                        transitionDelay: showAllCategories
                          ? `${600 + rowIndex * 400}ms` // Row 0: 600ms, Row 1: 1000ms
                          : `${(1 - rowIndex) * 200}ms`, // Row 1 disappears first, then Row 0
                      }}
                    >
                      <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-[7/5] relative">
                          <Image
                            src={category.image}
                            alt={category.alt}
                            fill
                            className="object-cover w-full h-full"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-[#000000]/10 group-hover:opacity-0 transition-opacity duration-300"></div>
                          <div className="absolute">
                            <span className="bg-[#ffc13a]/60 text-white px-3 py-1 text-lg font-bold">
                              {category.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Toggle Button with Lines - Instant Text Transition */}
            <div className="flex items-center justify-center mt-6 mb-2">
              <div className="flex-grow h-px bg-gray-300"></div>
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="mx-4 px-6 py-2 text-gray-600 hover:text-gray-800 hover:scale-105 transition-transform duration-200 font-medium transform group"
              >
                <span className="flex items-center gap-2">
                  {showAllCategories ? (
                    <>
                      Show Less
                      <svg
                        className="w-4 h-4 transform rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      View All
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </button>
              <div className="flex-grow h-px bg-gray-300 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesSection;
