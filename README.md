# Bad Habit

Personal portfolio and website built with Next.js 14, featuring custom animations and a unique design.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React UI Animate (custom cursor effects)
- Lucide React (icons)

## Features

- Custom cursor follower with trail effects
- Responsive design
- Smooth animations
- Sections: Hero, Expertise, Projects, Experience, Footer
- Mobile-first approach

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Project Structure

```
app/
├── layout.tsx           # Root layout with Navbar and CursorFollower
├── page.tsx             # Home page composed of sections
├── globals.css          # Global styles
├── tailwind.config.ts   # Tailwind configuration
components/
├── layout/              # Page section components
│   ├── Hero.tsx
│   ├── Expertise.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   └── Footer.tsx
├── CursorFollower.tsx   # Custom animated cursor
└── Masonry.tsx          # Grid layout component
```

## Notes

- Custom background color: `#1a191d`
- Font family: Poppins
- Custom cursor is hidden on mobile devices
