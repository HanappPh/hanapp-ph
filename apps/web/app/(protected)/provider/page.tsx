import { BookingsSection } from '../../../components/bookings-section';
import { DashboardStats } from '../../../components/dashboard-stats';
import { Footer } from '../../../components/footer';
import { HeroSection } from '../../../components/hero-section';
import { ListingsSection } from '../../../components/listings-section';
import { OnboardingSection } from '../../../components/onboarding-section';
export default function ProviderPage() {
  return (
    <div className="bg-[#F3F5F9]">
      <HeroSection />

      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#102E50] text-2xl font-balanced mb-6 text-center">
            Welcome, <span className="font-bold">Andrew!</span>
          </h2>
          <DashboardStats />
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div> */}
        </div>
      </section>

      <BookingsSection />

      {/* <section className="px-6 py-8">
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
      </section> */}

      <ListingsSection />

      <OnboardingSection />
      <Footer />
    </div>
  );
}
