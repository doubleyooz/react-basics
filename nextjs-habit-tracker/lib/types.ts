export type Habit = {
  id: string;
  name: string;
  emoji: string;
  createdAt: string; // ISO date the habit was created (yyyy-mm-dd)
  archived: boolean;
};

export type DayLog = {
  date: string; // yyyy-mm-dd
  checks: Record<string, boolean>; // habitId -> done
  mood: number | null; // 1-5
  sleepHours: number | null;
};

export type Store = {
  habits: Habit[];
  logs: Record<string, DayLog>; // date -> DayLog
};
