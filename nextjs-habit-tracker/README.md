# Ledger — Daily Habit Tracker

A quiet, paper-ruled daily habit tracker built with Next.js 14 (App Router) and TypeScript. No account, no backend — everything is saved to your browser's local storage.

## Features

- Day-by-day view with a date navigator (prev / next / jump to today)
- Add, check off, and remove habits
- Daily completion ring and a rolling "all habits done" streak counter
- Mood (1–5) and sleep-hours quick log per day
- A week strip at the bottom for a ledger-style view of the last 7 days, with direct toggling

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Stack

- Next.js 14 / React 18 / TypeScript
- Tailwind CSS for styling
- `next/font` (Fraunces + Inter) for typography
- Browser `localStorage` for persistence — no database required

## Project structure

```
app/
  layout.tsx      root layout, fonts, metadata
  page.tsx         main daily view
  globals.css      paper/ledger background, focus states
components/
  DayHeader.tsx    big date number + navigation
  HabitList.tsx    checklist + add-habit form
  StatsPanel.tsx   completion ring, streak, mood, sleep
  WeekStrip.tsx    7-day grid with direct toggling
lib/
  types.ts         Habit / DayLog / Store types
  dates.ts         date helpers
  stats.ts         completion % and streak calculation
  storage.ts       localStorage-backed React hook
```

## Notes for extending

- Data lives entirely in `localStorage` under the key `ledger.habit-tracker.v1`. To wire up a real backend, swap `lib/storage.ts`'s `loadStore`/`saveStore` for API calls (the `useHabitStore` hook's public interface can stay the same).
- Streak logic in `lib/stats.ts` currently counts a day as "complete" only when every active habit is checked; adjust `currentStreak` if you'd rather track per-habit streaks.
