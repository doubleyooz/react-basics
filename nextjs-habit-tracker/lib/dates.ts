export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fromISODate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(s: string, delta: number): string {
  const d = fromISODate(s);
  d.setDate(d.getDate() + delta);
  return toISODate(d);
}

export function isToday(s: string): boolean {
  return s === toISODate(new Date());
}

export function dayName(s: string, style: "long" | "short" = "long"): string {
  return fromISODate(s).toLocaleDateString("en-US", { weekday: style });
}

export function monthName(s: string): string {
  return fromISODate(s).toLocaleDateString("en-US", { month: "long" });
}

export function dayNumber(s: string): string {
  return String(fromISODate(s).getDate()).padStart(2, "0");
}

export function yearNumber(s: string): number {
  return fromISODate(s).getFullYear();
}

/** Returns the 7 dates (Mon..Sun) of the week containing s. */
export function weekOf(s: string): string[] {
  const d = fromISODate(s);
  const dow = (d.getDay() + 6) % 7; // 0 = Monday
  const monday = addDays(s, -dow);
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}
