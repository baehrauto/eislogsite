// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------
// Reusable button with two variants: filled (primary) and outlined (ghost).
// Uses the brand primary color for fills and borders. Includes hover
// animations and focus states for accessibility.
//
// Props:
//   variant   - "filled" (default) or "outline"
//   size      - "sm", "md" (default), or "lg"
//   href      - If provided, renders as an anchor tag instead of button
//   className - Additional CSS classes
//   children  - Button label
//   ...rest   - Native button/anchor attributes
// ---------------------------------------------------------------------------

import { type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type ButtonVariant = "filled" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

// Discriminated union: either a button or an anchor
type ButtonProps =
  | (BaseButtonProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  | (BaseButtonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>);

// Size classes
const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
  lg: "px-10 py-4.5 text-base",
};

// Variant classes
const variantClasses: Record<ButtonVariant, string> = {
  filled: [
    "bg-primary text-background",
    "hover:bg-primary/90",
    "active:bg-primary/80",
  ].join(" "),
  outline: [
    "bg-transparent text-foreground",
    "border border-glass-border",
    "hover:border-primary hover:text-primary",
    "active:bg-primary/5",
  ].join(" "),
};

export default function Button(props: ButtonProps) {
  const {
    variant = "filled",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;

  const baseClasses = [
    "inline-flex items-center justify-center",
    "font-body font-semibold tracking-wide-label uppercase",
    "rounded-full",
    "transition-all duration-300 ease-out-expo",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ].join(" ");

  // Render as anchor if href is provided
  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant; size?: ButtonSize };
    return (
      <a href={href} className={baseClasses} {...anchorRest}>
        {children}
      </a>
    );
  }

  // Render as button
  const { variant: _v, size: _s, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize };
  return (
    <button className={baseClasses} {...buttonRest}>
      {children}
    </button>
  );
}
