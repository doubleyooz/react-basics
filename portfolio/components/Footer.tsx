import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 pb-10">
      <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-muted)] sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <p className="font-mono text-xs">built with Next.js &amp; Tailwind</p>
      </div>
    </footer>
  );
}
