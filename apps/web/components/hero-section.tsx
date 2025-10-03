import { Button } from '@hanapp-ph/commons';

export function HeroSection() {
  return (
    <section className="px-6 py-10 bg-gradient-to-b from-[#FFDD8E] to-[#F5C45E]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#102E50] mb-4 text-balance">
          Turn Your Skills Into Income
        </h1>
        <p className="text-xl text-[#102E50] mb-6 text-balance">
          List your service today and connect with nearby customers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-b from-[#014182] to-[#102E50] hover:from-[#014c6d] hover:to-[#0a233a] font-semibold px-8 py-3 rounded-xl text-white text-md"
          >
            + List My Service
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="font-semibold px-8 py-3 rounded-xl text-md bg-white text-[#102E50] hover:bg-gray-100"
          >
            Preview My Listings
          </Button>
        </div>
      </div>
    </section>
  );
}
