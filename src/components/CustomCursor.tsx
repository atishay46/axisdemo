
import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const requestRef = useRef<number>();
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isHoveringLinkRef = useRef(false);

  const animate = () => {
    if (!dotRef.current || !outlineRef.current || !orbitRef.current) return;

    let x = lerp(prevMouseRef.current.x, mouseRef.current.x, 0.2);
    let y = lerp(prevMouseRef.current.y, mouseRef.current.y, 0.2);

    dotRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0)`;
    outlineRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    orbitRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    // Update particles positions
    particlesRef.current.forEach((particle, index) => {
      if (!particle) return;
      
      const angle = (Date.now() * 0.001 + index * (Math.PI * 2 / particlesRef.current.length)) % (Math.PI * 2);
      const distance = 30 + Math.sin(Date.now() * 0.002 + index) * 10;
      
      const particleX = x + Math.cos(angle) * distance;
      const particleY = y + Math.sin(angle) * distance;
      
      particle.style.transform = `translate3d(${particleX}px, ${particleY}px, 0)`;
    });

    prevMouseRef.current.x = x;
    prevMouseRef.current.y = y;

    requestRef.current = requestAnimationFrame(animate);
  };

  // Linear interpolation
  const lerp = (start: number, end: number, amt: number) => {
    return (1 - amt) * start + amt * end;
  };

  useEffect(() => {
    // Create particles
    const particleContainer = document.createElement('div');
    particleContainer.className = 'cursor-particles';
    document.body.appendChild(particleContainer);

    // Number of particles
    const particleCount = 5;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      
      // Alternate colors
      if (i % 3 === 0) {
        particle.style.backgroundColor = '#00f9ff'; // Blue
      } else if (i % 3 === 1) {
        particle.style.backgroundColor = '#8b5cf6'; // Purple
      } else {
        particle.style.backgroundColor = '#d946ef'; // Pink
      }
      
      // Random size
      const size = 3 + Math.random() * 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particleContainer.appendChild(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Initialize position
    const mouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Handle link hovers
    const handleLinkHoverStart = () => {
      isHoveringLinkRef.current = true;
      if (outlineRef.current) {
        outlineRef.current.classList.add('scale-150');
        outlineRef.current.style.borderColor = '#d946ef';
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = '0.5';
        dotRef.current.style.background = '#00f9ff';
      }
      if (orbitRef.current) {
        orbitRef.current.classList.add('orbit-active');
      }
    };

    const handleLinkHoverEnd = () => {
      isHoveringLinkRef.current = false;
      if (outlineRef.current) {
        outlineRef.current.classList.remove('scale-150');
        outlineRef.current.style.borderColor = '#d946ef';
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = '0.7';
        dotRef.current.style.background = '#00f9ff';
      }
      if (orbitRef.current) {
        orbitRef.current.classList.remove('orbit-active');
      }
    };

    // Handle button hovers
    const handleButtonHoverStart = () => {
      isHoveringLinkRef.current = true;
      if (outlineRef.current) {
        outlineRef.current.classList.add('scale-150');
        outlineRef.current.style.borderColor = '#00f9ff';
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = '0.5';
        dotRef.current.style.background = '#8b5cf6';
      }
      if (orbitRef.current) {
        orbitRef.current.classList.add('orbit-active');
      }
    };

    const handleButtonHoverEnd = () => {
      isHoveringLinkRef.current = false;
      if (outlineRef.current) {
        outlineRef.current.classList.remove('scale-150');
        outlineRef.current.style.borderColor = '#d946ef';
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = '0.7';
        dotRef.current.style.background = '#00f9ff';
      }
      if (orbitRef.current) {
        orbitRef.current.classList.remove('orbit-active');
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', mouseMove);
    requestRef.current = requestAnimationFrame(animate);

    // Add event listeners to all links and buttons
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');

    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleButtonHoverStart);
      button.addEventListener('mouseleave', handleButtonHoverEnd);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', mouseMove);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });

      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleButtonHoverStart);
        button.removeEventListener('mouseleave', handleButtonHoverEnd);
      });
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      if (particleContainer.parentNode) {
        particleContainer.parentNode.removeChild(particleContainer);
      }
    };
  }, []);

  // Hide cursor on mobile devices
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="custom-cursor cursor-dot"></div>
      <div ref={outlineRef} className="custom-cursor cursor-outline"></div>
      <div ref={orbitRef} className="custom-cursor cursor-orbit"></div>
    </>
  );
};

export default CustomCursor;
