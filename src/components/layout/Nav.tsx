// ---------------------------------------------------------------------------
// Nav - EIS Logistics
// ---------------------------------------------------------------------------
// Fixed nav. White text over the dark hero, transitions to dark text with
// glass backdrop once the user scrolls past the hero.
// ---------------------------------------------------------------------------

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clientConfig } from "../../client-config";
import { useScrollProgress } from "../../hooks/useScrollProgress";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const progress = useScrollProgress();
  const scrolled = progress > 0.02;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setIsOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 shadow-sm" : "bg-transparent py-5"
      }`}
      style={
        scrolled
          ? {
              backgroundColor: "rgba(250, 251, 252, 0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--color-glass-border)",
            }
          : undefined
      }
    >
      <nav className="section-container flex items-center justify-between">
        {/* Logo + Business Name */}
        <a
          href="#"
          className="flex items-center gap-2.5 group"
          aria-label={`${clientConfig.businessName} - Home`}
        >
          <img
            src="/assets/logo.png"
            alt=""
            className={`h-9 w-9 object-contain transition-all duration-500 group-hover:scale-105 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
          <div className="leading-none">
            <span
              className={`font-display text-lg tracking-tight-display block transition-colors duration-500 group-hover:text-primary ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              EIS
            </span>
            <span
              className={`font-body text-[10px] font-semibold tracking-wide-label uppercase block transition-colors duration-500 group-hover:text-primary ${
                scrolled ? "text-muted" : "text-white/60"
              }`}
            >
              Logistics
            </span>
          </div>
        </a>

        {/* Desktop Navigation + Contact Info */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8" role="navigation">
            {clientConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`label-text hover:text-primary transition-colors duration-500 ${
                    scrolled ? "text-foreground/50" : "text-white/60"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className={`label-text text-[11px] px-5 py-2.5 rounded-full border transition-all duration-500 hover:scale-[1.03] active:scale-[0.97] ${
              scrolled
                ? "bg-foreground/[0.06] text-foreground border-foreground/[0.12] backdrop-blur-xl hover:bg-primary/[0.12] hover:border-primary/30 hover:text-primary hover:shadow-[0_4px_24px_rgba(3,169,244,0.15)]"
                : "bg-white/[0.12] text-white border-white/25 backdrop-blur-xl hover:bg-white/[0.22] hover:border-white/40 hover:shadow-[0_4px_24px_rgba(3,169,244,0.2)]"
            }`}
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <motion.span
            className={`block w-6 h-px origin-center transition-colors duration-500 ${
              scrolled || isOpen ? "bg-foreground" : "bg-white"
            }`}
            animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`block w-6 h-px transition-colors duration-500 ${
              scrolled || isOpen ? "bg-foreground" : "bg-white"
            }`}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className={`block w-6 h-px origin-center transition-colors duration-500 ${
              scrolled || isOpen ? "bg-foreground" : "bg-white"
            }`}
            animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 md:hidden"
            style={{
              backgroundColor: "rgba(250, 251, 252, 0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <nav className="flex flex-col items-center justify-center h-full gap-10">
              {clientConfig.navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-3xl text-foreground hover:text-primary transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
