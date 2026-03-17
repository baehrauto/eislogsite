# CLAUDE.md - Build Instructions for Autera Sites Framework

This file tells Claude Code exactly how to build a client website from the brief. Follow every step in order. Do not skip phases. Do not improvise on color choices.

---

## Phase 0 - Client Intake

Before anything else, check if client-brief.md has been filled out.

If client-brief.md is still empty (all fields blank), run the interactive intake flow defined in .claude/skills/intake/SKILL.md. Ask the user each question one at a time in the terminal. Fill out client-brief.md and client-config.ts from their answers. Then proceed to Phase 1.

If client-brief.md is already filled out, skip directly to Phase 1.

---

## Phase 1 - Read and Scrape

### Step 1: Read the brief

Read `client-brief.md` completely before writing any code. Parse every field. If a field is empty, treat it as not applicable.

### Step 2: Scrape existing website (if provided)

If `currentWebsiteUrl` is filled in:

1. Fetch or browse the URL.
2. Extract ALL text content: page titles, meta descriptions, headings (H1-H6), body paragraphs, service descriptions, hours, phone, email, testimonials, team bios, any structured data.
3. Store the extracted content as structured data grouped by page and section.
4. This content will be used to populate `client-config.ts` in Phase 3.

If no URL is provided, skip this step. Copy will come from the brief's messaging notes or will need to be written.

### Step 3: Analyze reference sites (if provided)

For each reference URL in Section 3:

1. Visit the site and analyze its design.
2. Extract and note:
   - Typography: font families, sizes at each heading level, weights, letter-spacing, line-heights
   - Spacing: section padding, component gaps, element margins
   - Animation approach: scroll-triggered, parallax, text reveals, hover effects, page transitions
   - Layout structure: grid patterns, asymmetric layouts, full-bleed sections, container widths
   - Overall design mood and visual density
3. Cross-reference with what the user specifically liked about each reference (noted in the brief).
4. Do NOT extract colors from reference sites. Colors are provided in Section 2 and are final.

---

## Phase 2 - Generate Design System

### Step 1: Generate typography and spacing

Use the `/frontend-design` skill and `/ui-ux-pro-max` skill to generate the non-color parts of the design system. Based on:
- Brand discovery answers (vibe, emotion, mood, personality)
- Reference site analysis
- Industry context

Generate:

**Typography pairing** - two Google Fonts:
- Display font (headings, hero text) - choose based on mood. Serif for emotion and editorial weight. Sans-serif for clean and modern. Never use the same category for both.
- Body font (paragraphs, nav, UI) - must be highly legible at small sizes.
- Full type scale with exact values:

```
H1: [size]px / [weight] / [line-height] / [letter-spacing]
H2: [size]px / [weight] / [line-height] / [letter-spacing]
H3: [size]px / [weight] / [line-height] / [letter-spacing]
H4: [size]px / [weight] / [line-height] / [letter-spacing]
H5: [size]px / [weight] / [line-height] / [letter-spacing]
H6: [size]px / [weight] / [line-height] / [letter-spacing]
Body: [size]px / [weight] / [line-height] / [letter-spacing]
Overline: [size]px / [weight] / [line-height] / [letter-spacing]
Caption: [size]px / [weight] / [line-height] / [letter-spacing]
```

**Spacing scale:**
- Section padding: range from 96px to 160px depending on mood (generous = more, compact = less)
- Component gaps: 24px to 48px
- Element margins: 8px to 32px

**Animation intensity** (based on mood and references):
- Subtle: fade only, short durations
- Moderate: fade + slide, medium durations
- Premium: fade + slide + text split + parallax, longer durations with stagger

**Border, glass, and shadow system:**
- Border radius values
- Glass blur intensity
- Shadow depths for resting and hover states

**Opacity ladders:**
- Generate 8+ opacity levels for the primary color
- Generate 8+ opacity levels for the foreground color
- These create depth hierarchy without introducing new colors

### Step 2: Lock in colors

Colors come directly from the brief's Section 2. Copy the exact hex values:
- primary
- background
- foreground
- muted
- glassBorder

Do not generate, modify, or "improve" these colors. They are final.

### Step 3: Present for approval

Before writing any component code, output the full design system in a readable format:
- Font pairing with specimen preview
- Complete type scale
- Spacing values
- Animation intensity choice with reasoning
- Color tokens (as provided)
- Opacity ladder for primary and foreground

Wait for confirmation before proceeding to Phase 3.

### Step 4: Update config files

After approval:

1. Update `tailwind.config.ts` with the approved font families and any custom spacing.
2. Update `src/styles/globals.css` with the CSS custom properties:
   - Replace font families in `--font-display` and `--font-body`
   - Replace color values in `--color-primary`, `--color-background`, etc.
   - Regenerate the opacity ladders with the actual color RGB values
3. Update `index.html` with the correct Google Fonts link.
4. Update `client-config.ts` with the font names and color values.

---

## Phase 3 - Build

### Step 1: Populate client-config.ts

Fill in every field of `client-config.ts` with data from:
- The brief (business info, contact details)
- Scraped content (if available)
- Messaging notes from the brief
- Default copy where nothing else is provided (but flag these for review)

### Step 2: Build sections

Build each section using the framework's reusable components. For each section:

1. Wrap the section in `ScrollReveal` for entrance animations.
2. Use `SectionHeading` for consistent heading patterns.
3. Use `Card` for any repeated content blocks.
4. Use `StaggerChildren` for lists and grids.
5. Apply the chosen animation intensity - do not over-animate if "subtle" was chosen.

Section-specific requirements:

**Hero:**
- Use `TextSplitReveal` on the headline with `trigger="onMount"`.
- Apply `ParallaxLayer` to image/video backgrounds.
- Include the CTA button wrapped in `MagneticButton`.
- Hero should be full viewport height (`min-h-screen`).

**Services:**
- Grid layout: 1 column mobile, 2-3 columns desktop.
- Each service in a glass `Card`.
- Staggered entrance with `StaggerChildren`.

**About:**
- Split layout (text + image) when image is provided.
- Full-width text when no image.
- `ParallaxLayer` on the image.

**Testimonials:**
- Grid of glass cards with decorative quotation marks.
- Staggered entrance.

**CTA:**
- Centered layout with subtle gradient background.
- `MagneticButton` on the CTA.

**Contact:**
- Form + details split layout when form is enabled.
- Details only when form is disabled.
- Netlify Forms compatible markup.

### Step 3: Responsive design

Test and adjust at three breakpoints:
- 375px (mobile)
- 768px (tablet)
- 1440px (desktop)

Mobile is not a shrunk desktop. Ensure:
- Touch targets are at least 44px
- Text is readable without zooming
- Navigation works as a hamburger menu
- Section padding reduces appropriately
- Images and grids reflow to single column

### Step 4: Performance

- All images use `loading="lazy"` (except hero which uses `loading="eager"`)
- Use WebP format where possible
- Google Fonts loaded via `preconnect` in `index.html`
- Minimize layout shifts by setting explicit dimensions on images

### Step 5: Footer

Verify the footer includes:
- Business information
- Navigation links
- Social links (if provided)
- "Powered by Autera" linking to https://autera.us

This attribution appears on every site. Do not remove it.

---

## Phase 4 - Polish

### Step 1: Baseline UI fixes

Run `/baseline-ui` to audit and fix:
- Spacing inconsistencies
- Typography hierarchy issues
- Hover and active state completeness
- Color contrast ratios
- Visual alignment problems

### Step 2: Accessibility

Run `/fixing-accessibility` to handle:
- Keyboard navigation on all interactive elements
- ARIA labels on buttons, links, and form fields
- Focus-visible states with the primary color ring
- Semantic HTML (landmarks, headings hierarchy, lists)
- Skip-to-content link
- Alt text on all images

### Step 3: Motion and performance

Run `/fixing-motion-performance` to:
- Add `prefers-reduced-motion` support (already in globals.css, verify per-component)
- Optimize GSAP animations (use `will-change` sparingly)
- Verify no layout thrashing during scroll animations
- Test animation performance on lower-end devices

### Step 4: Lighthouse audit

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

If any score falls short, diagnose and fix before proceeding.

---

## Phase 5 - Deliver

### Step 1: Build

```bash
npm run build
```

Fix any TypeScript or build errors.

### Step 2: Test production build

```bash
npm run preview
```

Verify:
- All sections render correctly
- Animations fire as expected
- No console errors
- Forms submit (or display correctly if disabled)
- Navigation works on mobile and desktop

### Step 3: Confirm Netlify config

Verify `netlify.toml` has:
- Correct build command (`npm run build`)
- Correct publish directory (`dist`)
- SPA redirect rule
- Cache headers for static assets
- Security headers

### Step 4: Ready for deploy

The output is ready for:
```bash
netlify deploy --prod
```

Or push to a git repo connected to Netlify for automatic deploys.

---

## Design Principles - Always Follow These

These are non-negotiable. Every site built with this framework must adhere to them.

1. NEVER use generic AI aesthetics. No purple gradients on white. No Inter/Roboto defaults. No predictable card grids with rounded corners and drop shadows.

2. Every site should feel custom and premium. A visitor should not be able to tell it was built from a template.

3. Near-black backgrounds should never be pure `#000000`. Always slightly tinted toward the brand's color family.

4. Off-white text should never be pure `#FFFFFF`. Always warm or tinted.

5. Use opacity ladders (8+ levels) for depth hierarchy. This is how you create visual layers without introducing new colors.

6. Uppercase tracking on labels, overlines, and nav links for a luxury feel. Use 0.12em letter-spacing.

7. Negative letter-spacing on display headings (-0.03em) for editorial weight and density.

8. Generous whitespace. Section padding should be 96-160px. Let the content breathe.

9. Single accent color used sparingly. Primary color appears on CTAs, highlights, and hover states. It should feel intentional, not decorative.

10. Typography contrast. If the display font is serif, the body font must be sans-serif (and vice versa). Never use the same category for both.

11. Animations should feel intentional, not decorative. Every animation needs a reason - guiding attention, providing feedback, or creating delight. Remove anything that does not serve a purpose.

12. Mobile experience is equally important. Not a shrunk desktop. Rethink layouts, touch targets, and reading flow for small screens.

13. Every site footer includes "Powered by Autera" with a link to https://autera.us.

---

## Reference Skills

This project uses the following Claude Code skills. Defer to their instructions when relevant:

- `/frontend-design` - Design direction and creative execution
- `/baseline-ui` - Fixing AI UI slop after initial build
- `/fixing-accessibility` - Accessibility compliance
- `/fixing-motion-performance` - Animation performance optimization
- `/ui-ux-pro-max` - Advanced UI/UX design decisions
