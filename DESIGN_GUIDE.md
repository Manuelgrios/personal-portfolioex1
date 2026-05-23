# Portfolio Design Guide

This portfolio template uses the default profile content from `src/data/*`.

## Visual style

- Dark professional theme.
- Navy/black background.
- Electric blue accent.
- Rounded cards with thin blue-gray borders.
- Subtle grid or radial glow backgrounds.
- Clean spacing.
- No playful colors.
- No overly animated or flashy effects.

## Typography

- Large bold headings.
- Short direct section labels in blue uppercase.
- Body text should be readable, concise, and natural.
- Avoid AI-sounding phrases like:
  - "This showcases my passion"
  - "Leveraging technology"
  - "Seamlessly"
  - "Not only...but also"
  - "In today's world"
  - "Impactful solutions" unless it is specific.

## Content tone

- Direct and grounded.
- Do not exaggerate experience.
- Do not invent metrics, links, jobs, or results.
- Say what the project did, what problem it solved, and what tools were used.

## Layout

- Navbar fixed or sticky.
- Hero on home page.
- About section.
- Project cards.
- Skills section.
- Contact section.
- Dedicated project detail template.

## Implementation rules

- Read this file before making portfolio changes.
- Read `THEMES.md` before changing theme colors or headshot treatment.
- Keep profile content in `src/data/profile.ts`.
- Keep project content in `src/data/projects.ts`.
- Keep skills content in `src/data/skills.ts`.
- Keep theme tokens in `src/data/themes.ts`; do not hardcode theme colors in components.
- Prefer reusable components in `src/components/`.
- Do not hardcode the same project or profile text in multiple pages.
