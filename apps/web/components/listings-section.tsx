'use client';
import { Card, CardContent, Badge, Button } from '@hanapp-ph/commons';
import { Star, MapPin, Edit } from 'lucide-react';

export function ListingsSection() {
  const listings = [
    {
      id: 1,
      title: 'Panday with own tools',
      category: 'Construction',
      provider: 'Andrew Cruz',
      price: '₱700',
      location: 'Batanay, Bulacan',
      rating: 5,
      status: 'Active',
      //   image: "/construction-worker-tools.png",
    },
    {
      id: 2,
      title: 'Declogging drain home service',
      category: 'Plumbing',
      provider: 'Jose Plumbing',
      price: '₱350',
      location: 'Batanay, Bulacan',
      rating: 4,
      status: 'Active',
      //   image: "/plumber-fixing-drain.png",
    },
    {
      id: 3,
      title: 'Auto repair home service',
      category: 'Auto Repair',
      provider: "Mike's Auto Shop",
      price: '₱850',
      location: 'Batanay, Bulacan',
      rating: 5,
      status: 'Inactive',
      //   image: "/mechanic-repairing-car.png",
    },
    {
      id: 4,
      title: 'Auto repair home service',
      category: 'Auto Repair',
      provider: "Mike's Auto Shop",
      price: '₱850',
      location: 'Batanay, Bulacan',
      rating: 5,
      status: 'Inactive',
      //   image: "/auto-mechanic-with-tools.jpg",
    },
  ];

  return (
    <section className="bg-[#F5C45E] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-[#102E50] mb-8">
          Your listings
        </h2>
        <div className="relative">
          <div
            className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
            id="listings-scroll"
          >
            {listings.map(listing => (
              <Card
                key={listing.id}
                className="w-[300px] flex-shrink-0 overflow-hidden"
              >
                <div className="relative">
                  {/* <img
                src={listing.image || "/placeholder.svg"}
                alt={listing.title}
                className="w-full h-48 object-cover"
              /> */}
                  <div className="w-full h-48 bg-gray-400 flex items-center justify-center">
                    <span className="text-gray">Image</span>
                  </div>
                  <Badge
                    className={`absolute top-3 left-3 border-0 px-3 py-1 ${
                      listing.status === 'Active'
                        ? 'bg-green-500 '
                        : 'bg-gray-500'
                    }`}
                  >
                    {listing.status}
                  </Badge>
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-semibold">
                    {listing.price}
                  </div>
                </div>
                <CardContent className="p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-1">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {listing.category}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {listing.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(listing.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 bg-transparent flex items-center"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Right arrow button */}
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-0 bg-white/80 hover:bg-white rounded-full shadow p-2 z-10"
            onClick={() => {
              const el = document.getElementById('listings-scroll');
              if (el) {
                el.scrollBy({ left: 320, behavior: 'smooth' });
              }
            }}
            aria-label="Scroll right"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
