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
            Grow a Local Service Business With Little Capital
          </h1>

          <div className="mt-4 text-sm text-gray-500">
            Published on January 15, 2026 · 7 min read
          </div>

          <div className="mt-8 w-full h-64 md:h-96 relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/blog-3.jpg"
              alt="Local service business growth"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <div className="mt-8 prose prose-lg max-w-none text-gray-700">
            <p>
              Growing a local service business is about building trust and
              repeat customers more than spending on ads. Focus on delivering
              quality and asking for referrals.
            </p>

            <h2>Focus on reputation</h2>
            <p>
              Good reviews and clear communication drive more bookings than
              broad advertising, especially for neighborhood services.
            </p>

            <h2>Partnerships and cross-promotion</h2>
            <p>
              Partner with local stores and small businesses to refer customers
              to one another — it costs little and expands visibility.
            </p>

            <h3>Low-cost growth actions</h3>
            <ol>
              <li>
                Document your best processes and train helpers to keep quality
                steady.
              </li>
              <li>
                Offer seasonal promotions and bundles to increase average order
                value.
              </li>
              <li>
                Track repeat customers and send friendly reminders for follow-up
                services.
              </li>
            </ol>

            <p>
              Small, consistent improvements and excellent service can compound
              into a thriving local business without large upfront investment.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
