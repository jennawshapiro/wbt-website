# WBT Website — Handoff & Continuation Guide

This document is everything a second person (hi Deroy 👋) needs to **take this project
onto another computer and keep working on it**. Read it top to bottom once; after that
the "Daily workflow" and "Deploying" sections are all you'll need.

---

## 1. What this project is

A hand-built, brand-consistent rebuild of **workbettertogether.coach**, moved off
Squarespace onto **plain static HTML / CSS / JS** — no framework, no build step to run
the site, no dependencies to install to view it. It's designed to be edited by
**prompting Claude Code**, but everything is just files you can also edit by hand.

- **Live site:** https://workbettertogether.netlify.app
- **Repo:** https://github.com/jennawshapiro/wbt-website (private, branch `main`)
- **Host:** Netlify — team *Work Better Together*, project `workbettertogether`
  (site id `e3d3d454-1375-4ac7-a08b-57fdcb82d0b3`)

---

## 2. Moving it to another computer

### 2a. Prerequisites on the new machine
| Tool | Why | Install |
|------|-----|---------|
| **git** | version control | preinstalled on macOS (or `xcode-select --install`) |
| **python3** | local preview server only | preinstalled on macOS |
| **Node.js 18+** | only needed to run the Netlify CLI for deploys | https://nodejs.org (or `brew install node`) |
| **Netlify CLI** | deploys | `npm install -g netlify-cli` |
| **GitHub CLI** `gh` *(optional)* | easy auth for a private repo | `brew install gh` |

You do **not** need Node or Netlify just to *edit and preview*. Those are only for
publishing.

### 2b. Get the code
Deroy needs read/write access to the private repo (Jenna: add him as a collaborator at
GitHub → repo → Settings → Collaborators). Then:
```sh
git clone https://github.com/jennawshapiro/wbt-website.git "2026 WBT Website"
cd "2026 WBT Website"
```
> If you'd rather not touch GitHub, you can also just **copy the whole `2026 WBT Website`
> folder** to the new machine — the repo, tooling, and source files all live inside it.

### 2c. The Brand Guide (asset source)
New decorative assets (watercolor spots, textures, planet/illustration images, logos)
come from the **WBT Brand Guide**, which lives alongside this project:
```
WBT Claude Projects/
  2026 WBT Website/          ← this repo
  2026 WBT Brand Guide/wbt-brand-guide/assets/…   ← source assets
```
Deroy already has the Brand Guide (he built it). It is **not** required to build or
deploy — it's only where you grab new imagery from. When you use a new asset, **copy it
into this repo's `assets/`** so the site stays self-contained.

### 2d. Sign in to the deploy accounts (one time)
```sh
netlify login      # opens a browser; log in as jenna@womensbraintrust.com
netlify link       # choose the "workbettertogether" site  (or it's already linked via netlify.toml)
```

That's it — you're set up.

---

## 3. Project structure

```
2026 WBT Website/
├── index.html, about.html, contact.html, faq.html,        ← BUILT pages (do not hand-edit;
│   leadership-coaching.html, team-coaching.html,              they are regenerated — see §5)
│   facilitation-training.html, our-work.html, blog.html,
│   privacy.html, terms.html, jenna-wendy-shapiro.html, stacy-berger.html
├── case-studies/*.html        ← BUILT case-study pages (+ _TEMPLATE.html)
├── articles/*.html            ← BUILT article pages (+ _TEMPLATE.html)
├── css/styles.css             ← the entire design system (edit directly)
├── js/
│   ├── site.js                ← nav, scroll-reveal, quote carousel, annotations, parallax
│   ├── content.js             ← the case-study & article "manifest" (cards + filters)
│   └── rough-notation.js      ← vendored lib for the hand-drawn underline/circle marks
├── assets/                    ← all images, logos, fonts, watercolor textures
├── build/                     ← ★ THE BUILD TOOLING (source of truth for page content)
│   ├── parts/                 ← shared header/footer partials
│   │   ├── header.html, footer.html            (root pages, root-relative paths)
│   │   └── header-sub.html, footer-sub.html    (detail pages, ../ paths)
│   ├── bodies/                ← per-page <main> content for the ROOT pages
│   ├── detail-bodies/         ← per-page content for case studies & articles
│   ├── mkpage.sh              ← assemble ONE root page  (header + body + footer)
│   ├── mkdetail.sh            ← assemble ONE detail page
│   ├── rebuild-root.sh        ← rebuild ALL root pages from build/bodies
│   └── rebuild-details.sh     ← rebuild ALL detail pages from build/detail-bodies
├── netlify.toml               ← Netlify config (publish = ".")
├── README.md                  ← overview
├── HANDOFF.md                 ← this file
└── docs/PROGRESS.md           ← running log of decisions
```

### How the pages are assembled
Pages are **concatenated** from a shared header partial + a per-page body + a shared
footer partial. You edit the **body** (in `build/bodies/` or `build/detail-bodies/`) or
the **partials**/`css`/`js`, then run a rebuild script to regenerate the flat `.html`
files that actually get served. This keeps the nav/footer identical across every page.

**Do not hand-edit the built `.html` files** (like `index.html`) — your change would be
overwritten on the next rebuild. Edit the matching `build/bodies/<page>.html` instead.

---

## 4. Local preview

Static site, so either:
```sh
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000
```
or just double-click `index.html`. (The server is nicer — avoids `file://` quirks with
some assets.)

---

## 5. Daily workflow — editing content

**To change wording, sections, or layout on a page:**
1. Edit the body file, e.g. `build/bodies/leadership-coaching.html` (root page) or
   `build/detail-bodies/campaign-team-retreat-to-align-at-the-start.html` (case study).
2. Rebuild:
   ```sh
   bash build/rebuild-root.sh        # rebuilds all root pages
   bash build/rebuild-details.sh     # rebuilds all case studies + articles
   ```
   (These preserve each page's existing `<title>`/meta description automatically.)
3. Preview, then commit + deploy (§6–7).

**To change the design (colors, spacing, type, components):** edit `css/styles.css`
directly — no rebuild needed, it's linked by every page.

**To change behavior (nav, carousel, parallax, annotations):** edit `js/site.js` — no
rebuild needed.

**To publish a new case study or article:**
1. Copy `case-studies/_TEMPLATE.html` → `case-studies/<your-slug>.html` and fill it in
   (or add a body to `build/detail-bodies/` and wire it into `build/rebuild-details.sh`).
2. Add an entry to the top of the array in `js/content.js` (slug, title, excerpt, tags,
   img). The "Our Work" / "Blog" index cards + filters render from that file
   automatically.

**To add a new brand image** (watercolor, texture, illustration): copy it from the
**Brand Guide** into `assets/` (keep it in a sensible subfolder), then reference it from
a body file or the CSS.

---

## 6. Committing to GitHub

Claude commits/pushes **only when asked**. By hand:
```sh
git add -A
git commit -m "describe the change"
git push
```
`gh` is set as the git credential helper on Jenna's machine; on a new machine, `gh auth
login` (or a GitHub token) enables `git push`.

---

## 7. Deploying to Netlify

The site is **not** auto-building from GitHub yet — deploys are run explicitly from the
CLI. After committing:
```sh
cd "2026 WBT Website"
netlify deploy --prod --dir .
```
(On Jenna's machine, prefix with `PATH="$HOME/.local/bin:$PATH"` because Node/Netlify are
installed under `~/.local/nodejs/bin`; on a fresh machine with a normal Node install you
don't need that.)

### ⚠️ Known issue — production deploys currently blocked
As of this handoff, `netlify deploy --prod` returns **`JSONHTTPError: Forbidden`** on
every attempt, while **draft** deploys (`netlify deploy` with no `--prod`) succeed. That
pattern almost always means the **Netlify account has hit a usage cap** for the billing
period (bandwidth or build minutes), which halts *production* publishes until it resets
or the plan is upgraded.

**How to publish while that's the case:**
- **From the dashboard (most reliable):**
  https://app.netlify.com/projects/workbettertogether/deploys → open the newest deploy →
  **Publish deploy**. This uses a different path than the CLI.
- Check **Team → Usage / Billing** in Netlify for a hit cap; it resets at the start of
  the billing cycle, or upgrade the plan to lift it.
- Once cleared, `netlify deploy --prod --dir .` will work again normally.

> There are commits built up and unpublished — publishing the latest deploy from the
> dashboard will ship all of them at once.

### Optional improvement
Connect the GitHub repo in the Netlify UI (Site → Build & deploy) so every `git push`
auto-deploys. That also sidesteps the CLI entirely.

---

## 8. Working with Claude Code (how this site is meant to be updated)

The site is built to be edited by **prompting Claude Code** in this folder. Good prompts
are specific and often include a screenshot ("make this section's bg gold with black
text", "the watercolor is cropped at the bottom — use a full spot"). Claude will edit the
body/CSS/JS, rebuild, verify in a browser, and (when asked) commit + deploy.

Two house rules Claude follows, worth keeping:
- **Brand first:** every change is checked against
  `2026 WBT Brand Guide/wbt-brand-guide/WBT-Brand-Context.md` (colors, type, voice).
- **HTML is the source of truth**, exported/served as static files — no CMS.

---

## 9. Quick reference

| I want to… | Do this |
|------------|---------|
| Preview locally | `python3 -m http.server 8000` → localhost:8000 |
| Edit a page's content | edit `build/bodies/<page>.html`, then `bash build/rebuild-root.sh` |
| Edit a case study/article | edit `build/detail-bodies/<slug>.html`, then `bash build/rebuild-details.sh` |
| Change design | edit `css/styles.css` (no rebuild) |
| Change behavior/JS | edit `js/site.js` (no rebuild) |
| Add a case study/article to the index | add an entry to `js/content.js` |
| Save to GitHub | `git add -A && git commit -m "…" && git push` |
| Publish | `netlify deploy --prod --dir .` — **or** Netlify dashboard → Publish deploy (see §7) |
| New brand asset | copy from the Brand Guide into `assets/` |
