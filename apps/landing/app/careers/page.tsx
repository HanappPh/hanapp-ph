'use client';

import React from 'react';

import { PrivacyHeader } from '../../components/PrivacyHeader';

const Careers = () => {
  return (
    <>
      <PrivacyHeader showTermsLink={true} showPrivacyLink={false} />

      {/* Main Content */}
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Careers at Hanapp
          </h1>
          <p className="text-sm text-muted-foreground mb-8 font-inter">
            (Updated – March 4, 2026)
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Join Our Team
              </h2>
              <p>
                At Hanapp, we&apos;re building the future of service delivery in
                the Philippines. We&apos;re looking for talented, passionate
                individuals who share our mission of empowering service
                providers and creating a transparent, fair marketplace.
              </p>
              <p>
                We believe that great teams are built on diversity,
                collaboration, and a shared commitment to excellence. If
                you&apos;re excited about technology, community impact, and
                innovation, we&apos;d love to hear from you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Why Work at Hanapp?
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Impact:</strong> Your work directly contributes to
                  empowering thousands of Filipino professionals and improving
                  lives across the Philippines.
                </li>
                <li>
                  <strong>Growth Opportunities:</strong> We invest in our team
                  members&apos; professional development and provide
                  opportunities for advancement.
                </li>
                <li>
                  <strong>Competitive Benefits:</strong> We offer competitive
                  salaries, health insurance, flexible work arrangements, and
                  performance bonuses.
                </li>
                <li>
                  <strong>Collaborative Culture:</strong> We foster a culture of
                  collaboration where your ideas are heard and valued.
                </li>
                <li>
                  <strong>Work-Life Balance:</strong> We believe in maintaining
                  a healthy balance between work and personal life.
                </li>
                <li>
                  <strong>Innovation:</strong> You&apos;ll work with
                  cutting-edge technology and have the opportunity to shape the
                  future of our platform.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Current Open Positions
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-hanapp-primary pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Senior Full-Stack Developer
                  </h3>
                  <p className="text-gray-700 mb-2">
                    We&apos;re looking for an experienced full-stack developer
                    to help build and scale our platform. You&apos;ll work with
                    modern technologies like React, Node.js, and PostgreSQL.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Requirements:</strong> 5+ years of experience,
                    strong problem-solving skills, experience with microservices
                    architecture
                  </p>
                </div>

                <div className="border-l-4 border-hanapp-primary pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Product Manager
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Join our product team to shape the direction of Hanapp.
                    You&apos;ll work closely with designers, engineers, and
                    stakeholders to build features that users love.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Requirements:</strong> 3+ years of product
                    management experience, strong analytical skills, passion for
                    marketplaces
                  </p>
                </div>

                <div className="border-l-4 border-hanapp-primary pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Customer Support Specialist
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Help our users succeed by providing excellent support.
                    You&apos;ll resolve issues, answer questions, and help
                    improve our support systems.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Requirements:</strong> Excellent communication
                    skills, empathy, problem-solving ability, Filipino language
                    proficiency
                  </p>
                </div>

                <div className="border-l-4 border-hanapp-primary pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Data Analyst
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Help us understand our users and market through data.
                    You&apos;ll create insights that drive decision-making
                    across the company.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Requirements:</strong> Strong SQL skills, experience
                    with data visualization tools, analytical mindset
                  </p>
                </div>

                <div className="border-l-4 border-hanapp-primary pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Marketing Specialist
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Help us reach more users and build brand awareness.
                    You&apos;ll work on content, campaigns, and growth
                    initiatives.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Requirements:</strong> 2+ years of marketing
                    experience, strong writing skills, creative thinking
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Our Culture & Values
              </h2>
              <p>
                At Hanapp, we believe in creating an inclusive, supportive
                workplace where everyone can do their best work. We value:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Integrity:</strong> We do the right thing, even when
                  it&apos;s hard.
                </li>
                <li>
                  <strong>Collaboration:</strong> We work together to solve
                  problems and achieve goals.
                </li>
                <li>
                  <strong>Continuous Learning:</strong> We believe in growth and
                  development.
                </li>
                <li>
                  <strong>User Focus:</strong> Everything we do is for the
                  benefit of our users.
                </li>
                <li>
                  <strong>Ownership:</strong> We take responsibility for our
                  work and its impact.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Benefits & Perks
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Competitive salary packages</li>
                <li>Health and dental insurance for you and your family</li>
                <li>Flexible work arrangements (remote and hybrid options)</li>
                <li>Professional development and training budget</li>
                <li>Performance bonuses</li>
                <li>Paid time off</li>
                <li>Company outings and team building activities</li>
                <li>Gym membership subsidies</li>
                <li>Free lunch and snacks in the office</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                How to Apply
              </h2>
              <p>
                Interested in joining our team? Send us your resume and a brief
                cover letter explaining why you&apos;d be a great fit for
                Hanapp.
              </p>
              <p>
                Email: <strong>careers@hanapp.com.ph</strong>
              </p>
              <p className="text-sm text-gray-600">
                We review applications on a rolling basis and will be in touch
                with qualified candidates.
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

export default Careers;
