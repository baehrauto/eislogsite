// ---------------------------------------------------------------------------
// Footer - EIS Logistics
// ---------------------------------------------------------------------------
// Minimal footer with business info, nav, contact details. Light theme.
// Mandatory "Powered by Autera" attribution.
// ---------------------------------------------------------------------------

import { clientConfig } from "../../client-config";
import ScrollReveal from "../animation/ScrollReveal";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-glass-border"
      role="contentinfo"
      style={{
        background: `linear-gradient(180deg, ${clientConfig.colors.background} 0%, #EEF4F9 40%, #E8F0F7 100%)`,
      }}
    >
      <div className="section-container py-16 md:py-24">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Column 1 - Business Info */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl tracking-tight-display">
                {clientConfig.businessName}
              </h3>
              <p className="text-muted text-sm leading-relaxed max-w-xs">
                {clientConfig.footer.description}
              </p>
            </div>

            {/* Column 2 - Navigation */}
            <div className="space-y-4">
              <h4 className="label-text text-foreground/40 text-[10px]">
                Navigation
              </h4>
              <ul className="space-y-3">
                {clientConfig.navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div className="space-y-4">
              <h4 className="label-text text-foreground/40 text-[10px]">
                Connect
              </h4>
              <div className="space-y-3 text-sm text-muted">
                {clientConfig.email && (
                  <a
                    href={`mailto:${clientConfig.email}`}
                    className="block hover:text-primary transition-colors duration-300"
                  >
                    {clientConfig.email}
                  </a>
                )}
                {clientConfig.phone && (
                  <a
                    href={`tel:${clientConfig.phone.replace(/[^+\d]/g, "")}`}
                    className="block hover:text-primary transition-colors duration-300"
                  >
                    {clientConfig.phone}
                  </a>
                )}
                {clientConfig.location && (
                  <p>{clientConfig.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/25">
            <p>
              {currentYear} {clientConfig.businessName}.{" "}
              {clientConfig.footer.copyright}
            </p>
            <a
              href={clientConfig.footer.poweredBy.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-300"
            >
              {clientConfig.footer.poweredBy.text}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
