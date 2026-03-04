'use client';

import React from 'react';

import { PrivacyHeader } from '../../components/PrivacyHeader';

const OurMission = () => {
  return (
    <>
      <PrivacyHeader showTermsLink={true} showPrivacyLink={false} />

      {/* Main Content */}
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h1>
          <p className="text-sm text-muted-foreground mb-8 font-inter">
            (Updated – March 4, 2026)
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Our Core Mission
              </h2>
              <p className="text-lg font-semibold text-hanapp-primary mb-4">
                To empower Filipino service providers and connect them with
                customers who need their skills, creating a fair, transparent,
                and thriving marketplace that drives economic opportunity across
                the Philippines.
              </p>
              <p>
                At Hanapp, we believe that every skilled professional deserves
                access to opportunities, fair compensation, and a platform that
                respects their work. Our mission is to disrupt the traditional
                service marketplace by providing a modern, technology-enabled
                solution that benefits everyone involved.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Why This Matters
              </h2>
              <p>
                The Philippines has an incredible talent pool of skilled
                professionals. Yet many struggle to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Find consistent work and stable income opportunities</li>
                <li>
                  Reach customers beyond their immediate neighborhood or network
                </li>
                <li>Build their reputation and credibility in a formal way</li>
                <li>
                  Receive fair compensation without middlemen taking large cuts
                </li>
                <li>Access secure, convenient payment methods</li>
              </ul>
              <p>On the flip side, customers struggle with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Finding trustworthy, qualified professionals</li>
                <li>Verifying credentials and track records</li>
                <li>Managing bookings and payments securely</li>
                <li>Resolving disputes when things go wrong</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                How We Fulfill Our Mission
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    1. Building Trust Through Verification
                  </h3>
                  <p>
                    We implement rigorous identity and skills verification
                    processes, including government ID checks, face
                    verification, and skill assessments where applicable. This
                    helps customers feel confident hiring and gives providers a
                    way to showcase their legitimacy.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    2. Creating Transparent Transactions
                  </h3>
                  <p>
                    We eliminate hidden fees, surprise charges, and ambiguous
                    pricing. Both service providers and customers know exactly
                    what they&apos;re paying and receiving, creating a level
                    playing field.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    3. Enabling Fair Compensation
                  </h3>
                  <p>
                    Providers set their own rates and keep the majority of what
                    they earn. We take a small commission to sustain our
                    platform, but we ensure providers are never undercut by our
                    systems or policies.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    4. Providing Secure Payments
                  </h3>
                  <p>
                    We partner with trusted payment processors to ensure that
                    money is handled securely. Customers can pay safely, and
                    providers receive their earnings reliably and quickly.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    5. Supporting Dispute Resolution
                  </h3>
                  <p>
                    When issues arise, we have a dedicated team to mediate and
                    resolve disputes fairly. Both parties can be confident that
                    their concerns will be heard and addressed.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    6. Investing in Provider Growth
                  </h3>
                  <p>
                    We offer training, tools, and resources to help service
                    providers succeed. From customer communication tips to
                    business management resources, we want our providers to
                    thrive.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Our Vision for the Future
              </h2>
              <p>We envision a Philippines where:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Every skilled professional has access to a platform where they
                  can build a sustainable livelihood
                </li>
                <li>
                  Finding reliable, vetted service providers is as easy as
                  opening an app or website
                </li>
                <li>
                  Economic opportunity is distributed across all regions of the
                  Philippines, not concentrated in a few urban centers
                </li>
                <li>
                  Trust and transparency are the foundation of all service
                  transactions
                </li>
                <li>Technology serves people, not the other way around</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Join Us in Our Mission
              </h2>
              <p>
                Whether you&apos;re a service provider ready to take control of
                your career or a customer looking for reliable professionals,
                you&apos;re part of our mission. Together, we&apos;re building a
                better service marketplace for the Philippines.
              </p>
              <p>
                Thank you for being part of the Hanapp community. Your trust,
                hard work, and support drive everything we do.
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

export default OurMission;
