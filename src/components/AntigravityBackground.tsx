/**
 * TruthLens AI - Ambient Antigravity Spotlight Background
 * 
 * Renders an immersive background featuring:
 * - Fluid cursor tracking via lerp (linear interpolation) physics loop in `requestAnimationFrame`.
 * - Dynamic CSS variable injection (`--mouse-x`, `--mouse-y`) for card hover spotlights.
 * - Multi-layered radiant radial gradients (Dot Matrix, Cyan Core Pinpoint, Deep Cosmic Blue Atmosphere).
 */

import React, { useEffect, useState, useRef } from 'react';

export const AntigravityBackground: React.FC = () => {
  // Current smoothly interpolated cursor coordinates
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 3 : 300,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const rafId = useRef<number | null>(null);
  const targetPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    targetPos.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
    };

    /**
     * Mouse move handler: updates target coordinates and global CSS variables
     */
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isHovered) setIsHovered(true);

      // Expose mouse coordinates to CSS variables for dynamic card hover spotlights
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    /**
     * Touch move handler for mobile screen interactions
     */
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetPos.current = { x: touch.clientX, y: touch.clientY };
        if (!isHovered) setIsHovered(true);

        document.documentElement.style.setProperty('--mouse-x', `${touch.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${touch.clientY}px`);
      }
    };


    // Smooth animation loop for seamless cursor tracking with fluid physics
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 3;

    const animate = () => {
      // Linear interpolation for organic, fluid gliding
      currentX += (targetPos.current.x - currentX) * 0.14;
      currentY += (targetPos.current.y - currentY) * 0.14;

      setMousePos({
        x: Math.round(currentX * 10) / 10,
        y: Math.round(currentY * 10) / 10,
      });

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isHovered]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Cosmic Dark Base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* 2. Geometric Dot Matrix (Illuminated by Cursor Proximity) */}
      <div
        className="absolute inset-0 opacity-[0.55] transition-opacity duration-700"
        style={{
          backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.28) 1.2px, transparent 1.2px)`,
          backgroundSize: '30px 30px',
          maskImage: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 80%)`,
          WebkitMaskImage: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 80%)`,
        }}
      />

      {/* 3. Subtle Static Grid for Ambient Texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* 4. Wide Antigravity Radiant Blue Light Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.22), rgba(14, 165, 233, 0.14) 30%, rgba(59, 130, 246, 0.08) 55%, rgba(99, 102, 241, 0.02) 75%, transparent 85%)`,
          opacity: isHovered ? 1 : 0.65,
        }}
      />

      {/* 5. Concentrated Inner Cyan Beam for High-Contrast Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-200 ease-out"
        style={{
          background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 0.25), rgba(6, 182, 212, 0.12) 45%, transparent 75%)`,
          opacity: isHovered ? 1 : 0.5,
        }}
      />

      {/* 6. Dynamic Glowing Core Light Pinpoint at Mouse Position */}
      <div
        className="absolute w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_25px_#22d3ee,0_0_50px_#06b6d4] transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 pointer-events-none"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: isHovered ? 0.9 : 0,
        }}
      />

      {/* 7. Soft Ambient Atmosphere Floating Aurora Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-blue-600/[0.05] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[30rem] h-[30rem] bg-indigo-600/[0.045] rounded-full blur-[150px] pointer-events-none" />
    </div>
  );
};

