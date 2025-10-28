import Image from 'next/image';

const MobileShowcaseSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="w-36 h-24 relative">
              <Image
                src="/Hanapp-Logo-Registered.png"
                alt="Hanapp Provider App"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Kasi ang tulong, hindi dapat mahirap i-Hanapp.
            </h2>
            <button className="bg-hanapp-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-hanapp-secondary transition-colors">
              Sign up Now
            </button>
          </div>

          {/* Right Image - Hanapp Mobile with Hover Effect */}
          <div className="flex justify-center">
            <div className="relative group cursor-pointer">
              {/* Container for all three phones */}
              <div className="flex items-center justify-center transition-all duration-500 group-hover:scale-95">
                {/* Left Phone - Client (hidden by default, fades in on hover) */}
                <div className="w-64 h-[32rem] relative opacity-0 transform -translate-x-8 group-hover:opacity-100 group-hover:translate-x-12 transition-all duration-500 ease-out">
                  <Image
                    src="/hanapp-client.png"
                    alt="Hanapp Client App"
                    fill
                    className="object-contain drop-shadow-xl"
                  />
                </div>

                {/* Center Phone - Main (always visible) */}
                <div className="w-72 h-[36rem] relative mx-4 z-10">
                  <Image
                    src="/hanapp-mob.png"
                    alt="Hanapp Mobile App"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Right Phone - Provider (hidden by default, fades in on hover) */}
                <div className="w-64 h-[32rem] relative opacity-0 transform translate-x-8 group-hover:opacity-100 group-hover:-translate-x-12 transition-all duration-500 ease-out">
                  <Image
                    src="/hanapp-provider.png"
                    alt="Hanapp Provider App"
                    fill
                    className="object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileShowcaseSection;
