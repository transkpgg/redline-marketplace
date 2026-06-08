"use client";

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('.product-card')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      className={`fixed pointer-events-none z-[9999] rounded-full border border-[var(--accent-red)] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-200 ${isHovered ? 'w-10 h-10 bg-[rgba(255,0,60,0.2)]' : 'w-5 h-5'}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
}
