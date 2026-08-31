import { focus } from "@/lib/data";

export default function Focus() {
  return (
    <section className="mx-auto max-w-5xl border-t border-[var(--color-border)] px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
        // right now
      </p>
      <h2 className="font-display mt-4 max-w-lg text-2xl font-semibold tracking-tight sm:text-3xl">
        What&apos;s on my desk this month
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {focus.map((item) => (
          <div key={item.title} className="border-l-2 border-[var(--color-accent)] pl-4">
            <h3 className="font-medium leading-snug">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
