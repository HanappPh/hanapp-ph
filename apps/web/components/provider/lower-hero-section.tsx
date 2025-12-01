'use client';

import { Button } from '@hanapp-ph/commons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function LowerHeroSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-hanapp-accent">
      <div className="mx-auto grid items-center gap-8 sm:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-4 md:space-y-6 px-8 py-8 sm:py-4 lg:px-16 xl:px-32">
          <h1 className="text-3xl font-bold leading-tight text-hanapp-primary lg:text-4xl xl:text-5xl">
            Ready ka na bang mag-Hanapp?
          </h1>

          <div className="flex flex-wrap gap-3 md:gap-4">
            <Button
              onClick={() => router.push('/jobs/categories')}
              className="bg-hanapp-primary text-white hover:bg-hanapp-secondary rounded-full px-6 md:px-8"
            >
              Find a Job
            </Button>
            <Button
              onClick={() => router.push('/provider/jobs/create')}
              variant="outline"
              className="border-2 border-hanapp-primary text-hanapp-primary hover:bg-hanapp-secondary hover:text-white hover:border-hanapp-secondary rounded-full px-6 md:px-8 bg-transparent"
            >
              Post a Job
            </Button>
          </div>
        </div>

        {/* Right Image - Fill entire right side with image and yellow gradient overlay */}
        <div className="relative hidden sm:flex justify-end h-[200px] lg:h-[300px] xl:h-[400px]">
          <div className="absolute right-0 top-0 h-full w-full">
            <Image
              src="/delivery-person-parcel.jpg"
              alt="Delivery person with phone and bag"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f5c45e] via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
