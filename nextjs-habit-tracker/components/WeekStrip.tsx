"use client";

import { dayName, dayNumber, isToday } from "@/lib/dates";
import type { DayLog, Habit } from "@/lib/types";

export default function WeekStrip({
  week,
  habits,
  logs,
  selected,
  onSelectDay,
  onToggle,
}: {
  week: string[];
  habits: Habit[];
  logs: Record<string, DayLog>;
  selected: string;
  onSelectDay: (date: string) => void;
  onToggle: (date: string, habitId: string) => void;
}) {
  if (habits.length === 0) return null;

  return (
    <section aria-label="This week" className="mt-4">
      <p className="text-sm text-inkSoft mb-3">this week</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm min-w-[560px]">
          <thead>
            <tr>
              <th className="text-left font-normal text-inkSoft pb-2 pr-3 w-40">
                &nbsp;
              </th>
              {week.map((d) => (
                <th key={d} className="pb-2 px-1 font-normal">
                  <button
                    onClick={() => onSelectDay(d)}
                    className={`flex flex-col items-center w-full py-1 border-b-2 transition-colors ${
                      d === selected
                        ? "border-clay text-ink"
                        : isToday(d)
                        ? "border-moss text-ink"
                        : "border-transparent text-inkSoft hover:text-ink"
                    }`}
                  >
                    <span className="text-[0.7rem] tracking-wide">
                      {dayName(d, "short")}
                    </span>
                    <span className="font-display text-base">{dayNumber(d)}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id} className="border-t border-line">
                <td className="py-2 pr-3 text-inkSoft truncate max-w-[9rem]">
                  <span aria-hidden className="mr-1.5">
                    {habit.emoji}
                  </span>
                  {habit.name}
                </td>
                {week.map((d) => {
                  const done = !!logs[d]?.checks[habit.id];
                  return (
                    <td key={d} className="py-2 px-1 text-center">
                      <button
                        aria-label={`${done ? "Unmark" : "Mark"} ${habit.name} on ${d}`}
                        onClick={() => onToggle(d, habit.id)}
                        className={`h-5 w-5 border transition-colors mx-auto ${
                          done ? "bg-moss border-moss" : "border-inkSoft/40"
                        }`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
