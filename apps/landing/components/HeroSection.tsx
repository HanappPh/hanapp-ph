import AnimatedImagesSection from './AnimatedImagesSection';
import AutoScrollGallery from './AutoScrollGallery';

const HeroSection = () => {
  return (
    <section className="relative h-screen px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center">
      {/* Background Auto-Scrolling Gallery */}
      <div className="absolute inset-0 opacity-50 w-full h-full overflow-hidden">
        <AutoScrollGallery />
      </div>

      {/* Modern Geometric Overlay with Dynamic Particles */}
      <div className="absolute inset-0 z-25 overflow-hidden pointer-events-none">
        {/* Main backdrop with subtle mesh pattern */}
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(0, 0, 0, 0.4) 0%,
                rgba(0, 0, 0, 0.5) 30%,
                rgba(0, 0, 0, 0.6) 70%,
                rgba(0, 0, 0, 0.7) 100%
              ),
              radial-gradient(circle at 20% 30%, 
                rgba(245, 196, 94, 0.15) 0%,
                transparent 40%
              ),
              radial-gradient(circle at 80% 70%, 
                rgba(1, 65, 130, 0.15) 0%,
                transparent 40%
              )
            `,
          }}
        />

        {/* Animated geometric shapes */}
        <div className="absolute inset-0">
          {/* Animated particles */}
          <div
            className="z-50 absolute top-[25%] left-[70%] w-2 h-2 bg-yellow-400 rounded-full opacity-60"
            style={{
              animation:
                'float 6s ease-in-out infinite, glow 3s ease-in-out infinite alternate',
              boxShadow: '0 0 10px rgba(245, 196, 94, 0.5)',
            }}
          />
          <div
            className="z-50 absolute top-[45%] left-[85%] w-1 h-1 bg-white rounded-full opacity-80"
            style={{
              animation:
                'float 7s ease-in-out infinite, glow 2s ease-in-out infinite alternate',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.51)',
            }}
          />
        </div>
      </div>

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
        @keyframes glow {
          0% {
            opacity: 0.4;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
        }
      `}</style>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end min-h-[80vh]">
          {/* Left Content - Text and Buttons */}
          <div className="text-left pb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-white mb-2 drop-shadow-lg">
              MahaHanapp mo sa{' '}
              <span className="shine-animation relative overflow-hidden">
                Hanapp.
              </span>
            </h1>
            <p className="text-2xl text-white/90 mb-6 max-w-3xl drop-shadow-md">
              find local services Philippines.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start max-w-3xl">
              <button className="px-6 py-3 sm:px-8 sm:py-4 bg-white/20 text-white border-2 border-white/30 rounded-lg font-semibold text-sm sm:text-base hover:bg-white/30 transition-colors shadow-lg backdrop-blur-sm">
                Sign up here
              </button>
              <button className="px-6 py-3 sm:px-8 sm:py-4 bg-white/20 text-white border-2 border-white/30 rounded-lg font-semibold text-sm sm:text-base hover:bg-white/30 transition-colors shadow-lg backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Animated Images - Desktop Only */}
          <div className="relative h-[500px] lg:h-[600px] flex items-center justify-end hidden lg:block">
            <div className="mt-8 relative h-[500px] lg:h-[600px] w-full max-w-lg">
              <AnimatedImagesSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
