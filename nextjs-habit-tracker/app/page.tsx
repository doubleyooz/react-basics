"use client";

import { useState } from "react";
import DayHeader from "@/components/DayHeader";
import HabitList from "@/components/HabitList";
import StatsPanel from "@/components/StatsPanel";
import WeekStrip from "@/components/WeekStrip";
import { toISODate, weekOf } from "@/lib/dates";
import { useHabitStore } from "@/lib/storage";
import { completion, currentStreak } from "@/lib/stats";

export default function Home() {
  const [date, setDate] = useState(() => toISODate(new Date()));
  const {
    hydrated,
    habits,
    logs,
    getLog,
    toggleHabit,
    setMood,
    setSleep,
    addHabit,
    archiveHabit,
  } = useHabitStore();

  const log = getLog(date);
  const week = weekOf(date);

  if (!hydrated) {
    return <div className="min-h-screen" />;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 md:px-10">
      <div className="mb-10 flex items-baseline justify-between">
        <p className="font-display italic text-lg text-inkSoft">Ledger</p>
        <p className="text-xs text-inkSoft tracking-wide">
          {habits.length} habit{habits.length === 1 ? "" : "s"} tracked
        </p>
      </div>

      <DayHeader date={date} onChange={setDate} />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-12 mt-8">
        <HabitList
          habits={habits}
          checks={log.checks}
          onToggle={(habitId) => toggleHabit(date, habitId)}
          onAdd={(name, emoji) => addHabit(name, emoji, date)}
          onArchive={archiveHabit}
        />

        <StatsPanel
          percent={completion(habits, log)}
          streak={currentStreak(habits, logs, date)}
          mood={log.mood}
          sleepHours={log.sleepHours}
          onMood={(v) => setMood(date, v)}
          onSleep={(v) => setSleep(date, v)}
        />
      </div>

      <WeekStrip
        week={week}
        habits={habits}
        logs={logs}
        selected={date}
        onSelectDay={setDate}
        onToggle={toggleHabit}
      />

      <footer className="mt-16 pt-6 border-t border-line text-xs text-inkSoft">
        Everything is saved on this device only.
      </footer>
    </main>
  );
}
