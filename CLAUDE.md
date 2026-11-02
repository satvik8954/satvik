# Satvik Golla — Personal Landing Page

Read this file first, then `DESIGN.md` (look and feel) and `CONTENT.md` (all copy). Those two files are the source of truth. Do not invent copy, numbers or links that are not in `CONTENT.md`.

## What we're building

A single-page personal site for Satvik Golla, a B.Tech CSE (AI/ML) student at KMIT and an AI/ML intern. It is one long scroll that reads like a story: who I am, then my main projects as chapters, then experiments, then what I'm building now, then contact.

The audience is recruiters, hackathon judges, founders and other engineers. They should be able to understand what I do within 10 seconds, and enjoy exploring if they keep scrolling.

## Stack

- **Next.js** (App Router, `output: "export"` static build) with plain CSS (custom properties). No Tailwind, no UI kit.
- **GSAP + ScrollTrigger** for scroll-driven animation.
- **Lenis** for smooth scrolling.
- **GSAP Draggable** (or a small pointer-events handler) for draggable elements.
- Fonts: **Montserrat** (Google Fonts, self-hosted via `@fontsource/montserrat`) and **Helvetica** with a fallback stack (`"Helvetica Neue", Helvetica, Arial, sans-serif`).
- No backend. Deploy target: [DEPLOY TARGET — e.g. Vercel / Netlify / linqup.co.in/satvik].

Keep dependencies minimal. Ask before adding anything not listed here.

## Project structure

```
app/layout.tsx             # fonts, metadata
app/page.tsx               # the whole page, composed from sections
app/tokens.css             # design tokens from DESIGN.md
app/globals.css
components/                # one component per section (Nav, Hero, Intro, Work/Chapter, Experiments, Now, Contact)
data/content.ts            # copy from CONTENT.md, as typed data
lib/motion.ts              # GSAP/Lenis setup, all scroll animation lives here (step 2)
lib/drag.ts                # draggable behaviour (step 3)
public/                    # images, GIFs, resume PDF
```

## Rules

1. **Content stays in `data/content.ts`.** Components don't hardcode copy.
2. **Every `[PLACEHOLDER]` in `CONTENT.md` stays visible as a placeholder** until I fill it. Never make up metrics, dates or links.
3. **Progressive enhancement.** The page must be fully readable with JavaScript off and with `prefers-reduced-motion: reduce`: all content visible, no animation, nothing depends on dragging.
4. **Accessibility.** Real `<a>` and `<button>` elements, visible focus styles, text contrast at least 4.5:1, semantic headings (one `h1`), alt text on every image, and a keyboard alternative for every draggable element.
5. **Performance.** Lighthouse 90+ on mobile. Lazy-load images and GIFs below the fold. Animate only `transform` and `opacity`.
6. **Responsive.** Design desktop first, but it must work properly at 360px wide. On touch devices, dragging must not hijack page scroll.
7. **No generic "AI-made site" look.** See the banned list in `DESIGN.md`.

## Build order

1. Scaffold Next.js, add tokens and fonts, build all sections as a static page with real content. **Stop and show me.**
2. Add Lenis and the scroll-driven animations. **Stop and show me.**
3. Add the draggable elements with keyboard fallbacks.
4. Responsive pass at 360px, 768px and 1440px.
5. Accessibility and reduced-motion pass, then Lighthouse.
6. Deploy.

Commit after each step with a clear message.
