import React, { useState, useEffect, useRef } from 'react';

const RotatableTshirt = () => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const sensitivity = 0.5;
    const deltaX = e.clientX - startX;
    setRotation(prev => (prev + deltaX * sensitivity) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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
      className="w-full h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-[300px] h-[300px] relative transition-all duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        style={{
          transform: `rotate(${rotation}deg)`,
          filter: isHovered ? 'drop-shadow(0 0 10px #00f2ff)' : 'none'
        }}
      >
        <img
          src="/tshirt.svg"
          alt="AXIS 2025 T-Shirt"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default RotatableTshirt; 