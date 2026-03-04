'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

import { PrivacyHeader } from '../../components/PrivacyHeader';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is Hanapp?',
      answer:
        'Hanapp is a Filipino service marketplace platform that connects customers with skilled service providers. Whether you need home repairs, cleaning, tutoring, or other services, Hanapp helps you find verified, trusted professionals in your area.',
    },
    {
      question: 'Is Hanapp available in my area?',
      answer:
        "Hanapp currently operates in major cities across the Philippines including Metro Manila, Cebu, Davao, and Cagayan de Oro. We're continuously expanding to new areas. Check our app or website to see if services are available in your location.",
    },
    {
      question: 'How do I book a service?',
      answer:
        'Simply download the Hanapp app or visit our website, browse available services, select a provider based on their ratings and reviews, and book through our platform. Payment is secure and handled through our app.',
    },
    {
      question: 'How are service providers verified?',
      answer:
        'All service providers on Hanapp undergo a verification process that includes government ID verification, face verification using AI technology, and skill assessments. We also monitor ratings and reviews to maintain quality standards.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept various payment methods including GCash, PayMaya, bank transfers, and credit/debit cards. All payments are encrypted and secure. Funds are held until the service is completed satisfactorily.',
    },
    {
      question: 'What happens if I am not satisfied with the service?',
      answer:
        'Customer satisfaction is our priority. If you are unsatisfied, you can file a dispute through our app. Our support team will investigate and work with both parties to find a fair resolution. In cases of fraud or poor quality, we can issue refunds.',
    },
    {
      question: 'How much does it cost to use Hanapp?',
      answer:
        'Hanapp is free for customers to use. Service prices are set by individual providers and vary based on the type of service and location. You will see all costs upfront before confirming your booking.',
    },
    {
      question: 'How do I become a service provider on Hanapp?',
      answer:
        'Download the Hanapp app and sign up as a service provider. You will need to complete our verification process (ID verification and face verification), create your profile, and add your services. Once approved, you can start accepting bookings.',
    },
    {
      question: 'What commission does Hanapp take from service providers?',
      answer:
        'Hanapp takes a competitive commission on each completed booking. The exact percentage varies by service category and region. You will know the commission before accepting a booking. We are committed to fair pricing that allows providers to earn sustainable income.',
    },
    {
      question: 'How do I get paid as a service provider?',
      answer:
        'Payments are automatically transferred to your linked bank account or e-wallet (GCash, PayMaya) within 2-5 business days after a job is completed. You can track all your earnings in your Hanapp dashboard.',
    },
    {
      question: 'Is my personal information safe on Hanapp?',
      answer:
        'Yes, we take data security seriously. We use industry-standard encryption, secure servers, and strict privacy policies to protect your information. We never sell your data to third parties and comply with Philippine data protection laws.',
    },
    {
      question:
        'What should I do if I encounter a problem or have a complaint?',
      answer:
        'You can contact our support team through the app, email (support@hanapp.com.ph), or our website. We have a dedicated support team that works to resolve issues within 24-48 hours.',
    },
    {
      question: 'Can I cancel a booking?',
      answer:
        'Yes, you can cancel a booking. The cancellation policy depends on when you cancel relative to the scheduled service time. Cancellations made 24 hours or more before the service are fully refunded. Late cancellations may incur fees.',
    },
    {
      question: 'How do ratings and reviews work?',
      answer:
        'After a service is completed, both customers and providers can rate and review each other. Ratings are out of 5 stars, and reviews help build trust and reputation on the platform. All reviews are verified to be from actual users who booked the service.',
    },
    {
      question: 'Does Hanapp provide insurance or guarantees?',
      answer:
        'While we do not provide insurance directly, we have a Hanapp Guarantee that covers issues arising from fraud, damage caused by negligence, or service non-completion. Our support team can help file a claim if needed.',
    },
  ];

  return (
    <>
      <PrivacyHeader showTermsLink={true} showPrivacyLink={false} />

      {/* Main Content */}
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Find answers to common questions about Hanapp
          </p>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 text-left">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <section className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Didn&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-gray-700 mb-4">
              If you have additional questions, our support team is here to
              help.
            </p>
            <p className="text-gray-700">
              Email us at: <strong>support@hanapp.com.ph</strong>
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
            <p>Last Updated: March 4, 2026</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
