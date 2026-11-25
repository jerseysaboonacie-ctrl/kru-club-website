# Photo slots

Every photo sits in a taped polaroid frame with a slight tilt. Real photos are better than illustrations, and candid moments are better than posed ones.

## Photos needed

| # | Section | Should show | Ratio |
|---|---|---|---|
| 1 | ODOS and EEF | KRU members with ODOS students | 4:3 |
| 2 | ODOS and EEF | An exchange or mentoring session | 4:3 |
| 3 | ODOS and EEF | Group photo with ODOS or EEF | 16:10 |
| 4 | Impact, "Growing confidence" | Matches the story | 4:3 |
| 5 | Impact, "At home across cultures" | Matches the story | 4:3 |
| 6 | Impact, "Bouncing back" | Matches the story | 4:3 |

Get permission before publishing any photo with a student's face. For students under 18, follow ISB's policy on parent consent.

## Adding a photo

1. Save it in an `images/` folder as `.jpg` or `.webp`, ideally under 250 KB.
2. In `index.html`, find the placeholder:
   ```html
   <div class="polaroid__photo polaroid__photo--empty" style="--ph-bg:var(--gold)">
     ...
   </div>
   ```
3. Replace the whole div with:
   ```html
   <div class="polaroid__photo">
     <img src="images/odos-1.jpg" width="1200" height="900" loading="lazy" decoding="async"
          alt="Two students laughing while painting a mural together">
   </div>
   ```
   Keep `width` and `height` so the page doesn't jump while loading, and write an `alt` that describes what is happening.
4. Replace `[PLACEHOLDER: caption]` in the `<figcaption>` with a short caption.
