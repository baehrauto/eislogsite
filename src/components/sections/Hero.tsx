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
              #0F1D33 18%,
              #132642 35%,
              #1A3355 50%,
              #1E4068 62%,
              #2A5580 72%,
              #4A7A9B 80%,
              #8BB8D4 88%,
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

          {/* CTA Button */}
          <ScrollReveal delay={1.1} duration={0.8}>
            <MagneticButton strength={0.15}>
              <a
                href={hero.ctaLink}
                className="hero-cta group relative inline-flex items-center gap-4 overflow-hidden rounded-full font-body font-semibold text-base tracking-wide-label uppercase transition-all duration-500 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {/* Animated background layer */}
                <span className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-full transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/30" />
                {/* Animated route line on hover */}
                <span className="absolute inset-0 overflow-hidden rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none" fill="none">
                    <path
                      d="M-20 30 Q30 10 60 30 T120 25 T200 35"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="1"
                      strokeDasharray="4 3"
                      className="hero-cta-route"
                    />
                    <path
                      d="M-20 42 Q50 55 100 38 T220 45"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.8"
                      strokeDasharray="3 4"
                      className="hero-cta-route2"
                    />
                    {/* Traveling dot */}
                    <circle r="2" fill="rgba(255,255,255,0.5)" className="hero-cta-dot">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M-20 30 Q30 10 60 30 T120 25 T200 35" />
                    </circle>
                    <circle r="1.5" fill="rgba(255,255,255,0.3)" className="hero-cta-dot">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M-20 42 Q50 55 100 38 T220 45" />
                    </circle>
                    {/* Tiny stars */}
                    <circle cx="30" cy="15" r="0.8" fill="white" opacity="0.3">
                      <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="150" cy="12" r="0.6" fill="white" opacity="0.2">
                      <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="90" cy="8" r="0.7" fill="white" opacity="0.25">
                      <animate attributeName="opacity" values="0.1;0.35;0.1" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </span>
                {/* Text content */}
                <span className="relative z-10 flex items-center gap-4 px-12 py-5 text-white transition-all duration-500 group-hover:gap-5">
                  {hero.ctaText}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5"
                  >
                    <path
                      d="M4 10h12m0 0l-4-4m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
