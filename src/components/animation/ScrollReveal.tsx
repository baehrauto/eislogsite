// ---------------------------------------------------------------------------
// ScrollReveal
// ---------------------------------------------------------------------------
// Wraps any children and reveals them with a fade + directional slide when
// they enter the viewport. Uses Framer Motion's whileInView for performant
// intersection-based triggering.
//
// Props:
//   direction  - Which direction the element slides FROM (up/down/left/right)
//   delay      - Delay before animation starts (seconds)
//   duration   - Animation duration (seconds)
//   distance   - How far the element travels (pixels)
//   once       - If true, only animate the first time element enters viewport
//   className  - Additional CSS classes
//   children   - Content to reveal
// ---------------------------------------------------------------------------

import { type ReactNode } from "react";
import { motion, type Variant } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

// Calculate the initial offset based on direction
function getOffset(direction: string, distance: number): { x: number; y: number } {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: distance };
  }
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  once = true,
  className = "",
}: ScrollRevealProps) {
  const offset = getOffset(direction, distance);

  const hidden: Variant = {
    opacity: 0,
    x: offset.x,
    y: offset.y,
  };

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // out-expo
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{ hidden, visible }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
