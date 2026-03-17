import type { Config } from "tailwindcss";

// ---------------------------------------------------------------------------
// Tailwind CSS Configuration
// ---------------------------------------------------------------------------
// Colors, fonts, and spacing are populated from client-config.ts values.
// When building a new client site, Claude Code updates this file with the
// design system generated from the client brief. The values below are
// sensible defaults that render a working dark-theme site out of the box.
// ---------------------------------------------------------------------------

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // -- Colors ----------------------------------------------------------
      // These map directly to clientConfig.colors. Claude Code will replace
      // them with the exact hex values from the client brief.
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        "glass-border": "var(--color-glass-border)",
      },

      // -- Typography ------------------------------------------------------
      // Display + body font pairing. Claude Code will set these to the
      // Google Fonts chosen during Phase 2.
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },

      // -- Spacing ---------------------------------------------------------
      // Generous section padding for premium feel.
      spacing: {
        "section-sm": "6rem",   // 96px  - minimum section padding
        "section-md": "8rem",   // 128px - default section padding
        "section-lg": "10rem",  // 160px - extra breathing room
      },

      // -- Letter spacing --------------------------------------------------
      letterSpacing: {
        "tight-display": "-0.03em",  // Negative tracking on headings
        "wide-label": "0.12em",      // Uppercase label tracking
      },

      // -- Border radius ---------------------------------------------------
      borderRadius: {
        glass: "1rem",
      },

      // -- Box shadow ------------------------------------------------------
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.12)",
        "glass-hover": "0 12px 48px rgba(0, 0, 0, 0.18)",
      },

      // -- Backdrop blur ---------------------------------------------------
      backdropBlur: {
        glass: "16px",
      },

      // -- Transitions -----------------------------------------------------
      transitionDuration: {
        DEFAULT: "300ms",
        slow: "600ms",
        slower: "900ms",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
