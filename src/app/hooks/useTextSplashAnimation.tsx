import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";


gsap.registerPlugin(ScrambleTextPlugin);

interface UseTextSplashAnimationProps {
  title: string;
  subtitle: string;
  duration: number;
  onComplete?: () => void;
}

export const useTextSplashAnimation = ({ 
  title, 
  subtitle,
  duration, 
  onComplete 
}: UseTextSplashAnimationProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state - text starts visible, overlay at bottom
      gsap.set(textRef.current, { opacity: 1, y: 0 });
      gsap.set(overlayRef.current, { y: 0 });

      // Create timeline
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        }
      });

      // Animate title with scramble effect
      if (titleRef.current) {
        const titleTextSpan = titleRef.current.querySelector('.title-text') as HTMLElement;
        if (titleTextSpan) {
          tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          })
          .to(titleTextSpan, {
            scrambleText: {
              text: title,
              chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
              speed: 0.25,
              newClass: "scrambled"
            },
            duration: 3
          }, 0);
        }
      }

      // Animate subtitle with scramble effect (delayed)
      if (subtitleRef.current) {
        const subtitleTextSpan = subtitleRef.current.querySelector('.subtitle-text') as HTMLElement;
        const periodSpan = subtitleRef.current.querySelector('.period-text') as HTMLElement;
        if (subtitleTextSpan) {
          tl.to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          }, 0.6)
          .to(subtitleTextSpan, {
            scrambleText: {
              text: subtitle,
              chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
              speed: 0.5,
              newClass: "scrambled"
            },
            duration: 2
          }, 0.6);
        }
        
        // Animate period with scramble effect after subtitle
        if (periodSpan) {
          tl.to(periodSpan, {
            scrambleText: {
              text: ".",
              chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
              speed: 0.5,
              newClass: "scrambled"
            },
            duration: 4
          }, .6); // Start at same time as subtitle
        }
      }

      // Hold text for specified duration
      tl.to(textRef.current, {
        duration: duration / 1000
      }, 3.6) // Start after subtitle finishes (0.6 + 2 + 1)
      // Fade out text completely
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.in'
      })
      // Wait a moment after text disappears, then slide overlay
      .to(overlayRef.current, {
        y: '-100%',
        duration: 1.5,
        ease: 'power2.inOut'
      }, '+=0.2');
      //  // Wait 0.2 seconds after text fade completes

    }, overlayRef);

    return () => ctx.revert();
  }, [title, subtitle, duration, onComplete]);

  return { textRef, overlayRef, titleRef, subtitleRef };
}; 