<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the VOSS website. Here is a summary of all changes made.

## Summary

- **`src/components/posthog.astro`** — Already existed with the PostHog browser snippet. No changes needed.
- **`src/layouts/Layout.astro`** — Imported `PostHog` component and rendered it in `<head>`, enabling analytics on every page.
- **`src/components/Hero.astro`** — Added click tracking for the "Start Contributing" CTA and "Browse Repos" GitHub button.
- **`src/components/Projects.astro`** — Added click tracking for each project repository row (with repo name, language, and URL properties) and the "View all on GitHub" link.
- **`src/components/Contribute.astro`** — Added click tracking for the "Explore Repositories" CTA button.
- **`src/components/GettingStarted.astro`** — Added click tracking for the "View all issues" link in Path B.
- **`src/components/Nav.astro`** — Added click tracking for the GitHub link in the navigation bar.
- **`src/components/Footer.astro`** — Added click tracking for all footer Connect column links (GitHub, Email).
- **`src/scripts/site.ts`** — Added `theme_toggled` capture (with `theme` property set to `"light"` or `"dark"`) inside the existing theme toggle handler.
- **`.env`** — `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` confirmed and set.

## Events

| Event | Description | File |
|---|---|---|
| `contribute_cta_clicked` | User clicks the primary "Start Contributing" CTA button in the Hero section | `src/components/Hero.astro` |
| `github_repos_clicked` | User clicks the "Browse Repos" GitHub button in the Hero section | `src/components/Hero.astro` |
| `project_repo_clicked` | User clicks on a project repository row in the Projects section | `src/components/Projects.astro` |
| `view_all_repos_clicked` | User clicks "View all on GitHub" link at the bottom of the Projects section | `src/components/Projects.astro` |
| `explore_repos_cta_clicked` | User clicks the "Explore Repositories" CTA button in the Contribute section | `src/components/Contribute.astro` |
| `view_all_issues_clicked` | User clicks the "View all issues" link in the GettingStarted section (Path B) | `src/components/GettingStarted.astro` |
| `theme_toggled` | User switches between light and dark theme using the theme toggle button | `src/scripts/site.ts` |
| `nav_github_clicked` | User clicks the GitHub link in the navigation bar | `src/components/Nav.astro` |
| `footer_link_clicked` | User clicks an external link (GitHub or Email) in the footer | `src/components/Footer.astro` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1573190)
- [Contribute CTAs Over Time](/insights/RG68R7aq) — Tracks top-of-funnel CTA engagement
- [GitHub Outbound Clicks](/insights/J4IKBft7) — All GitHub link clicks by location
- [Contribution Conversion Funnel](/insights/L9SeyZAm) — Hero CTA → Explore Repos conversion rate
- [Project Repository Clicks](/insights/VLAAO6tw) — Which repos attract the most interest, broken down by name
- [Theme Toggle Usage](/insights/25NwJo9S) — Light vs dark preference among visitors

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
