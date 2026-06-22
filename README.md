# Morgan Then — Portfolio

A personal developer portfolio built from scratch with **vanilla HTML, SCSS, and JavaScript**. No framework and no bundler. The whole thing is hand-written markup, a small SCSS architecture, and a couple of lightweight JS effects.

This is my **first project as a \_nology trainee**, so as much as it's a portfolio, it's also a record of relearning the fundamentals properly and discovering how far thoughtful design alone can carry a project.

---

## ✦ Overview

A single-page, full-viewport site with scroll-snapping sections:

- **Hero** — an ASCII-art self-portrait that resolves in on load and gently shimmers, plus `M_RG_N` logo.
- **Projects** — a 2×2 grid of work (Remit, Lullo, Oculé, Droptop), each with a hover dot-grid "spotlight" effect that follows the cursor.
- **Project modals** — native `<dialog>` elements with the full write-up, tech specs, and links for each project.
- **About** — a closing section using the shared "card" layout.

Everything is text, type, and colour, there are no photographs anywhere in the design.

---

## ✦ Tech

| Area          | Choice                                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Markup        | Semantic HTML5 (`main`, `section`, `header`, `dialog`, `dl`)                                                                     |
| Styles        | SCSS, compiled to a single `output.css`                                                                                          |
| Methodology   | BEM naming (`block__element--modifier`)                                                                                          |
| Interactivity | Vanilla JS (no dependencies)                                                                                                     |
| Type          | [Inter](https://fonts.google.com/specimen/Inter) + [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) via Google Fonts |
| Layout        | CSS Grid, scroll-snap, `dvh` units, custom-property-driven effects                                                               |

---

## ✦ Project structure

```
.
├── index.html              # all markup: hero, projects grid, dialogs, about
├── style.scss              # entry point — @use's each section + global resets
├── output.css              # compiled CSS (linked by index.html)
├── script.js               # modal open/close + project dot-grid pointer tracking
├── ascii-animation.js      # ASCII portrait reveal/shimmer
└── scss/
    ├── partials/
    │   ├── _colors.scss     # palette tokens ($bone, $ink, $accent…)
    │   └── _mixin.scss      # breakpoints + reusable "card" mixins
    └── sections/
        ├── _hero.scss
        ├── _projects.scss
        ├── _modal.scss
        └── _about.scss
```

SCSS is organised so each **section** is its own partial and shared decisions
(colours, breakpoints, card patterns) live in **partials** — `style.scss` just
pulls them together.

---

## ✦ Design language

- **Palette** — warm off-white (`$bone` `#eee9e7`) and near-black (`$ink` `#1a1a1a`) with a single hot accent (`$accent` `#ff4d26`). Restraint over variety.
- **Type as the hero** — a tall sans (Inter) for display, a mono (Roboto Mono) for labels/metadata, set in uppercase with wide tracking to do the "UI chrome" work.
- **Hairlines + grids** — thin borders and an underlying sense of grid give it a technical, drafting-paper feel.
- Initial direction came from a **Pinterest moodboard**; the goal was an editorial, type-led layout that holds up with zero imagery.

### Responsive breakpoints

Defined once in `_mixin.scss` and reused everywhere:

| Mixin           | Min width |
| --------------- | --------- |
| `normal-mobile` | 414px     |
| `tablet`        | 768px     |
| `desktop`       | 1024px    |

---

## ✦ Running locally

No build tooling beyond the Sass compiler. With the [Dart Sass](https://sass-lang.com/install) CLI installed:

```bash
# watch SCSS and rebuild output.css on save
sass --watch style.scss:output.css

# then open index.html (or serve it)
open index.html
```

---

## ✦ What I learned

This being my first \_nology project, the value was as much in the fundamentals as the finished site:

- **HTML structure, properly.** A real refresher on the `head` — `link`, `script` (and `defer`), meta — and on reaching for the right semantic tags (`main`, `section`, `header`) instead of `div` soup. Using native `<dialog>` for the project modals was a highlight.
- **SCSS was a learning curve — and I loved it.** Nesting, partials, `@use`, mixins, and variables changed how I think about writing styles. Pulling repeated patterns into mixins (the "card" layout, breakpoints) clicked.
- **BEM made sense in hindsight.** Confusing at first, but I now see `block__element--modifier` for what it is: a way to organise the _mental model_ of components so the CSS stays legible and predictable.
- **Good design elevates everything.** The biggest takeaway. I hadn't really appreciated what design can do until now — **typography, colour, and layout** are the levers, and even with no images you can make something feel considered and finished.

---

## ✦ Projects featured

| Project     | What it is                               |
| ----------- | ---------------------------------------- |
| **Remit**   | Invoicing web app                        |
| **Lullo**   | AI-narrated bedtime story generator      |
| **Oculé**   | Speed-reading web app + Chrome extension |
| **Droptop** | Bookmark manager                         |

---

_Built by Morgan Then · \_nology trainee_
