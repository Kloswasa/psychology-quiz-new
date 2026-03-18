# Product & design handoff

This document supports handoff from design/product to the company (engineering, product, or design team). Use it for onboarding, design consistency, and future iterations.

---

## 1. Product overview

**Travel Personality Quiz** — A short, mobile-first quiz that assigns users one of six RIASEC-based “traveler types” and shows a result page with personality copy, destination recommendations (with external links), and a shareable card.

**Goal:** Engage users with a fun, shareable experience and drive traffic to partner destinations (e.g. KKday links in seed data).

---

## 2. User flow

```
Home (/) → Intro (/intro) → Quiz (/quiz) → Result (/result)
                ↑                  ↑              ↑
         Multi-step           10 questions    One of 6 types
         carousel             (RIASEC)        + share + destinations
```

- **Home:** Entry; encourages “swipe up” / start. Background audio can play.
- **Intro:** Carousel explaining the quiz (e.g. 3 screens). Pagination and “Next” / “Start” CTA.
- **Quiz:** One question per screen; answers map to RIASEC dimensions. Per-question or global progress; some questions use image answers or full-bleed backgrounds.
- **Result:** Type-specific title, description, hero image, destinations (with links), tips, trivia. Share button generates a share card (OG-style image or in-app share).

---

## 3. Design decisions (for consistency)

- **RIASEC model:** Six types — Realistic, Investigative, Artistic, Social, Enterprising, Conventional. Each type has a dedicated color and optional imagery (see `lib/types.ts` for `PERSONALITY_THEME_COLORS`).
- **Mobile-first, PWA-friendly:** Viewport and touch-friendly targets; safe-area insets used for notched devices (e.g. `pb-safe`, `env(safe-area-inset-bottom)`).
- **Background audio:** Optional BGM on home/quiz (see `BackgroundAudio.tsx` and quiz page). Company can make it toggleable or remove.
- **Share:** Result page supports sharing; asset expectations (e.g. share images per type) are in `docs/ASSETS.md`.

---

## 4. Design tokens (implementation reference)

**Fonts** (loaded in `app/layout.tsx`):

| Purpose | Variable | Font |
|--------|----------|------|
| Sans | `--font-geist-sans` | Geist |
| Mono | `--font-geist-mono` | Geist Mono |
| Script / playful | `--font-caveat` | Caveat |
| Display / titles | `--font-permanent-marker` | Permanent Marker |
| Body / readable | `--font-bitter` | Bitter |
| UI / body | `--font-inter` | Inter |

**Personality theme colors** (hex, in `lib/types.ts`):

| Type | Hex |
|------|-----|
| Realistic | `#0CB6FF` |
| Investigative | `#0055FF` |
| Artistic | `#8800FF` |
| Social | `#52DFC8` |
| Enterprising | `#FFA600` |
| Conventional | `#A0D951` |

**Global CSS:** `app/globals.css` defines `--background`, `--foreground`, Tailwind theme, safe-area spacing, and animation keyframes (shimmer, wave, etc.). Dark mode is supported via `prefers-color-scheme: dark`.

---

## 5. Content and copy ownership

- **In code/DB:** Quiz questions, answer options, traveler type titles/descriptions, destination names/links, tips, and trivia live in **`prisma/seed.ts`** and the database. Changing copy or links = edit seed (and optionally re-seed) or manage via a CMS later.
- **Partner links:** Seed data includes third-party URLs (e.g. KKday). The company should own link validation, affiliate tagging, and legal/compliance.

---

## 6. What to hand off to the company

| Item | Location / notes |
|------|-------------------|
| Repo + README | Root README and `psychology-quiz/` app; env via `.env.example` |
| Database | PostgreSQL; schema and seed in `prisma/` |
| Required assets | See `docs/ASSETS.md` (images, sounds, icons) |
| Design tokens | This doc + `lib/types.ts` + `app/globals.css` |
| Figma / design files | If any: link in README or here; asset export specs in `public/*/README.md` |
| Known limitations / TODOs | List below or in repo issues |

---

## 7. Suggested next steps for the company

1. Clone repo, set `DATABASE_URL`, run migrations + seed, confirm flow end-to-end.
2. Gather or create all assets listed in `docs/ASSETS.md`; replace placeholders if needed.
3. Review and, if needed, adjust copy and partner links in `prisma/seed.ts` (or plan CMS integration).
4. Configure production env (e.g. Vercel), add analytics/error tracking, and decide policy for background audio and share behavior.
5. Optional: Add tests, CI, and design system docs (e.g. Storybook) for long-term maintenance.

---

*Document maintained for handoff. Update when flows, tokens, or ownership change.*
