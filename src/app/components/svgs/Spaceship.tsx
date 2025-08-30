import * as React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface SpaceshipSVGProps extends React.SVGProps<SVGSVGElement> {
  onScrambleComplete?: () => void;
}

export const SpaceshipSVG = ({ onScrambleComplete, ...props }: SpaceshipSVGProps) => {
  const policeLightsRef = useRef<SVGPathElement>(null)
  const blueRingRef = useRef<SVGPathElement>(null)
  const windshieldRef = useRef<SVGPathElement>(null)
  const spaceshipGroupRef = useRef<SVGGElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!policeLightsRef.current || !wrapperRef.current) {
      console.log("refs not found")
      return
    }

    const randomTop = 105 + Math.random() * 12; // random between 105% and 115%
        
    // Initial state with randomized left position
    const randomLeft = Math.random() * 100; // Random value between 0 and 100
    gsap.set(wrapperRef.current, {
      position: 'absolute', 
      visibility: 'none', 
      transformOrigin: "center", 
      top: randomTop + "%", 
      left: `${randomLeft}%`, 
      xPercent: -50, 
      yPercent: -50 
    });
    
    // Create main timeline for sequence
    const mainTimeline = gsap.timeline();
    
    // 1. Wrapper appears with visibility and opacity
    mainTimeline.to(wrapperRef.current, {
      visibility: 'visible',
      opacity: 1,
      ease: "power1.inOut",
    }).to(wrapperRef.current, {
      duration: 1.2,
      rotate: () => Math.random() * 160 - 80, // [-80, 80),
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    
    // Police lights animation
    mainTimeline.to(policeLightsRef.current, {
      fill: "#0066ff",
      duration: 1,
      ease: "none",
      yoyo: true,
      repeat: -1,
      onStart: () => console.log("Police lights animation started!")
    }, 0.5)

    // Blue ring animation - synchronized with police lights
    mainTimeline.to(blueRingRef.current, {
      fill: "#0066ff",
      duration: 1,
      ease: "none",
      yoyo: true,
      repeat: -1,
      onStart: () => console.log("Blue ring animation started!")
    }, 0.5)

    // Windshield animation - synchronized with police lights and blue ring
    mainTimeline.to(windshieldRef.current, {
      fill: "#0066ff",
      duration: 1,
      ease: "none",
      yoyo: true,
      repeat: -1,
      onStart: () => console.log("Windshield animation started!")
    }, 0.5)
    
    // 4. Movement animation with randomized path
    const verticalDistance = 120; // Random distance between 100-140vh
    const movementDuration = 3; // Random duration between 8-13 seconds
    
// Vertical movement
mainTimeline.to(wrapperRef.current, {
  duration: movementDuration,
  y: `-${verticalDistance}vh`,
  ease: "power1.inOut",
});

// Randomized horizontal oscillation
const oscillationDistance = Math.random() * 300 + 100; // 100-400px
const oscillationDuration = Math.random() * 3 + 1.5; // 1.5-4.5s

gsap.to(wrapperRef.current, {
  x: `+=${oscillationDistance}px`,
  duration: oscillationDuration,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true,
});

    
    return () => {
      gsap.killTweensOf(policeLightsRef.current);
      gsap.killTweensOf(blueRingRef.current);
      gsap.killTweensOf(windshieldRef.current);
      gsap.killTweensOf(wrapperRef.current);
      mainTimeline.kill();
    };

  }, [onScrambleComplete])

  return (
    <div ref={wrapperRef} className="z-[20]" style={{ visibility: 'hidden', position: 'absolute', top: '105%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 535 535"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        {...props}
      >
    <g ref={spaceshipGroupRef}>
      {/* Main body */}
      <path
        fill="#6593A2"
        d="M517.434 282.185c.876-19.691-94.618-100.334-94.618-100.334l-271.005-73.8s-122.779 21.235-132.04 38.631c-9.262 17.397 0 111.89 222.695 172.507 222.694 60.618 274.092-17.313 274.968-37.004Z"
      />
    <path
      fill="#505C70"
      d="M426.945 168.961c-8.51-75.886-78.139-127.033-152.273-129.912-46.433-1.794-90.196 19.4-117.856 56.362-8.969 12.015-20.734 26.325-12.098 41.594 10.305 18.231 34.877 30.538 53.025 39.341 47.684 23.154 100.709 37.588 153.65 41.844 20.108 1.585 46.85 3.254 64.956-7.218 15.185-8.802 12.265-27.117 10.596-42.011Z"
    />
    <mask
      id="b"
      width={501}
      height={219}
      x={17}
      y={108}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path
        fill="#fff"
        d="M517.43 282.184c.876-19.691-94.618-100.333-94.618-100.333L151.807 108.05s-122.778 21.235-132.04 38.632c-9.261 17.397 3.046 92.699 225.74 153.316 222.695 60.618 271.047 1.878 271.923-17.814Z"
      />
    </mask>
    <g mask="url(#b)">
                            <path
                        ref={blueRingRef}
                        fill="#ff0000"
                        d="M247.926 291.822C113.759 255.276 14.593 187.608 21.143 138.213c-.584 1.419-1.126 2.837-1.502 4.339-13.517 49.687 87.61 120.442 225.866 158.114 138.256 37.631 261.326 27.91 274.843-21.777.417-1.502.709-3.004.876-4.506-19.358 45.849-139.174 53.943-273.3 17.439Z"
                      />
    </g>
    {/* Police lights */}
    <path
      ref={policeLightsRef}
      fill="#ff0000"
      d="M81.677 159.491c-2.795 3.88-10.22 3.296-16.604-1.294-6.383-4.589-9.261-11.472-6.466-15.352 2.795-3.88 10.22-3.296 16.604 1.293 6.383 4.631 9.261 11.473 6.466 15.353ZM123.064 198.331c-2.795 3.88-10.221 3.296-16.604-1.293-6.383-4.589-9.262-11.473-6.466-15.353 2.795-3.88 10.221-3.295 16.604 1.294 6.383 4.589 9.261 11.472 6.466 15.352ZM183.015 232.707c-2.086 4.297-9.512 5.048-16.562 1.627-7.092-3.42-11.139-9.678-9.053-13.975 2.086-4.297 9.512-5.048 16.562-1.627 7.051 3.421 11.139 9.637 9.053 13.975ZM260.321 260.658c-1.251 4.631-8.427 6.675-16.02 4.631-7.593-2.045-12.724-7.468-11.472-12.099 1.251-4.631 8.427-6.675 16.02-4.631 7.592 2.045 12.724 7.51 11.472 12.099ZM339.377 278.723c-.96 4.672-8.01 7.176-15.687 5.59-7.718-1.585-13.141-6.675-12.182-11.347.96-4.673 8.01-7.176 15.687-5.591 7.718 1.586 13.183 6.675 12.182 11.348ZM409.004 283.979c-.459 4.755-7.217 7.968-15.019 7.217-7.801-.793-13.767-5.298-13.308-10.054.459-4.756 7.217-7.969 15.019-7.218 7.801.751 13.767 5.257 13.308 10.055ZM482.597 270.838c1.209 4.631-3.964 10.013-11.556 12.015-7.593 2.003-14.769-.125-15.979-4.756-1.21-4.63 3.964-10.012 11.556-12.015 7.635-2.002 14.769.125 15.979 4.756Z"
    />

    {/* Glass Windshield */}
    <path
      ref={windshieldRef}
      fill="#ff0000"
      d="M430.155 159.24c-9.345-73.675-80.017-124.03-154.61-127.617-46.767-2.253-90.53 17.855-118.022 53.4-8.928 11.556-20.568 25.323-11.723 40.217 10.554 17.772 35.461 29.995 53.775 38.715 48.227 22.945 101.752 37.547 155.069 42.219 20.233 1.752 47.184 3.671 65.29-6.3 15.185-8.343 12.056-26.157 10.221-40.634Z"
    />
    
    {/* Claws */}
    <path
      fill="#93B1BB"
      d="m78.677 239.591 10.68 7.926c1.835 1.586 5.507 4.131 5.715 6.55.793 8.428.042 11.264-.459 17.731-.542 7.05-18.398-12.349-22.194-26.7-1.544-5.841 1.669-9.387 6.258-5.507Zm341.176 92.866-13.225 1.418c-2.378.417-6.842.793-8.26 2.754-4.923 6.842-5.758 9.678-8.595 15.477-3.128 6.383 22.153-1.335 32.666-11.764 4.297-4.172 3.338-8.928-2.586-7.885Zm-166.917-18.482c-1.377-2.753-5.465-4.755-7.718-5.715-4.422-1.919-9.804-2.086-14.268-.083-.918.417-1.627 1.168-1.877 2.127-1.335 5.257 2.378 20.651 9.136 20.442 3.087-.083 6.467-3.796 8.636-5.715 2.461-2.169 5.423-4.839 6.383-8.135.292-1.043.167-2.044-.292-2.921Z"
    />
    </g>
    <defs>
      <linearGradient
        id="a"
        x1={267.47}
        x2={209.527}
        y1={266.082}
        y2={482.602}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#40C0E7" />
        <stop offset={1} stopColor="#40C0E7" stopOpacity={0} />
      </linearGradient>
    </defs>
    </svg>
    </div>
  )
}
