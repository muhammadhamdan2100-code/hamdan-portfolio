import { ArrowUp, Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a
              href="#top"
              className="font-display text-xl font-bold tracking-tight text-ink"
            >
              HAMI<span className="text-accent">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/50">
              AI Automation &bull; Web Development &bull; App Development
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink/60 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 font-mono text-sm text-ink/70 transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {SITE.email}
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-ink/40 transition-colors hover:text-ink"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink/40">
            {SITE.name} &mdash; &copy; 2026 All rights reserved.
          </p>
          <p className="text-xs text-ink/40">
            Built with Next.js, TypeScript &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
