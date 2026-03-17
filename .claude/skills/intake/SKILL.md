---
name: client-intake
description: Interactive client intake flow for Autera Sites. Run this when starting a new client project. It asks brand discovery questions in the terminal, fills out client-brief.md and client-config.ts, then proceeds to build.
---

# Client Intake Flow

When the user says "new client", "start project", "intake", or "build a site", run this intake flow before doing anything else.

## Rules

- Ask one question at a time. Wait for the answer before moving on.
- Keep questions short and direct.
- When offering choices, list them clearly with numbers.
- Do not write any code until the intake is complete and the user confirms.
- Do not use emojis in any output.
- Do not use em dashes in any output. Use regular hyphens only.
- After collecting all answers, generate the design system and present it for approval.
- Only after approval, proceed to Phase 3 (Build) in CLAUDE.md.

## Intake Sequence

### Block 1 - Business Info

Ask these one at a time:

1. "What is the business name?"
2. "What industry are they in?"
3. "Where are they located? (City, State)"
4. "What is their current website URL? (Leave blank if none)"
5. "Phone number?"
6. "Email address?"
7. "Hours of operation?"

### Block 2 - Brand Discovery

Ask these one at a time:

8. "What vibe should this site have? Pick one: Luxury, Clean, Bold, Playful, Corporate, Rugged, Minimal, Editorial, or describe your own."
9. "Who is their target customer? Describe in one sentence."
10. "What emotion should the site trigger? Pick one or two: Trust, Excitement, Calm, Urgency, Sophistication, Warmth."
11. "Dark or light base theme?"
12. "What are the brand colors? I need exact hex values for: primary (accent/CTA color), background, foreground (text), muted (secondary text), and glassBorder (dividers). If you only have a primary color, give me that and I will generate the rest to match."
13. "Describe the brand personality in three words."
14. "What is the overall mood? Industrial, organic, techy, handcrafted, clinical, warm and inviting, sleek and modern, or describe your own."

### Block 3 - Design References

15. "Do you have any reference websites whose design you like? Give me 1-3 URLs and tell me what you like about each one. Say 'skip' if none."

If URLs are provided, scrape and analyze each one for typography, spacing, animation approach, and layout patterns. Do NOT extract colors from references.

### Block 4 - Site Structure

16. "Which sections should the homepage include? Pick all that apply: Hero, Services, About, Testimonials, Gallery, Pricing, CTA, Contact, FAQ."
17. "Single-page or multi-page? If multi-page, list the pages."
18. "Any special sections or features?"

### Block 5 - Copy Source

19. "Should I scrape copy from their current website? (yes/no)"
20. "Any specific taglines, key phrases, or messaging notes?"
21. "What should the main CTA button say? (e.g., Book Now, Get a Free Quote, Call Today)"
22. "What tone should the copy have? Professional, Friendly, Authoritative, or Casual."

### Block 6 - Assets

23. "Do they have a logo file? If yes, what is the file path?"
24. "Do they have professional photos? If yes, where are they?"
25. "Do you want AI-generated hero imagery? If yes, describe what you want."
26. "Video background? If yes, provide the source file or URL."

### Block 7 - Technical

27. "What domain or subdomain will this deploy to?"
28. "Where should contact form submissions go? (email address or endpoint)"
29. "Enable analytics? (yes/no)"

## After Intake

1. Save all answers into client-brief.md using the template format already in the file.
2. If a current website URL was provided, scrape it now and extract all copy.
3. If reference URLs were provided, analyze them now.
4. Populate client-config.ts with business info and color values.
5. Generate the design system (typography, spacing, animation intensity, opacity ladders) using the frontend-design and ui-ux-pro-max skills.
6. Present the full design system for approval.
7. Wait for confirmation.
8. Once approved, proceed to Phase 3 (Build) in CLAUDE.md.
