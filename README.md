# Personal Portfolio Template

Reusable Vite + React portfolio template with dark navy styling, project detail routes, configurable profile content, and GitHub Pages deployment.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Before making design or content changes, read `DESIGN_GUIDE.md`. Before
changing theme colors or headshot treatment, read `THEMES.md`.

## Deployment

- Local development: `npm install`, then `npm run dev`
- Production build: `npm run build`
- Repo-specific Pages build: `VITE_BASE_PATH=/your-repo-name/ npm run build`
- GitHub Pages deploys automatically on push to `main`
- GitHub Pages source should be set to **GitHub Actions**
- Live URL: https://manuelgrios.github.io/personal-portfolioex1/

In GitHub, check **Settings -> Pages -> Source** and confirm it is set to
**GitHub Actions**. The workflow derives `VITE_BASE_PATH` from the repository
name so repos created from this template deploy under their own GitHub Pages
path.

## Updating Content

Site title, branding, copyright year, default theme, and resume path live in `src/data/siteConfig.ts`.

Theme tokens, ThemeSwitcher options, and headshot image treatments live in
`src/data/themes.ts`.

Profile, hero, and section text live in `src/data/profile.ts`.

Education entries live in `src/data/education.ts`.

Navigation items live in `src/data/navigation.ts`.

Social/contact links live in `src/data/socialLinks.ts`.

Project information lives in `src/data/projects.ts`. To add a future project,
add a new object with a unique `slug`, `title`, `summary`, `problem`, `outcome`,
and `tools`. The project index and detail route will use that data.

Skill information lives in `src/data/skills.ts`.

## Resume

Place the resume file in:

```text
public/assets/resume/
```

The Resume button reads its URL from `src/data/siteConfig.ts`.
