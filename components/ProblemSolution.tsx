import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Hand,
  Headphones,
  Hourglass,
  MonitorOff,
  Network,
  Sparkles,
  Unplug,
  UserX,
  Zap,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

type Pair = {
  problem: { label: string; text: string; icon: LucideIcon };
  solution: { label: string; text: string; icon: LucideIcon };
};

const PAIRS: Pair[] = [
  {
    problem: {
      label: "Manual Work",
      text: "Repetitive tasks draining your team's time",
      icon: Hand,
    },
    solution: {
      label: "Automation",
      text: "Systems that run the process end-to-end",
      icon: Zap,
    },
  },
  {
    problem: {
      label: "Missed Leads",
      text: "Inquiries lost in inboxes and DMs",
      icon: UserX,
    },
    solution: {
      label: "AI Follow-up",
      text: "Agents that qualify and follow up instantly",
      icon: Bot,
    },
  },
  {
    problem: {
      label: "Slow Customer Response",
      text: "Hours spent waiting for a reply",
      icon: Hourglass,
    },
    solution: {
      label: "AI Support",
      text: "Assistance that responds around the clock",
      icon: Headphones,
    },
  },
  {
    problem: {
      label: "Outdated Website",
      text: "A site that doesn't convert or scale",
      icon: MonitorOff,
    },
    solution: {
      label: "Modern Web Experience",
      text: "Fast, responsive, business-driven design",
      icon: Sparkles,
    },
  },
  {
    problem: {
      label: "Disconnected Operations",
      text: "Tools and data that don't talk to each other",
      icon: Unplug,
    },
    solution: {
      label: "Custom Business System",
      text: "One connected operational backbone",
      icon: Network,
    },
  },
];

export default function ProblemSolution() {
  return (
    <section className="relative py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 85% 30%, rgba(0,229,160,0.05), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="The Problem"
          title={
            <>
              Your business has a problem.
              <br />
              <span className="text-accent">I build the system.</span>
            </>
          }
          description="Most businesses don't have a technology problem — they have a systems problem. Here's how each one gets solved."
        />

        <div className="mt-16 flex flex-col gap-4">
          {PAIRS.map((pair, i) => {
            const PIcon = pair.problem.icon;
            const SIcon = pair.solution.icon;
            return (
              <Reveal key={pair.problem.label} delay={i * 0.06} y={20}>
                <div className="glass group grid gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-accent/25 sm:p-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  {/* Problem */}
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-ink/40 transition-colors duration-300 group-hover:text-ink/70">
                      <PIcon size={17} />
                    </span>
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45 transition-colors duration-300 group-hover:text-ink/70">
                        {pair.problem.label}
                      </span>
                      <span className="mt-1 block text-sm text-ink/35">
                        {pair.problem.text}
                      </span>
                    </span>
                  </div>

                  {/* Transform arrow */}
                  <div
                    aria-hidden
                    className="flex items-center justify-center gap-2 md:flex-col"
                  >
                    <span className="hidden h-7 w-px bg-white/10 transition-colors duration-300 group-hover:bg-accent/40 md:block" />
                    <span className="grid h-9 w-9 rotate-90 place-items-center rounded-full border border-white/10 text-ink/40 transition-all duration-300 group-hover:rotate-0 md:rotate-0 md:group-hover:translate-x-1 group-hover:border-accent/50 group-hover:text-accent">
                      <ArrowRight size={15} />
                    </span>
                    <span className="hidden h-7 w-px bg-white/10 transition-colors duration-300 group-hover:bg-accent/40 md:block" />
                  </div>

                  {/* Solution */}
                  <div className="flex items-center gap-4 md:justify-end md:text-right">
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                        {pair.solution.label}
                      </span>
                      <span className="mt-1 block text-sm text-ink/60">
                        {pair.solution.text}
                      </span>
                    </span>
                    <span className="order-first grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent/90 md:order-none">
                      <SIcon size={17} />
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
