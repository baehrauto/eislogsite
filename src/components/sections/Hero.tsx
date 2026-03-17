// ---------------------------------------------------------------------------
// Hero Section - EIS Logistics
// ---------------------------------------------------------------------------
// Full-viewport immersive hero. Content pinned bottom-left. Background is
// a rich Three.js scene with wireframe globe, animated route lines, star
// particles, and drifting truck silhouettes.
// ---------------------------------------------------------------------------

import { clientConfig } from "../../client-config";
import TextSplitReveal from "../animation/TextSplitReveal";
import ScrollReveal from "../animation/ScrollReveal";
import MagneticButton from "../animation/MagneticButton";
import HeroScene from "../animation/HeroScene";

export default function Hero() {
  const { hero, colors } = clientConfig;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden"
      aria-label="Hero"
    >
      {/* Sky gradient - dark navy at top fading to light at bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(180deg,
              #0B1628 0%,
              #0E1A2F 20%,
              #112238 40%,
              #152D48 55%,
              #1A3858 68%,
              #1E4568 78%,
              #2A5580 86%,
              #4A7A9B 92%,
              ${colors.background} 100%
            )
          `,
        }}
      />

      {/* Atmospheric glow washes */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse 80% 40% at 65% 25%, ${colors.primary}20 0%, transparent 50%),
            radial-gradient(ellipse 60% 30% at 30% 70%, ${colors.primary}0D 0%, transparent 50%),
            radial-gradient(ellipse 100% 50% at 50% 0%, rgba(11,22,40,0.4) 0%, transparent 60%)
          `,
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Three.js scene - globe, routes, stars, trucks */}
      <div className="absolute inset-0 z-[3]">
        <HeroScene color={colors.primary} />
      </div>

      {/* Bottom fade into page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[4]"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${colors.background} 100%)`,
        }}
      />

      {/* Content - bottom left */}
      <div className="relative z-10 section-container pb-20 md:pb-28 lg:pb-32 pt-40">
        <div className="max-w-2xl">
          {/* Overline */}
          <ScrollReveal delay={0.2} duration={0.6}>
            <span className="label-text text-white/60 block mb-5">
              Since 1996 &mdash; MC# 323718
            </span>
          </ScrollReveal>

          {/* Headline */}
          <div className="mb-6">
            <TextSplitReveal
              text={hero.headline}
              tag="h1"
              trigger="onMount"
              staggerDelay={0.025}
              duration={0.9}
              className="font-display text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] xl:text-[5.5rem] tracking-tight-display leading-[0.95] text-white"
            />
          </div>

          {/* Subheadline */}
          <ScrollReveal delay={0.8} duration={0.8}>
            <p className="text-sm md:text-base text-white/50 max-w-md mb-10 font-body leading-relaxed">
              {hero.subheadline}
            </p>
          </ScrollReveal>

          {/* CTA Button - frosted glass on dark */}
          <ScrollReveal delay={1.1} duration={0.8}>
            <MagneticButton strength={0.15}>
              <a
                href={hero.ctaLink}
                className="cta-btn group inline-flex items-center gap-4 px-12 py-5 rounded-full font-body font-semibold text-base tracking-wide-label uppercase text-white bg-white/[0.12] backdrop-blur-xl border border-white/25 transition-all duration-500 ease-out-expo hover:gap-6 hover:bg-white/[0.22] hover:border-white/40 hover:shadow-[0_8px_48px_rgba(3,169,244,0.3),0_0_80px_rgba(3,169,244,0.1)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {hero.ctaText}
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
      </div>
    </section>
  );
}
