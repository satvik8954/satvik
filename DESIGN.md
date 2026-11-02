# Design Direction

## The brief in one line

**Experimental, warm paper, one long scroll story.** It should feel like reading a well-made printed zine about an engineer, where the page reacts to you as you scroll and some things can be picked up and moved.

## Taste (from me)

- **Vibe:** experimental / artsy, but projects must still be easy to scan. Balanced: personality on the surface, clear details underneath.
- **Color:** warm paper tones.
- **Density:** in between. Not empty minimalism, not a spec sheet.
- **Type:** clean typefaces only — **Montserrat** and **Helvetica**. No quirky display fonts, no serifs, no monospace gimmicks. The experimentation comes from scale, layout and motion, not from weird fonts.
- **Motion:** scroll-driven animation and draggable elements.
- **Imagery:** pure type first. Project GIFs/screenshots only inside project chapters.
- Every design choice should be intentional. If something is only decoration, cut it.

## Tokens

```css
:root {
  /* paper */
  --paper:        #F2EDE3;  /* page background */
  --paper-deep:   #E6DFD1;  /* cards, panels */
  --paper-edge:   #D4CBB8;  /* hairlines, borders */

  /* ink */
  --ink:          #1A1814;  /* primary text */
  --ink-soft:     #5C564C;  /* secondary text (≈6:1 on --paper) */

  /* one accent, used sparingly */
  --accent:       #C8321A;  /* signal red — links, highlights, the "thread" */

  /* type */
  --font-display: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-body:    "Helvetica Neue", Helvetica, Arial, sans-serif;

  /* scale (fluid) */
  --t-giant: clamp(4.5rem, 16vw, 15rem);  /* hero name */
  --t-h1:    clamp(2.75rem, 7vw, 6rem);   /* chapter titles */
  --t-h2:    clamp(1.75rem, 3.5vw, 2.75rem);
  --t-body:  clamp(1rem, 1.1vw, 1.125rem);
  --t-small: 0.8125rem;

  /* space */
  --gutter: clamp(16px, 4vw, 64px);
  --section-gap: clamp(120px, 18vh, 240px);
}
```

Accent rule: `--accent` covers at most about 5% of any screen. It marks links, the active chapter number and the thread (see below). Never use it for large backgrounds.

A very subtle paper grain overlay (SVG noise, about 3–4% opacity, `pointer-events: none`) is allowed. No other textures.

## Typography rules

- **Montserrat** for the name, chapter titles and big statements. Use extreme contrast in weight and size: 800–900 weight at giant sizes, tight tracking (`-0.03em` to `-0.05em`), line-height around 0.9.
- **Helvetica** for body text, captions, labels and metadata. Regular weight, comfortable line-height of 1.5, max line length about 65ch.
- Small uppercase labels (Helvetica, `--t-small`, `letter-spacing: 0.08em`) for things like chapter numbers, years and tech stacks.
- Type is allowed to be **huge, cropped by the viewport, or set against the grid**. The hero name can bleed off the edges.

## Layout

- A 12-column grid with `--gutter` margins, which content is allowed to break deliberately: an oversized title overlapping into a neighbouring column, a caption hanging in the margin.
- Every chapter has a different composition (text left / visual right, then a centered statement, then a full-bleed GIF). Avoid the repeating "card, card, card" rhythm.
- No rounded-corner cards with shadows. Panels are flat `--paper-deep` rectangles with a 1px `--paper-edge` border, or nothing at all.

## The thread (signature element)

A single thin `--accent` line (2px) runs down the page through the whole story. It is drawn progressively as you scroll (SVG `stroke-dashoffset` tied to scroll progress), weaving between sections: it underlines the hero name, passes the chapter numbers, and finally ends by underlining the email address in the contact section. This is what ties the long scroll together into one story.

On reduced motion: the line is fully drawn and static.

## Scroll-driven animation

All built with GSAP ScrollTrigger + Lenis. Keep it smooth (about 60fps), and animate only `transform` and `opacity`.

1. **Hero:** the name starts at giant scale. As you scroll, it shrinks and slides to become a small, fixed name in the top-left corner (the nav).
2. **Intro statement:** words fade from `--ink-soft` to `--ink` one by one as you scroll through it (scrubbed, not timed).
3. **Chapters:** each chapter number (`01`, `02`, `03`) is pinned and huge while its content scrolls past, then gets replaced by the next number.
4. **Project visuals:** GIFs and screenshots slide in with a slight parallax offset (move about 10–15% slower than the text).
5. **Experiments:** the cards start stacked in a pile and fan out across the section as it scrolls into view.
6. **Thread:** drawn continuously the whole way down (see above).

Nothing auto-plays on a timer. Motion is always tied to scroll or to the user's hand.

## Draggable elements

- **Experiments pile:** hackathon and experiment cards are scattered like paper notes and can be dragged around. Each has a slight random rotation (−4° to 4°). A drag lifts the card (scale 1.03, raised z-index); dropping it settles it. Clicking a card without dragging opens its details.
- **Tech stack tags:** inside each chapter, the stack tags (e.g. "Python", "MCP") can be dragged and nudged around; they don't need to go anywhere, it's just a tactile detail.
- **Optional easter egg:** the letters of the small corner name can be dragged apart, and snap back on release.

Rules:
- Show a `grab` / `grabbing` cursor.
- Keep cards within the section bounds.
- Keyboard: each card is focusable; arrow keys move it, and Enter opens its details.
- Provide a "tidy up" button to reset positions.
- On touch devices, start a drag only after a short press (about 150ms) so normal scrolling is never blocked.
- If JavaScript is off or reduced motion is on, the cards show as a neat static grid.

## Responsive

- **≥1024px:** the full experience described above.
- **768–1023px:** keep the scroll animations, simplify the grid to 8 columns, and keep pinned chapter numbers smaller.
- **<768px:** single column. No pinning (pinning on phones feels janky). The thread becomes a straight line along the left margin. The experiments pile becomes a horizontally scrollable row of cards that are still draggable.

## Banned (things that make it look generic or AI-made)

- Purple/blue gradients, glassmorphism, glowing blobs
- Rounded cards with drop shadows in a 3-column grid
- Emoji and "👋 Hi, I'm…" openers
- Typewriter text effects and blinking cursors
- Fake terminal windows
- Skill bars or percentage ratings ("Python 90%")
- Generic tech-logo walls
- Stock illustrations and 3D blobs
- Timed fade-in-up on every single element
- Dark mode toggles. The page is paper; that's the identity.
