'use client';

export function CategoriesHeader() {
  return (
    <header className="bg-white py-4 sm:py-6 lg:py-8 border-b flex-shrink-0">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-balance mb-1 sm:mb-2 text-gray-900">
          Service Marketplace
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Find trusted professionals for any job
        </p>
      </div>
    </header>
  );
}
