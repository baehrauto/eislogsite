// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------
// Glass-morphism card component for services, features, and content blocks.
// Uses backdrop blur and subtle borders for depth. Hover state lifts the
// card slightly with an enhanced shadow.
//
// Props:
//   children  - Card content
//   className - Additional CSS classes
//   hover     - Enable hover lift effect (default: true)
//   padding   - Padding size: "sm", "md" (default), "lg"
// ---------------------------------------------------------------------------

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-4 md:p-6",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-12",
};

export default function Card({
  children,
  className = "",
  hover = true,
  padding = "md",
}: CardProps) {
  return (
    <motion.div
      className={`glass ${paddingClasses[padding]} ${className}`}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: "0 12px 48px rgba(0, 0, 0, 0.18)",
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
