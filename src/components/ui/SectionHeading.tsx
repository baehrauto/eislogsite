// ---------------------------------------------------------------------------
// SectionHeading
// ---------------------------------------------------------------------------
// Consistent heading pattern for content sections. Includes an optional
// overline label (uppercase, tracked) above the main heading. Uses the
// display font for the heading and body font for the overline.
//
// Props:
//   overline  - Small label text above the heading (e.g., "Our Services")
//   heading   - Main section heading text
//   className - Additional CSS classes for the wrapper
//   align     - Text alignment: "left" (default), "center", or "right"
// ---------------------------------------------------------------------------

import ScrollReveal from "../animation/ScrollReveal";

interface SectionHeadingProps {
  overline?: string;
  heading: string;
  className?: string;
  align?: "left" | "center" | "right";
}

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function SectionHeading({
  overline,
  heading,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  return (
    <ScrollReveal className={`${alignClasses[align]} ${className}`}>
      {overline && (
        <span className="label-text text-primary block mb-4">
          {overline}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight-display text-foreground">
        {heading}
      </h2>
    </ScrollReveal>
  );
}
