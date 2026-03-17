// ---------------------------------------------------------------------------
// useLenis Hook
// ---------------------------------------------------------------------------
// Provides access to the Lenis smooth scroll instance from any component.
// Stores the instance in a module-level variable set by SmoothScroll.
// ---------------------------------------------------------------------------

import Lenis from "lenis";

// Module-level reference to the active Lenis instance
let lenisInstance: Lenis | null = null;

// Called by SmoothScroll to register the instance
export function setLenisInstance(lenis: Lenis | null) {
  lenisInstance = lenis;
}

// Hook to access Lenis from any component
export function useLenis(): Lenis | null {
  return lenisInstance;
}
