# Asset manifest

Required and optional static assets under `public/`. Use this list to ensure all files are present before handoff or deployment.

---

## 1. Icons (`public/icons/`)

| File | Used in | Notes |
|------|---------|--------|
| `swipe-up.svg` | HomePage.tsx | “Swipe up” CTA; displayed at 20×20. PNG acceptable (update path in code). |

See `public/icons/README.md` for export notes.

---

## 2. Home page (`public/home/`)

Optional; replace placeholders with final art. See `public/home/README.md`.

| File | Notes |
|------|--------|
| polaroid-beach.svg | Beach polaroid |
| polaroid-bushland.svg | Bushland polaroid |
| koala-stamp.svg | Koala stamp |
| emblem-circle.svg | Circle/sun emblem |
| kangaroo.svg | Kangaroo silhouette |
| boomerang.svg | Boomerang graphic |
| wildlife-sign.svg | “WILDLIFE AHEAD” sign |

---

## 3. Intro (`public/intro/`)

| File | Notes |
|------|--------|
| sample-surf.jpg | Bondi surf card (intro page 3). Placeholder if missing. |

See `public/intro/README.md`.

---

## 4. Sounds (`public/sounds/`)

| File | Used in |
|------|---------|
| `main-bg.mp3` | BackgroundAudio.tsx (global BGM) |
| `question-1.mp3` … `question-10.mp3` | Quiz page (per-question audio) |

---

## 5. Images (`public/images/`)

### 5.1 Traveler types

| Path | Purpose |
|------|---------|
| `types/REALISTIC.png` | Type hero image |
| `types/INVESTIGATIVE.png` | |
| `types/ARTISTIC.png` | |
| `types/SOCIAL.png` | |
| `types/ENTERPRISING.png` | (Seed uses `types/` for this one; result fallback uses `results/`) |
| `types/CONVENTIONAL.png` | |

### 5.2 Result page fallback

| Path | Purpose |
|------|---------|
| `results/REALISTIC.png` … `results/CONVENTIONAL.png` | Used by TravelerResult when rendering result hero (fallback per type). |

### 5.3 Share images (one per type)

| Path | Seed reference |
|------|----------------|
| `share/adventure-seeker.png` | Realistic |
| `share/cultural-explorer.png` | Investigative |
| `share/creative-wanderer.png` | Artistic |
| `share/connection-traveler.png` | Social |
| `share/opportunistic-adventurer.png` | Enterprising |
| `share/planned-traveler.png` | Conventional |

### 5.4 Quiz backgrounds

| Path |
|------|
| `backgrounds/question1-bg.png` |
| `backgrounds/question2-bg.webp` … `question10-bg.webp` |

### 5.5 Answer images (per question)

Refer to `prisma/seed.ts` for exact filenames. Examples:

- **Q6:** `answers/q6-1.gif` … `q6-4.gif`
- **Q9:** `answers/q9-1.png` … `q9-5.png`
- **Q10:** `answers/q10-1.gif` … `q10-4.gif`

### 5.6 Destination images

Stored in seed as `imageUrl` per destination. Naming pattern: first letter = RIASEC prefix (r, i, a, s, e, c), then number. Examples:

- `destinations/r-1.webp` … `r-10.jpeg` (Realistic)
- `destinations/i-1.webp` … `i-9.jpeg` (Investigative)
- `destinations/a-1.jpg` … `a-7.webp` (Artistic)
- `destinations/s-2.webp` … `s-7.webp` (Social; no s-1 in seed)
- `destinations/e-1.webp` … `e-6.jpeg` (Enterprising)
- `destinations/c-1.webp` … `c-10.webp` (Conventional)

Exact list is in `prisma/seed.ts`; keep in sync when adding/removing destinations.

---

## 6. Checklist for handoff

- [ ] All `public/sounds/` files present (main-bg + question-1 … question-10).
- [ ] All `public/icons/` files (at least swipe-up).
- [ ] Type images: `public/images/types/*.png` (and `results/*.png` if used).
- [ ] Share images: `public/images/share/*.png` for all six types.
- [ ] Quiz backgrounds: `public/images/backgrounds/question1-bg.png`, `question2-bg.webp` … `question10-bg.webp`.
- [ ] Answer images used in seed (q6, q9, q10 and any others).
- [ ] Destination images referenced in seed (destinations/r-*, i-*, a-*, s-*, e-*, c-*).
- [ ] Optional: home and intro assets per READMEs in `public/home/` and `public/intro/`.

If any path in seed or code is changed, update this manifest and the corresponding README.
