import { Button, Card } from '@hanapp-ph/commons';
import { Camera, NotebookPen, BellRing, Sparkles } from 'lucide-react';

export function OnboardingSection() {
  return (
    <section className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Create Your First Listing */}
          <Card className="p-8 bg-[#F5C45E] border-0 rounded-xl shadow-md flex flex-col lg:col-span-2">
            <h3 className="text-2xl font-bold text-[#102E50] mb-3">
              Create Your First Listing
            </h3>
            <ul className="space-y-2 mb-4">
              <li className="font-semibold text-[#102E50]">
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
              <Button className="bg-[#102E50] hover:bg-[#0a233a] text-white rounded-full">
                List My Service
              </Button>
              <Button className="bg-white text-[#102E50] hover:bg-gray-100 rounded-full">
                See Sample Listing
              </Button>
            </div>
          </Card>

          {/* Elevate Your Profile */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-bold text-[#102E50] mb-3">
              Elevate Your Profile
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl shadow-sm bg-white">
                <Camera className="h-6 w-6 text-[#102E50]" />
                <div className="flex-1">
                  <div className="font-semibold text-[#102E50]">
                    Use a clear photo
                  </div>
                  <div className="text-sm text-[#102E50]">
                    Customers trust real faces. Smile, good lighting, no
                    filters.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl shadow-sm bg-white">
                <NotebookPen className="h-6 w-6 text-[#102E50]" />
                <div className="flex-1">
                  <div className="font-semibold text-[#102E50]">
                    Describe your expertise
                  </div>
                  <div className="text-sm text-[#102E50]">
                    Add relevant skills and years of experience.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl shadow-sm bg-white">
                <BellRing className="h-6 w-6 text-[#102E50]" />
                <div className="flex-1">
                  <div className="font-semibold text-[#102E50]">
                    Reply fast to win bookings
                  </div>
                  <div className="text-sm text-[#102E50]">
                    Get more gigs when you reply right away, clients love a
                    provider who is available when they need it!
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#102E50] text-white rounded-xl shadow-sm">
                <Sparkles className="h-6 w-6" />
                <div className="flex-1">
                  <div className="font-semibold">Coming soon</div>
                  <div className="text-sm">
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
