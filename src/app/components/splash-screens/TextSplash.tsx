"use client";

import { useState } from 'react';
import { useTextSplashAnimation } from '../../hooks/useTextSplashAnimation';
import { RocketSVG } from '../svgs/Rocket';
import { SpaceshipSVG } from '../svgs/Spaceship';
interface TextSplashProps {
  title: string;
  subtitle: string;
  duration?: number;
  onComplete?: () => void;
}

export default function TextSplash({ 
  title, 
  subtitle,
  duration = 2000, 
  onComplete
}: TextSplashProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  const { textRef, overlayRef, titleRef, subtitleRef } = useTextSplashAnimation({
    title,
    subtitle,
    duration,
    onComplete: () => {
      setIsVisible(false);
      onComplete?.();
    }
  });

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center h-full bg-white"
    >
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />
      <SpaceshipSVG className="size-24" />

      <RocketSVG className="size-24" />
      <div 
        ref={textRef}
        className="text-black text-4xl font-light text-center px-8 space-y-4 relative z-10"
      >
        <h1 ref={titleRef} className="text-6xl sm:text-8xl drop-shadow-xl opacity-100">[<span className="title-text">{title}</span>]</h1>
        <p ref={subtitleRef} className="text-3xl sm:text-4xl drop-shadow-xl opacity-100"><span className="subtitle-text">{subtitle}</span>
        <span className="period-text animate-pulse text-primary">.</span>
        </p>
      </div>
    </div>
  );
} 