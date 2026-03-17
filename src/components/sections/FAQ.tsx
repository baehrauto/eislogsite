// ---------------------------------------------------------------------------
// FAQ Section - EIS Logistics
// ---------------------------------------------------------------------------
// Clean accordion layout with editorial number labels. Single-item expand.
// Smooth height animation via Framer Motion.
// ---------------------------------------------------------------------------

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clientConfig } from "../../client-config";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../animation/ScrollReveal";

export default function FAQ() {
  const { faq, colors } = clientConfig;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faq || faq.length === 0) return null;

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section
      id="faq"
      className="relative py-section-sm md:py-section-md overflow-hidden"
      aria-label="Frequently asked questions"
    >
      {/* Background depth */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 85% 40%, ${colors.primary}10 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 10% 70%, ${colors.primary}08 0%, transparent 45%),
            linear-gradient(180deg, ${colors.background} 0%, #F4F8FB 50%, ${colors.background} 100%)
          `,
        }}
      />
      {/* Decorative horizontal line */}
      <div
        className="absolute top-[50%] left-0 right-0 h-px z-0 hidden lg:block"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.primary}08, transparent)`,
        }}
      />

      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column - heading */}
          <div className="lg:col-span-4">
            <SectionHeading
              overline="FAQ"
              heading="Common Questions"
              className="lg:sticky lg:top-24"
            />
          </div>

          {/* Right column - accordion */}
          <div className="lg:col-span-8">
            {faq.map((item, index) => {
              const isOpen = openIndex === index;
              const number = String(index + 1).padStart(2, "0");

              return (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <div className="border-t border-glass-border">
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex items-start gap-6 py-6 md:py-8 text-left group transition-colors"
                      aria-expanded={isOpen}
                    >
                      {/* Number */}
                      <span
                        className="label-text text-[11px] mt-1.5 flex-shrink-0 transition-colors duration-300"
                        style={{ color: isOpen ? colors.primary : colors.muted }}
                      >
                        {number}
                      </span>

                      {/* Question */}
                      <span className="font-body font-medium text-base md:text-lg leading-snug flex-1 group-hover:text-primary transition-colors duration-300">
                        {item.question}
                      </span>

                      {/* Toggle indicator */}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-shrink-0 text-muted text-xl leading-none mt-0.5"
                      >
                        +
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.3, delay: 0.05 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pl-12 md:pl-14 pb-8 text-muted text-sm md:text-base leading-relaxed max-w-2xl">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
            {/* Final border */}
            <div className="border-t border-glass-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
