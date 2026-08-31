import Link from "next/link";
import { profile } from "@/lib/data";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="#top" className="font-display text-base font-semibold tracking-tight">
          {profile.handle}
          <span className="text-[var(--color-accent)]">.</span>
        </Link>

        <nav className="hidden items-center gap-7 font-mono text-sm text-[var(--color-muted)] sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--color-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={`mailto:${profile.email}`}
          className="rounded-full border border-[var(--color-ink)] px-4 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]"
        >
          Say hello
        </a>
      </div>
    </header>
  );
}
