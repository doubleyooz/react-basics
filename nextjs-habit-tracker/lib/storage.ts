"use client";

import { useCallback, useEffect, useState } from "react";
import type { DayLog, Habit, Store } from "./types";

const STORAGE_KEY = "ledger.habit-tracker.v1";

const DEFAULT_HABITS: Habit[] = [
  { id: "h1", name: "Wake up at 6:00", emoji: "\u2600", createdAt: "", archived: false },
  { id: "h2", name: "Move / exercise", emoji: "\uD83C\uDFCB", createdAt: "", archived: false },
  { id: "h3", name: "Read 20 minutes", emoji: "\uD83D\uDCD6", archived: false, createdAt: "" },
  { id: "h4", name: "No phone after 22:00", emoji: "\uD83D\uDCF5", archived: false, createdAt: "" },
  { id: "h5", name: "Drink 2L water", emoji: "\uD83D\uDCA7", archived: false, createdAt: "" },
];

function emptyStore(): Store {
  return { habits: DEFAULT_HABITS, logs: {} };
}

function loadStore(): Store {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Store;
    if (!parsed.habits || !parsed.logs) return emptyStore();
    return parsed;
  } catch {
    return emptyStore();
  }
}

function saveStore(store: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function emptyLog(date: string): DayLog {
  return { date, checks: {}, mood: null, sleepHours: null };
}

export function useHabitStore() {
  const [store, setStore] = useState<Store>(emptyStore());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStore(loadStore());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Store) => {
    setStore(next);
    saveStore(next);
  }, []);

  const getLog = useCallback(
    (date: string): DayLog => store.logs[date] ?? emptyLog(date),
    [store.logs]
  );

  const toggleHabit = useCallback(
    (date: string, habitId: string) => {
      const current = store.logs[date] ?? emptyLog(date);
      const nextLog: DayLog = {
        ...current,
        checks: { ...current.checks, [habitId]: !current.checks[habitId] },
      };
      persist({ ...store, logs: { ...store.logs, [date]: nextLog } });
    },
    [store, persist]
  );

  const setMood = useCallback(
    (date: string, mood: number | null) => {
      const current = store.logs[date] ?? emptyLog(date);
      persist({ ...store, logs: { ...store.logs, [date]: { ...current, mood } } });
    },
    [store, persist]
  );

  const setSleep = useCallback(
    (date: string, sleepHours: number | null) => {
      const current = store.logs[date] ?? emptyLog(date);
      persist({ ...store, logs: { ...store.logs, [date]: { ...current, sleepHours } } });
    },
    [store, persist]
  );

  const addHabit = useCallback(
    (name: string, emoji: string, today: string) => {
      const habit: Habit = {
        id: `h_${Date.now()}`,
        name,
        emoji: emoji || "\u2726",
        createdAt: today,
        archived: false,
      };
      persist({ ...store, habits: [...store.habits, habit] });
    },
    [store, persist]
  );

  const archiveHabit = useCallback(
    (habitId: string) => {
      persist({
        ...store,
        habits: store.habits.map((h) =>
          h.id === habitId ? { ...h, archived: true } : h
        ),
      });
    },
    [store, persist]
  );

  return {
    hydrated,
    habits: store.habits.filter((h) => !h.archived),
    logs: store.logs,
    getLog,
    toggleHabit,
    setMood,
    setSleep,
    addHabit,
    archiveHabit,
  };
}
