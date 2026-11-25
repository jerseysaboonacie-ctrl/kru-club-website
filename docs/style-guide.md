# Style guide

The site should feel like a student scrapbook: tilted paper, tape, marker headings and hand-drawn doodles. If a section looks like it could belong to a bank or a software company, redo it.

## Colours

Only these six, defined in `css/tokens.css`.

| Name | Hex | Used for |
|---|---|---|
| cream | #F0EDE4 | Main background, paper, photo frames |
| lime | #A5C94B | Mission section |
| gold | #FFC12E | Highlights, tape, impact section |
| sky | #38B5ED | ODOS section |
| orange | #F28C28 | Accents, values section |
| charcoal | #252525 | All text, outlines, shadows, footer |

Text is charcoal everywhere, except cream on the charcoal footer. Never use white text on lime or gold. Section order: cream, lime, orange, sky, cream, gold, charcoal.

## Type

- Permanent Marker: page title, section headings, value card titles
- Caveat Brush: smaller headings, tagline, buttons, nav
- Gochi Hand: sticky notes and captions
- Special Elite: small labels and placeholder boxes
- Nunito: body text, 17 to 19px
- Mali: Thai text (`lang="th"`)

## Shapes

- Nothing sits perfectly straight. Cards tilt up to about 3 degrees, notes and stickers a bit more.
- Corners are uneven (`--wobble-r`).
- Shadows are flat charcoal offsets, never blurred.
- Outlines are 3px with round ends (`.ink`, `.ink-fill`, `.ink-thin`).

## Doodles

The doodles are `<symbol>` elements at the top of `index.html`, so they work when the page is opened straight from disk. Colour them with `--fill` and `--fill2`:

```html
<svg viewBox="0 0 100 100" style="--fill:var(--orange)"><use href="#d-star"/></svg>
```

Available: `d-star`, `d-sparkle`, `d-flower`, `d-heart`, `d-spiral`, `d-squiggle`, `d-arrow`, `d-note`, `d-book`, `d-palette`, `d-camera`, `d-box`, `d-pin`, `d-quote`, `d-burger`. Section edges: `tear-a` (torn), `tear-b` (wavy), `tear-c` (scalloped).

## Animation attributes

Listed at the bottom of `css/tokens.css`: `data-reveal`, `data-stagger`, `data-draw` (paths need `pathLength="100"`), `data-float`, `data-parallax`, `data-polaroid`, `data-squish`, `data-count`, `data-nav`, `data-wobble`. Only transform and opacity are animated, plus stroke-dashoffset for the drawn lines.
