import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AI3DModel from '@/components/AI3DModel';
import RotatableTshirt from '@/components/RotatableTshirt';
import EventTimeline from '@/components/EventTimeline';
import CustomCursor from '@/components/CustomCursor';
import GuestsList from '@/components/GuestsList';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useToast } from '@/hooks/use-toast';
import { Rocket, Calendar, Shirt, Users, Star } from 'lucide-react';
import AIChatBox from '../components/AIChatBox';
import RotatableSticker from '@/components/RotatableSticker';

gsap.registerPlugin(ScrollTrigger);

const FEATURE_CARDS = [
  { 
    icon: <Rocket size={32} className="text-axis-neon-blue" />, 
    title: 'Space Innovation',
    description: 'Explore cutting-edge technologies shaping the future of space exploration.'
  },
  { 
    icon: <Star size={32} className="text-axis-neon-purple" />, 
    title: 'Global Experts',
    description: 'Learn from leading figures in astronomy, astrophysics, and space engineering.'
  },
  { 
    icon: <Calendar size={32} className="text-axis-neon-pink" />, 
    title: 'Hands-on Workshops',
    description: 'Participate in interactive sessions developing real space solutions.'
  },
  { 
    icon: <Users size={32} className="text-axis-neon-blue" />, 
    title: 'Networking',
    description: 'Connect with industry leaders, researchers, and space enthusiasts.'
  },
  { 
    icon: <Shirt size={32} className="text-axis-neon-purple" />, 
    title: 'Exclusive Merchandise',
    description: 'Take home limited edition AXIS 2025 branded products.'
  },
  { 
    icon: <Star size={32} className="text-axis-neon-pink" />, 
    title: 'Space Startups',
    description: 'Discover emerging companies revolutionizing the space industry.'
  }
];

/**
 * Homepage component featuring animated sections and interactive elements
 */
const Index: React.FC = () => {
  const { toast } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const merchRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show welcome toast
    toast({
      title: "Welcome to AXIS 2025",
      description: "Explore the future of space technology",
      duration: 5000,
    });

    // Animate hero section
    if (heroRef.current) {
      gsap.fromTo(
        '.hero-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2 }
      );
      
      gsap.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5 }
      );
      
      gsap.fromTo(
        '.hero-button',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.8 }
      );
    }

    // Animate sections on scroll
    const sections = [aboutRef, timelineRef, merchRef, guestsRef];
    
    sections.forEach((sectionRef) => {
      if (!sectionRef.current) return;
      
      gsap.fromTo(
        sectionRef.current.querySelector('.section-title'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
      
      gsap.fromTo(
        sectionRef.current.querySelector('.section-content'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    });

    // Animate features
    gsap.fromTo(
      '.feature-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
        },
      }
    );
    
    // Create comets randomly
    const createComet = () => {
      const comet = document.createElement('div');
      comet.classList.add('comet');
      comet.style.top = `${Math.random() * 100}vh`;
      comet.style.left = `${Math.random() * 100}vw`;
      comet.style.animationDelay = `${Math.random() * 5}s`;
      comet.style.animationDuration = `${5 + Math.random() * 10}s`;
      document.body.appendChild(comet);
      
      // Remove comet after animation completes
      setTimeout(() => {
        document.body.removeChild(comet);
      }, 15000);
    };
    
    // Create initial comets
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createComet(), i * 2000);
    }
    
    // Create new comets periodically
    const cometInterval = setInterval(createComet, 8000);
    
    return () => {
      clearInterval(cometInterval);
    };
    
  }, [toast]);

  return (
    <div className="min-h-screen bg-[#FFFBE6] dark:bg-black text-black dark:text-white">
      <div className="absolute inset-0 z-0 magic-grid opacity-30"></div>
      <CustomCursor />
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <AI3DModel />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 gradient-text">
            AXIS 2025
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 text-gray-300">
            The premier space technology conference shaping the future of cosmic exploration
          </p>
          <div className="hero-button">
            <Link to="/register">
              <Button 
                className="bg-gradient-to-r from-axis-neon-blue to-axis-neon-purple hover:from-axis-neon-purple hover:to-axis-neon-pink text-black font-medium px-8 py-6 text-lg animate-pulse-neon"
              >
                Register Now
              </Button>
            </Link>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#about" className="text-white">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section 
        id="about" 
        ref={aboutRef} 
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">
            About the Event
          </h2>
          
          <div className="section-content">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-xl text-gray-300 mb-8">
                AXIS 2025 brings together the brightest minds in space technology, exploration, and innovation. 
                Join us for three days of cutting-edge discussions, workshops, and networking opportunities.
              </p>
              <p className="text-lg text-gray-400">
                From sustainable space habitats to breakthrough propulsion technologies, 
                AXIS 2025 is where the future of cosmic exploration takes shape.
              </p>
            </div>
            
            <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURE_CARDS.map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-card glass-effect p-6 rounded-xl hover:neon-glow-blue transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section 
        id="timeline" 
        ref={timelineRef} 
        className="py-20 px-6 bg-axis-dark-gray"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">
            Event Timeline
          </h2>
          
          <div className="section-content">
            <EventTimeline />
          </div>
        </div>
      </section>
      
      {/* Merchandise Section */}
      <section 
        id="merchandise" 
        ref={merchRef} 
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">
            Limited Edition Merchandise
          </h2>
          
          <div className="section-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-bold mb-6 text-white text-glow-blue">AXIS 2025 Holographic Badge</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Take home a piece of the future with our exclusive AXIS 2025 holographic badge. 
                  Each badge features our signature cosmic design with dynamic neon accents.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-2">
                    <span className="text-axis-neon-pink">●</span>
                    <span className="text-gray-300">Holographic finish with 3D effect</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-axis-neon-blue">●</span>
                    <span className="text-gray-300">Weather-resistant and durable</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-axis-neon-purple">●</span>
                    <span className="text-gray-300">Limited edition collector's item</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-axis-neon-pink">●</span>
                    <span className="text-gray-300">Includes space-themed design elements</span>
                  </li>
                </ul>
                <Button 
                  className="bg-gradient-to-r from-axis-neon-purple to-axis-neon-pink hover:from-axis-neon-blue hover:to-axis-neon-purple text-black font-medium"
                >
                  Pre-Order Now
                </Button>
              </div>
              
              <div className="order-1 md:order-2 glass-effect rounded-xl p-8 h-full">
                <RotatableSticker />
                <p className="text-center text-gray-400 mt-4">
                  <span className="text-white">Drag to rotate</span> - Interactive 3D preview
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Guests Attending Section */}
      <section 
        id="guests" 
        ref={guestsRef} 
        className="py-20 px-6 bg-gradient-to-r from-black via-axis-dark-gray to-black"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">
            Guests Attending
          </h2>
          
          <div className="section-content">
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <p className="text-xl text-gray-300">
                Connect with the brightest minds in space technology and exploration at AXIS 2025.
                Our roster of guests includes renowned scientists, industry pioneers, and visionary entrepreneurs.
              </p>
            </div>
            
            <GuestsList />
            
            <div className="mt-12 text-center">
              <Link to="/register">
                <Button 
                  className="bg-gradient-to-r from-axis-neon-blue via-axis-neon-purple to-axis-neon-pink hover:from-axis-neon-pink hover:via-axis-neon-purple hover:to-axis-neon-blue text-black font-medium py-6 px-8 text-lg animate-pulse-neon"
                >
                  Register to Attend
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <AIChatBox />
    </div>
  );
};

export default Index;
