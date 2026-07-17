# Chano Rodríguez — Entrenamientos Personalizados Online

Landing page for Chano Rodríguez's personal training business. Single-page site built with React, Tailwind CSS, and GSAP animations, with full Spanish/English i18n support.

## Tech Stack

- **React 19** + TypeScript
- **Vite 8** (bundler & dev server)
- **Tailwind CSS 4**
- **GSAP** + ScrollTrigger (animations & scroll effects)
- **Lucide React** (icons)
- **Custom i18n** (ES/EN toggle, no external library)

## Sections

| Section | Description |
|---------|-------------|
| **Navbar** | Fixed glassmorphism nav with hide/show on scroll direction, language toggle (ES/EN), magnetic CTA button |
| **Hero** | Full-viewport video background with parallax, animated entrance, stat counters that animate from 0 on scroll |
| **Credentials** | 5-column credential grid with staggered fade-in, CSS marquee of disciplines, diploma card |
| **Who is Chano** | 2-column layout with photo slide-in and text reveal |
| **For Who** | Video background with parallax, reason cards with staggered fade-in |
| **Testimonials** | Horizontal carousel with scale/blur/opacity per-card, infinite scroll illusion, GSAP transitions |
| **How It Works** | 3-step numbered grid with staggered entrance and animated connecting line |
| **Pricing** | 3-card pricing grid with GSAP hover effects, featured card emphasis |
| **Final CTA** | Video background with parallax, entrance animation, social links |
| **WhatsApp Float** | Fixed button with infinite pulse/glow animation, opens WhatsApp with plan-specific messages |

## Project Structure

```
src/
├── App.tsx                  # Root component, section order
├── main.tsx                 # Entry point
├── index.css                # Global styles, CSS variables, keyframes
├── i18n/
│   ├── LanguageContext.tsx   # Language provider + hook
│   └── translations.ts      # ES/EN translation strings
└── components/
    ├── Navbar.tsx
    ├── Hero.tsx
    ├── Credentials.tsx
    ├── WhoIsChano.tsx
    ├── ForWho.tsx
    ├── Testimonials.tsx
    ├── HowItWorks.tsx
    ├── Pricing.tsx
    └── FinalSections.tsx     # FinalCTA + WhatsAppFloat
```

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs with `--host` by default, accessible on your local network.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run Oxlint |
| `npm run preview` | Preview production build |

## SEO

`index.html` includes essential meta tags: title, description, keywords, Open Graph, Twitter Card, canonical URL, and robots directive. Replace `https://chanorodriguez.com` in the canonical and OG URLs with the actual domain before deploying.

## Animation Details

All animations use GSAP with ScrollTrigger:

- **Video parallax** — Hero, ForWho, and FinalCTA sections have subtle vertical parallax on their background videos
- **Stat counters** — Hero stats animate from 0 to their final value using `gsap.to()` with an object proxy
- **Navbar** — Translates up/down based on scroll direction
- **Card hover** — Pricing cards lift and scale on hover via GSAP
- **WhatsApp pulse** — Infinite scale + glow timeline on the floating button
- **Entrance reveals** — Staggered fade-up on scroll for cards, steps, credentials, and CTA elements
