import { Footer } from '../../components/footer';
import JobListings from '../../components/job-listings';
import { DashboardStats } from '../../components/provider/dashboard-stats';
import { HeroSection } from '../../components/provider/hero-section';
import { ListingsSection } from '../../components/provider/listings-section';
import { OnboardingSection } from '../../components/provider/onboarding-section';
export default function ProviderPage() {
  return (
    <div className="bg-[#F3F5F9]">
      {/* <NavigationHeader activeTab="providers" /> */}
      <HeroSection />
      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#102E50] text-2xl font-balanced m-2 text-center">
            Welcome, <span className="font-bold">Andrew!</span>
          </h2>
          <DashboardStats
            totalEarnings={12500}
            rating={4.8}
            responseRate={95}
            searchVisibility={80}
            profileViews={120}
          />
        </div>
      </section>
      {/* <BookingsSection /> */}
      <ListingsSection />
      <OnboardingSection />
      <JobListings />
      <Footer />
    </div>
  );
}
