import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-5xl border-t border-[var(--color-border)] px-6 py-20"
    >
      <div className="rounded-2xl bg-[var(--color-ink)] px-8 py-14 text-[var(--color-bg)] sm:px-14">
        <p className="font-mono text-xs uppercase tracking-widest text-white/50">// contact</p>
        <h2 className="font-display mt-4 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
          Got a project in mind? Let&apos;s talk it through.
        </h2>
        <p className="mt-4 max-w-md text-white/70">
          Whether it&apos;s a freelance build or a full-time role, I reply to every message
          myself — usually within a day or two.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition-opacity hover:opacity-90"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
