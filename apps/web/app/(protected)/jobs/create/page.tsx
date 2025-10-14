import { ContactInformationSection } from '../../../../components/request-job-listing/request-contact';
import { JobDetailsSection } from '../../../../components/request-job-listing/request-job-details';
import { LocationAvailabilitySection } from '../../../../components/request-job-listing/request-locations';
import { ImageUploadSection } from '../../../../components/request-job-listing/request-media';
import { PricingInformationSection } from '../../../../components/request-job-listing/request-pricing';
import { TermsSubmitSection } from '../../../../components/request-job-listing/request-terms';

export default function RequestServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-5xl font-bold mb-1"
            style={{
              background: 'linear-gradient(to right, #102E50, #2469B6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Request A Service
          </h1>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <JobDetailsSection />
            <LocationAvailabilitySection />
            <ImageUploadSection />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <PricingInformationSection />
            <ContactInformationSection />
            <TermsSubmitSection />
          </div>
        </div>
      </main>
    </div>
  );
}
