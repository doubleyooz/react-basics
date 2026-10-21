"use client";

import { useState } from "react";
import type { Habit } from "@/lib/types";
import { Button } from "./Button";
import { CheckBox } from "./Checkbox";

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
              <CheckBox
                done={done}
                aria-label={done ? `Mark ${habit.name} as not done` : `Mark ${habit.name} as done`}
                onClick={() => onToggle(habit.id)} />
              
           
              <span aria-hidden className="text-lg w-5 text-center shrink-0">
                {habit.emoji}
              </span>

              <span
                className={`flex-1 text-[0.98rem] ${done ? "text-inkSoft line-through decoration-sage" : "text-ink"
                  }`}
              >
                {habit.name}
              </span>
           
              <Button
                aria-label={`Remove ${habit.name}`}
                label="remove"
                onClick={() => onArchive(habit.id)}
                className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-xs text-inkSoft hover:text-clay transition-opacity px-2"
                noBorder
              />
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

          <Button
            label="Add"
            type="submit"
            variant="inkSoft"
          />

          <Button
            label="Cancel"
            type="submit"
            variant="secondary"
            onClick={() => {
              setAdding(false);
              setName("");
            }}
          />

        </form>
      ) : (
        <Button
          label="  + add a habit"
          onClick={() => setAdding(true)}
          className="mt-3 text-inkSoft hover:text-ink"
          fullWidth
          noBorder
        />

      )}
    </section>
  );
}
