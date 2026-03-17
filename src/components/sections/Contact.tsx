// ---------------------------------------------------------------------------
// Contact Section - EIS Logistics
// ---------------------------------------------------------------------------
// Full contact form with heading on the left, form on the right.
// Contact info moved to the nav bar.
// ---------------------------------------------------------------------------

import { clientConfig } from "../../client-config";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../animation/ScrollReveal";

export default function Contact() {
  const { contact, colors } = clientConfig;

  return (
    <section
      id="contact"
      className="relative py-section-sm md:py-section-md overflow-hidden"
      aria-label="Contact"
    >
      {/* Background depth */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 25% 60%, ${colors.primary}0D 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 80% 25%, ${colors.primary}0A 0%, transparent 45%),
            radial-gradient(ellipse 100% 40% at 50% 100%, ${colors.primary}08 0%, transparent 40%)
          `,
        }}
      />
      {/* Decorative corner arc */}
      <div
        className="absolute z-0 hidden lg:block"
        style={{
          left: "-8%",
          bottom: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: `1px solid ${colors.primary}0A`,
        }}
      />

      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left column - heading + context */}
          <div className="lg:col-span-5">
            <SectionHeading
              overline="Reach Out"
              heading={contact.heading}
              className="mb-8"
            />

            <ScrollReveal delay={0.15}>
              <p className="text-muted text-base leading-relaxed max-w-sm mb-8">
                Ready to discuss your logistics needs? Fill out the form and our
                team will get back to you within 24 hours.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.primary}10` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  <a href={`tel:${clientConfig.phone.replace(/[^+\d]/g, "")}`} className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    {clientConfig.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.primary}10` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <a href={`mailto:${clientConfig.email}`} className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    {clientConfig.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.primary}10` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <span className="text-foreground/70 text-sm">
                    {clientConfig.location}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column - form */}
          <div className="lg:col-span-7 lg:pt-4">
            <ScrollReveal direction="right" delay={0.2}>
              <form
                action={contact.formAction || "#"}
                method="POST"
                className="space-y-8"
                data-netlify="true"
                name="contact"
              >
                <input type="hidden" name="form-name" value="contact" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="label-text text-foreground/40 text-[10px] block mb-3"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-transparent border-b border-glass-border px-0 py-3 text-foreground text-base placeholder:text-foreground/20 focus:outline-none focus:border-primary transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="label-text text-foreground/40 text-[10px] block mb-3"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-transparent border-b border-glass-border px-0 py-3 text-foreground text-base placeholder:text-foreground/20 focus:outline-none focus:border-primary transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="label-text text-foreground/40 text-[10px] block mb-3"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full bg-transparent border-b border-glass-border px-0 py-3 text-foreground text-base placeholder:text-foreground/20 focus:outline-none focus:border-primary transition-colors duration-300"
                    placeholder="Company name (optional)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="label-text text-foreground/40 text-[10px] block mb-3"
                  >
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full bg-transparent border-b border-glass-border px-0 py-3 text-foreground text-base focus:outline-none focus:border-primary transition-colors duration-300 appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-foreground/20">
                      Select a service
                    </option>
                    <option value="hotshot">Hot Shot Services</option>
                    <option value="ftl">Full Truckload</option>
                    <option value="specialized">Specialized Equipment</option>
                    <option value="warehousing">Warehousing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="label-text text-foreground/40 text-[10px] block mb-3"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-glass-border px-0 py-3 text-foreground text-base placeholder:text-foreground/20 focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                    placeholder="Tell us about your shipment..."
                  />
                </div>

                <button
                  type="submit"
                  className="cta-btn group inline-flex items-center gap-4 px-12 py-5 rounded-full font-body font-semibold text-base tracking-wide-label uppercase text-foreground bg-foreground/[0.06] backdrop-blur-xl border border-foreground/[0.12] transition-all duration-500 ease-out-expo hover:gap-6 hover:bg-primary/[0.12] hover:border-primary/30 hover:text-primary hover:shadow-[0_8px_48px_rgba(3,169,244,0.2),0_0_60px_rgba(3,169,244,0.06)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Send Message
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
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
