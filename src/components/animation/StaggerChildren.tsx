// ---------------------------------------------------------------------------
// StaggerChildren
// ---------------------------------------------------------------------------
// Wraps multiple children and reveals them sequentially with a stagger
// effect when they enter the viewport. Each direct child gets its own
// animation with an incremental delay.
//
// Props:
//   staggerDelay - Delay between each child's reveal (seconds)
//   direction    - Direction children slide FROM (up/down/left/right)
//   duration     - Duration of each child's animation (seconds)
//   distance     - How far each child slides (pixels)
//   once         - If true, only animate the first time
//   className    - Additional CSS classes for the wrapper
//   children     - Elements to stagger
// ---------------------------------------------------------------------------

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

interface StaggerChildrenProps {
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  children: ReactNode;
}

export default function StaggerChildren({
  staggerDelay = 0.1,
  direction = "up",
  duration = 0.6,
  distance = 30,
  once = true,
  className = "",
  children,
}: StaggerChildrenProps) {
  // Calculate offset based on direction
  const offset = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }[direction];

  // Container variants control the stagger orchestration
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  // Each child fades in and slides from the specified direction
  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Convert children to array for individual wrapping
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={containerVariants}
      className={className}
    >
      {childArray.map((child, index) => (
        <motion.div key={index} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
