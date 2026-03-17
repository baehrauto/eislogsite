// ---------------------------------------------------------------------------
// Client Configuration - EIS Logistics
// ---------------------------------------------------------------------------

export const clientConfig = {
  // -- Business Information ------------------------------------------------
  businessName: "EIS Logistics",
  tagline: "Maximum Responsive Service, Anytime and Anywhere",
  industry: "Logistics",
  location: "7150 Standard Dr, Hanover, MD 21076",
  currentWebsiteUrl: "https://eislog.com",
  phone: "443-661-9195",
  email: "info@eislog.com",
  hours: "",
  mcNumber: "MC# 323718",
  founded: "1996",

  // -- Design System -------------------------------------------------------
  colors: {
    primary: "#03A9F4",
    background: "#FAFBFC",
    foreground: "#1A1F2E",
    muted: "#7C8494",
    glassBorder: "#E2E5EB",
  },

  fonts: {
    display: "Instrument Serif",
    body: "Inter",
  },

  theme: "light" as "dark" | "light",

  // -- Hero Section --------------------------------------------------------
  hero: {
    headline: "Maximum Responsive Service, Anytime and Anywhere",
    subheadline: "Hot shot, full truckload, specialized equipment, and warehousing solutions since 1996.",
    ctaText: "Get a Quote",
    ctaLink: "#contact",
    backgroundType: "gradient" as "image" | "video" | "gradient",
    backgroundSrc: "",
  },

  // -- Services Section ----------------------------------------------------
  services: [
    {
      title: "Hot Shot Services",
      description: "From sprinter vans to 26 foot straight trucks, our team is ready to take on your most urgent runs and deliver direct to your customer as quickly as possible.",
      icon: "Zap",
    },
    {
      title: "Full Truckload",
      description: "Covering full truckload services from start to finish. When you have a full 48', 53', Dry or Refrigerated Truckload request, reach out to our team for the most responsive service and attention.",
      icon: "Truck",
    },
    {
      title: "Specialized Equipment",
      description: "Whether you need a Flatbed, Step deck, RGN or any other specialized equipment, trust our team to find you the right equipment at the right price.",
      icon: "Settings",
    },
    {
      title: "Warehousing",
      description: "Our 70,000 square foot warehouse offers storage, cross docking, project and fulfillment solutions. We sit on an 8 acre lot that includes a 1 acre secured fenced and gated lot for oversized material or items requiring outdoor storage.",
      icon: "Warehouse",
    },
  ] as { title: string; description: string; icon?: string }[],

  // -- About Section -------------------------------------------------------
  about: {
    heading: "About EIS Logistics",
    body: "Founded in 1996, EIS Logistics has built a reputation for reliable, consistent, and responsive service across the logistics industry. Based in Hanover, Maryland, we operate from a strategically located 70,000 square foot warehouse on an 8-acre lot, giving us the capacity and flexibility to handle any logistics challenge.\n\nFrom urgent hot shot deliveries to full truckload management and specialized equipment sourcing, our team brings decades of experience and a commitment to getting the job done right - every time.",
    image: "",
  },

  // -- Testimonials Section ------------------------------------------------
  testimonials: [] as { name: string; role: string; quote: string }[],

  // -- CTA Section ---------------------------------------------------------
  cta: {
    heading: "Ready to Move?",
    subheading: "Let our team handle the logistics so you can focus on your business.",
    buttonText: "Contact Us",
    buttonLink: "#contact",
  },

  // -- Contact Section -----------------------------------------------------
  contact: {
    heading: "Get in Touch",
    formAction: "",
    showMap: false,
  },

  // -- FAQ Section ---------------------------------------------------------
  faq: [
    {
      question: "What areas do you service?",
      answer: "We provide logistics services nationwide from our base in Hanover, MD. Our hot shot services, full truckload, and specialized equipment solutions cover the entire continental United States.",
    },
    {
      question: "What types of trucks are available for hot shot services?",
      answer: "Our hot shot fleet ranges from sprinter vans to 26 foot straight trucks, ready to handle your most urgent delivery needs with direct-to-customer service.",
    },
    {
      question: "Do you offer warehousing and storage?",
      answer: "Yes. Our 70,000 square foot warehouse offers storage, cross docking, project and fulfillment solutions. We also have a 1-acre secured, fenced, and gated lot for oversized material or items requiring outdoor storage.",
    },
    {
      question: "What specialized equipment can you source?",
      answer: "We can source Flatbeds, Step decks, RGNs, and any other specialized equipment your shipment requires. Our team will find the right equipment at the right price.",
    },
    {
      question: "How long has EIS Logistics been in business?",
      answer: "EIS Logistics was founded in 1996 and has been providing reliable logistics services for nearly three decades. Our MC number is 323718.",
    },
  ] as { question: string; answer: string }[],

  // -- Navigation ----------------------------------------------------------
  navLinks: [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ] as { label: string; href: string }[],

  // -- Social Links --------------------------------------------------------
  socialLinks: {
    instagram: "",
    facebook: "",
    google: "",
  },

  // -- Footer --------------------------------------------------------------
  footer: {
    description: "Reliable logistics services since 1996. Hot shot, full truckload, specialized equipment, and warehousing from Hanover, MD.",
    copyright: "All rights reserved.",
    poweredBy: {
      text: "Powered by Autera",
      link: "https://autera.us",
    },
  },

  // -- Technical -----------------------------------------------------------
  analyticsEnabled: false,
  contactFormEnabled: false,
};

// ---------------------------------------------------------------------------
// Type export for use across the application
// ---------------------------------------------------------------------------
export type ClientConfig = typeof clientConfig;
