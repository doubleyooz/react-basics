"use client";

import { Button } from "./Button";

const MOODS = [
  { v: 1, label: "rough" },
  { v: 2, label: "low" },
  { v: 3, label: "okay" },
  { v: 4, label: "good" },
  { v: 5, label: "great" },
];

export default function StatsPanel({
  percent,
  streak,
  mood,
  sleepHours,
  onMood,
  onSleep,
}: {
  percent: number;
  streak: number;
  mood: number | null;
  sleepHours: number | null;
  onMood: (v: number | null) => void;
  onSleep: (v: number | null) => void;
}) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <aside className="flex flex-col gap-8">
      <div className="flex items-center gap-5">
        <svg width="104" height="104" viewBox="0 0 104 104" className="shrink-0">
          <circle
            cx="52"
            cy="52"
            r={r}
            fill="none"
            stroke="#D3CDB9"
            strokeWidth="7"
          />
          <circle
            cx="52"
            cy="52"
            r={r}
            fill="none"
            stroke="#3F6B4E"
            strokeWidth="7"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            transform="rotate(-90 52 52)"
          />
          <text
            x="52"
            y="58"
            textAnchor="middle"
            className="font-display"
            fontSize="22"
            fill="#16281F"
          >
            {percent}%
          </text>
        </svg>
        <div>
          <p className="text-sm text-inkSoft">done today</p>
          <p className="mt-2 text-sm text-inkSoft">
            streak &mdash;{" "}
            <span className="text-clay font-medium">
              {streak} {streak === 1 ? "day" : "days"}
            </span>
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm text-inkSoft mb-2">mood</p>
        <div className="flex gap-2">
          {MOODS.map((m) => (

            <Button
              key={m.v}
              aria-label={m.label}
              aria-pressed={mood === m.v}
              onClick={() => onMood(mood === m.v ? null : m.v)}
              size='small'
              label={m.v.toString()}
              variant={mood === m.v ? "inkSoft" : "default"}

            />
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="sleep" className="text-sm text-inkSoft mb-2 block">
          hours of sleep
        </label>
        <div className="flex items-center gap-3">
          <input
            id="sleep"
            type="range"
            min={0}
            max={12}
            step={0.5}
            value={sleepHours ?? 0}
            onChange={(e) => onSleep(parseFloat(e.target.value))}
            className="flex-1 accent-moss"
          />
          <span className="font-display text-lg w-10 text-right">
            {sleepHours ?? 0}
          </span>
        </div>
      </div>
    </aside>
  );
}
