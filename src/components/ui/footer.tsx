import {  Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: "Playlists", path: "/playlists" },
      { name: "Blog", path: "/blog" },
      { name: "Interviews", path: "/interviews" },
      { name: "Recommendations", path: "/recommendations" },
    ],
    company: [
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Trivia", path: "/trivia" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Mail, href: "mailto:hello@themicrophoneset.com", label: "Email" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center mb-4">
              <div className="font-sans text-2xl flex items-center">
                <span className="font-light tracking-tight">The</span>
                <span className="mx-1 font-black tracking-tighter">
                  MICROPHONE
                </span>
                <div className="w-2 h-2 bg-black rounded-full mx-1"></div>
                <span className="font-medium">SET</span>
              </div>
            </Link>
            <p className="text-gray-600 max-w-md mb-6">
              Oh you like music too? We talk about it, write about it, share
              it, and live it. This is The Microphone Set — where music lovers
              come to discover, connect, and celebrate sound.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-all duration-300 hover-lift hover-glow"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-700" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              {currentYear} The Microphone Set. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-600 hover:text-black transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-600 hover:text-black transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
