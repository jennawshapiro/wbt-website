---
name: wbt-collage
description: Build a Work Better Together brand collage from a concept — layering a watercolor spot, a scribble, and a concept illustration in the WBT collage style. USE WHEN the user says wbt collage, build a collage, make a collage, collage for [concept], WBT collage, brand collage, hero collage, collage illustration, or asks to express an idea/concept as a WBT collage image. Picks the illustration by matching the concept to the brand illustration tags.
---

# WBT Collage Builder

Compose a **Work Better Together brand collage** from a spoken concept. A collage layers three brand assets:

1. **Watercolor spot** — a single-color blob, the backdrop (bottom layer).
2. **Scribble** — thin black looping line art, weaving through (middle layer).
3. **Illustration** — a black-and-white cut-out that *expresses the concept* (top layer, the focal point).

This mirrors the brand guide's collage-maker (https://brand.wbt.coach/collage-maker.html) and the three mobile service-page hero collages already built in this repo. Study `Finished Collages/*.png` in the brand assets for the target look: one dominant illustration, a watercolor blob peeking out behind it, and a scribble curling around — all overlapping, on a transparent background.

## Inputs

- **Concept** (required) — what the collage should express, e.g. "clarity", "new ideas", "team collaboration", "resilience", "the bigger picture", "emotional intelligence". Ask for it if not given.
- **Color** (optional) — a brand color, or a page context (leadership→Gold, team→Intentional Blue, facilitation→Ochre). Otherwise choose per the concept's feel.
- **Output** (optional) — a **standalone PNG** (default) or an **embeddable HTML block** for a page.

## Step 1 — Read the catalog

Read `catalog.md` (same folder). It has the full asset list, the illustration→tag map, the seven watercolor colors, and the scribble categories, plus the `BRAND_ASSETS` base path.

## Step 2 — Choose the three assets

1. **Illustration** — match the concept to the tag map in `catalog.md`. Pick the single illustration that most clearly expresses it. State your pick and why in one line (e.g. *"clarity → Lightbulb-Glowing (ideas/illumination)"*). If two read equally well, prefer the cleaner silhouette; pick singular vs. plural to fit the message (e.g. `Bees-Pair` for a duo, `Bees-Trio` for a small team).
2. **Color + spot** — choose the color by rule 1→2→3 in the catalog, then a spot **shape** `-1..-9`. **Vary the shape every time** — rotate through 1–9, don't keep grabbing `-1`/`-2`.
3. **Scribble** — pick a **large, expressive** one, and a **genuinely different file each time** (we have ~350 across 12 categories — rotate widely). Steer by mood: Loops/Sweeps = graceful, Waves/Lines/Ornamental = calm/simple, Hearts = emotional-intelligence. **Favor single-stroke scribbles** (Loops, Sweeps, Waves, single Lines) — they read cleanly when big. **Chaotic and Blocks are dense** and will swallow the illustration when enlarged, so use them only when you deliberately want the scribble to dominate.

### ⚠️ Variety is required
Never reuse the same spot shape or scribble file across collages. Before choosing, run `ls assets/collages/*/` and glance at recent picks (or check the source filenames already copied) and deliberately pick assets you haven't used. Rotate the **color**, the **spot shape (1–9)**, and especially the **scribble** (different file *and* often a different category) so no two collages look alike.

## Step 3 — Stage the assets

Copy the three chosen files into the repo so the collage is self-contained:

```sh
mkdir -p assets/collages/<slug>
cp "$BRAND_ASSETS/Illustrations/<Illustration>.png"                              assets/collages/<slug>/illustration.png
cp "$BRAND_ASSETS/Watercolor Textures/Spots/<Color>/WBT-...-Spots-<N>.png"       assets/collages/<slug>/spot.png
cp "$BRAND_ASSETS/Scribbles/<Category>/<file>.png"                               assets/collages/<slug>/scribble.png
```

`<slug>` = concept in kebab-case (e.g. `clarity`, `team-collaboration`).

## Step 4 — Compose the collage

Build an HTML stage with the three layers absolutely positioned and **overlapping**. Transparent background. Layer order is fixed: **spot (z1) → scribble (z2) → illustration (z3)**.

Starting template (tune the numbers in Step 5):

```html
<div class="wbt-collage" style="position:relative; width:640px; height:560px; background:transparent;">
  <img src="assets/collages/<slug>/spot.png"         style="position:absolute; z-index:1; width:90%;  left:5%;  top:12%;">
  <img src="assets/collages/<slug>/scribble.png"     style="position:absolute; z-index:2; width:88%;  left:6%;  top:22%; transform:rotate(-6deg);">
  <img src="assets/collages/<slug>/illustration.png" style="position:absolute; z-index:3; width:48%;  left:28%; top:16%;">
  <!-- Narrow illustration (hourglass/key/lamppost)? Push spot to ~120–145% so it clears the silhouette. -->
</div>
```

**Composition rules (from the finished collages):**
- The **illustration is the anchor** — largest *single* read, roughly centered, sized by its natural aspect (tall items like a lightbulb are governed by height, wide items by width). Aim for it to occupy ~45–65% of the stage.
- The **watercolor spot sits behind and offset** so it peeks out on one or two sides (a colored halo), not perfectly concentric. **Size it by silhouette, not by a fixed %:** the spot must clearly clear the illustration's outline on 2+ sides, so a *narrow* illustration (hourglass, key, lamppost) needs a spot **much wider than the illustration** — often ~120–145% of the *stage* (roughly 2.5–3× the illustration's width) — or it just hides behind the cut-out and reads as a thin sliver. When in doubt, make the spot bigger; a spot that only peeks on one edge is too small.
- The **scribble** should feel hand-drawn and loose — but it competes with the spot for weight, so **balance the two against each other**, not against fixed numbers. A big spot wants a scribble pulled *in and up* to tangle around the illustration's waist (~65–80% of stage), while a small/subtle spot can carry a sweeping ~90–120% scribble spanning past the edges. A scribble that sits entirely *below* the illustration reads as a "pile at the base" — raise it so it weaves across and over the spot. Rotate/flip for a natural gesture; never small, centered, or timid.
- **Judge the three sizes *relatively*, in the screenshot.** The common failure is a spot that looks fine in isolation but tiny next to an oversized scribble. If one element dominates, shrink it or grow the others until no single piece swallows the rest.
- Everything **overlaps**; nothing floats alone. Keep a little asymmetry — offset each element from the others.
- Only three elements by default. Add a second scribble or a `Blue-Blob`/`Pink-Torn-Paper` accent only if the user wants a richer collage.

## Step 5 — Render, verify, iterate

Collage arrangement is aesthetic — **always verify visually and adjust**:
1. Write the stage into a tiny standalone file (e.g. `assets/collages/<slug>/preview.html`) with the div above centered on a cream (`#F9F8F2`) background.
2. `preview_start` the `wbt-site` server if needed, open `/assets/collages/<slug>/preview.html`, and `preview_screenshot`.
3. Adjust sizes/offsets/rotation until it matches the finished-collage feel (dominant illustration, peeking halo, curling scribble). Re-shoot.

## Step 6 — Deliver

- **Standalone PNG (default):** once it looks right, screenshot the stage tightly and save the image (or tell the user the `preview.html` is ready to export). The three source PNGs already live in `assets/collages/<slug>/`.
- **Embed in a page:** hand back the `<div class="wbt-collage">…</div>` block (paths relative to the target page) to drop into a hero/section, or wire it into a `.hero-svc`-style layout as done for the mobile service headers.

## Guardrails
- Only use brand assets from `BRAND_ASSETS` — never invent or fetch other imagery.
- Keep the background transparent; the watercolor spot is the only fill.
- Match a page's colorway when the collage is for a specific WBT page.
- Don't stretch/distort — scale illustrations proportionally.
- If the concept has no clear illustration match, say so and offer the two closest options rather than forcing a poor fit.
