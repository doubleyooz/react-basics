import { pipeline, profile } from "@/lib/data";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
      <p className="font-mono text-sm text-[var(--color-accent-ink)]">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--color-accent)] align-middle" />
        available for freelance work &amp; full-time roles
      </p>

      <h1 className="font-display mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
        I turn messy requirements into software that&apos;s easy to change.
      </h1>

      <p className="mt-6 max-w-xl text-lg text-[var(--color-muted)]">
        I&apos;m {profile.name}, a full-stack web developer in {profile.location}. I build with
        React, Next.js and Node — with a functional-programming habit of keeping things typed,
        small, and simple to reason about.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#work"
          className="rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-85"
        >
          View my work
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full border border-[var(--color-ink)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          Get in touch
        </a>
      </div>

      {/* Signature element: how the work actually gets composed, step by step */}
      <div className="mt-16 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
        <p className="font-mono mb-6 text-xs uppercase tracking-widest text-[var(--color-muted)]">
          how a project moves through my hands
        </p>
        <div className="flex min-w-[640px] items-center justify-between">
          {pipeline.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <div
                  className={`font-mono flex h-16 w-28 items-center justify-center rounded-xl border text-sm font-medium ${
                    i === pipeline.length - 1
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-ink)]"
                      : "border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-ink)]"
                  }`}
                >
                  {step.label}
                  {i === pipeline.length - 1 && (
                    <span className="cursor-blink ml-0.5 text-[var(--color-accent)]">▍</span>
                  )}
                </div>
                <p className="max-w-[8rem] text-xs text-[var(--color-muted)]">{step.note}</p>
              </div>

              {i < pipeline.length - 1 && (
                <svg
                  width="48"
                  height="16"
                  viewBox="0 0 48 16"
                  fill="none"
                  className="mx-2 shrink-0 -translate-y-3"
                  aria-hidden="true"
                >
                  <line
                    x1="2"
                    y1="8"
                    x2="40"
                    y2="8"
                    stroke="var(--color-border)"
                    strokeWidth="2"
                    className="pipeline-flow"
                  />
                  <path d="M38 3L44 8L38 13" stroke="var(--color-muted)" strokeWidth="2" fill="none" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
