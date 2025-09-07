# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server (Next.js)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Architecture Overview

This is a Next.js 14 application using the App Router with TypeScript and Tailwind CSS. The project structure follows Next.js conventions:

### Key Components Structure
- `app/` - Contains the main application routes and layout
  - `layout.tsx` - Root layout with global components (Navbar, CursorFollower)
  - `page.tsx` - Home page composed of layout sections
- `components/` - Reusable components organized by type
  - `layout/` - Page section components (Hero, Expertise, Projects, Experience, Footer)
  - `CursorFollower.tsx` - Custom cursor with trail effects using react-ui-animate
  - `Masonry.tsx` - Grid layout component

### Styling & Configuration
- Uses Tailwind CSS with custom configuration in `tailwind.config.ts`
- Custom background color: `#1a191d`
- Custom font family: Poppins
- TypeScript paths configured with `@/*` alias pointing to root

### External Dependencies
- `react-ui-animate` - Animation library used for cursor effects
- `lucide-react` - Icon library
- `next/font/google` - Font optimization (Roboto Mono)

### Special Features
- Custom cursor follower with trail effects (desktop only, hidden on mobile)
- React Strict Mode disabled in `next.config.mjs`
- Responsive design with mobile-first approach

### Testing
No test framework is currently configured in this project.

## Important Notes
- The cursor follower component includes sophisticated mouse tracking and trail effects
- Components use Tailwind classes with custom color scheme
- Layout components are imported and composed in the main page