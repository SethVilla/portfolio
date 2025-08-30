"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const About = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state - border starts with 0 height
      gsap.set(buttonRef.current, {
        background: `linear-gradient(to bottom, rgb(var(--color-primary)) 0%, rgb(var(--color-primary)) 0%, transparent 0%)`,
        backgroundSize: '2px 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center'
      });

      // Animate border to fill over time
      gsap.to(buttonRef.current, {
        background: `linear-gradient(to bottom, rgb(var(--color-primary)) 0%, rgb(var(--color-primary)) 100%, transparent 100%)`,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5
      });

    }, buttonRef);

    return () => ctx.revert();
  }, []);

  return (
    <button 
      ref={buttonRef}
      className="vertical-text mt-16 font-light drop-shadow-xl text-xs pl-1"
    >
        ABOUT & CONTACT
    </button>
  );
};