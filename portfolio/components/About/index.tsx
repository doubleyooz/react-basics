import { facts } from "@/lib/data";
import { Fact } from "./fact";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl border-t border-[var(--color-border)] px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
        // about
      </p>

      <div className="mt-6 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-[var(--color-ink)]">
          <p>
            I got into web development the way most people get into cooking: by breaking things
            in someone else&apos;s kitchen first. Since then I&apos;ve worked across the stack —
            React and Vue on the front, Node frameworks like Fastify and NestJS on the back, and
            whatever database the problem actually calls for.
          </p>
          <p>
            Functional programming changed how I write software. I favor pure functions,
            explicit types, and small pieces that compose, because that&apos;s what lets a
            codebase survive contact with a real deadline. I&apos;m currently deepening that
            instinct in Rust and Java, and using Elm to see what UI looks like without
            runtime surprises.
          </p>
          <p>
            Outside of client work, I write and record what I&apos;m building — partly to teach,
            partly because explaining a decision out loud is the fastest way to find out if it
            was a good one.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-start rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:grid-cols-1 sm:gap-y-5">
          {facts.map((fact) => (
            <Fact key={fact.label} label={fact.label} value={fact.value} />           
          ))}
        </dl>
      </div>
    </section>
  );
}
