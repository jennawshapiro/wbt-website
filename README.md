# 2026 WBT Website — Claude-built rebuild (first-pass prototype)

A hand-built, brand-consistent rebuild of **workbettertogether.coach**, moving off
Squarespace and onto plain HTML/CSS/JS you can update by prompting Claude. All the
content and imagery from the current site has been ported over; the design has been
tightened to the WBT Brand Guide and made consistent with the **Lead to Win** page.

**This is a first pass to iterate on** — not a finished site. See _Known gaps_ below.

> **Progress & decisions:** see [`docs/PROGRESS.md`](docs/PROGRESS.md) for a running log
> of what's been built, the reasoning behind key design choices, and what's still open.

---

## Repository & source control

- **Repo:** https://github.com/jennawshapiro/wbt-website (private, branch `main`)
- **Auth:** the GitHub CLI (`gh`) is installed at `~/.local/bin/gh` and set as the git
  credential helper; `~/.local/bin` is on `PATH`, so `git push` / `gh` work in any new
  terminal.
- **Pushing:** Claude commits and pushes **on request** (not automatically). To push
  manually: `git add -A && git commit -m "…" && git push`.
- **Deploy:** not yet live — GitHub Pages can't host a *private* repo on the free plan.
  See _Open items_ in `docs/PROGRESS.md` for the options.

---

## How to preview it

It's a static site — no build step, no dependencies. Two options:

- **Just open it:** double-click `index.html`. Everything works from the file system
  (the card grids, filters, and mobile nav all use plain `<script>` tags, no server needed).
- **Serve it** (nicer, avoids any browser file:// quirks): from this folder run
  `python3 -m http.server 8000` and visit `http://localhost:8000`.

---

## What's here

### Pages (9 top-level)
| File | Page |
|------|------|
| `index.html` | Home |
| `leadership-coaching.html` | Leadership Coaching |
| `team-coaching.html` | Team Coaching (incl. 2:2) |
| `facilitation-training.html` | Facilitation + Training |
| `our-work.html` | Our Work — **case study index** (auto-generated cards) |
| `blog.html` | The WBT Blog — **article index** (auto-generated cards) |
| `about.html` | About |
| `faq.html` | FAQ (accordion) |
| `contact.html` | Let's Get to Work |

### The content you publish most: case studies & articles
| Folder | What |
|--------|------|
| `case-studies/` | One HTML file per case study (12 ported over) + `_TEMPLATE.html` |
| `articles/` | One HTML file per blog article (3 ported over) + `_TEMPLATE.html` |
| `js/content.js` | **The manifest** — the list that drives the Our Work & Blog index cards |

### Shared plumbing
| Path | What |
|------|------|
| `css/styles.css` | The entire design system — tokens, type, components, responsive rules |
| `js/site.js` | Mobile nav, scroll-reveal, and index-card rendering + category filter |
| `js/content.js` | Case-study and article manifest (see below) |
| `assets/` | Fonts, logos, photography, collages, watercolor textures, client logos |

---

## ★ Publishing a new case study or article (the main workflow)

Because case studies and articles are what you'll add most, they're built to be
trivial to publish. Two small steps — perfect to hand to Claude as a prompt:

1. **Create the page.** Copy the template and fill it in:
   - Case study → copy `case-studies/_TEMPLATE.html` to `case-studies/your-slug.html`
   - Article → copy `articles/_TEMPLATE.html` to `articles/your-slug.html`

   The template has `{{TOKENS}}` marking every spot to replace, and two finished
   examples to follow:
   - `case-studies/campaign-team-retreat-to-align-at-the-start.html`
   - `articles/emotional-intelligence-and-leadership.html`

2. **List it.** Add one entry to the top of the matching array in `js/content.js`
   (`WBT_CASE_STUDIES` or `WBT_ARTICLES`). That's what makes the card show up on the
   index page — including in the category filter. No other file needs editing.

A prompt like *"Add a new case study titled '…' with these tags and this text"* is
enough for Claude to do both steps.

> `slug` in the manifest must match the filename (without `.html`). The `img` path is
> relative to the site root (`assets/…`); inside the case-study/article page itself,
> image paths start with `../` because those pages live one folder deep.

---

## Design notes (what changed from Squarespace)

- **Above-the-fold layouts match the current site.** The home + service-page tops keep
  the Squarespace "design moves": the home hero leads with the wide **triptych** at
  large scale; each service page has a **light hero** (matching the site's `white-bold`
  section) with the page's own **decorative collage** (gold watercolor, moon, Saturn,
  line art, lightbulb, etc.) layered beside a big one-color headline.
- **Images stay where they belong.** Every image is placed in the same content context
  it has on the live site — the window photo sits with the impact stats, the 500×500
  duotone photos sit with each service's "what to expect," the real **headshots**
  (Jenna / Stacy) sit in the About bios, and each case study keeps its own hero photo.
- **Native image sizes respected.** Every image is displayed at or below its saved
  pixel size (the duotones are only 500×500, so they're never blown up). Assets live in
  `assets/site/` named `page-##-name` so each stays tied to its page and position.
- **Services dropdown nav.** The three services collapse under a **Services** menu so
  the top nav stays short; on mobile it expands inline. The masthead logo is larger.
- **Type from Lead to Win + layout variety from Squarespace.** Same eyebrows, headline
  and body treatment as Lead to Win, plus varied layouts — collage heroes, alternating
  `media-row` image/text bands, and `is / isn't` comparison columns.
- **Brand-locked & accessible.** Colors, fonts, spacing, buttons, and motion from
  `WBT-Brand-Context.md`; headlines one color, body full ink; fluid type, reflowing
  grids (breakpoints 940 / 820 / 620px), focus rings, reduced-motion, semantic landmarks.

---

## Fully ported — nothing omitted

- **All 9 pages**, **all 12 case studies**, and **all 3 blog posts** are built with their
  full text pulled from workbettertogether.coach. Each case study uses its real hero
  photo; each article its real body copy (the Emotional Intelligence piece is verbatim;
  the two shorter Facilitation posts are faithfully reproduced from the live copy).

## Known gaps / where to iterate next

- **A few best-inference placements to confirm.** The three abstract "Untitled design"
  graphics on the home *What We Do* cards, and the exact composition of each service
  hero's decorative collage, are my interpretation of the live layout — trivially
  reordered/repositioned (the art pieces are absolutely positioned with inline styles in
  the hero, so nudging `top`/`left`/`width` is quick).
- **Forms are front-end only.** The newsletter signup needs wiring to a real provider
  before launch. Book-a-call and Survey buttons already point to the live Calendly and
  Typeform links.
- **Legal pages** (Privacy, Terms) are linked in the footer but not built yet.
- **"More about Jenna/Stacy"** links on About are placeholders (`#`) — add bio pages if
  the current site has them.
- **Favicon/monogram**: using the Lead to Win favicon + white monogram; swap if desired.

---

## Assets ported from the live site & brand library

- **Real site imagery** (triptych hero, window photo, Jenna/Stacy headshots, all 12
  case-study photos, per-page decorative collages & duotones) → `assets/site/` and
  `assets/case-studies/`, downloaded at native resolution.
- **17 client logos** from the live site → `assets/Client-Logos-Full/`
- **Collages, watercolor textures, scribbles, concepts** from the brand library → `assets/`
- **Variable fonts** (League Spartan, Lora, Lora Italic, Inconsolata) → `assets/Fonts/`
