// ---------------------------------------------------------------------------
// CTA Section - EIS Logistics
// ---------------------------------------------------------------------------
// Bold blue-tinted band with centered headline and action button.
// ---------------------------------------------------------------------------

import { clientConfig } from "../../client-config";
import ScrollReveal from "../animation/ScrollReveal";
import MagneticButton from "../animation/MagneticButton";

export default function CTA() {
  const { cta, colors } = clientConfig;

  return (
    <section
      id="cta"
      className="relative py-section-sm md:py-section-md overflow-hidden"
      aria-label="Call to action"
    >
      {/* Blue-tinted background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(135deg, #0D2847 0%, #103460 30%, #164578 50%, #1A5590 70%, #1E6AAD 100%)
          `,
        }}
      />

      {/* Decorative gradient orbs */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 80%, ${colors.primary}25 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 80% 20%, ${colors.primary}18 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, ${colors.primary}08 0%, transparent 60%)
          `,
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Top and bottom edge gradients for seamless blending */}
      <div
        className="absolute top-0 left-0 right-0 h-24 z-[3]"
        style={{
          background: `linear-gradient(180deg, ${colors.background} 0%, transparent 100%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-[3]"
        style={{
          background: `linear-gradient(0deg, ${colors.background} 0%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 section-container text-center">
        <ScrollReveal>
          <span className="label-text text-white/40 block mb-6">
            Let&apos;s Work Together
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight-display mb-6 max-w-3xl mx-auto text-white">
            {cta.heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-12">
            {cta.subheading}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <MagneticButton strength={0.15}>
            <a
              href={cta.buttonLink}
              className="cta-btn group inline-flex items-center gap-4 px-12 py-5 rounded-full font-body font-semibold text-base tracking-wide-label uppercase text-white bg-white/[0.12] backdrop-blur-xl border border-white/25 transition-all duration-500 ease-out-expo hover:gap-6 hover:bg-white/[0.22] hover:border-white/40 hover:shadow-[0_8px_48px_rgba(3,169,244,0.3),0_0_80px_rgba(3,169,244,0.1)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {cta.buttonText}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              >
                <path
                  d="M4 10h12m0 0l-4-4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
