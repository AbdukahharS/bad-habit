---
name: Bad Habit — Shahzod Abdukahhar
description: Dark glass developer-portfolio system with a neon blue→purple→pink accent engine and two registers — expressive showcase and quiet archive.
colors:
  midnight-ink: "#1a191d"
  paper-ghost: "#ededed"
  electric-azure: "#3b82f6"
  neon-orchid: "#8b5cf6"
  signal-magenta: "#ec4899"
  cyan-glow: "#22d3ee"
  terminal-green: "#22c55e"
  amber-star: "#fbbf24"
  glass-border: "rgba(255, 255, 255, 0.1)"
typography:
  hero:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.25rem, 9vw, 9rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "normal"
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 6rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.025em"
  title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Roboto Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Roboto Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-cta:
    backgroundColor: "linear-gradient(90deg, rgba(37, 99, 235, 0.8), rgba(147, 51, 234, 0.8))"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-cta-hover:
    backgroundColor: "linear-gradient(90deg, #3b82f6, #a855f7)"
    textColor: "#ffffff"
  chip-tag:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "rgba(255, 255, 255, 0.85)"
    rounded: "{rounded.full}"
    padding: "4px 8px"
  chip-tag-active:
    backgroundColor: "rgba(255, 255, 255, 0.2)"
    textColor: "#ffffff"
  card-glass:
    backgroundColor: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "24px"
  nav-pill:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
---

# Design System: Bad Habit — Shahzod Abdukahhar

## Overview

**Creative North Star: "The Glass Terminal"** *(proposed — the owner declined to name one; rename freely)*

A developer console rendered in glass and neon. The whole site is a dark terminal window whose chrome — nav links written as `// comments`, numbered superscripts, a glowing gradient scrollbar, mono type as the base voice — keeps reminding you a developer built this by hand. On top of that terminal sits a premium glass material: translucent surfaces, hairline borders, backdrop blur, and a single blue→purple→pink gradient engine that tints everything it touches.

The mood is **sleek and premium**, but never stiff: motion is springy (overshoot easing on every entrance), hovers scale and glow, and a custom neon cursor with a fading trail turns the pointer itself into part of the brand on desktop. The system runs in **two deliberate registers**. The *showcase* register (home page: hero, expertise, projects masonry, experience, footer) is expressive — gradient icon tiles, animated gradient borders on highlighted cards, glowing hovers. The *archive* register (all-projects gallery) is quiet editorial — hairline separators, ghost-size index numbers, no glass, no glow — because there the artifact must lead and chrome must recede.

**Key Characteristics:**
- Dark-only palette on Midnight Ink (`#1a191d`); there is no light theme.
- One accent engine: the azure→orchid→magenta gradient, reused at low opacity everywhere.
- Glass surfaces are flat at rest; glow and shadow appear only as a response to interaction.
- Code-grammar labeling (`// label`, numbered items, mono type) is the brand's voice.
- Springy entrance physics: `cubic-bezier(0.34, 1.56, 0.64, 1)` with staggered delays.

## Colors

A near-monochrome dark base lit by one neon gradient engine; supporting hues appear only as small role-coded accents.

### Primary
- **Electric Azure** (`#3b82f6`): The lead accent. Link and title hover states (`hover:text-blue-300/400`), the start of every gradient, the hover glow shadow (`rgba(59, 130, 246, 0.25)`).
- **Neon Orchid** (`#8b5cf6`): The gradient's midpoint and the system's secondary voice — experience accordion accents, testimonial quote marks, expertise icon tiles.
- **Signal Magenta** (`#ec4899`): The gradient's end point. Rarely used alone; it closes gradients and tints the featured testimonial.

### Secondary
- **Cyan Glow** (`#22d3ee`): Role-coded for language and enterprise — the language switcher's active state, the Enterprise Applications category chip.
- **Terminal Green** (`#22c55e`): Role-coded for external writing and backend — the `// blog` nav link, the Backend expertise tile, WhatsApp and Mobile Apps accents.
- **Amber Star** (`#fbbf24`): Exactly one job — the "SaaS ★" badge on highlighted project cards. Never reuse it elsewhere.

### Neutral
- **Midnight Ink** (`#1a191d`): The universal page background. Gradients fade into it (hero overlay, footer) rather than sitting on top of other colors.
- **Paper Ghost** (`#ededed`): Base foreground. In practice text runs as white at stepped opacities: full white for headings, `gray-300`/`white-55-85%` for body, `white/20-40` for metadata.
- **Glass Border** (`rgba(255, 255, 255, 0.1)`): The hairline on every glass surface. Hovers brighten it to `white/20` or tint it with the component's role hue at 30–50% opacity.

### Named Rules
**The Gradient Is the Accent Rule.** The brand accent is the azure→orchid→magenta ramp as a whole, almost always at ~10% opacity as a surface tint or ~80% as a CTA fill. A saturated single-hue accent used solo is off-system.
**The One-Badge Rule.** Amber exists only on the SaaS badge. If a new "featured" marker is needed, restyle the badge — don't spread amber into the palette.

## Typography

**Display Font:** Poppins (600–900, with sans-serif fallback)
**Body Font:** Roboto Mono (400; the monospace base applied to `<body>`)
**Label Font:** Roboto Mono (700, often as `// comment` strings)

**Character:** A geometric display face shouting in big white headlines over a monospace body that keeps the whole page reading like a well-formatted terminal. The pairing *is* the personality: engineering voice, editorial confidence.

### Hierarchy
- **Hero** (Poppins 600, `clamp(2.25rem, 9vw, 9rem)`, tight leading): The full-screen name lockup only. One per page, with a soft black text-shadow over the cover image.
- **Display** (Poppins 700, `text-4xl` → `sm:text-7xl/8xl`, `tracking-wide`): Section titles (Expertise, Projects, Experience). Often paired with a gradient icon tile to its left.
- **Title** (Poppins 700, `text-xl`–`2xl`, normal leading): Card titles, gallery project names (up to `3.25rem` black in the archive register), testimonial authors.
- **Body** (Roboto Mono 400, `text-sm`–`base`, `leading-relaxed` ≈ 1.7): Descriptions, quotes, paragraphs. Body color is `gray-300`, brightening to white on card hover.
- **Label** (Roboto Mono 400–700, `text-xs`, sometimes `uppercase tracking-wider`): Code-comment labels (`// uz`, `// language`), nav superscripts (`01`–`06`), category metadata, counts.

### Named Rules
**The // Comment Rule.** Navigational and meta labels are written as code comments (`// projects`) with mono type. New nav-like labels inherit the grammar; prose never does.
**The Two-Voice Rule.** Headlines are Poppins, everything else is Roboto Mono. Never set body copy in Poppins or headlines in mono.

## Layout

Full-bleed dark sections with a shared horizontal rhythm: `px-6` on mobile, `md:px-12`, `xl:px-24`. Content inside sections centers into measure-limited containers (`max-w-4xl` for experience, `max-w-6xl` for expertise), and section titles sit above with generous `mb-12`–`mb-16`.

- **Hero:** 100vh cover image with a bottom gradient fade into Midnight Ink; content dead-centered.
- **Projects (showcase):** CSS-columns masonry — 1 column mobile, 2 at `md`, 3 at `lg`, 4 at `xl`, `1.5–2rem` column gap. Cards avoid breaking across columns.
- **Projects (archive):** a single vertical list separated by `white/6%` hairlines, each entry alternating image/description columns (`2fr_3fr` ↔ `3fr_2fr`) with a giant ghost index number bleeding off the top-right.
- **Footer:** 45/55 split — contact column left, testimonial mosaic right — collapsing to stacked on mobile.
- **Navbar:** fixed, floating in a `mx-4/8/12` inset; it never spans edge-to-edge.

## Elevation & Depth

The system is **flat by default, glow on state**. Depth at rest comes from translucency (backdrop blur over the dark base) and hairline borders, not shadows. Shadows exist only as interaction feedback — a hover lifts a card and lights a blue glow beneath it — plus one ambient exception: gallery screenshots carry a deep black drop shadow (`shadow-2xl shadow-black/40`) to seat the image on the page.

### Shadow Vocabulary
- **Hover Glow** (`box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(255,255,255,0.1)`): Project-card hover. The card scales to `1.02` and rises `8px` as the glow ignites.
- **Image Seat** (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4)`): Archive-gallery screenshots only.
- **Neon Bloom** (layered `0 0 15–120px` hsl glows): The custom cursor and the active-language dot. Reserved for genuinely luminous elements.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only in response to state (hover, active, focus) — never as ambient decoration on static chrome.

## Shapes

Soft, friendly geometry at three scales: small controls at `8px` (rounded-lg), standard cards and buttons at `12px` (rounded-xl), large feature cards and the navbar shell at `16px` (rounded-2xl), and fully round `9999px` for chips, badges, and count dots. Every shape is outlined by the 1px Glass Border hairline; highlighted project cards add a 2px animated gradient ring (`border-radius: 14px` pseudo-element, `background-size: 400%`, 4s shift). Corners are never sharp and never fully circular on rectangles — pills are reserved for chips and badges.

## Components

### Buttons
- **Shape:** Gently rounded (`12px`), semibold label, icon leading or trailing.
- **Primary CTA:** Azure→orchid gradient fill at 80% opacity (`from-blue-600/80 to-purple-600/80`), white text, `px-6 py-3`, blue border at 40% and a blue glow shadow. Hover: gradient saturates to full, scales `1.05`, glow brightens.
- **Ghost action (card links):** `white/10` fill, `white/20` border, `px-3 py-2 text-xs`, icon + label. Hover: `white/20` fill + `scale-105`. Source-code variant runs dark gray; package variant runs orange-tinted.
- **Focus/hover doctrine:** every interactive element answers hover with at least two of: scale, border tint, fill shift, glow.

### Chips
- **Style:** Pill (`9999px`), glass fill `white/5`, `white/15` border, `text-xs`, optional 22px tag icon. Backdrop blur.
- **State:** Active = `white/20` fill, full-white text, `white/50` border, small black shadow. Interactive chips scale to `1.05` on hover.

### Cards / Containers
- **Corner Style:** `12px` (project cards) or `16px` (experience, testimonials).
- **Background:** The 10%-opacity azure→orchid→magenta gradient tint over Midnight Ink, backdrop-blurred.
- **Shadow Strategy:** Flat at rest, Hover Glow on interaction (see Elevation).
- **Border:** 1px Glass Border; hover tints it to the card's role hue at 30–50%.
- **Internal Padding:** `24px` standard, `32px` on the featured testimonial.

### Navigation
- **Style:** A floating glass bar — `16px` radius, `white/5` fill, `white/10` border, backdrop blur — inset from viewport edges. On scroll it compacts (`py-3 → py-2`), darkens to `black/40`, and gains a soft black shadow.
- **Links:** Bold white `// label` mono-grammar links with a small colored superscript index (`01`–`06`). Hover tints the label in its role hue (azure for sections, green for blog, orchid for cirth), scales `1.05`, and dims siblings to 50% opacity.
- **Mobile:** A slide-in glass drawer (`320px`, gradient black fill) stacking the same `//` links as `12px`-radius glass rows; backdrop dims the page.

### Filter Buttons
- **Style:** `12px` radius pill-buttons with a category icon and a floating circular count badge.
- **State:** Inactive = `gray-800/30` fill, `gray-300` text, `gray-700/50` border. Active = azure→orchid gradient at 80%, white text, azure border at 50%, blue glow, `scale-105`.

### Experience Accordion
- **Style:** `16px` glass card; header is the whole click target with title, duration pill (`blue-500/20`), and location row. A `48px` circular toggle button rotates 180° and fills orchid when open.
- **Behavior:** Height-animated reveal (`max-h` transition, 500ms) of description + technology chips + employer logo tile.

### Testimonial Cards
- **Style:** `16px` glass cards in a mosaic: one large featured card (orchid→magenta tint) and two smaller (azure→orchid, magenta→orchid). Quote icon top-left, circular avatar with a 2px role-hue border top-right.
- **Hover:** Border brightens to the card's hue, body text goes white, card scales `1.02`.

### Custom Cursor (signature)
- **Style:** A 20px white dot with an azure border and layered neon bloom, followed by an 8-segment fading trail of shrinking azure circles. On interactive elements it doubles in size, rotates 180°, dims, and shifts its glow to magenta/orchid.
- **Constraint:** Desktop only (`hidden lg:block`); the native cursor is never hidden, the follower augments it.

### Neon Scrollbar (signature)
- **Style:** 12px thumb carrying the azure→orchid→magenta gradient with an orchid glow, on a blurred dark track. Hover and active states intensify the gradient and bloom. Firefox gets `scrollbar-color` with orchid on ink.

## Do's and Don'ts

### Do:
- **Do** keep every surface on Midnight Ink; fade imagery into it with gradients rather than introducing new background colors.
- **Do** use the spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) with staggered `0.1–0.2s` delays for entrance animations.
- **Do** write nav and meta labels in `// comment` grammar with Roboto Mono.
- **Do** choose the register deliberately: showcase (glass, glow, gradient) for storytelling sections, archive (hairlines, ghost numbers, restraint) for dense artifact lists.
- **Do** keep hover feedback doubled — scale plus a color or glow shift — on every interactive element.
- **Do** ship every string in both uz and en; the design must survive longer Uzbek labels.

### Don't:
- **Don't** add ambient drop shadows to static surfaces; glow is earned by interaction (The Flat-By-Default Rule).
- **Don't** introduce a light theme or light cards; the system is dark-only.
- **Don't** use a saturated single-hue accent where the gradient tint belongs (The Gradient Is the Accent Rule).
- **Don't** mix registers on one surface — no neon glow inside the archive gallery, no bare hairline lists inside the showcase home.
- **Don't** reuse amber outside the SaaS badge (The One-Badge Rule).
- **Don't** render the custom cursor or heavy entrance motion where `prefers-reduced-motion` applies; view transitions already honor it.
