import { Code2, Cpu, SlidersHorizontal, Target, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { TiltCard } from "./TiltCard";

type Reason = {
  icon: LucideIcon;
  title: string;
  text: string;
  highlight?: boolean;
};

const REASONS: Reason[] = [
  {
    icon: Code2,
    title: "Hands-On Experience",
    text: "1+ year of practical experience building websites, applications and AI-powered automation workflows.",
    highlight: true,
  },
  {
    icon: Target,
    title: "Business-First",
    text: "Technology starts with the business problem — every build maps to a goal.",
  },
  {
    icon: Cpu,
    title: "AI + Development",
    text: "Modern AI combined with real software systems — not toys or throwaway demos.",
  },
  {
    icon: SlidersHorizontal,
    title: "Custom Built",
    text: "Solutions designed around the actual workflow, not forced into a template.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Thinking",
    text: "Systems built to evolve as the business grows.",
  },
];

export default function WhyMe() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="08"
          eyebrow="Why Me"
          title={
            <>
              Why work <span className="text-accent">with me.</span>
            </>
          }
          description="No agencies, no hand-offs — you work directly with the person building your system."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={(i % 3) * 0.08}>
                <TiltCard
                  className={`flex h-full flex-col rounded-3xl p-8 transition-colors duration-300 ${
                    reason.highlight
                      ? "border border-accent/25 bg-accent/[0.06]"
                      : "glass hover:border-white/20"
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl ${
                      reason.highlight
                        ? "border border-accent/30 bg-accent/15 text-accent"
                        : "border border-white/10 bg-white/[0.04] text-ink/70"
                    }`}
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <Icon size={19} />
                  </span>
                  <h3
                    className="mt-7 font-display text-xl font-bold tracking-tight"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {reason.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/60">
                    {reason.text}
                  </p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
