import FindSection from './FindSection';

const FindHelpSection = () => {
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
            transform: translateY(-30px) rotate(10deg);
          }
        }
        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
        @keyframes drift {
          0% {
            transform: translateX(-50px) translateY(0px);
          }
          50% {
            transform: translateX(50px) translateY(-30px);
          }
          100% {
            transform: translateX(-50px) translateY(0px);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
        .float-animation {
          animation: float 8s ease-in-out infinite;
        }
        .sparkle-animation {
          animation: sparkle 4s ease-in-out infinite;
        }
        .drift-animation {
          animation: drift 25s linear infinite;
        }
        .pulse-glow-animation {
          animation: pulse-glow 6s ease-in-out infinite;
        }
      `}</style>

      <section
        id="about"
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#F3F5F9] overflow-visible"
      >
        {/* Animated Glowing Orbs Only */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {/* Large Glowing Orbs */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#014182]/30 rounded-full blur-3xl pulse-glow-animation"></div>
          <div
            className="absolute top-1/2 left-0 transform -translate-y-1/2 w-72 h-72 bg-[#f5c45e]/30 rounded-full blur-3xl pulse-glow-animation"
            style={{ animationDelay: '3s' }}
          ></div>

          {/* Medium Floating Orbs */}
          <div
            className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl float-animation"
            style={{ animationDelay: '4s' }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Find Help/Income Title */}
          <div className="mb-12 relative z-10">
            <FindSection />
          </div>
        </div>
      </section>
    </>
  );
};

export default FindHelpSection;
