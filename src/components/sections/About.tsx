// ---------------------------------------------------------------------------
// About Section - EIS Logistics
// ---------------------------------------------------------------------------
// Full-width editorial layout with large pull quote styling. Uses the
// opacity ladder for layered backgrounds. Key stats displayed as large
// typographic elements.
// ---------------------------------------------------------------------------

import { clientConfig } from "../../client-config";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../animation/ScrollReveal";
import StaggerChildren from "../animation/StaggerChildren";

export default function About() {
  const { about, colors } = clientConfig;

  const stats = [
    { value: "1996", label: "Founded" },
    { value: "70K", label: "Sq Ft Warehouse" },
    { value: "8", label: "Acre Facility" },
  ];

  return (
    <section
      id="about"
      className="relative py-section-sm md:py-section-md overflow-hidden"
      aria-label="About"
    >
      {/* Background depth layers */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 50%, ${colors.primary}0A 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 95% 20%, ${colors.primary}10 0%, transparent 45%),
            radial-gradient(ellipse 40% 50% at 5% 80%, ${colors.primary}08 0%, transparent 45%),
            linear-gradient(180deg, ${colors.background} 0%, #F0F6FA 30%, #EBF3F9 50%, #F0F6FA 70%, ${colors.background} 100%)
          `,
        }}
      />
      {/* Large decorative circle */}
      <div
        className="absolute z-0 hidden lg:block"
        style={{
          right: "-10%",
          top: "15%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          border: `1px solid ${colors.primary}10`,
        }}
      />

      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left column - heading + stats */}
          <div className="lg:col-span-5">
            <SectionHeading
              overline="Who We Are"
              heading={about.heading}
              className="mb-12 lg:mb-16"
            />

            {/* Stats grid */}
            <StaggerChildren
              staggerDelay={0.15}
              direction="up"
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <span
                    className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight-display block mb-1"
                    style={{ color: colors.primary }}
                  >
                    {stat.value}
                  </span>
                  <span className="label-text text-muted text-[10px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </StaggerChildren>
          </div>

          {/* Right column - body text */}
          <div className="lg:col-span-7 lg:pt-16">
            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                {about.body.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-foreground/70 text-base md:text-lg leading-[1.8]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>

            {/* Decorative accent line */}
            <ScrollReveal delay={0.4}>
              <div
                className="mt-10 h-px w-24"
                style={{
                  background: `linear-gradient(90deg, ${colors.primary}40, transparent)`,
                }}
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
