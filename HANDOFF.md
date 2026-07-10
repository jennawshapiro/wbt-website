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

- **Live site (production):** https://www.workbettertogether.coach
- **Staging (preview):** https://staging--workbettertogether.netlify.app
- **Repo:** https://github.com/jennawshapiro/wbt-website — **public**, branches `main`
  (production) + `staging` (preview)
- **Host:** Netlify, project `workbettertogether` (site id
  `e3d3d454-1375-4ac7-a08b-57fdcb82d0b3`), **linked to the repo for continuous deployment**
  — every push builds automatically (see §7).
- **Working copy:** the fast local clone at **`~/Projects/wbt-website`**. ⚠️ **Do not work
  in the Google-Drive folder** — Drive's virtual filesystem is too slow for git/deploys.
  The Drive copy is now only a mirror (see §7b).

---

## 2. Moving it to another computer

### 2a. Prerequisites on the new machine
| Tool | Why | Install |
|------|-----|---------|
| **git** | version control + deploys (push = deploy) | preinstalled on macOS (or `xcode-select --install`) |
| **python3** | local preview server only | preinstalled on macOS |
| **GitHub CLI** `gh` *(optional)* | easy git auth | `brew install gh` then `gh auth login` |

That's it. **You no longer need Node or the Netlify CLI** — deploys happen on Netlify's
servers from GitHub. The old `netlify deploy` path is retired (see §7).

### 2b. Get the code — clone to a FAST local disk
Clone into `~/Projects` (a normal local folder), **not** into Google Drive:
```sh
git clone https://github.com/jennawshapiro/wbt-website.git ~/Projects/wbt-website
cd ~/Projects/wbt-website
git config core.hooksPath .githooks    # enables the Google-Drive mirror hook (§7b)
```
The repo is **public**, so no special access is needed to clone. (You still need push
access — a GitHub account that's a collaborator — to deploy.)

> **Why not Google Drive?** The project used to live in a Google-Drive-synced folder.
> Drive presents files as an on-demand, network-backed filesystem, so every git op and
> deploy (which reads every file) throttled to Drive's sync speed and hung for minutes at
> a time. The local clone eliminates that. The Drive folder is kept only as a **mirror**
> (§7b).

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

### 2d. Deploy access
No `netlify login` needed for the normal workflow — deploys are triggered by pushing to
GitHub, and Netlify builds them itself. You just need **push access to the repo** (be a
collaborator on `jennawshapiro/wbt-website`). That's it — you're set up.

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

## 6. Committing & deploying — **push is deploy**

There is no separate deploy command anymore. Netlify is linked to the repo, so **pushing
a branch triggers a build automatically** (a few seconds, on Netlify's servers).

**The two-branch flow:**
```sh
cd ~/Projects/wbt-website

# 1. make your edits (rebuild pages if you changed build/bodies — see §5), then:
git add -A && git commit -m "describe the change"

# 2. push to STAGING to preview:
git push origin staging
#    → builds  https://staging--workbettertogether.netlify.app

# 3. happy with the preview? promote to LIVE:
git checkout main && git merge staging && git push origin main
#    → builds  https://www.workbettertogether.coach
git checkout staging     # go back to staging for the next round
```

Quick fixes can go straight to `main` if you're confident, but staging-first is the safe
default — it's a real, public-URL preview identical to how production will render.

**Watching a build:** Netlify dashboard →
https://app.netlify.com/projects/workbettertogether/deploys (status per push, with logs).

> **Auth:** you push over HTTPS; `gh auth login` (GitHub CLI) or a saved GitHub token
> handles credentials. The repo is public, so cloning needs nothing; pushing needs you to
> be a repo collaborator.

---

## 7. Environments, hosting & domain (reference)

- **Continuous deployment:** the Netlify site is linked to `jennawshapiro/wbt-website`.
  `netlify.toml` sets `publish = "."` and **no build command** (the HTML is committed
  pre-built), so Netlify just publishes the repo root as-is.
  - `main`  → **production** → https://www.workbettertogether.coach
  - `staging` → **branch deploy** → https://staging--workbettertogether.netlify.app
- **Custom domain:** `www.workbettertogether.coach` is primary (Let's-Encrypt SSL auto-
  provisioned by Netlify). The bare apex `workbettertogether.coach` **301-redirects to
  `www`**. DNS is at the registrar (Google/Squarespace nameservers), already pointed at
  Netlify: apex `A → 75.2.60.5`, `www CNAME → workbettertogether.netlify.app`.
- **Email is separate & safe:** Google Workspace (`MX → smtp.google.com`, SPF TXT) lives
  in the same DNS zone but is independent of hosting — deploys/domain changes don't touch it.
- **Repo must stay public** for pushes to auto-build. Netlify's plan blocks builds from
  "unrecognized Git contributors" on *private* repos; making the repo public removed that
  restriction. (Alternative if it's ever made private again: add the pushing person as a
  verified member of the Netlify account.)
- **No secrets in the repo** — it's static HTML/CSS/JS/images; the Netlify token is never
  committed. That's what makes public safe.

### 7b. Google Drive mirror
The old Google-Drive folder is kept as a **read-only-ish mirror** so the shared Drive
location stays current (for Jenna & backup) without being the working copy.

- A **`pre-push` git hook** (`.githooks/pre-push`) runs
  [`sync-to-drive.sh`](sync-to-drive.sh) **in the background** after every push — so Drive
  updates automatically and the push itself stays fast.
- **Run it manually** any time: `./sync-to-drive.sh` (safe overlay — never deletes), or
  `./sync-to-drive.sh --mirror` for an exact mirror (still keeps Drive-only design sources
  like `.psd`).
- It excludes `.git`, `.claude`, and tooling; the Drive path is set in the script (override
  with `WBT_DRIVE_DIR`).
- **One-time enable on a fresh clone:** `git config core.hooksPath .githooks`.
- **Don't edit files in the Drive folder** — changes there are not version-controlled and
  get overwritten by the next mirror. Edit in `~/Projects/wbt-website`.

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
| Commit | `git add -A && git commit -m "…"` |
| Preview on staging | `git push origin staging` → staging--workbettertogether.netlify.app |
| Publish to production | `git checkout main && git merge staging && git push origin main` → www.workbettertogether.coach |
| Refresh the Google Drive mirror | `./sync-to-drive.sh` (also auto-runs on every push) |
| New brand asset | copy from the Brand Guide into `assets/` |
