'use client';

import React from 'react';

import { PrivacyHeader } from '../../components/PrivacyHeader';

const AboutUs = () => {
  return (
    <>
      <PrivacyHeader showTermsLink={true} showPrivacyLink={false} />

      {/* Main Content */}
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
          <p className="text-sm text-muted-foreground mb-8 font-inter">
            (Updated – March 4, 2026)
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Who We Are
              </h2>
              <p>
                Hanapp Technologies is a Filipino-founded platform dedicated to
                connecting local service providers with customers across the
                Philippines. We believe in the power of community and the value
                of skilled professionals who deserve a fair, transparent, and
                secure platform to grow their businesses.
              </p>
              <p>
                Founded in 2023, Hanapp has quickly become a trusted marketplace
                for various services including home maintenance, cleaning,
                plumbing, electrical work, tutoring, and much more. We serve
                thousands of transactions monthly, connecting hardworking
                professionals with customers who need their expertise.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Our Story
              </h2>
              <p>
                The idea for Hanapp came from recognizing a gap in the Filipino
                service market. We noticed that skilled service providers often
                struggled to reach customers reliably, while customers had
                difficulty finding trustworthy professionals. Traditional
                word-of-mouth and informal connections weren&apos;t enough in a
                modern, fast-paced society.
              </p>
              <p>
                We set out to build a solution that would empower both sides of
                the marketplace. Our platform combines cutting-edge technology
                with a deep understanding of the Filipino market to create an
                experience that&apos;s safe, transparent, and fair for everyone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Our Values
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Trust & Safety:</strong> We prioritize the security
                  and safety of all users through rigorous verification
                  processes and secure payment systems.
                </li>
                <li>
                  <strong>Fairness:</strong> We believe in fair pricing and
                  transparent transactions with no hidden fees or surprise
                  charges.
                </li>
                <li>
                  <strong>Community:</strong> We celebrate the Filipino spirit
                  of community and bayanihan by supporting local professionals.
                </li>
                <li>
                  <strong>Excellence:</strong> We continuously improve our
                  platform to provide the best possible experience for our
                  users.
                </li>
                <li>
                  <strong>Empowerment:</strong> We empower service providers to
                  grow their businesses and achieve financial independence.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                What We Do
              </h2>
              <p>
                Hanapp operates as a comprehensive service marketplace platform
                that facilitates connections between service providers and
                customers. We handle everything from matching and communication
                to payment processing and dispute resolution, ensuring a
                seamless experience for both parties.
              </p>
              <p>Our services span multiple categories including:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Home Maintenance & Repairs</li>
                <li>Cleaning Services</li>
                <li>Technical Services (Electrical, Plumbing, HVAC)</li>
                <li>Tutoring & Education</li>
                <li>Beauty & Wellness</li>
                <li>Moving & Delivery</li>
                <li>And many more categories</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Looking Forward
              </h2>
              <p>
                We&apos;re committed to expanding Hanapp&apos;s reach across the
                Philippines and beyond. Our roadmap includes enhanced features
                for better service matching, improved payment options, and
                expanded service categories. We&apos;re also investing in
                training and support programs to help our service providers
                succeed.
              </p>
              <p>
                Join us in building the future of service delivery in the
                Philippines. Whether you&apos;re a service provider looking to
                grow your business or a customer seeking reliable professionals,
                Hanapp is here for you.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
              <p>Last Updated: March 4, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
