# WBT Website Rebuild — Progress Log

_A running record of what's been built, the decisions behind it, and what's still
open. Newest work at the top of the changelog. Companion to [`../README.md`](../README.md),
which covers structure and the publish-a-new-article workflow._

**Last updated:** July 2026
**Live preview:** https://workbettertogether.netlify.app (Netlify)
**Repository:** https://github.com/jennawshapiro/wbt-website (private)
**Live site being ported:** https://www.workbettertogether.coach

---

## Where things stand

A complete **first-pass prototype** of the whole site is built, on-brand, accessible,
and pushed to GitHub. It faithfully reproduces the current Squarespace site's content
and above-the-fold design, rebuilt as plain HTML/CSS/JS that can be updated by prompt.

**Paused mid-task:** fine-tuning the **home hero decorations** (exact size/position of
the gold watercolor and the scribble). The correct assets are now in place and the
watercolor is no longer clipped — remaining work is just nudging placement to taste.

---

## What's built

- **9 core pages** — Home, Leadership Coaching, Team Coaching, Facilitation + Training,
  Our Work, Blog, About, FAQ, Contact.
- **12 case studies** + **3 articles**, each a full page with real content pulled from
  the live site and its real hero image. Index pages render cards from a manifest.
- **Shared design system** — `css/styles.css` (tokens, type, components, responsive).
- **Content manifest** — `js/content.js` drives the Our Work + Blog card grids/filters.
- **Real imagery** — triptych, headshots, 17 client logos, all case-study photos, and
  per-page decorative art/watercolors/scribbles, downloaded at native resolution into
  `assets/site/`, `assets/case-studies/`, `assets/Client-Logos-Full/`.

---

## Key design decisions (the non-obvious ones)

- **Above-the-fold matches the live site, deliberately.** Home hero = white headline
  reversed out over the full-width triptych. Service heroes = light (`white-bold`)
  centered layout with a big uppercase headline, a **Lora-italic** subhead, and the
  page's own decorative collage (moon/Saturn, bees, street lamp/lightbulb) scattered at
  the edges.
- **Per-page accent color** themes each service page's "Book a Call" button *and* the
  nav "Let's Get to Work" button: Leadership = gold, Team = blue, Facilitation = ochre.
  Set via a small `:root { --accent } ` style block at the top of each page body.
- **Services dropdown nav** keeps the top bar short; expands inline on mobile.
- **Annotated statement band** under the home hero: centered Lora statement with key
  phrases marked by **hand-drawn SVG ink** (a circle on "driving social change", an
  underline on "and more impact") in Intentional Blue, plus a centered CTA.
- **Shared decorative "stack"** wraps the home hero + statement band so the gold
  watercolor and scribble span the boundary and render in full (not clipped).
- **Correct home-hero assets:** `home-3-gold-hero.png` (soft watercolor) and `home-9`
  (loose scribble, flipped so its loops sit on the right) — the actual live-site assets,
  not stand-ins borrowed from other pages.
- **Images stay in their original content context** — the window photo sits with the
  impact stats, the 500×500 duotone photos sit with each service's "what to expect", the
  real headshots are in the About bios, each case study keeps its own photo.
- **Native image sizes respected** — nothing is displayed larger than it was saved
  (the duotones are only 500×500, so they're never upscaled).
- **Accessibility pass (WCAG):** eyebrows on light backgrounds use Clean Slate, not
  small gold (which fails contrast on cream); dark sections force light text; white
  cards force full-ink text; the About hero photo shows the full frame (no cropped
  heads). Verified page-by-page in the browser.

---

## Tech setup

**Run it locally** (no build step, no dependencies):
```sh
cd "2026 WBT Website"
python3 -m http.server 8000
# then open http://localhost:8000
```
Or just double-click `index.html`.

**Source control**
- Repo: `github.com/jennawshapiro/wbt-website` (private, default branch `main`).
- `gh` (GitHub CLI) is installed at `~/.local/bin/gh` and configured as the git
  credential helper. `~/.local/bin` was added to `~/.zshrc`, so `gh` and `git push`
  work in any new terminal.
- Claude commits/pushes on request (not automatically).

**Page assembly note:** the root pages and detail pages are assembled from a shared
header/footer + per-page body via small scripts kept in the working scratchpad (not in
the repo). The committed `.html` files are the source of truth; edits can be made
directly to them or regenerated.

---

## Open items / next steps

- **Finish home hero decorations** (paused here) — nudge the watercolor/scribble
  size + placement to taste.
- **Auto-deploy (optional)** — the site is live on Netlify, but deploys are currently
  run from the CLI (`netlify deploy --prod`), so a `git push` alone doesn't redeploy.
  To make every push auto-build, connect the repo in the Netlify UI (Site → Build &
  deploy → Link repository). Until then, Claude redeploys after pushing.
- **Forms** — the newsletter signup + any contact form are front-end only; wire to a
  real provider before launch. (Book-a-call / survey already link to live Calendly +
  Typeform.)
- **Legal pages** — Privacy + Terms are linked in the footer but not built yet.
- **Bio pages** — "More about Jenna / Stacy" links on About are placeholders.
- **Carry the annotation treatment** onto a few other key lines if desired (service
  intros, About opening).
- **Mobile pass** — responsive rules follow the proven Lead-to-Win pattern; worth a
  dedicated breakpoint-by-breakpoint screenshot review.

---

## Changelog

### GitHub + Netlify deploy
- `git init`, `.gitignore` (ignores `.DS_Store`, local `.claude/settings.local.json`,
  and `.netlify`), initial commit. Installed `gh` 2.96.0, created the private
  `wbt-website` repo, pushed `main`. Added `~/.local/bin` to PATH.
- Installed Node 24 LTS + `netlify` CLI under `~/.local/`. Created a Netlify site under
  the _Work Better Together_ team and deployed → **workbettertogether.netlify.app**.
  Added `netlify.toml` (publish `.`, no build). Verified all pages/assets serve 200 over
  HTTPS.

### Home hero + statement band
- Added the annotated statement band (hand-drawn circle/underline SVGs, centered CTA).
- Enlarged hero decorations; then corrected to the real home assets
  (`home-3-gold-hero`, `home-9`) and wrapped hero+statement in a shared stack so the
  watercolor is no longer cut off at the bottom.

### Accessibility pass
- Fixed dark-on-slate text, invisible compare-card list text, small gold eyebrows on
  light backgrounds, and the cropped-heads About photo. Full page-by-page browser audit.

### Live-match rebuild (from reference screenshots)
- Rebuilt all four above-the-fold heroes to match the live site: centered service heroes
  with Lora-italic subheads + per-page accent buttons; home hero as white headline over
  the triptych; decorative art placed at the edges. Verified in Chrome.

### Full content + real imagery
- Pulled the complete text of all 12 case studies + 3 articles (no stubs). Downloaded
  all real site imagery at native size and placed each image in its original content
  context. Added the Services dropdown, bigger logo, real headshots, and distinct
  headers per page.

### First-pass prototype
- Analyzed every page of the live site; built the design system, all 9 pages, the
  content manifest + card-driven index pages, and the case-study/article templates.
