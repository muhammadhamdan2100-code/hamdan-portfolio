"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    text: "Understand the business and the problem. We map workflows, bottlenecks and goals before any code is written.",
  },
  {
    number: "02",
    title: "Design",
    text: "Plan the experience and technical architecture — system design, data flow and interface direction.",
  },
  {
    number: "03",
    title: "Build",
    text: "Develop the website, application or automation with clean, maintainable code.",
  },
  {
    number: "04",
    title: "Integrate",
    text: "Connect APIs, databases, AI, CRM and the business tools the team already relies on.",
  },
  {
    number: "05",
    title: "Optimize",
    text: "Test, improve and prepare the system for growth — then keep iterating as needs evolve.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  return (
    <section id="process" className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="07"
                eyebrow="Process"
                title={
                  <>
                    From idea to <span className="text-accent">working system.</span>
                  </>
                }
                description="A clear five-step path — from first conversation to a system running in production."
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div ref={ref} className="relative">
              <div
                aria-hidden
                className="absolute bottom-3 left-[7px] top-3 w-px bg-white/10"
              />
              <motion.div
                aria-hidden
                style={{ scaleY: reduce ? 1 : progress }}
                className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-gradient-to-b from-accent to-accent/30"
              />
              <ol className="flex flex-col">
                {STEPS.map((step, i) => (
                  <li key={step.number} className="relative pb-8 pl-12 last:pb-0">
                    <span
                      aria-hidden
                      className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-white/20 bg-background"
                    >
                      <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                    </span>
                    <Reveal delay={i * 0.06} y={24}>
                      <div className="glass rounded-2xl p-6 transition-colors duration-300 hover:border-accent/25">
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-accent">
                            {step.number}
                          </span>
                          <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-ink/55">
                          {step.text}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
