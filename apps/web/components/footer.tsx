'use client';

import { Button, Input } from '@hanapp-ph/commons';
import { Instagram, Facebook } from 'lucide-react';

import { useAuth } from '../lib/hooks/useAuth';

export function Footer() {
  const { activeRole } = useAuth();
  const isProvider = activeRole === 'provider';

  return (
    <footer
      className={`py-12 ${isProvider ? 'text-[#F5C45E] bg-gray-900' : 'text-[#102E50]'}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo column */}
          <div className="flex md:block justify-start mb-8 md:mb-0">
            <img
              src={
                isProvider ? '/assets/logo-yellow.png' : '/assets/logo-blue.png'
              }
              className="h-12"
              alt="Logo"
            />
          </div>

          {/* Company Info */}
          <div>
            <div className="space-y-2 text-sm">
              <div>About Us</div>
              <div>Our Mission</div>
              <div>Careers</div>
              <div>My Account</div>
              <div>Community</div>
              <div>Blog</div>
            </div>
          </div>

          {/* Support */}
          <div>
            <div className="space-y-2 text-sm">
              <div>FAQ</div>
              <div>Site Map</div>
              <div>Accessibility</div>
              <div>Privacy Policy</div>
              <div>Terms & Conditions</div>
              <div>Cookie Policy</div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-2">CONTACT US</h4>
            <div className="space-y-3">
              <Input
                placeholder="Email"
                className={`border-gray/20 ${
                  isProvider
                    ? 'bg-gray-800 text-[#F5C45E] placeholder:text-[#F5C45E]/70'
                    : 'bg-gray/10 text-[#102E50] placeholder:text-[#102E50]/70'
                }`}
              />
              <Input
                placeholder="Message"
                className={`border-gray/20 ${
                  isProvider
                    ? 'bg-gray-800 text-[#F5C45E] placeholder:text-[#F5C45E]/70'
                    : 'bg-gray/10 text-[#102E50] placeholder:text-[#102E50]/70'
                }`}
              />
              <Button
                className={`w-full font-semibold ${
                  isProvider
                    ? 'bg-[#F5C45E] hover:bg-[#F5C45E]/90 text-gray-900'
                    : 'bg-[#102E50] hover:bg-gray-800 text-white'
                }`}
              >
                Send
              </Button>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-2">FOLLOW US</h4>
            <div className="flex gap-3">
              <Button
                size="icon"
                variant="outline"
                className={`border-white/20 bg-transparent ${
                  isProvider
                    ? 'text-[#F5C45E] hover:bg-[#F5C45E] hover:text-gray-900'
                    : 'text-[#102E50] hover:bg-white hover:text-blue-900'
                }`}
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className={`border-white/20 bg-transparent ${
                  isProvider
                    ? 'text-[#F5C45E] hover:bg-[#F5C45E] hover:text-gray-900'
                    : 'text-[#102E50] hover:bg-white hover:text-blue-900'
                }`}
              >
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 text-center text-sm">
          © Hanapp Technologies
        </div>
      </div>
    </footer>
  );
}
