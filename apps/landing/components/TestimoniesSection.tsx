import React from 'react';

import { TestimonyData } from './data/testimoniesData';

interface TestimoniesSectionProps {
  testimoniesData: TestimonyData[];
}

const TestimoniesSection: React.FC<TestimoniesSectionProps> = ({
  testimoniesData,
}) => {
  // Split testimonies into two rows
  const firstRow = testimoniesData.slice(
    0,
    Math.ceil(testimoniesData.length / 2)
  );
  const secondRow = testimoniesData.slice(
    Math.ceil(testimoniesData.length / 2)
  );

  // Duplicate testimonies for seamless looping (create 5 copies for smooth infinite scroll)
  const firstRowExtended = [
    ...firstRow,
    ...firstRow,
    ...firstRow,
    ...firstRow,
    ...firstRow,
  ];
  const secondRowExtended = [
    ...secondRow,
    ...secondRow,
    ...secondRow,
    ...secondRow,
    ...secondRow,
  ];

  return (
    <>
      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes drift {
          0% {
            transform: translateX(-100px) translateY(0px);
          }
          50% {
            transform: translateX(100px) translateY(-20px);
          }
          100% {
            transform: translateX(-100px) translateY(0px);
          }
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        .sparkle-animation {
          animation: sparkle 3s ease-in-out infinite;
        }
        .drift-animation {
          animation: drift 20s linear infinite;
        }

        /* Sliding Animations */
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-20%);
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(-20%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .slide-left-slow {
          animation: slideLeft 120s linear infinite;
        }

        .slide-left-fast {
          animation: slideLeft 70s linear infinite;
        }

        .testimonies-row {
          display: flex;
          width: fit-content;
        }

        .testimony-card {
          min-width: 300px;
          width: 200px;
          height: 130px;
          margin-right: 1rem;
          flex-shrink: 0;
          position: relative;
          background: rgba(254, 254, 254, 0.7);
          border: 1px solid rgba(1, 65, 130, 0.2);
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .testimony-card:hover {
          box-shadow:
            0 0 8px rgba(1, 65, 130, 0.1),
            0 0 16px rgba(1, 65, 130, 0.1),
            0 0 24px rgba(1, 65, 130, 0.05),
            0 1px 1px rgba(254, 254, 254, 0.1);
          border-color: rgba(1, 65, 130, 0.3);
          transform: translateY(-1px);
        }
      `}</style>

      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F3F5F9] via-[#E8F2FF] to-[#F0F8FF] overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-hanapp-primary/20 to-hanapp-secondary/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-purple-300/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-yellow-300/10 to-orange-200/5 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '4s' }}
          ></div>

          {/* Additional Glowing Orbs */}
          <div
            className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-400/12 to-pink-300/8 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/5 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-300/8 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '3s' }}
          ></div>
          <div
            className="absolute top-3/4 right-1/3 w-56 h-56 bg-gradient-to-br from-orange-400/12 to-yellow-300/8 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '5s' }}
          ></div>
          <div
            className="absolute bottom-10 left-1/2 w-40 h-40 bg-gradient-to-br from-hanapp-primary/15 to-cyan-300/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '6s' }}
          ></div>
          <div
            className="absolute top-20 right-1/5 w-60 h-60 bg-gradient-to-br from-indigo-400/10 to-purple-300/8 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute bottom-1/4 right-20 w-32 h-32 bg-gradient-to-br from-teal-400/15 to-green-300/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '4.5s' }}
          ></div>

          {/* Floating Particles */}
          <div className="absolute top-20 left-1/4 w-2 h-2 bg-hanapp-primary/30 rounded-full float-animation"></div>
          <div
            className="absolute top-40 right-1/4 w-3 h-3 bg-blue-400/40 rounded-full sparkle-animation"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-40 left-1/5 w-2 h-2 bg-yellow-400/50 rounded-full float-animation"
            style={{ animationDelay: '3s' }}
          ></div>
          <div
            className="absolute bottom-60 right-1/3 w-2 h-2 bg-purple-400/40 rounded-full sparkle-animation"
            style={{ animationDelay: '2.5s' }}
          ></div>

          {/* Geometric Shapes */}
          <div
            className="absolute top-32 right-20 w-16 h-16 border-2 border-hanapp-primary/20 rotate-45 animate-spin"
            style={{ animationDuration: '20s' }}
          ></div>
          <div
            className="absolute bottom-32 left-20 w-12 h-12 border-2 border-blue-400/20 rotate-12 animate-spin"
            style={{ animationDuration: '15s', animationDirection: 'reverse' }}
          ></div>

          {/* Floating Stars */}
          <div className="absolute top-24 left-2/3 text-yellow-400/30 animate-pulse">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div
            className="absolute bottom-48 right-1/4 text-yellow-400/20 animate-pulse"
            style={{ animationDelay: '1.5s' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div
            className="absolute top-2/3 left-1/6 text-yellow-400/25 animate-pulse"
            style={{ animationDelay: '3s' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-4 relative">
            {/* Header Background Glow */}
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-32 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl"></div>

            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 relative z-10">
              What our <span className="text-hanapp-primary">customers </span>
              say
              {/* Decorative underline */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-hanapp-primary to-hanapp-secondary rounded-full"></div>
            </h2>

            {/* Floating decorative elements around header */}
            <div className="absolute -top-4 left-1/4 w-8 h-8 border border-hanapp-primary/20 rounded-full animate-pulse"></div>
            <div
              className="absolute -top-2 right-1/4 w-6 h-6 bg-yellow-400/20 rounded-full animate-pulse"
              style={{ animationDelay: '1s' }}
            ></div>
          </div>

          {/* Sliding Testimonies Rows */}
          <div className="relative">
            {/* First Row - Sliding Left (Slower) */}
            <div className="overflow-hidden mb-1 py-4">
              <div className="testimonies-row slide-left-slow">
                {firstRowExtended.map((testimony, index) => (
                  <div
                    key={`first-${testimony.id}-${index}`}
                    className="testimony-card rounded-lg p-2 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                      </svg>
                    </div>

                    {/* Review Text */}
                    <div className="ml-2 pr-5 pb-6">
                      <p className="text-[#1e1e1e]/60 text-[16px] leading-tight font-normal">
                        &ldquo;{testimony.review}&rdquo;
                      </p>
                    </div>

                    {/* Customer Name - Bottom Left */}
                    <div className="absolute bottom-3 left-4">
                      <p className="text-gray-900 font-semibold text-[14px]">
                        {testimony.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Sliding Left (Faster) */}
            <div className="overflow-hidden py-4">
              <div className="testimonies-row slide-left-fast">
                {secondRowExtended.map((testimony, index) => (
                  <div
                    key={`second-${testimony.id}-${index}`}
                    className="testimony-card rounded-lg p-2 hover:shadow-xl transition-all duration-300 hover:scale-105 group h-30"
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                      </svg>
                    </div>

                    {/* Review Text */}
                    <div className="ml-2 pr-5 pb-6">
                      <p className="text-[#1e1e1e]/60 text-[16px] leading-tight font-normal">
                        &ldquo;{testimony.review}&rdquo;
                      </p>
                    </div>

                    {/* Customer Name - Bottom Left */}
                    <div className="absolute bottom-4 left-3">
                      <p className="text-gray-900 font-semibold text-[14px]">
                        {testimony.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 relative">
            {/* CTA Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-hanapp-primary/5 to-transparent blur-xl"></div>

            <p className="text-gray-600 mb-8 relative z-10">
              Join thousands of satisfied customers who found their perfect
              service providers.
            </p>

            <div className="relative inline-block">
              {/* Button background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-hanapp-primary to-hanapp-secondary rounded-lg blur-lg opacity-30 animate-pulse"></div>

              <button className="relative bg-hanapp-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-hanapp-secondary transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform">
                Get Started Today
                {/* Button shine effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
              </button>

              {/* Floating particles around button */}
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400/60 rounded-full animate-ping"></div>
              <div
                className="absolute -bottom-2 -right-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"
                style={{ animationDelay: '1s' }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimoniesSection;
