// ---------------------------------------------------------------------------
// useScrollProgress Hook
// ---------------------------------------------------------------------------
// Returns a 0-1 value representing overall page scroll progress.
// Useful for scroll-linked animations like progress bars, nav background
// opacity, or parallax calculations.
// ---------------------------------------------------------------------------

import { useState, useEffect } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        setProgress(0);
        return;
      }

      setProgress(Math.min(scrollTop / docHeight, 1));
    }

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Set initial value

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
