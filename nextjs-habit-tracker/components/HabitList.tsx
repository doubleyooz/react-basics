"use client";

import { useState } from "react";
import type { Habit } from "@/lib/types";

export default function HabitList({
  habits,
  checks,
  onToggle,
  onAdd,
  onArchive,
}: {
  habits: Habit[];
  checks: Record<string, boolean>;
  onToggle: (habitId: string) => void;
  onAdd: (name: string, emoji: string) => void;
  onArchive: (habitId: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, emoji.trim());
    setName("");
    setEmoji("");
    setAdding(false);
  }

  return (
    <section aria-label="Today's habits">
      <ul>
        {habits.map((habit) => {
          const done = !!checks[habit.id];
          return (
            <li
              key={habit.id}
              className="group flex items-center gap-4 py-3 border-b border-line"
            >
              <button
                role="checkbox"
                aria-checked={done}
                aria-label={done ? `Mark ${habit.name} as not done` : `Mark ${habit.name} as done`}
                onClick={() => onToggle(habit.id)}
                className={`relative h-6 w-6 shrink-0 border transition-colors ${
                  done ? "bg-moss border-moss" : "border-inkSoft/60 bg-transparent"
                }`}
              >
                {done && (
                  <span className="tick-check absolute inset-0 bg-paper" />
                )}
              </button>

              <span aria-hidden className="text-lg w-5 text-center shrink-0">
                {habit.emoji}
              </span>

              <span
                className={`flex-1 text-[0.98rem] ${
                  done ? "text-inkSoft line-through decoration-sage" : "text-ink"
                }`}
              >
                {habit.name}
              </span>

              <button
                onClick={() => onArchive(habit.id)}
                aria-label={`Remove ${habit.name}`}
                className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-xs text-inkSoft hover:text-clay transition-opacity px-2"
              >
                remove
              </button>
            </li>
          );
        })}
      </ul>

      {adding ? (
        <form onSubmit={submit} className="flex items-center gap-3 py-3">
          <input
            autoFocus
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder={"\u2726"}
            maxLength={2}
            className="h-9 w-11 border border-line bg-transparent text-center text-lg focus:border-ink outline-none"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name the habit"
            className="h-9 flex-1 border border-line bg-transparent px-3 text-[0.95rem] focus:border-ink outline-none"
          />
          <button
            type="submit"
            className="h-9 px-3 bg-ink text-paper text-sm hover:bg-inkSoft transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setAdding(false);
              setName("");
            }}
            className="h-9 px-3 border border-line text-sm hover:border-ink transition-colors"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-3 text-sm text-inkSoft hover:text-ink transition-colors"
        >
          + add a habit
        </button>
      )}
    </section>
  );
}
