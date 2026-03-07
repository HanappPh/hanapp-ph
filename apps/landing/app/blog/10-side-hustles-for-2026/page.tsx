'use client';

import Image from 'next/image';

import { PrivacyHeader } from '../../../components/PrivacyHeader';

export default function Page() {
  return (
    <>
      <PrivacyHeader />

      <main className="min-h-screen bg-white pt-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f2b42]">
            10 Side Hustles Filipinos Can Start With Little to No Capital in
            2026
          </h1>

          <div className="mt-4 text-sm text-gray-500">
            Published on March 6, 2026 · 8 min read
          </div>

          <div className="mt-8 w-full h-64 md:h-96 relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/blog-1.jpg"
              alt="Side hustles in the Philippines"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <div className="mt-8 prose prose-lg max-w-none text-gray-700">
            <p>
              In 2026, many Filipinos are looking for ways to earn{' '}
              <strong>extra income</strong> without large upfront investment.
              These side hustles are practical, flexible, and can often be
              started with skills you already have or with very little capital.
            </p>

            <p>
              Below are 10 realistic ideas to help you get started — plus quick
              tips on how to find customers using platforms like Hanapp.
            </p>

            <h2>1. Home Cleaning Services</h2>
            <p>
              Start by offering basic cleaning services to neighbors and small
              offices. Focus on reliability and consistent quality to get repeat
              bookings.
            </p>

            <h2>2. Delivery & Errand Services</h2>
            <p>
              Use a bicycle or motorcycle to run local deliveries and errands.
              Partner with local stores and advertise on social platforms to
              gain traction.
            </p>

            <h2>3. Tutoring & Lessons</h2>
            <p>
              Offer short lessons for subjects or skills you know well. Start
              with online lessons or small group classes to keep costs low.
            </p>

            <h3>Quick starter checklist</h3>
            <ol>
              <li>Define your service and price clearly.</li>
              <li>
                Create a simple profile with photos and short descriptions.
              </li>
              <li>Ask satisfied customers for referrals and reviews.</li>
            </ol>

            <p>
              These ideas are intentionally low-cost and easy to launch. With
              consistent delivery and good customer service, you can grow from a
              side hustle to a dependable source of income.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
