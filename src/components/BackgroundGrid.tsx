"use client";

import { useEffect, useState } from 'react';

export default function BackgroundGrid() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setOffset({ x: -(x * 20), y: -(y * 20) });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="bg-grid"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    />
  );
}
