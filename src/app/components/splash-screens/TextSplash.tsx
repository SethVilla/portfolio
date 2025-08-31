"use client";

import { useState } from 'react';
import { gsap } from 'gsap';
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
  const [showElements, setShowElements] = useState(true);
  
  const { textRef, overlayRef, titleRef, subtitleRef, earthRef } = useTextSplashAnimation({
    title,
    subtitle,
    duration,
    onComplete: () => {
      // Immediately hide elements to stop visual updates
      setShowElements(false);
      
      // Kill all animations
      gsap.killTweensOf("*"); // Kill all GSAP animations
      gsap.killTweensOf(".spaceship"); // Kill spaceship animations specifically
      gsap.killTweensOf(".rocket"); // Kill rocket animations specifically
      gsap.killTweensOf("div"); // Kill all div animations
      gsap.killTweensOf("svg"); // Kill all SVG animations
      
      // Force kill all timelines
      gsap.globalTimeline.kill();
      
      // Reset all element positions to prevent continued translation
      gsap.set("*", { clearProps: "all" });
      gsap.set(".spaceship", { clearProps: "all" });
      gsap.set(".rocket", { clearProps: "all" });
      
      // Hide the component
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
      {showElements && (
        <>
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <SpaceshipSVG className="spaceship size-24" />
          <RocketSVG className="rocket size-24" />
          <div ref={earthRef} style={{position: 'absolute', top: '75%', left: '50%', transform: 'translate(-50%, 0%)' , height: '100%', width: '100%'}}>
            <img src="/earth.svg" className='' />
          </div>
        </>
      )}
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