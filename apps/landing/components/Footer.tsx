import Image from 'next/image';
import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    // TODO: Implement actual form submission logic
    // Reset form
    setEmail('');
    setMessage('');
  };

  return (
    <footer className="bg-gradient-to-t from-[#102E50] to-[#014182] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Logo and Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/Hanapp-Logo-Registered-2.png"
                alt="Hanapp Logo"
                width={160}
                height={64}
                className="h-16 w-auto"
              />
            </div>
          </div>

          {/* Navigation Links - Column 1 */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              <a
                href="#about"
                className="block text-white/90 hover:text-white transition-colors"
              >
                About Us
              </a>
              <a
                href="#mission"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Our Mission
              </a>
              <a
                href="#careers"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Careers
              </a>
              <a
                href="#account"
                className="block text-white/90 hover:text-white transition-colors"
              >
                My Account
              </a>
              <a
                href="#contact"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#blog"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Blog
              </a>
            </div>
          </div>

          {/* Navigation Links - Column 2 */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              <a
                href="#faqs"
                className="block text-white/90 hover:text-white transition-colors"
              >
                FAQs
              </a>
              <a
                href="#sitemap"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Site Map
              </a>
              <a
                href="#accessibility"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Accessibility
              </a>
              <a
                href="#privacy"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Terms & Conditions
              </a>
              <a
                href="#cookie"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/70 focus:outline-none focus:border-[#f4b942] focus:bg-white/20 transition-all"
                  required
                />
                <textarea
                  placeholder="Message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/70 focus:outline-none focus:border-[#f4b942] focus:bg-white/20 transition-all resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#f4b942] text-[#1e3a5f] py-2 px-4 rounded font-semibold hover:bg-[#f4b942]/90 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>

            {/* Social Media Section */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">FOLLOW US</h4>
              <div className="flex space-x-3">
                <a
                  href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fhanappofficial%2F%3Figsh%3DODdvbzJkdW5kaG8y&is_from_rle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f4b942] transition-colors group"
                >
                  <svg
                    className="w-4 h-4 fill-white group-hover:fill-[#1e3a5f]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/hanappOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f4b942] transition-colors group"
                >
                  <svg
                    className="w-4 h-4 fill-white group-hover:fill-[#1e3a5f]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 mt-6 pt-4">
          <div className="text-center">
            <p className="text-white/80 text-sm">
              © 2025 Hanapp Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
