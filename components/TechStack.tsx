"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Database, Globe, Sparkles, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

type Group = {
  icon: LucideIcon;
  label: string;
  items: string[];
};

const GROUPS: Group[] = [
  {
    icon: Sparkles,
    label: "AI & Automation",
    items: ["OpenAI", "Gemini", "n8n", "AI Agents", "RAG", "APIs"],
  },
  {
    icon: Globe,
    label: "Web",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    icon: Database,
    label: "Backend",
    items: ["Node.js", "Supabase", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    icon: Wrench,
    label: "Tools",
    items: ["Git", "GitHub", "Vercel", "Figma"],
  },
];

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const wallRotateX = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [9, 0]
  );

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 15% 60%, rgba(0,229,160,0.05), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Tech Stack"
          title={
            <>
              The stack behind <span className="text-accent">the systems.</span>
            </>
          }
          description="A focused toolkit — chosen for shipping reliable products, not for collecting logos."
        />

        <div
          ref={ref}
          className="mt-16"
          style={{ perspective: "1100px" }}
        >
          <motion.div
            style={{
              rotateX: wallRotateX,
              transformStyle: "preserve-3d",
            }}
            className="flex flex-col gap-12"
          >
            {GROUPS.map((group, gi) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.label} delay={gi * 0.05} y={20}>
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon size={15} className="text-accent" />
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50">
                        {group.label}
                      </h3>
                      <span aria-hidden className="h-px grow bg-white/5" />
                    </div>
                    <div
                      className="mt-5 flex flex-wrap gap-3"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-display text-sm font-medium text-ink/80 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-ink hover:shadow-[0_18px_40px_-18px_rgba(0,229,160,0.3)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
