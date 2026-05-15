# Pragati

Pragati is a deployment-ready Next.js app for a premium DSA consistency intelligence platform.

## Stack

- Next.js App Router
- TypeScript strict mode
- TailwindCSS
- Framer Motion
- Recharts
- Supabase client placeholder
- Vitest

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run typecheck
npm test
npm run build
```

## Deploy

This project includes `vercel.json`, so it can be deployed from the Pragati folder with Vercel:

```bash
vercel
```

For Supabase-backed auth and persistence, add:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Included

- Animated dashboard-first product shell
- Daily DSA logging UI with live deterministic growth score
- Topic toggles and reflection input
- Momentum, streak, topic diversity, and weekly lift metrics
- Growth quality chart
- Topic mastery radar
- Resume-safe onboarding summary
- Milestone ladder
- Certificate preview ready for future PDF/PNG export
- Responsive desktop sidebar and mobile bottom navigation
- Unit tests for the growth formula

## Next Phase

- Supabase schema migrations
- Real auth routes
- Persisted daily logs
- Certificate PDF/PNG generation
- Leaderboards and percentile calculation
- Full route split across dashboard, analytics, milestones, certificates, profile, and settings
