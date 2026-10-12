"use client";

import { Icon } from '@iconify/react';
import { addDays, dayName, dayNumber, isToday, monthName, toISODate, yearNumber } from "@/lib/dates";
import { Button } from "./Button";

export default function DayHeader({
  date,
  onChange,
}: {
  date: string;
  onChange: (next: string) => void;
}) {
  return (
    <header className="flex items-end justify-between border-b border-line pb-6">
      <div className="flex items-end gap-5">
        <span className="font-display text-[5.5rem] leading-[0.8] tracking-tight text-ink">
          {dayNumber(date)}
        </span>
        <div className="pb-1">
          <p className="font-display text-2xl italic text-inkSoft leading-none mb-1">
            {dayName(date)}
          </p>
          <p className="text-sm text-inkSoft tracking-wide">
            {monthName(date)} {yearNumber(date)}
            {isToday(date) && (
              <span className="ml-2 text-moss">&middot; today</span>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 pb-1">

        <Button
          aria-label="Previous day"
          icon={<Icon icon="bi:arrow-left" />}
          onClick={() => onChange(addDays(date, -1))}
        />

        {!isToday(date) && (         
            <Button
              aria-label="Today"
              label="Today"
              onClick={() => onChange(toISODate(new Date()))}
              fullWidth
            />
        
        )}
        <Button
          aria-label="Next day"
          icon={<Icon icon="bi:arrow-right" />}
          onClick={() => onChange(addDays(date, 1))}
        />
      </div>
    </header>
  );
}
