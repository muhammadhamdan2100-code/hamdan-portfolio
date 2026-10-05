"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowRight, Bot, Rocket, Sparkles, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import NodesCanvas from "./NodesCanvas";
import Display3D from "./Display3D";
import { Magnetic } from "./Magnetic";

type Chip = {
  icon: LucideIcon;
  title: string;
  status: string;
  depth: number;
  duration: number;
  className: string;
};

const CHIPS: Chip[] = [
  {
    icon: Bot,
    title: "AI Agent",
    status: "Online",
    depth: 1.4,
    duration: 6,
    className: "top-[20%] right-[5%] xl:right-[9%]",
  },
  {
    icon: Workflow,
    title: "Automation",
    status: "Running",
    depth: 1,
    duration: 7.5,
    className: "top-[45%] right-[13%] xl:right-[17%]",
  },
  {
    icon: Rocket,
    title: "Web / App",
    status: "Deployed",
    depth: 0.7,
    duration: 5.5,
    className: "top-[67%] right-[3%] xl:right-[8%]",
  },
];

function HeroChip({
  chip,
  mx,
  my,
}: {
  chip: Chip;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const x = useTransform(mx, (v) => v * 14 * chip.depth);
  const y = useTransform(my, (v) => v * 10 * chip.depth);
  const Icon = chip.icon;

  return (
    <motion.div
      style={{ x, y }}
      className={`absolute hidden lg:block ${chip.className}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: chip.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="glass flex items-center gap-3 rounded-2xl px-4 py-3"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
          <Icon size={15} />
        </span>
        <span>
          <span className="block font-display text-xs font-semibold text-ink">
            {chip.title}
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] text-ink/50">
            <span className="h-1 w-1 rounded-full bg-accent" />
            {chip.status}
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Pointer parallax for floating chips
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const chipsY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const entrance = { opacity: 1, y: 0 };
  const hidden = { opacity: 0, y: 28 };

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Background: node network + grid + glow */}
      <motion.div style={{ y: reduce ? 0 : canvasY }} className="absolute inset-0">
        <NodesCanvas className="absolute inset-0 h-full w-full opacity-70 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent)]" />
      </motion.div>
      <div
        aria-hidden
        className="bg-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black_10%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 38%, rgba(0,229,160,0.07), transparent 70%)",
        }}
      />

      {/* Floating system chips */}
      <motion.div
        style={{ y: reduce ? 0 : chipsY }}
        className="pointer-events-none absolute inset-0 z-[5]"
        aria-hidden
      >
        {CHIPS.map((chip) => (
          <HeroChip key={chip.title} chip={chip} mx={smx} my={smy} />
        ))}
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
        <motion.p
          initial={hidden}
          animate={entrance}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-accent sm:text-[11px]"
        >
          <span aria-hidden className="h-px w-8 bg-accent/60" />
          AI Automation • Web • App Development
        </motion.p>

        <motion.div
          initial={reduce ? { opacity: 0 } : hidden}
          animate={entrance}
          transition={{ duration: 0.9, delay: 0.25 }}
          style={{ y: reduce ? 0 : headingY, opacity: reduce ? 1 : headingOpacity }}
        >
          <Display3D
            className="mt-7"
            lines={[
              { text: "BUILD" },
              { text: "DIGITAL", outline: true },
              { text: "SYSTEMS.", accentDot: true },
            ]}
            lineClassName="font-display text-[clamp(3.4rem,12.5vw,11rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em]"
          />
        </motion.div>

        <motion.p
          initial={hidden}
          animate={entrance}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg"
        >
          I build AI-powered automations, modern websites and custom
          applications for businesses ready to work smarter.
        </motion.p>

        <motion.div
          initial={hidden}
          animate={entrance}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a href="#contact" className="btn-primary">
              Start a Project
              <ArrowRight size={16} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#work" className="btn-ghost">
              Explore My Work
              <ArrowDown size={16} />
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={hidden}
          animate={entrance}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <span className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 sm:text-[11px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for selected projects
          </span>
          <span aria-hidden className="hidden h-4 w-px bg-white/10 sm:block" />
          <span className="glass flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70 sm:text-[11px]">
            <Sparkles size={11} className="text-accent" />
            1+ Year of Hands-On Experience
          </span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: reduce ? 0 : cueOpacity }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        aria-hidden
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-ink/40">
          Scroll
        </span>
        <motion.span
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px origin-top bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}
