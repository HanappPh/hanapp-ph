import { Button, Card } from '@hanapp-ph/commons';
import { Camera, NotebookPen, BellRing, Sparkles } from 'lucide-react';
import Image from 'next/image';
export function OnboardingSection() {
  return (
    <section className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:mx-10">
          {/* Create Your First Listing */}
          <div className="w-full lg:w-5/12">
            <Card className="overflow-hidden bg-hanapp-accent border-0 rounded-xl shadow-md flex flex-col h-full">
              <div className="relative h-48 w-full">
                <Image
                  src="/woman-using-phone.jpg"
                  alt="Woman using phone"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-hanapp-secondary mb-3">
                  Create Your First Listing
                </h3>
                <ul className="space-y-2 mb-4">
                  <li className="font-semibold text-hanapp-secondary">
                    1. Choose a category (Cleaning, Tutoring, Handyman etc.)
                  </li>
                  <li className="font-semibold text-[#102E50]">
                    2. Add Photos and a short bio
                  </li>
                  <li className="font-semibold text-[#102E50]">
                    3. Set your rates and service areas
                  </li>
                  <li className="font-semibold text-[#102E50]">
                    4. Publish and start connecting clients
                  </li>
                </ul>
                <div className="mt-auto pt-6 flex flex-wrap gap-4 justify-start w-full">
                  <Button className="bg-hanapp-primary hover:bg-hanapp-secondary text-white rounded-full">
                    List My Service
                  </Button>
                  <Button className="bg-white text-hanapp-primary hover:bg-hanapp-secondary hover:text-white rounded-full">
                    See Sample Listing
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Elevate Your Profile */}
          <div className="w-full lg:w-7/12 flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-hanapp-secondary mb-3">
              Elevate Your Profile
            </h3>
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3 p-4 rounded-xl shadow-sm bg-white">
                <Camera className="h-6 w-6 text-hanapp-secondary" />
                <div className="flex-1">
                  <div className="font-semibold text-lg text-hanapp-secondary">
                    Use a clear photo
                  </div>
                  <div className="text-md text-hanapp-secondary">
                    Customers trust real faces. Smile, good lighting, no
                    filters.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl shadow-sm bg-white">
                <NotebookPen className="h-6 w-6 text-hanapp-secondary" />
                <div className="flex-1">
                  <div className="font-semibold text-lg text-hanapp-secondary">
                    Describe your expertise
                  </div>
                  <div className="text-md text-hanapp-secondary">
                    Add relevant skills and years of experience.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl shadow-sm bg-white">
                <BellRing className="h-6 w-6 text-hanapp-secondary" />
                <div className="flex-1">
                  <div className="font-semibold text-lg text-hanapp-secondary">
                    Reply fast to win bookings
                  </div>
                  <div className="text-md text-hanapp-secondary">
                    Get more gigs when you reply right away, clients love a
                    provider who is available when they need it!
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-hanapp-secondary text-white rounded-xl shadow-sm">
                <Sparkles className="h-6 w-6" />
                <div className="flex-1">
                  <div className="font-semibold text-lg">Coming soon</div>
                  <div className="text-md">
                    Bidding System & Rewards: boost visibility, earn credits by
                    referring fellow providers.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
