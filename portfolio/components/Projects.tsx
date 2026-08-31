import { profile, projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-5xl border-t border-[var(--color-border)] px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
            // work
          </p>
          <h2 className="font-display mt-4 max-w-lg text-2xl font-semibold tracking-tight sm:text-3xl">
            A few things I&apos;ve shipped
          </h2>
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-[var(--color-accent-ink)] underline underline-offset-4 hover:text-[var(--color-accent)]"
        >
          see all 76 repos →
        </a>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors hover:border-[var(--color-accent)]"
          >
            <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
              <span className="font-mono ml-2 text-xs text-[var(--color-muted)]">
                ~/{project.name}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-[var(--color-accent-ink)]">
                {project.name}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                {project.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-[11px] text-[var(--color-accent-ink)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
