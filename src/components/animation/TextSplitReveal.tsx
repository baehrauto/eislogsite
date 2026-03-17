// ---------------------------------------------------------------------------
// TextSplitReveal
// ---------------------------------------------------------------------------
// Takes a text string, splits it into individual character spans, and
// animates each character with a GSAP stagger effect. Perfect for hero
// headlines and section titles that need editorial impact.
//
// Props:
//   text         - The string to split and animate
//   tag          - HTML element to render (h1, h2, p, span, etc.)
//   staggerDelay - Delay between each character's animation (seconds)
//   duration     - Duration of each character's animation (seconds)
//   trigger      - "onMount" animates immediately, "onScroll" waits for viewport
//   className    - Additional CSS classes for the wrapper element
// ---------------------------------------------------------------------------

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextSplitRevealProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  staggerDelay?: number;
  duration?: number;
  trigger?: "onMount" | "onScroll";
  className?: string;
}

export default function TextSplitReveal({
  text,
  tag: Tag = "h1",
  staggerDelay = 0.03,
  duration = 0.8,
  trigger = "onScroll",
  className = "",
}: TextSplitRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      charsRef.current.forEach((char) => {
        if (char) {
          char.style.opacity = "1";
          char.style.transform = "none";
        }
      });
      return;
    }

    const chars = charsRef.current.filter(Boolean);

    // Set initial state
    gsap.set(chars, {
      opacity: 0,
      y: 40,
      rotateX: -40,
    });

    const animationConfig: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      stagger: staggerDelay,
      ease: "power3.out",
    };

    if (trigger === "onScroll") {
      gsap.to(chars, {
        ...animationConfig,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.to(chars, animationConfig);
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) {
          st.kill();
        }
      });
    };
  }, [text, staggerDelay, duration, trigger]);

  // Split text into words, then characters, preserving spaces
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <div ref={containerRef} style={{ perspective: "1000px" }}>
      <Tag className={className} aria-label={text}>
        {words.map((word, wordIdx) => (
          <span
            key={wordIdx}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word.split("").map((char) => {
              const idx = charIndex++;
              return (
                <span
                  key={idx}
                  ref={(el) => {
                    if (el) charsRef.current[idx] = el;
                  }}
                  style={{
                    display: "inline-block",
                    willChange: "transform, opacity",
                  }}
                  aria-hidden="true"
                >
                  {char}
                </span>
              );
            })}
            {/* Add a space between words (not after last word) */}
            {wordIdx < words.length - 1 && (
              <span style={{ display: "inline-block", width: "0.3em" }}>
                &nbsp;
              </span>
            )}
          </span>
        ))}
      </Tag>
    </div>
  );
}
