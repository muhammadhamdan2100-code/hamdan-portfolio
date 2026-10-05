"use client";

import { ArrowRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Display3D from "@/components/Display3D";
import { Magnetic } from "@/components/Magnetic";
import { SITE } from "@/lib/site";

export default function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      {/* ambient glow + grid */}
      <div aria-hidden className="bg-grid absolute inset-0 opacity-[0.35]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[560px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,229,160,0.5), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* ghost monogram */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-4vw] select-none text-center font-display text-[24vw] font-bold leading-none tracking-tighter text-white/[0.025]"
      >
        HAMI
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-ink/50"
        >
          Ready when you are
        </motion.p>

        <Display3D
          level={2}
          lines={[
            { text: "LET'S BUILD" },
            { text: "SOMETHING", outline: true },
            { text: "USEFUL.", accentDot: true },
          ]}
          className="mt-6"
          lineClassName="text-[clamp(3rem,10vw,8.5rem)] font-display font-bold uppercase leading-[0.95] tracking-tight"
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg"
        >
          Have an idea, workflow or business problem you want to improve? Let&apos;s
          turn it into a practical digital solution.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <Magnetic>
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Magnetic>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 font-mono text-sm text-ink/70 transition-colors hover:text-accent"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {SITE.email}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
