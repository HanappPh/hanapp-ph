import { Button } from '@hanapp-ph/commons';
import { Instagram, Facebook } from 'lucide-react';
import React from 'react';

interface ClientHomeFooterProps {
  onNavigate?: (path: string) => void;
  onSubmitContact?: (email: string, message: string) => void;
}

export function ClientHomeFooter({
  onNavigate,
  onSubmitContact,
}: ClientHomeFooterProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    onSubmitContact?.(email, message);
  };

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">Han</span>
              <span className="text-yellow-400">app</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate?.('/about')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/mission')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Our Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/careers')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/account')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/contact')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/blog')}
                  className="text-gray-300 hover:text-white transition-colors"
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
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/sitemap')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Site Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/accessibility')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Accessibility
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/privacy')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/terms')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/cookies')}
                  className="text-gray-300 hover:text-white transition-colors"
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
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
              />
              <textarea
                name="message"
                placeholder="Message"
                required
                rows={3}
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 resize-none"
              />
              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
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
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/hanapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          © 2025 Hanapp Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
