// ---------------------------------------------------------------------------
// Testimonials Section
// ---------------------------------------------------------------------------
// Displays client testimonials in a staggered grid of glass cards. Each
// card shows the quote, client name, and their role/company. Uses a
// large decorative quotation mark for visual interest.
// ---------------------------------------------------------------------------

import { clientConfig } from "../../client-config";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import StaggerChildren from "../animation/StaggerChildren";

export default function Testimonials() {
  const { testimonials } = clientConfig;

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="py-section-sm md:py-section-md"
      aria-label="Testimonials"
    >
      <div className="section-container">
        <SectionHeading
          overline="Client Stories"
          heading="Testimonials"
          align="center"
          className="mb-16 md:mb-24"
        />

        <StaggerChildren
          staggerDelay={0.15}
          direction="up"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <Card key={index} padding="lg" className="relative">
              {/* Decorative quote mark */}
              <span
                className="absolute top-6 right-8 font-display text-6xl text-primary/10 leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote */}
              <blockquote className="relative z-10">
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-8 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer>
                  <cite className="not-italic">
                    <span className="block text-foreground font-semibold text-sm">
                      {testimonial.name}
                    </span>
                    <span className="block text-foreground/40 text-xs mt-1">
                      {testimonial.role}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </Card>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
