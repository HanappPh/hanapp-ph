import Image from 'next/image';
import React from 'react';

const navItems = [
  { label: 'Home', icon: '/placeholder-category-icon.png' },
  { label: 'Bookings', icon: '/placeholder-category-icon.png' },
  { label: 'Providers', icon: '/placeholder-category-icon.png' },
  { label: 'Chat', icon: '/placeholder-category-icon.png' },
];

export function MobileProfileBottom({
  textColor,
  hoverBg,
  hoverText,
}: {
  textColor?: string;
  hoverBg?: string;
  hoverText?: string;
}) {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-b border-[2px] shadow border-[#f3f5f9] flex justify-around items-center md:hidden z-50">
      {navItems.map(item => (
        <button
          key={item.label}
          className={`flex-1 flex flex-col items-center text-xs font-semibold px-3 py-2 transition-colors duration-150 ${textColor} ${hoverBg} ${hoverText}`}
        >
          <Image
            src={item.icon}
            alt={item.label + ' icon'}
            width={20}
            height={20}
            className="w-5 h-5 rounded-full bg-white p-0.5 object-contain border"
          />
          {item.label}
        </button>
      ))}
    </nav>
  );
}
