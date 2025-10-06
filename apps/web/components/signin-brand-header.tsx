import Image from 'next/image';

interface BrandHeaderProps {
  title?: string;
  logoText?: string;
  logoSrc?: string;
  logoAlt?: string;
  className?: string;
}

export default function SignInBrandHeader({
  title = 'SIGN UP',
  logoText = 'HJ',
  logoSrc = '/logo.png',
  logoAlt = 'Company Logo',
  className = '',
}: BrandHeaderProps) {
  return (
    <div className={`flex items-center gap-6 mb-10 ${className}`}>
      <div className="w-24 h-24 bg-gradient-to-r from-[#102E50] to-[#014182] rounded-2xl flex items-center justify-center shadow-lg">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={96}
            height={96}
            className="object-contain w-full h-full rounded-xl"
            priority
            style={{ border: 'none', outline: 'none' }}
          />
        ) : (
          <span className="text-[#F5C45E] font-bold text-4xl">{logoText}</span>
        )}
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#102E50] to-[#014182] bg-clip-text text-transparent tracking-wide">
        {title}
      </h1>
    </div>
  );
}
