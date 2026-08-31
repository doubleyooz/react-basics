import { stack } from "@/lib/data";

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-5xl border-t border-[var(--color-border)] px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
        // stack
      </p>
      <h2 className="font-display mt-4 max-w-lg text-2xl font-semibold tracking-tight sm:text-3xl">
        Tools I reach for, and a few I&apos;m still learning to.
      </h2>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {stack.map((group) => (
          <div key={group.label}>
            <h3 className="font-mono text-sm font-medium text-[var(--color-accent-ink)]">
              {group.label}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <span
                  key={tool}
                  className={`font-mono rounded-full border px-3 py-1 text-xs ${
                    group.label === "Exploring"
                      ? "border-[var(--color-accent2)]/40 bg-[var(--color-accent2-soft)] text-[var(--color-accent2)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]"
                  }`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
