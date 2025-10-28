import { useEffect, useRef, useState } from 'react';

const FindSection = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showIncome, setShowIncome] = useState(false);
  const [showPeace, setShowPeace] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    function isInViewport(el: HTMLElement) {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }
    function onScroll() {
      if (ref.current && !hasAnimated && isInViewport(ref.current)) {
        setHasAnimated(true);
        setTimeout(() => setShowHelp(true), 100);
        setTimeout(() => setShowIncome(true), 700);
        setTimeout(() => setShowPeace(true), 1300);
      }
    }
    window.addEventListener('scroll', onScroll);
    // Check on mount in case already in view
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasAnimated]);

  return (
    <div className="text-center" ref={ref}>
      <style jsx>{`
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .invisible-placeholder {
          visibility: hidden;
          height: 0;
          margin: 0;
          padding: 0;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {/* Reserve space for all headings to prevent container resize */}
      <div
        className="relative flex flex-col items-center justify-center"
        style={{ minHeight: '12.5em', height: '12.5em' }}
      >
        {/* Placeholders for all headings */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight invisible-placeholder">
          Find <span className="text-hanapp-accent">Help.</span>
        </h2>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight invisible-placeholder">
          Find <span className="text-hanapp-accent">Income.</span>
        </h2>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight invisible-placeholder">
          Find <span className="text-hanapp-accent">Peace of Mind.</span>
        </h2>
        {/* Animated headings, vertically centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full">
          {showHelp && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight fade-in-up">
              Find <span className="text-hanapp-accent">Help.</span>
            </h2>
          )}
          {showIncome && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight fade-in-up">
              Find <span className="text-hanapp-accent">Income.</span>
            </h2>
          )}
          {showPeace && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight fade-in-up">
              Find <span className="text-hanapp-accent">Peace of Mind.</span>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindSection;
