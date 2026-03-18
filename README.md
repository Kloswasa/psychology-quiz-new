# Travel Personality Quiz

A RIASEC-based travel personality quiz (Next.js): intro → quiz → result with shareable outcomes and destination recommendations.

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, Framer Motion |
| Data | PostgreSQL + Prisma |
| Language | TypeScript |

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **PostgreSQL** (local or hosted, e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com), [Vercel Postgres](https://vercel.com/storage/postgres))

## Quick start

All commands below are from the **`psychology-quiz`** app directory.

```bash
cd psychology-quiz
npm install
cp .env.example .env
# Edit .env and set DATABASE_URL to your PostgreSQL connection string
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### First-time database setup

The app uses Prisma. After setting `DATABASE_URL` in `.env`:

```bash
npx prisma migrate deploy
npx prisma db seed
```

This creates tables and seeds questions, traveler types, and destination data.  
**Note:** The `build` script runs `prisma generate`, `prisma migrate deploy`, and `prisma db seed` — ensure the database is reachable at build time if you deploy with seed-on-build.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string (e.g. `postgresql://user:pass@host:5432/dbname`) |

See `.env.example` in the `psychology-quiz` folder. Do not commit `.env`; it is gitignored.

## Scripts (from `psychology-quiz/`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Generate Prisma client, run migrations, seed DB, build Next.js |
| `npm run start` | Run production server (after `build`) |
| `npm run lint` | Run ESLint |

## Project structure (app: `psychology-quiz/`)

```
psychology-quiz/
├── app/
│   ├── page.tsx           # Home
│   ├── intro/page.tsx     # Intro carousel
│   ├── quiz/page.tsx      # Quiz flow
│   ├── result/page.tsx    # Result + share
│   ├── api/
│   │   ├── questions/     # GET quiz questions
│   │   └── traveler-type/[type]/  # GET result by RIASEC type
│   ├── layout.tsx
│   └── globals.css
├── components/            # UI components (Home, Intro, Quiz, Result, Share)
├── lib/
│   ├── prisma.ts          # Prisma singleton
│   └── types.ts           # RiasecType, theme colors
├── prisma/
│   ├── schema.prisma      # Questions, Answers, TravelerType
│   └── seed.ts            # Seed data (questions, types, destinations)
└── public/                # Static assets (see docs/ASSETS.md)
```

## Assets and content

- **Media:** Images and sounds are referenced under `public/` (e.g. `public/images/`, `public/sounds/`). The seed and UI expect a specific set of files. See **`psychology-quiz/docs/ASSETS.md`** for the full list.
- **Copy & destinations:** Quiz questions, answers, traveler type copy, and destination links are in **`prisma/seed.ts`**. Edit the seed and re-run `npx prisma db seed` (or reset DB) to change content.

## Handoff and design

- **Product/design handoff:** See **`psychology-quiz/docs/HANDOFF.md`** for user flows, design decisions, and what to hand off to the company.
- **Design tokens:** Fonts and personality theme colors are documented in the handoff doc and in `lib/types.ts` / `app/globals.css`.

## Deployment

1. Set `DATABASE_URL` in the deployment environment (e.g. Vercel project env).
2. Ensure the database is migrated and seeded (e.g. run `prisma migrate deploy` and `prisma db seed` in a build step or release pipeline).
3. Build: from `psychology-quiz/`, run `npm run build` then `npm run start`, or connect the repo to Vercel and use the same build command.

For Vercel: set the **root directory** to `psychology-quiz` if the repo root is one level up.

## License

Proprietary / as agreed with the company.
