import { addDays } from "./dates";
import type { DayLog, Habit } from "./types";

export function completion(habits: Habit[], log: DayLog | undefined): number {
  if (habits.length === 0) return 0;
  const done = habits.filter((h) => log?.checks[h.id]).length;
  return Math.round((done / habits.length) * 100);
}

/** Consecutive days ending at `date` (inclusive) where every active habit was checked. */
export function currentStreak(
  habits: Habit[],
  logs: Record<string, DayLog>,
  date: string
): number {
  if (habits.length === 0) return 0;
  let streak = 0;
  let cursor = date;
  // Only count today if it's already fully done; otherwise look at yesterday backwards.
  for (let i = 0; i < 366; i++) {
    const log = logs[cursor];
    const allDone = habits.every((h) => log?.checks[h.id]);
    if (!allDone) {
      if (i === 0) {
        cursor = addDays(cursor, -1);
        continue;
      }
      break;
    }
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}
