# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun run dev` - Start the development server (Next.js)
- `bun run build` - Build the application for production
- `bun run start` - Start the production server
- `bun run lint` - Run Biome to check code quality
- `bun run format` - Run Biome formatter

## Architecture Overview

This is a Next.js 16 application using the App Router with TypeScript and Tailwind CSS v4. The project structure follows Next.js conventions:

### Routing & i18n
- `app/page.tsx` - English home page at `/` (not nested under the locale layout)
- `app/[locale]/` - Localized routes for `en` and `uz` (`app/[locale]/page.tsx`, `app/[locale]/projects/page.tsx`)
- `lib/i18n.ts` - Locale list, dictionaries (`getDictionary`), `ProjectCategory` type
- Internal links interpolate the locale manually (e.g. `/${locale}/projects`) — there is no Link wrapper

### Key Components Structure
- `app/` - Contains the main application routes and layouts
- `components/layout/` - Page section components (Hero, Expertise, Projects, ProjectsGallery, Experience, Footer, Navbar)
- `components/CursorFollower.tsx` - Custom cursor with trail effects (desktop only)
- `components/Masonry.tsx` - CSS-columns masonry for highlighted projects on the home page
- `components/icons/tags.tsx` - `TagChip` tech-icon component backed by `TAG_REGISTRY`

### Styling & Configuration
- Tailwind CSS v4 via `@tailwindcss/postcss` — no `tailwind.config.ts`; theme tokens live in `@theme` in `app/globals.css`
- Shared, non-utility CSS (scrollbars, project-card animations, view transitions) also lives in `app/globals.css` — do not inject `<style>` tags from components
- Custom background color: `#1a191d`
- Biome for lint/format: single quotes, no semicolons, 2-space indent
- TypeScript paths configured with `@/*` alias pointing to root

### Animations
- Page navigations use React's `<ViewTransition>` (enabled via `experimental.viewTransition` in `next.config.mjs`), wrapped around `{children}` in both `app/layout.tsx` and `app/[locale]/layout.tsx`; the cross-fade CSS is in `app/globals.css` and disabled under `prefers-reduced-motion`
- Files importing `ViewTransition` from `react` need `/// <reference types='react/canary' />` for the types
- Other motion is CSS-only (keyframes + Tailwind transitions); `react-ui-animate` is a dependency but currently unused

### External Dependencies
- `@tabler/icons-react` - Icon library (prefer these over inline SVGs)
- `next/font/google` - Font optimization (Roboto Mono, Poppins)

### Special Features
- Custom cursor follower with trail effects (desktop only, hidden on mobile)
- React Strict Mode disabled in `next.config.mjs`
- Responsive design with mobile-first approach
- Projects data lives in `lib/data/projects.json` (descriptions localized per locale), consumed via `lib/projects.ts` (`localizeProjects`)

### Testing
No test framework is currently configured in this project.

## Important Notes
- The cursor follower component includes sophisticated mouse tracking and trail effects
- Components use Tailwind classes with custom color scheme
- Layout components are imported and composed in the main page

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
