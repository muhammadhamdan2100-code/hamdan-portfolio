import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  right,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
            <span className="text-ink/30">{index}</span>
            <span aria-hidden className="h-px w-8 bg-accent/50" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h2>
        </Reveal>
        {description ? (
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/55">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
      {right ? (
        <Reveal delay={0.2} className="shrink-0">
          {right}
        </Reveal>
      ) : null}
    </div>
  );
}
