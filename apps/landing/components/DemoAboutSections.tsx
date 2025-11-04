const DemoAboutSections = () => {
  return (
    <>
      {/* Try Demo Button Section - Entire section is clickable */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-[#102E50]/90 hover:bg-hanapp-accent/90 transition-all duration-300 cursor-pointer relative overflow-hidden group">
        {/* Shine effect across entire section */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
        </div>
        <div className="max-w-4xl z-10">
          <h2 className="ml-12 text-4xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wide">
            About Us
          </h2>
        </div>
      </section>
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-[#014182]/90 hover:bg-hanapp-accent/90 transition-all duration-300 cursor-pointer relative overflow-hidden group">
        {/* Shine effect across entire section */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
        </div>
        <div className="max-w-4xl z-10">
          <h2 className="ml-12 text-4xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wide">
            Try our Demo
          </h2>
        </div>
      </section>
    </>
  );
};

export default DemoAboutSections;
