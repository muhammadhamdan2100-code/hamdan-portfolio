"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/5 bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-[0.18em]"
            aria-label="HAMI — back to top"
          >
            HAMI<span className="text-accent">.</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navlink font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="glass hidden items-center gap-2 rounded-full px-5 py-2.5 font-display text-xs font-semibold tracking-wide text-ink transition-colors hover:border-accent/40 hover:text-accent sm:inline-flex"
            >
              Start a Project
              <ArrowUpRight size={13} className="text-accent" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="glass relative grid h-10 w-10 place-items-center rounded-full lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span
                aria-hidden
                className={`absolute h-px w-4.5 bg-ink transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-[3.5px]"
                }`}
                style={{ width: "1.125rem" }}
              />
              <span
                aria-hidden
                className={`absolute h-px bg-ink transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-[3.5px]"
                }`}
                style={{ width: "1.125rem" }}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8 pb-24 pt-24">
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-ink/40">
                Menu
              </p>
              <nav aria-label="Mobile" className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.08 * i + 0.1, duration: 0.45 }}
                    className="group flex items-baseline gap-4 border-b border-white/5 py-5"
                  >
                    <span className="font-mono text-xs text-accent">
                      0{i + 1}
                    </span>
                    <span className="font-display text-4xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex flex-col gap-3"
              >
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-ink/60 underline-offset-4 hover:text-accent hover:underline"
                >
                  {SITE.email}
                </a>
                <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/45">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Available for selected projects
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
