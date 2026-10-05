"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Magnetic } from "./Magnetic";

const DETAILS = [
  {
    term: "Objective",
    text: "Present AI automation, web development and application development services clearly to international clients.",
  },
  {
    term: "Design",
    text: "A dark, typographic interface with a restrained accent system, glass hierarchy and motion tuned for clarity.",
  },
  {
    term: "Development",
    text: "Component-driven Next.js application with TypeScript and Tailwind CSS — engineered for performance and search visibility.",
  },
  {
    term: "Responsive",
    text: "Fully responsive across desktop, tablet and mobile, with reduced-motion support built in.",
  },
  {
    term: "Technology",
    text: "Next.js · TypeScript · Tailwind CSS · Framer Motion",
  },
];

export default function FeaturedBuild() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [12, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, 0]);

  return (
    <section id="work" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 12% 40%, rgba(0,229,160,0.06), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Featured Build"
          title={
            <>
              Featured <span className="text-accent">Build</span>
            </>
          }
          description="A live, production project — designed, built and deployed end-to-end."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-12">
          {/* Browser mockup */}
          <div ref={ref} className="lg:col-span-7" style={{ perspective: "1400px" }}>
            <motion.div
              style={{ rotateX, scale, y, transformStyle: "preserve-3d" }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent/40" />
                <span className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-ink/40">
                  <Lock size={9} />
                  hamiaiwork.vercel.app
                </span>
                <span className="w-10" aria-hidden />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-background">
                {/* Screenshot of the live build (captured from production) */}
                <img
                  src="/images/featured-hami.png"
                  alt="Screenshot of the HAMI Portfolio live website"
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"
                />
              </div>
              <span className="glass absolute right-4 top-14 flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Live
              </span>
            </motion.div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Live Project
                </span>
                <span className="rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
                  Self-directed Build
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                HAMI PORTFOLIO
              </h3>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 leading-relaxed text-ink/60">
                A modern personal technology portfolio designed to present AI
                automation, web development and application development
                services to international clients.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 flex items-start gap-2.5 text-sm text-ink/50">
                <Sparkles size={15} className="mt-0.5 shrink-0 text-accent" />
                Designed, built and deployed end-to-end — a reflection of 1+
                year of hands-on development experience.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <dl className="mt-8 border-t border-white/10">
                {DETAILS.map((d) => (
                  <div
                    key={d.term}
                    className="flex flex-col gap-1 border-b border-white/5 py-4 sm:flex-row sm:gap-6"
                  >
                    <dt className="w-40 shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">
                      {d.term}
                    </dt>
                    <dd className="text-sm leading-relaxed text-ink/70">
                      {d.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-8">
                <Magnetic>
                  <a
                    href="https://hamiaiwork.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    View Live Project
                    <ArrowUpRight size={16} />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
