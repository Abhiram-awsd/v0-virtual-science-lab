# Virtual Science Lab

Interactive virtual science experiments — Ohm's Law circuits, acid-base pH indicators, instant explanations, and quizzes. Works offline; AI enhances it when `OPENAI_API_KEY` is set.

## Features

- 2 interactive simulations (Ohm's Law with p5.js circuit, pH beaker with live indicator)
- Theory cards, live readings, Run & Explain flow
- `/api/explain` with OpenAI (`gpt-4o-mini`) + automatic offline fallback lessons and quizzes
- Knowledge-check quizzes with scoring
- Production-ready: SEO metadata, sitemap/robots/manifest, loading/error/404 states, responsive dark UI

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Optional AI (otherwise offline lessons are used):

```bash
cp .env.example .env   # then set OPENAI_API_KEY
```

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run typecheck` — TypeScript check

## Deploy

Optimized for Vercel (`next build`). No env vars required; add `OPENAI_API_KEY` in Vercel project settings to enable AI explanations.

## Project structure

- `app/` — routes (`/`, `/experiment/[id]`, `/api/explain`), layout, SEO files
- `components/experiments/` — `ohms-law.tsx`, `acid-base.tsx`
- `components/quiz.tsx` — reusable quiz
- `lib/experiments.ts` — experiment catalog + offline fallback content
- `lib/p5-wrapper.tsx` — p5 lifecycle wrapper
