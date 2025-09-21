import { Button, Input } from '@hanapp-ph/commons';
import { Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#014182] to-[#102E50] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo column */}
          <div className="flex md:block justify-start mb-8 md:mb-0">
            <img
              src="/assets/logo-yellow.png"
              className="h-12"
              alt="Yellow Logo"
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
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Input
                placeholder="Message"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="w-full bg-[#F5C45E] hover:bg-amber-500 text-black font-semibold">
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
                className="border-white/20 text-white hover:bg-white hover:text-blue-900 bg-transparent"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-blue-900 bg-transparent"
              >
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
          © Hanapp Technologies
        </div>
      </div>
    </footer>
  );
}
