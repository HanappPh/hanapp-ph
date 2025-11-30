'use client';

import { Button } from '@hanapp-ph/commons';
import { Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { useAuth } from '../../lib/hooks/useAuth';

interface ClientHomeFooterProps {
  onNavigate?: (path: string) => void;
  onSubmitContact?: (email: string, message: string) => void;
}

export function ClientHomeFooter({
  onNavigate,
  onSubmitContact,
}: ClientHomeFooterProps) {
  const { activeRole } = useAuth();
  const isProvider = activeRole === 'provider';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    onSubmitContact?.(email, message);
  };

  return (
    <footer
      className={`py-12 ${isProvider ? 'bg-hanapp-accent text-hanapp-primary' : 'bg-hanapp-gradient text-white'}`}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Brand */}
          <div>
            <Image
              src={
                isProvider
                  ? '/Hanapp-Logo-Registered.png'
                  : '/Hanapp-Logo-Registered-2.png'
              }
              alt="Hanapp Logo"
              width={240}
              height={120}
              className="h-16 w-auto"
              priority
            />
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate?.('/about')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/mission')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Our Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/careers')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/account')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/contact')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/blog')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate?.('/faqs')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/sitemap')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Site Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/accessibility')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Accessibility
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/privacy')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/terms')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/cookies')}
                  className={`transition-colors ${isProvider ? 'text-hanapp-primary/70 hover:text-hanapp-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-semibold mb-4">CONTACT US</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className={`w-full px-4 py-2 rounded border transition-colors focus:outline-none ${
                  isProvider
                    ? 'bg-white/10 border-white/20 text-hanapp-primary placeholder-hanapp-primary/70 focus:border-hanapp-primary'
                    : 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400'
                }`}
              />
              <textarea
                name="message"
                placeholder="Message"
                required
                rows={3}
                className={`w-full px-4 py-2 rounded border transition-colors focus:outline-none resize-none ${
                  isProvider
                    ? 'bg-white/10 border-white/20 text-hanapp-primary placeholder-hanapp-primary/70 focus:border-hanapp-primary'
                    : 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400'
                }`}
              />
              <Button
                type="submit"
                className={`w-full font-semibold ${
                  isProvider
                    ? 'bg-hanapp-secondary hover:bg-hanapp-secondary/90 text-white'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                }`}
              >
                Send
              </Button>
            </form>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">FOLLOW US</h4>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/hanapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                    isProvider
                      ? 'bg-white/10 hover:bg-[#F5C45E] hover:text-gray-900'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/hanapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                    isProvider
                      ? 'bg-white/10 hover:bg-[#F5C45E] hover:text-gray-900'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`pt-8 border-t text-center text-sm ${isProvider ? 'border-white/10 text-[#F5C45E]/70' : 'border-white/10 text-gray-400'}`}
        >
          © 2025 Hanapp Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
