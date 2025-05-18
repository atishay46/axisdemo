import React from 'react';
import { cn } from '@/lib/utils';
import { Github, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: <Twitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Facebook size={20} />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Github size={20} />, href: 'https://github.com', label: 'GitHub' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className="bg-axis-dark-gray border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-2">
            <div className="text-3xl font-bold gradient-text mb-4">AXIS 2025</div>
            <p className="text-gray-400 mb-6 max-w-md">
              Join us for the most cutting-edge space technology conference of 2025. 
              Network with experts, explore innovations, and shape the future of space exploration.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-axis-neon-blue transition-colors p-2 glass-effect rounded-full"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white text-glow-blue">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-axis-neon-pink transition-colors">About</a></li>
              <li><a href="#timeline" className="text-gray-400 hover:text-axis-neon-blue transition-colors">Event Schedule</a></li>
              <li><a href="#merchandise" className="text-gray-400 hover:text-axis-neon-purple transition-colors">Merchandise</a></li>
              <li><a href="#guests" className="text-gray-400 hover:text-axis-neon-pink transition-colors">Guests</a></li>
              <li><a href="#register" className="text-gray-400 hover:text-axis-neon-blue transition-colors">Register</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white text-glow-pink">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-axis-neon-blue" />
                <a href="mailto:info@axis2025.com" className="text-gray-400 hover:text-white transition-colors">info@axis2025.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-axis-neon-purple" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-axis-neon-pink mt-1" />
                <span className="text-gray-400">AXIS Office, Student Activity Centre<br />VNIT, South Ambazari Road<br />Nagpur, Maharashtra 440010<br />India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} AXIS 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
