import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Facebook, Instagram, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const socialLinks = [
    { icon: <Twitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Facebook size={20} />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Github size={20} />, href: 'https://github.com', label: 'GitHub' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'glass-effect' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold gradient-text">
            AXIS 2025
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-white hover:text-axis-neon-blue transition-colors">About</a>
          <a href="#timeline" className="text-white hover:text-axis-neon-pink transition-colors">Timeline</a>
          <a href="#merchandise" className="text-white hover:text-axis-neon-purple transition-colors">Merchandise</a>
          <a href="#guests" className="text-white hover:text-axis-neon-blue transition-colors">Guests</a>
          <a href="#register" className="text-white hover:text-axis-neon-pink transition-colors">Register</a>
        </div>

        {/* Desktop Social Links */}
        <div className="hidden md:flex items-center space-x-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-axis-neon-blue transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:text-axis-neon-blue"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button 
            className="bg-gradient-to-r from-axis-neon-blue to-axis-neon-purple hover:from-axis-neon-purple hover:to-axis-neon-pink text-black font-medium"
          >
            Join Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect mt-4 rounded-md p-4 animate-fade-in-down">
          <div className="flex flex-col space-y-4">
            <a href="#about" className="text-white hover:text-axis-neon-blue transition-colors">About</a>
            <a href="#timeline" className="text-white hover:text-axis-neon-pink transition-colors">Timeline</a>
            <a href="#merchandise" className="text-white hover:text-axis-neon-purple transition-colors">Merchandise</a>
            <a href="#guests" className="text-white hover:text-axis-neon-blue transition-colors">Guests</a>
            <a href="#register" className="text-white hover:text-axis-neon-pink transition-colors">Register</a>
            
            <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-axis-neon-blue transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
            <Button 
              className="bg-gradient-to-r from-axis-neon-blue to-axis-neon-purple hover:from-axis-neon-purple hover:to-axis-neon-pink text-black font-medium w-full"
            >
              Join Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
