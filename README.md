# KRU Club website

A one-page site for KRU Club (Knowledge, Respect, Understanding) at International School Bangkok. It covers the club's mission, values, the ODOS and EEF partnership, programs and impact.

It is plain HTML, CSS and JavaScript, so there is nothing to install or build.

## Run it

Open `index.html` in a browser. Or serve the folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000. Fonts and the scroll animations load from the internet. Offline, the page still works with fallback fonts and no parallax.

## Files

| File | What it does |
|---|---|
| `index.html` | All the text, plus the inline SVG doodles at the top |
| `css/tokens.css` | Colours, fonts, sizes, tilt values |
| `css/styles.css` | Layout and components |
| `css/motion.css` | Animations (switched off for reduced motion) |
| `js/main.js` | Mobile menu and the hand-lettered headings |
| `js/motion.js` | Scroll reveals, parallax, hiding nav, counters |
| `docs/style-guide.md` | Colours, type and doodle rules |
| `docs/photo-slots.md` | Where photos go and how to add them |

## Editing text

Everything is in `index.html`. Find the words and change them. Keep sentences short, since many readers are learning English.

## Still to fill in

Anything unconfirmed shows on the page as a dashed `[PLACEHOLDER: ...]` box. To list them all:

```
grep -o '\[PLACEHOLDER: [^]]*\]' index.html
```

What is missing:

- How KRU Club takes part in the ODOS program, and when it started
- What students did with ODOS and EEF: activities, dates, places, how many took part, one real result
- Six photos (three for ODOS and EEF, three for the impact stories), with permission to show students
- Three short impact stories and one quote, each shared with permission
- Real numbers, if there are any. The counters are commented out in `index.html`
- Real workshop topics, and a check that all seven program types are things KRU actually does
- Club email and social links for the footer
