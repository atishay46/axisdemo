import React, { useState, useEffect, useRef } from 'react';

const RotatableSticker = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const sensitivity = 0.5;
    const deltaX = (e.clientX - startPos.x) * sensitivity;
    const deltaY = (e.clientY - startPos.y) * sensitivity;
    
    setRotation(prev => ({
      x: (prev.x + deltaY) % 360,
      y: (prev.y + deltaX) % 360
    }));
    
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Auto-rotation when not interacting
  useEffect(() => {
    let animationFrame: number;
    let angle = 0;

    const animate = () => {
      if (!isDragging && !isHovered) {
        angle += 0.2;
        setRotation({
          x: Math.sin(angle * 0.5) * 10,
          y: angle
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging, isHovered]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseLeave = () => {
      setIsDragging(false);
      setIsHovered(false);
    };

    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1000"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-[300px] h-[300px] relative transition-all duration-300 transform-style-3d ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          filter: `
            drop-shadow(0 0 10px #00f2ff)
            drop-shadow(0 0 20px rgba(0, 242, 255, 0.5))
          `
        }}
      >
        <img
          src="/sticker.svg"
          alt="AXIS 2025 Sticker"
          className="w-full h-full object-contain"
        />
        
        {/* Reflection effect */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50"
          style={{
            transform: 'translateZ(-1px)',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
    </div>
  );
};

export default RotatableSticker; 