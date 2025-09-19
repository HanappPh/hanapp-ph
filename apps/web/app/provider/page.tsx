import { Button, Card } from 'libs/commons/src';
import {
  MapPin,
  ShieldCheck,
  Clock,
  Camera,
  NotebookPen,
  BellRing,
  Sparkles,
} from 'lucide-react';
export default function ProviderPage() {
  return (
    <div>
      <section
        className="px-6 py-16"
        style={{
          background: 'linear-gradient(180deg, #FFDD8E 0%, #F5C45E 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#102E50] mb-4 text-balance">
            Turn Your Skills Into Income
          </h1>
          <p className="text-xl text-[#102E50] mb-8 text-balance">
            List your service today and connect with nearby customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Button
              size="lg"
              className="bg-gradient-to-b from-[#014182] to-[#102E50] hover:from-[#014c6d] hover:to-[#0a233a] font-semibold px-8 rounded-xl"
            >
              + List My Service
            </Button>
            <Button
              size="lg"
              className="bg-[#FFF3DB] hover:bg-white/90 text-black font-semibold px-8 rounded-xl"
            >
              Preview My Listings
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#102E50] text-2xl font-balanced mb-6 text-center">
            Welcome, <span className="font-bold">Andrew!</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border border-gray-400/70 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3">
                <span className="bg-[#FFE8B9]/70 h-12 w-12 text-primary rounded-md flex items-center justify-center">
                  <MapPin className="h-8 w-8" />
                </span>
                <div>
                  <div className="text-lg text-[#102E50] font-semibold">
                    Local Customers
                  </div>
                  <div className="text-sm text-[#102E50]">
                    Reach people near you
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border border-gray-400/70 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3">
                <span className="bg-[#FFE8B9]/70 h-12 w-12 text-primary rounded-md flex items-center justify-center">
                  <ShieldCheck className="h-8 w-8" />
                </span>
                <div>
                  <div className="text-lg text-[#102E50] font-semibold">
                    Trusted Platform
                  </div>
                  <div className="text-[#102E50] text-sm">
                    Verified providers only
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border border-gray-400/70 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3">
                <span className="bg-[#FFE8B9]/70 h-12 w-12 text-primary rounded-md flex items-center justify-center">
                  <Clock className="h-8 w-8" />
                </span>
                <div>
                  <div className="text-lg text-[#102E50] font-semibold">
                    Flexible Earnings
                  </div>
                  <div className="text-sm text-[#102E50]">
                    Work on your schedule
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className='bg-[url("/assets/gradient.png")] bg-cover bg-center rounded-2xl p-10 shadow-xl'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
              <div className="flex justify-start items-center">
                <img
                  src="/assets/logo-blue.png"
                  className="h-20 w-auto pl-6"
                  alt="Blue Logo"
                />
              </div>
              <div className="flex justify-end items-center">
                <img
                  src="/assets/logo-yellow.png"
                  className="h-20 w-auto pr-6"
                  alt="Yellow Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create Your First Listing */}
            <Card className="p-8 bg-[#FFF3DB] border border-[#F5C45E] rounded-xl shadow-md flex flex-col">
              <h3 className="text-2xl font-bold text-[#102E50] mb-6">
                Create Your First Listing
              </h3>
              <ul className="space-y-4 mb-8">
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
                  {' '}
                  4. Publish and start connecting clients
                </li>
              </ul>
              <div className="mt-auto pt-6 flex flex-wrap gap-4 justify-start w-full">
                <Button className="bg-[#102E50] hover:bg-primary/90 text-white rounded-md">
                  List My Service
                </Button>
                <Button className="bg-white border-primary text-[#102E50] hover:bg-gray-100 rounded-md">
                  See Sample Listing
                </Button>
              </div>
            </Card>

            {/* Elevate Your Profile */}
            <div>
              <h3 className="text-2xl font-bold text-[#102E50] mb-6">
                Elevate Your Profile
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 border-2 border-[#F5C45E] rounded-lg shadow-md">
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

                <div className="flex items-center gap-3 p-4 border-2 border-[#F5C45E] rounded-lg shadow-md">
                  <NotebookPen className="h-6 w-6 text-[#102E50]" />
                  <div className="flex-1">
                    <div className="font-semibold text-[#102E50]">
                      Describe your expertise
                    </div>
                    <div className="text-sm text-[#102E50]">
                      List tools, years of experience, and sample tasks you can
                      handle.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border-2 border-[#F5C45E] rounded-lg shadow-md">
                  <BellRing className="h-6 w-6 text-[#102E50]" />
                  <div className="flex-1">
                    <div className="font-semibold text-[#102E50]">
                      Reply fast to win bookings
                    </div>
                    <div className="text-sm text-[#102E50]">
                      Enable notifications and answer within minutes to rank
                      higher.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#102E50] text-primary-foreground rounded-lg shadow-md">
                  <Sparkles className="h-6 w-6" />
                  <div className="flex-1">
                    <div className="font-semibold">Coming soon</div>
                    <div className="text-sm">
                      Bidding System & Rewards: boost visibility, earn credits
                      by referring fellow providers.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
