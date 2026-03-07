'use client';

import Image from 'next/image';

import { PrivacyHeader } from '../../../components/PrivacyHeader';

export default function Page() {
  return (
    <>
      <PrivacyHeader showTermsLink={true} showPrivacyLink={false} />

      <main className="min-h-screen bg-white pt-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f2b42]">
            How to Start a Home Cleaning Business That Earns Repeat Customers
          </h1>

          <div className="mt-4 text-sm text-gray-500">
            Published on February 20, 2026 · 6 min read
          </div>

          <div className="mt-8 w-full h-64 md:h-96 relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/blog-2.jpg"
              alt="Home cleaning service"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <div className="mt-8 prose prose-lg max-w-none text-gray-700">
            <p>
              Building a cleaning business starts with doing exceptional work
              for your first few customers. Those early wins create
              word-of-mouth and repeat bookings.
            </p>

            <h2>Pricing tips</h2>
            <p>
              Start with competitive introductory rates, but clearly outline
              what is included so customers understand the value.
            </p>

            <h2>Equipment and supplies</h2>
            <p>
              Invest in a few reliable tools and basic eco-friendly cleaning
              supplies. Keeping costs predictable helps you maintain profits.
            </p>

            <h3>Retention strategies</h3>
            <ul>
              <li>
                Offer a discount for recurring weekly or bi-weekly bookings.
              </li>
              <li>Send reminders and confirmations to reduce no-shows.</li>
              <li>Ask for reviews and highlight them on your profile.</li>
            </ul>

            <p>
              With consistent service and clear communication, a home cleaning
              business can scale to multiple regular clients within months.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
