# Product & design handoff

This document supports handoff from design/product to the company (engineering, product, or design team). Use it for onboarding, design consistency, and future iterations.

---

## 1. Product overview

**Travel Personality Quiz** — A short, mobile-first quiz that assigns users one of six RIASEC-based “traveler types” and shows a result page with personality copy, destination recommendations (with external links), and a shareable card.

**Goal:** Engage users with a fun, shareable experience and drive traffic to partner destinations (e.g. KKday links in seed data).

### Scope (what’s included)

- **Core flow:** Home → Intro → Quiz (10 questions) → Result (1 of 6 types)
- **Data source:** PostgreSQL via Prisma (questions, answers, traveler types)
- **Share:** A share action from the result screen (implementation-dependent; see “Share behavior” below)
- **Brand feel:** Mobile-first, animation-forward UI with type-specific theming

### Non-goals (not included)

- **Auth/accounts**
- **CMS/editor UI** for updating content (content is currently seeded)
- **Analytics, A/B testing, attribution** (recommended for company to add)
- **Accessibility audit** beyond baseline semantics (recommended follow-up)

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

### Key behaviors (product requirements)

- **Quiz scoring:** Each selected answer contributes to a RIASEC dimension; final type is the max score (tie-breaking should be defined by the company if needed).
- **Data integrity:** Questions should render in `order` sequence; answers are associated to their question.
- **Result determinism:** Same selections must always produce same type and content.

---

## 3. Design decisions (for consistency)

- **RIASEC model:** Six types — Realistic, Investigative, Artistic, Social, Enterprising, Conventional. Each type has a dedicated color and optional imagery (see `lib/types.ts` for `PERSONALITY_THEME_COLORS`).
- **Mobile-first, PWA-friendly:** Viewport and touch-friendly targets; safe-area insets used for notched devices (e.g. `pb-safe`, `env(safe-area-inset-bottom)`).
- **Background audio:** Optional BGM on home/quiz (see `BackgroundAudio.tsx` and quiz page). The company can make it toggleable or remove.
- **Share:** Result page supports sharing; asset expectations (e.g. share images per type) are in `docs/ASSETS.md`.

### Share behavior (clarify during integration)

This codebase includes a share button and share images per type. The company should decide:

- **Native share vs copy link:** Whether to use Web Share API, a “copy link” fallback, or both.
- **Open Graph:** Whether shared links should render an OG image server-side (requires metadata setup and image hosting).
- **Tracking:** Whether outbound link clicks and shares require attribution parameters.

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

## 5. Engineering overview (how it works)

### Runtime architecture

- **Next.js App Router** pages: `app/page.tsx`, `app/intro/page.tsx`, `app/quiz/page.tsx`, `app/result/page.tsx`
- **API routes (server):**
  - `GET /api/questions` returns questions + answers ordered by `order`
  - `GET /api/traveler-type/[type]` returns the traveler type payload for a valid RIASEC type
- **DB access:** Prisma client singleton in `lib/prisma.ts`

### Data model (Prisma)

Core tables (see `prisma/schema.prisma`):

- `Question`: `{ id, text, order, backgroundImage }`
- `Answer`: `{ id, text, questionId, riasecType, imageUrl? }`
- `TravelerType`: `{ riasecType (unique), title, description, imageUrl, shareImageUrl, destinations, tips, trivia }`

Note: `TravelerType.destinations`, `tips`, and `trivia` are stored as JSON strings and parsed in the API route before returning to the client.

### Content updates

Current content is seeded via `prisma/seed.ts`. Updating content typically means:

- edit seed data
- re-run `npx prisma db seed` (or reset DB depending on environment)

If the company wants non-technical editing, plan a CMS or admin UI (future work).

---

## 6. Content and copy ownership

- **In code/DB:** Quiz questions, answer options, traveler type titles/descriptions, destination names/links, tips, and trivia live in **`prisma/seed.ts`** and the database. Changing copy or links = edit seed (and optionally re-seed) or manage via a CMS later.
- **Partner links:** Seed data includes third-party URLs (e.g. KKday). The company should own link validation, affiliate tagging, and legal/compliance.

---

## 7. What to hand off to the company

| Item | Location / notes |
|------|-------------------|
| Repo + README | Root README and `psychology-quiz/` app; env via `.env.example` |
| Database | PostgreSQL; schema and seed in `prisma/` |
| Required assets | See `docs/ASSETS.md` (images, sounds, icons) |
| Design tokens | This doc + `lib/types.ts` + `app/globals.css` |
| Figma / design files | If any: link in README or here; asset export specs in `public/*/README.md` |
| Known limitations / TODOs | List below or in repo issues |

---

## 8. Deployment and operations notes

### Environment variables

- `DATABASE_URL` (required): PostgreSQL connection string.

### Build/seed behavior (important)

The app’s build script currently runs database steps (`prisma migrate deploy` and `prisma db seed`) before `next build`.

- If the company deploys to an environment where **build runs without DB access**, they should change the pipeline (recommended) to:
  - **Build:** `prisma generate && next build`
  - **Release step:** `prisma migrate deploy && prisma db seed` (or a one-time seed)

### Production safety

- Seeding on every deploy can be risky if it’s not idempotent for the company’s use case.
- Decide whether seed runs only on first provision, or becomes a controlled “content publish” step.

---

## 9. QA checklist / acceptance criteria

Functional:

- [ ] Home loads on mobile, CTA starts the flow
- [ ] Intro carousel works (pagination, next/back, start)
- [ ] Quiz loads all questions in order and renders all answers
- [ ] Selecting an answer advances as expected (no double-submits)
- [ ] Progress UI updates correctly across 10 questions
- [ ] Result page shows the correct traveler type for a known answer path
- [ ] Destination links open correctly (and have tracking if required)
- [ ] Share action works on iOS/Android/desktop (with a fallback)

Media:

- [ ] Background audio respects browser autoplay policies (and doesn’t break navigation)
- [ ] All required assets exist (see `docs/ASSETS.md`); no broken images/audio in the flow

Performance & stability:

- [ ] No server errors from `/api/questions` and `/api/traveler-type/[type]`
- [ ] Cold load is acceptable on mobile network (company to define budget)

---

## 10. Suggested next steps for the company

1. Clone repo, set `DATABASE_URL`, run migrations + seed, confirm flow end-to-end.
2. Gather or create all assets listed in `docs/ASSETS.md`; replace placeholders if needed.
3. Review and, if needed, adjust copy and partner links in `prisma/seed.ts` (or plan CMS integration).
4. Configure production env (e.g. Vercel), add analytics/error tracking, and decide policy for background audio and share behavior.
5. Optional: Add tests, CI, and design system docs (e.g. Storybook) for long-term maintenance.

---

*Document maintained for handoff. Update when flows, tokens, or ownership change.*
