# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, all confirmed:

- **Potential clients** — founders and companies evaluating the owner for freelance or contract work.
- **Recruiters / employers** — hiring managers assessing him for full-time roles.
- **Peers / community** — other developers and the open-source audience; personal brand.

Visitors arrive from referrals, LinkedIn/Telegram, and search; the site is where they verify claims before reaching out elsewhere.

## Product Purpose

Personal portfolio and credibility showcase for **Shahzod Abdukahhar**, a full-stack software engineer (React, Next.js, Vue, Node.js) building enterprise applications, GIS platforms, SDKs, and SaaS products. The primary success outcome is **credibility**: the visitor leaves convinced of his skill and breadth; contact typically happens through external channels, so the site's job is proof, not funnel.

## Positioning

Depth plus breadth backed by shippable evidence: enterprise systems, a real-estate transaction platform (UYDEK), a GIS/maps product family with SDKs and docs (Yarrow), SaaS, mobile and desktop apps — all presented with live demos, code links, and real imagery rather than claims. A neighboring portfolio could copy the stack list; it could not copy this project record.

## Operating Context

- Bilingual site: `uz` (default) and `en`, locale-prefixed routes, localized project descriptions.
- Deployed at `https://abdukahhar.uz` (Netlify, `npm run build`).
- Next.js 16 App Router, TypeScript, Tailwind CSS v4 (theme tokens in `app/globals.css`), Biome for lint/format. No test framework.
- Projects, experience, and testimonials are the browsing loop; project data lives in `lib/data/projects.json`.

## Capabilities and Constraints

- **Confirmed content:** hero, expertise, projects (masonry highlights + full gallery with tag filtering), experience, footer/contact; nav also references `blog` and `cirth`.
- **Locales:** `uz` and `en` only; `uz` is the default locale and root metadata default.
- **Copy is factual:** project descriptions, employer, and testimonials are real and must never be replaced with invented claims, metrics, or clients.
- **Dark theme is a style choice, not a binding commitment** (user did not pin it).
- Custom cursor follower is desktop-only; reduced-motion is respected for view transitions.

## Brand Commitments

- Name and domain identity: **Shahzod Abdukahhar** / **abdukahhar.uz** — binding.
- Bilingual uz/en with uz as default — binding.
- Logo assets exist at `public/logo.png` and `public/cropped-logo.png`.

## Evidence on Hand

- `lib/data/projects.json` — 30+ real projects with localized descriptions, tech stacks, categories, and links.
- `public/projects/` — real screenshots per project (UYDEK, Yarrow SDK family, ERP, CRM, mobile apps, etc.).
- `public/employers/cell-power.svg` — employer mark.
- `public/testimonials/` — three testimonial portraits (one is `default.png`).
- No invented testimonials, benchmarks, or client counts may be added; absence of press/metrics is real and must stay absent.

## Product Principles

1. **Proof over claim** — every statement should be backed by a project, screenshot, or live link.
2. **The artifact leads** — projects and their imagery carry the persuasion; chrome recedes.
3. **One record, two languages** — uz and en stay in parity; nothing ships in one locale only.
4. **Factual, always** — never fabricate experience, clients, or numbers to fill a layout.
