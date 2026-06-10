# VisionCircle

A pixel-faithful replica of the VisionCircle landing page, built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Stack
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS 3
- Fonts via `next/font/google` — **Inter** (body / headings) and **Cormorant Garamond** bold-italic (display / accents)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build && npm run start   # production build
```

## Project structure

```
app/
  layout.tsx        # fonts + global metadata
  globals.css       # Tailwind layers, .serif-i helper, film-grain overlays
  page.tsx          # assembles every section
components/
  Navbar.tsx        # cream pill nav (lives inside Hero)
  Hero.tsx          # "Build faster with people…" + video placeholder
  Fit.tsx           # "Is VisionCircle right for you?" — 3 fit cards
  WhatsInside.tsx   # "The Sauce" — 3 illustrated cards
  Perks.tsx         # "Community Perks" — 3 cards
  LeanTeam.tsx      # founder bios (Satvik, Aarush)
  Gallery.tsx       # "Touch grass" masonry grid
  Cta.tsx           # "Are you in?" pricing card
  Footer.tsx        # logo, links, newsletter, copyright
public/assets/      # grain texture, sketch illustrations, founder photos, underline svg
```

## Design tokens (`tailwind.config.ts`)
| Token | Value | Use |
|-------|-------|-----|
| `cream` | `#F9F4F0` | light backgrounds, text on dark |
| `forest` | `#0F3328` | brand green, dark sections |
| `ink` | `#1E1E1E` | card backgrounds |
| `font-inter` | Inter | body + sans headings |
| `font-serif` / `.serif-i` | Cormorant Garamond bold italic | display + accents |

## Notes
- The gallery tiles and the hero video are intentional placeholders (solid `forest` blocks / grey box), exactly as in the source design — drop real imagery/embed in when available.
- Three of the four white line-illustrations were available in the source file (briefcase, camera, people group, lectern); the "Weekly calls" and "In-person events" cards reuse the people / camera sketches in the same hand-drawn style.
