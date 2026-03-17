import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ---------------------------------------------------------------------------
// Vite configuration for Autera Sites Framework
// ---------------------------------------------------------------------------
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Target modern browsers for smaller bundles
    target: "esnext",
    // Split vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          animation: ["framer-motion", "gsap"],
          three: ["three"],
          icons: ["lucide-react"],
        },
      },
    },
  },
});
