import { JobListings } from '../../../components/job-listings';
import { Banner } from '../../../components/provider/banner';
import { ListingsSection } from '../../../components/provider/listings-section';
import { LowerHeroSection } from '../../../components/provider/lower-hero-section';
import { OnboardingSection } from '../../../components/provider/onboarding-section';
import { ProviderCategories } from '../../../components/provider/provider-categories';
import { ProviderHero } from '../../../components/provider/provider-hero';

export default function ProviderPage() {
  return (
    <div className="bg-[#F3F5F9]">
      <ProviderHero />
      <ProviderCategories />
      <ListingsSection />
      <Banner />
      <OnboardingSection />
      <JobListings />
      <LowerHeroSection />
    </div>
  );
}
