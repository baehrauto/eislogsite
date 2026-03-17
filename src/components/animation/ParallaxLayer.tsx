// ---------------------------------------------------------------------------
// ParallaxLayer
// ---------------------------------------------------------------------------
// Wraps an element and offsets its scroll speed relative to the page.
// Uses GSAP ScrollTrigger for smooth, performant parallax.
//
// Props:
//   speed    - Parallax speed multiplier. 0.5 = slow (moves less than scroll),
//              1.0 = normal, 1.5 = fast (moves more than scroll).
//              Negative values reverse direction.
//   children - Content to apply parallax to
//   className - Additional CSS classes
// ---------------------------------------------------------------------------

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  speed?: number;
  children: ReactNode;
  className?: string;
}

export default function ParallaxLayer({
  speed = 0.5,
  children,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Calculate the Y offset based on speed. A speed of 0.5 means the
    // element moves at half the scroll rate, creating a depth effect.
    const yOffset = (1 - speed) * 100;

    const tween = gsap.fromTo(
      el,
      { y: -yOffset },
      {
        y: yOffset,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
