# Template Customization

This repo is a reusable personal portfolio template. The default content lives in `src/data/*`, and a future person should be able to customize the site mostly by editing those files and replacing public assets.

## Content Files

- `src/data/siteConfig.ts`: site title, SEO description, brand initials/name, copyright year, default theme, and resume path.
- `src/data/themes.ts`: theme tokens, ThemeSwitcher options, and hero headshot image treatments.
- `src/data/profile.ts`: name-facing profile content, hero copy, section text, focus areas, and contact email.
- `src/data/education.ts`: degree, school, timeline, and education detail entries.
- `src/data/socialLinks.ts`: email, GitHub, LinkedIn, and optional external links.
- `src/data/navigation.ts`: navbar labels, routes, section links, and visibility rules.
- `src/data/projects.ts`: project cards and project detail content.
- `src/data/skills.ts`: skill categories and skill tiles.

## Layout And Component Files

- `src/pages/Home.tsx`: renders the hero, about, projects, skills, and contact sections from data.
- `src/pages/Projects.tsx`: renders the project index from `src/data/projects.ts`.
- `src/pages/ProjectDetail.tsx`: renders `/projects/:slug` from the matching project object.
- `src/components/layout/Navbar.tsx`: renders branding, navigation, mobile menu, and resume link from config/data.
- `src/components/layout/Footer.tsx`: renders copyright from `siteConfig`.

## Never Hardcode

Do not hardcode client-specific names, initials, email addresses, schools, degrees, project titles, project summaries, social links, resume filenames, or copyright years inside page/layout components.

Use the data/config files instead.

## Add A New Person

1. Update `src/data/siteConfig.ts`.
2. Update `src/data/profile.ts`.
3. Update `src/data/education.ts`.
4. Update `src/data/socialLinks.ts`.
5. Replace `public/assets/headshot.png`.
6. Replace the resume file in `public/assets/resume/`.
7. Run `npm run build`.

Use `src/data/examples/exampleProfile.ts` as a field reference.

## Add A New Project

Add one object to the `projects` array in `src/data/projects.ts`.

Required fields:

- `slug`
- `title`
- `category`
- `summary`
- `description`
- `tags`
- `icon`
- `featured`
- `technologies`

Optional detail fields such as `overview`, `challenge`, `approach`, `features`, `workflow`, `results`, and `interviewTalkingPoints` render only when present.

## Add A New Skill

Add a skill to the correct category in `src/data/skills.ts`.

Each skill should include:

- `name`
- `shortLabel`
- `category`

## Change Colors Lightly

The default theme is dark navy with electric blue accents. Theme data lives in
`src/data/themes.ts`, and the default active theme is set in
`src/data/siteConfig.ts`.

Do not hardcode colors in components. Use semantic CSS variables through
Tailwind utilities such as `bg-background`, `bg-card`, `border-border`,
`text-text`, `text-muted`, and `text-accent`. If a component needs a token that
does not have a utility, use an explicit variable such as
`bg-[var(--color-button-primary)]`.

Use each theme's `imageTreatment` for the hero headshot glow, filter, shadow,
and background wash. Keep filters subtle so skin tone remains natural.

## Replace Images And Resume

- Headshot: replace `public/assets/headshot.png`, or update `profile.hero.image.src`.
- Resume: replace the file under `public/assets/resume/`, then update `siteConfig.resume.path`.

Use `assetPath(...)` for public assets that must work under the GitHub Pages base path.

## Test Locally

```bash
npm install
npm run dev
npm run build
```

## Deploy

The GitHub Pages workflow in `.github/workflows/deploy.yml` deploys `dist` on pushes to `main`.

For GitHub Pages, set **Settings -> Pages -> Source** to **GitHub Actions**.
