import React from 'react';

import { PrivacyHeader } from '../../components/PrivacyHeader';

const PrivacyPolicy = () => {
  return (
    <>
      <PrivacyHeader />

      {/* Main Content */}
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Hanapp Privacy Policy
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
                Hanapp Technologies Corp. (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;) values your privacy. This Privacy Policy
                explains how we collect, use, store, and protect your personal
                information when you use our mobile app, website, or related
                services.
              </p>

              <p className="text-foreground mb-4 font-inter">
                Hanapp is a platform that connects customers and service
                providers within their communities. We process personal data in
                compliance with the Philippine Data Privacy Act of 2012 (DPA),
                and we align with international standards such as the General
                Data Protection Regulation (GDPR) and the California Consumer
                Privacy Act (CCPA) where applicable.
              </p>

              <p className="text-foreground mb-4 font-inter">
                By using Hanapp, you consent to this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                2. Information We Collect
              </h2>
              <p className="text-foreground mb-4 font-inter">
                We may collect the following categories of personal data:
              </p>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  <strong>Account Information - </strong>
                  name, mobile number, email, linked Google account, and GCash
                  number (if provided).
                </li>
                <li>
                  <strong>Verification Data – </strong> government-issued ID,
                  face photo, and selfie with ID (used for Face + ID
                  verification).
                </li>
                <li>
                  <strong>Location Data – </strong> GPS-based location for
                  matching services, alongside declared service areas.
                </li>

                <li>
                  <strong>Service Data – </strong> job posts, bids, bookings,
                  chat messages, feedback, and ratings.
                </li>

                <li>
                  <strong>Device Data – </strong> IP address, device ID,
                  operating system, app version, and session logs.
                </li>

                <li>
                  <strong>Usage Data – </strong> app interactions (pages
                  visited, searches, ads viewed, buttons clicked).
                </li>

                <li>
                  <strong>Optional Marketing Data – </strong> responses to
                  surveys, promotions, and referral programs.
                </li>
              </ul>

              <p className="text-foreground mb-4 font-inter">
                We do not collect sensitive financial data (e.g., bank account
                details) unless required for in-app payments and payouts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                3. How We Use Your Data
              </h2>
              <p className="text-foreground mb-4 font-inter">
                We use personal data to:
              </p>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>Create, manage, and secure your Hanapp account.</li>
                <li>
                  Match customers and providers using declared location + GPS.
                </li>
                <li>Verify identity and issue trust badges.</li>
                <li>Facilitate in-app chat, bookings, ratings, and reviews.</li>
                <li>Detect and prevent fraud, abuse, or duplicate accounts.</li>
                <li>Show relevant services, providers, or advertisements.</li>
                <li>
                  Process payments, refunds, and disbursements (where
                  supported).
                </li>
                <li>Provide customer support.</li>
                <li>Comply with legal, regulatory, or tax obligations.</li>
                <li>
                  Improve the app experience, including analytics and feature
                  testing.
                </li>
              </ul>

              <p className="text-foreground mb-4 font-inter">
                <strong>We will never sell your personal data.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                4. Legal Basis for Processing
              </h2>
              <p className="text-foreground mb-4 font-inter">
                We process data under the following bases:
              </p>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  <strong>Consent – </strong>
                  when you upload identification, link accounts, or agree to
                  marketing.
                </li>
                <li>
                  <strong>Contractual Necessity – </strong>
                  to enable bookings, listings, payments, and payouts.
                </li>
                <li>
                  <strong>Legitimate Interest – </strong>
                  to maintain security, detect fraud, and improve platform
                  features.
                </li>
                <li>
                  <strong>Legal Obligation – </strong>
                  to comply with law enforcement, tax regulations, or court
                  orders.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                5. Data Security
              </h2>
              <p className="text-foreground mb-4 font-inter">
                Hanapp may share your data only under these circumstances:
              </p>

              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  With service providers (e.g., hosting, cloud storage,
                  analytics, SMS gateways, and payment processors).
                </li>
                <li>
                  With other users – only information needed to fulfill bookings
                  (e.g., first name, rating, declared service area).
                </li>
                <li>
                  With regulators or law enforcement – when legally required, or
                  in cases of fraud, abuse, or disputes.
                </li>
                <li>
                  For dispute resolution – with authorized third parties
                  involved in mediation.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                6. Data Retention
              </h2>
              <p className="text-foreground mb-4 font-inter">
                We retain personal data:
              </p>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>As long as your account is active.</li>
                <li>
                  Up to 12 months after account deletion for fraud prevention
                  and compliance.
                </li>
                <li>
                  Longer if required by law (e.g., tax or legal investigations).
                </li>
              </ul>

              <p className="text-foreground mb-4 font-inter">
                You may request early deletion by contacting us at
                support@hanapp.com.ph.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                7. Data Security
              </h2>
              <p className="text-foreground mb-4 font-inter">
                We use industry-standard security measures, including:
              </p>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>Encryption of data in transit and at rest.</li>
                <li>Strict role-based access controls.</li>
                <li>
                  Identity verification before granting data access or deletion.
                </li>
                <li>
                  Regular audits and monitoring for unauthorized activity.
                </li>
              </ul>

              <p className="text-foreground mb-4 font-inter">
                ⚠️ No system is 100% secure. Users should avoid sharing
                sensitive details (like payment references or personal
                addresses) in open chat.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                8. Your Rights
              </h2>
              <p className="text-foreground mb-4 font-inter">
                Under the Philippine DPA, GDPR, and similar laws, you may:
              </p>
              <ul className="list-disc pl-6 text-foreground mb-4 font-inter space-y-2">
                <li>
                  <strong>Access </strong>
                  your personal data.
                </li>
                <li>
                  <strong>Correct </strong>
                  inaccurate or outdated information.
                </li>
                <li>
                  <strong>Request Deletion </strong>
                  of your account and associated data.
                </li>
                <li>
                  <strong>Withdraw Consent </strong>
                  where processing is based on consent.
                </li>
                <li>
                  <strong>Data Portability – </strong>
                  request a copy of your personal data in a readable format.
                </li>
                <li>
                  <strong>File a Complaint </strong>
                  with the National Privacy Commission (NPC) or relevant
                  authority.
                </li>
              </ul>

              <p className="text-foreground mb-4 font-inter">
                To exercise your rights, email us at privacy@hanapp.com.ph.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                9. Children&apos;s Data
              </h2>
              <p>
                Hanapp is intended for users aged 18 and above. We do not
                knowingly collect or process data from minors. If we learn that
                data has been collected from a child, it will be deleted
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                10. International Data Transfers
              </h2>
              <p>
                If your information is processed outside the Philippines (e.g.,
                by cloud services), we ensure that adequate safeguards are in
                place to protect your privacy in line with the DPA and
                international privacy standards.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                11. Updates to This Policy
              </h2>
              <p className="text-foreground mb-4 font-inter">
                We may update this Privacy Policy from time to time. Changes
                will be posted in-app and on our website. Significant updates
                will be communicated via email or app notification.
              </p>
              <p className="text-foreground mb-4 font-inter">
                Continued use of Hanapp after updates means you accept the
                latest version.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                12. Contact Us
              </h2>
              <p className="text-foreground mb-4 font-inter">
                For privacy questions or concerns, please contact our Data
                Protection Officer (DPO):
              </p>
              <p className="text-foreground mb-4 font-inter">
                📧 &nbsp;
                <a
                  href="mailto:privacy@hanapp.com.ph"
                  className="text-primary hover:underline"
                >
                  privacy@hanapp.com.ph
                </a>
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

export default PrivacyPolicy;
