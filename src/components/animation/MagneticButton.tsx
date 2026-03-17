// ---------------------------------------------------------------------------
// MagneticButton
// ---------------------------------------------------------------------------
// A button wrapper that subtly follows the cursor when hovering near it,
// creating a premium interactive feel. The magnetic effect uses Framer
// Motion's spring physics for natural movement.
//
// Props:
//   strength  - How strongly the button follows the cursor (0.1 = subtle,
//               0.5 = strong). Default is 0.3.
//   className - Additional CSS classes
//   children  - Button content
// ---------------------------------------------------------------------------

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  strength?: number;
  className?: string;
  children: ReactNode;
}

export default function MagneticButton({
  strength = 0.3,
  className = "",
  children,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring physics for smooth magnetic movement
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from cursor to button center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Apply strength multiplier
    x.set(deltaX * strength);
    y.set(deltaY * strength);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  // Respect reduced motion - skip magnetic effect entirely
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
