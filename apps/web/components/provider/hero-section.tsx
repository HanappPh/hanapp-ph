'use client';

import { Button } from '@hanapp-ph/commons';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="px-6 py-10 bg-gradient-to-b from-[#FFDD8E] to-[#F5C45E]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#102E50] mb-4 text-balance">
          Turn Your Skills Into Income
        </h1>
        <p className="text-xl text-[#102E50] mb-6 text-balance">
          List your service today and connect with nearby customers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push('/provider/jobs/create')}
            size="lg"
            className="bg-hanapp-primary hover:bg-hanapp-secondary font-semibold px-8 py-3 rounded-xl text-white text-md"
          >
            + List My Service
          </Button>
          <Button
            onClick={() => router.push('/bookings')}
            size="lg"
            variant="outline"
            className="border-2 border-[#014182] bg-transparent font-semibold px-8 py-3 rounded-xl text-base text-hanapp-primary hover:bg-hanapp-secondary hover:border-[#102e50] hover:text-white"
          >
            Preview My Listings
          </Button>
        </div>
      </div>
    </section>
  );
}
