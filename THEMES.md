# Portfolio Themes

Themes are configured in `src/data/themes.ts` and applied through `ThemeProvider`.
The public site includes a polished ThemeSwitcher in the navbar so visitors can
change the active theme without reloading the page.

## Available Themes

- Midnight Blue
- Executive Navy
- Data Slate
- Graphite Azure
- Violet Grid
- Clean Light Professional

## Default Theme

Change the default theme in `src/data/siteConfig.ts`:

```ts
theme: {
  activeTheme: "midnight-blue",
}
```

The ThemeSwitcher stores the visitor's selected theme in `localStorage`. If the
stored value is missing or invalid, the site falls back to `siteConfig.theme.activeTheme`.

## Theme Tokens

Each theme in `src/data/themes.ts` must include:

- `id`
- `name`
- `description`
- `tokens`
- `imageTreatment`

Use semantic tokens instead of hardcoding colors in components:

- `background`
- `backgroundSoft`
- `card`
- `cardHover`
- `border`
- `borderStrong`
- `text`
- `mutedText`
- `accent`
- `accentSoft`
- `accentGlow`
- `grid`
- `buttonPrimary`
- `buttonPrimaryHover`
- `buttonSecondary`
- `focusRing`

Components should use CSS variables such as `bg-background`, `text-accent`,
`border-border`, or explicit variables like `bg-[var(--color-button-primary)]`.

## Headshot Treatment

The hero headshot uses each theme's `imageTreatment`:

- `filter`
- `glow`
- `shadow`
- optional `backgroundWash`

Keep filters subtle. Do not use aggressive hue shifts or edits that make skin
look blue, purple, gray, or artificial. The theme should affect the surrounding
glow, lighting, borders, and UI colors more than the person in the photo.

Use radial halo layers for the portrait treatment. Avoid rectangular panels,
vertical light bars, or image box shadows that make a transparent PNG look like
it has a broken background.

## Add A New Theme

1. Add a new theme object to `src/data/themes.ts`.
2. Give it a unique `id`.
3. Define all semantic `tokens`.
4. Define a subtle `imageTreatment`.
5. If it should be the default, update `siteConfig.theme.activeTheme`.
6. Run `npm run build`.
