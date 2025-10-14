import Image from 'next/image';

export function Banner() {
  return (
    <section className="relative h-[200px] md:h-[300px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/woman-smiling.jpg"
        alt="Smiling woman"
        fill
        className="object-cover"
        priority
      />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-40">
          <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
            Find Help. Find Income.
            <br />
            Find Peace of Mind.
          </h1>
        </div>
      </div>
    </section>
  );
}
