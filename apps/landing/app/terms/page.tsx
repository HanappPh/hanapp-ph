'use client';

import React from 'react';

import { PrivacyHeader } from '../../components/PrivacyHeader';

const TermsOfUse = () => {
  return (
    <>
      <PrivacyHeader showTermsLink={false} showPrivacyLink={true} />

      {/* Main Content */}
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Terms of Use & Community Guidelines
          </h1>
          <p className="text-sm text-muted-foreground mb-8 font-inter">
            (Updated – August 31, 2025)
          </p>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                1. Introduction
              </h2>
              <p className="text-foreground mb-4 font-inter">
                Hanapp is a peer-to-peer, location-based platform that connects
                people who need help with those offering services in their
                community. Hanapp facilitates discovery, communication, and
                trust — but we are not a party to any service agreement between
                users.
              </p>
              <p className="text-foreground mb-4 font-inter">
                Our mission is to empower everyday Filipinos to find work, earn
                income, and access support with ease. By using Hanapp, you agree
                to the following terms and community standards. These rules
                ensure a safe, respectful, and trustworthy experience for all
                users.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700 font-inter">
                  ⚠️ <strong>Disclaimer:</strong> Hanapp does not guarantee the
                  identity, conduct, or reliability of users. We do not conduct
                  full background checks, and we are not responsible for
                  agreements or transactions that occur outside the platform.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                2. General User Terms
              </h2>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>Users must be 18 years or older to create an account.</li>
                <li>
                  All accounts are created via OTP verification (SMS or Email).
                </li>
                <li>
                  Each user is responsible for keeping their personal
                  information accurate.
                </li>
                <li>Accounts may not be shared, rented, or sold.</li>
                <li>
                  Hanapp acts solely as a connector — not as an employer,
                  contractor, or guarantor.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                3. Provider Responsibilities
              </h2>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  Providers must complete Face + ID verification before listing
                  or bidding.
                </li>
                <li>Listings must be truthful, accurate, and lawful.</li>
                <li>
                  Providers must communicate clearly, respectfully, and complete
                  jobs as agreed.
                </li>
                <li>
                  Declared service areas must be accurate (e.g., &quot;📍
                  Serves: Entire Cavite, based in Tanza&quot;).
                </li>
                <li>
                  GPS location is used with declared coverage to improve
                  matches.
                </li>
                <li>
                  Creating multiple accounts to bypass limits is strictly
                  prohibited.
                </li>
                <li>
                  Users may report providers for &quot;Wrong address&quot;;
                  repeated flags will result in review or suspension.
                </li>
                <li>
                  Illegal, explicit, or dangerous services are strictly
                  prohibited.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                4. Customer Responsibilities
              </h2>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  Free users may post up to 2 active job requests at a time.
                </li>
                <li>
                  Additional job slots may be unlocked by watching an ad or
                  paying ₱15.
                </li>
                <li>Job posts expire after 24 hours.</li>
                <li>Customers must post only legitimate job requests.</li>
                <li>
                  Cancellations should be made at least 24 hours before service
                  time.
                </li>
                <li>
                  Repeated no-shows, fake posts, or spam may result in
                  restrictions.
                </li>
                <li>
                  Customers may filter providers by distance or search directly
                  by name.
                </li>
                <li>All users are expected to communicate respectfully.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                5. Booking & Payment Terms
              </h2>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  A job is confirmed only when both parties agree via in-app
                  chat.
                </li>
                <li>
                  Tips are optional and can be sent after service is completed.
                </li>
                <li>
                  Hanapp is not responsible for offline payments; only in-app
                  transactions are supported by our system.
                </li>
                <li>
                  Users are strongly discouraged from sending money outside the
                  app.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                6. Verification Policy
              </h2>
              <p className="text-foreground mb-4 font-inter">
                Face + ID verification is required to:
              </p>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>List services</li>
                <li>Bid on jobs</li>
                <li>Unlock the &quot;Verified & Trusted&quot; badge</li>
                <li>Receive payouts and tips</li>
                <li>Only one GCash account may be linked per user.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                7. Platform Fees
              </h2>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  A platform fee applies to GCash or card payments processed
                  through Hanapp.
                </li>
                <li>
                  Fees are automatically deducted before funds are transferred.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                8. Cancellations, Disputes & Refunds
              </h2>
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                Cancellations:
              </h3>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  Cancellations made 24+ hours before service are not penalized.
                </li>
                <li>
                  Within 24 hours of service, only providers may cancel, and a
                  valid reason must be given.
                </li>
                <li>
                  Repeated last-minute cancellations may result in cooldowns or
                  account review.
                </li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                Disputes:
              </h3>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>Users may raise disputes if issues arise.</li>
                <li>
                  Hanapp&apos;s support team currently manages disputes manually
                  and may request photos, documents, or written explanations.
                </li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                Refunds & Disbursements:
              </h3>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  Since Hanapp is capable of processing payments in-app, we can
                  handle refunds and disbursements manually.
                </li>
                <li>
                  Funds may be refunded to the customer or released to the
                  provider, based on the outcome of the review.
                </li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                Future Features:
              </h3>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>In-app dispute filing with photo/document upload</li>
                <li>Admin-moderated resolution tools</li>
                <li>Automated refund or release of funds</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                9. Community Behavior
              </h2>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  Treat all users with respect. No harassment, hate speech, or
                  discrimination.
                </li>
                <li>
                  Fake bookings, ghost bidding, or manipulation will lead to
                  penalties.
                </li>
                <li>
                  Hanapp may apply cooldowns, suspensions, or bans for abuse.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                10. Reporting & Moderation
              </h2>
              <p className="text-foreground mb-4 font-inter">
                Users can report suspicious activity via report@hanapp.com.ph.
              </p>
              <p className="text-foreground mb-4 font-inter">
                Reports are reviewed by Hanapp&apos;s moderation team and may
                result in:
              </p>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>Temporary suspension</li>
                <li>Permanent ban</li>
                <li>Legal referral (in serious cases)</li>
              </ul>
              <p className="text-foreground mb-4 font-inter">
                🔒 Hanapp may cooperate with law enforcement in cases of fraud,
                abuse, or illegal activity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                11. Tier Enforcement & Abuse Policy
              </h2>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>Free users are subject to posting and bidding caps.</li>
                <li>
                  Premium users may post up to 10 active jobs (increasing to 20
                  with manual approval).
                </li>
                <li>
                  Business/Partner accounts may be asked to submit monthly usage
                  logs.
                </li>
                <li>
                  Misuse of tiers (e.g., running business-level activity on Free
                  accounts) may result in downgrade, suspension, or termination.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                12. Updates and Amendments
              </h2>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>Hanapp may update these terms at any time.</li>
                <li>
                  Users will be notified via email or in-app notification.
                </li>
                <li>
                  Continued use of the platform means you accept the updated
                  terms.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                13. Taxes & Compliance
              </h2>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  Providers are responsible for reporting and paying their own
                  taxes.
                </li>
                <li>Hanapp does not withhold income tax or VAT.</li>
                <li>
                  Hanapp may provide annual earnings summaries to assist with
                  tax filing.
                </li>
                <li>
                  Future features will include BIR-compliant invoicing tools for
                  business users.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                14. Legal Protection & Limitations
              </h2>
              <p className="text-foreground mb-4 font-inter">
                Hanapp is not liable for user behavior or service outcomes.
              </p>
              <p className="text-foreground mb-4 font-inter">
                By using Hanapp, you agree that:
              </p>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>You are solely responsible for who you engage with.</li>
                <li>
                  Hanapp does not guarantee quality, reliability, or outcomes.
                </li>
                <li>
                  Hanapp is not responsible for financial loss, fraud, or harm
                  caused by other users, online or offline.
                </li>
                <li>
                  Users should report violations immediately for investigation.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                15. Contact Us
              </h2>
              <p className="text-foreground mb-4 font-inter">
                For questions, concerns, or clarifications, please contact our
                in-app support team.
              </p>
              <p className="text-foreground mb-4 font-inter font-semibold">
                Let&apos;s keep Hanapp safe, fair, and helpful for all.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
              <p>Last Updated: August 31, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;
