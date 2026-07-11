# WBT Collage — Asset Catalog

All source assets live in the WBT **brand guide** repo (a separate local project, not this repo):

```
BRAND_ASSETS="/Users/deroyperaza/Projects/wbt-brand-guide/assets"
```

Sub-paths:
- Illustrations: `$BRAND_ASSETS/Illustrations/<Name>.png`
- Watercolor spots: `$BRAND_ASSETS/Watercolor Textures/Spots/<Color>/WBT-20260403-<ColorFile>-Watercolor-Spots-<1..9>.png`
- Scribbles: `$BRAND_ASSETS/Scribbles/<Category>/<file>.png`
- Finished-collage examples (for style reference only): `$BRAND_ASSETS/Finished Collages/*.png`

Every asset is a transparent PNG. Illustrations are black-and-white cut-outs; spots are single-color watercolor blobs; scribbles are thin black line art.

---

## 1. Illustrations — pick by CONCEPT (tag match)

Choose the ONE illustration whose concept best expresses the user's idea. Match on the tags below (and obvious synonyms). If several fit, prefer the one that reads most clearly as a single silhouette. Use the plural/singular that fits the message (e.g. one bee vs. a trio).

| Illustration file | Concept group | Tags / when to use |
|---|---|---|
| `Lightbulb-3D.png`, `Lightbulb-Glowing.png`, `Lightbulb-Pendant.png`, `Street-Lamp.png` | **Ideas & Light** | ideas, innovation, brainstorming, illumination, clarity, insight, a-ha moments, bright idea, creativity |
| `Full-Moon.png`, `Planet-Mars.png`, `Planet-Neptune.png`, `Saturn-Rings.png` | **Cosmos & Wonder** | vision, ambition, perspective, the bigger picture, wonder, aspiration, long-term, possibility, exploration |
| `Eye.png`, `Eye-Rays.png`, `Gold-Blue-Eye.png`, `Hands-With-Eyes.png`, `Mirror.png` | **Perception & Reflection** | assessment, perception, bias, reflection, self-awareness, seeing clearly, noticing, observation, insight |
| `Heart.png`, `Heart-Tablet.png`, `Heart-Tablet-2.png` | **Emotional Intelligence** | emotional intelligence, empathy, feedback, care, connection, compassion, relationships |
| `Hourglass.png`, `Watch.png` | **Time, Stress, Assessment** | time, stress, urgency, agenda, pacing, patience, the stopwatch, deadlines, endurance |
| `Key.png`, `Open-Doors.png`, `Map.png` | **Growth & Development** | growth, development, leadership, direction, unlocking potential, the path forward, opportunity, next step, navigation |
| `Roots.png`, `Tree-Roots.png`, `Nest.png`, `Nest-Bird.png`, `Red-Butterfly.png` | **Renewal & Resilience** | renewal, resilience, psychological safety, grounding, transformation, growth from within, stability, belonging, rebirth |
| `Sun.png`, `Sun2.png`, `Rays.png`, `Star.png`, `Star-Colors.png` | **Energy & Motivation** | motivation, energy, brainstorming, team spotlight, renewal, optimism, recognition, warmth, shining |
| `Bee-Single.png`, `Bees-Pair.png`, `Bees-Trio.png` | **Team & Collaboration** | team coaching, collaboration, collective intelligence, hive mind, working together, partnership (pair = 2:2 / duo; trio = small team) |
| `Blue-Blob.png`, `Pink-Blob.png`, `Pink-Torn-Paper-1.png`, `Pink-Torn-Paper-2.png` | **Layout accents (rarely the focal)** | backgrounds, collage moments, behind-text accents — use only as an extra texture, not as the concept illustration |

> Full authoritative tag list: https://brand.wbt.coach/elements.html#images

---

## 2. Watercolor spots — pick a COLOR, then a shape

Seven brand colors, nine spot shapes each (`-1` … `-9`). Filenames:
`$BRAND_ASSETS/Watercolor Textures/Spots/<Color>/WBT-20260403-<ColorFile>-Watercolor-Spots-<N>.png`

| Color (folder) | `<ColorFile>` in filename | Hex | Feel |
|---|---|---|---|
| Radiant Gold | `Gold` | `#CD9F36` | warmth, optimism, energy — **leadership** |
| Intentional Blue | `Intentional-Blue` | `#2531A5` | focus, action, trust — **team** |
| Honest Ochre | `Honest-Ochre` | `#B55312` | tension, challenge, grounding — **facilitation** |
| Steady Blue | `Steady-Blue` | (deep navy) | calm authority, depth |
| Calm Blue | `Calm-Blue` | (soft blue) | ease, openness, safety |
| Clean Slate | `Clean-Slate` | (light gray-blue) | neutrality, clarity, a fresh start |
| Grounded Black | `Grounded-Black` | (near-black) | seriousness, weight, contrast |

**How to choose the color:**
1. If the collage is for a specific WBT service page/context, match that colorway: leadership→Gold, team→Intentional Blue, facilitation→Ochre.
2. Otherwise pick the color whose *feel* fits the concept (e.g. resilience→Steady/Calm Blue, energy→Gold, challenge→Ochre).
3. When unsure, default to **Radiant Gold** or **Intentional Blue** (the two most common).

Pick any shape `-1..-9`; they're interchangeable organic blobs. `-1`/`-2`/`-3` tend to be the fullest, roundest blobs (good default backdrops).

---

## 3. Scribbles — pick a flowing accent

`$BRAND_ASSETS/Scribbles/<Category>/<file>.png`. For collages, prefer thin, organic, looping line art. Best categories:

| Category | Count | Good for | Example files |
|---|---|---|---|
| **Loops** | 4 | signature curly accents (the collage default) | `WBT-scribble-cascading-ovals.png`, `WBT-scribble-double-oval-tail.png`, `WBT-scribble-loop-wavy-tail.png`, `WBT-scribble-overlapping-ovals.png` |
| **Sweeps** | 2 | one long graceful gesture | `WBT-scribble-long-sweep-spiral.png`, `WBT-scribble-s-curve-loop.png` |
| **Waves** | 1 | a calm undulating line | `WBT-scribble-looping-wave.png` |
| **Chaotic** | 63 | energetic tangles | `WBT-scribble-chaotic-01.png` … `-63.png` |
| **Lines** | 50 | minimal single strokes | `WBT-scribble-line-01.png` … `-50.png` |
| **Straight** | 60 | underlines / straight marks | `WBT-scribble-straight-01.png` … `-60.png` |
| Ornamental (30), Blocks (38), Misc (50), Backgrounds (21), Botanical (2), Hearts (3) | — | specialty — use only if the concept calls for it | — |

**Default:** a **Loops** or **Sweeps** scribble. Use **Chaotic** for high-energy concepts, **Waves/Lines** for calm/minimal ones, **Hearts** for emotional-intelligence concepts.
