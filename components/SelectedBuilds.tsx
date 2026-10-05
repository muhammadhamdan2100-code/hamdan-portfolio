import { ArrowRight, ArrowUpRight, Bot, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { TiltCard } from "./TiltCard";

type Build = {
  category: string;
  title: string;
  status: string;
  live?: boolean;
  href?: string;
  hrefLabel?: string;
  img?: string;
  icon?: LucideIcon;
  description: string;
};

const BUILDS: Build[] = [
  {
    category: "E-commerce Build",
    title: "HM Signature",
    status: "Live",
    live: true,
    href: "https://hm-signature.vercel.app/",
    hrefLabel: "Visit Site",
    img: "/images/build-hm-signature.png",
    description:
      "A luxury perfume house — 'Haute Parfumerie' — presented as a polished e-commerce experience with a full product storefront.",
  },
  {
    category: "AI Product Concept",
    title: "Xeltrio — BusinessOS",
    status: "Concept",
    live: true,
    href: "https://xeltrio-technologies.vercel.app/",
    hrefLabel: "Visit Site",
    img: "/images/build-xeltrio.png",
    description:
      "A concept website for an AI product company: an 'operating system for business' with ecosystem, roadmap and AI service stack.",
  },
  {
    category: "Vehicle Engineering Showcase",
    title: "IBEX VR",
    status: "In Development",
    live: true,
    href: "https://ibex-zeta.vercel.app/",
    hrefLabel: "Preview Build",
    img: "/images/build-ibex.png",
    description:
      "A vehicle engineering showcase in active development — structure and interactions in place, visual assets pending.",
  },
  {
    category: "AI Automation Concept",
    title: "Real Estate AI Sales & Support Workflow",
    status: "Prototype / Concept",
    icon: Bot,
    description:
      "An AI-powered workflow concept for handling property inquiries, lead qualification, follow-ups and appointment booking.",
  },
  {
    category: "Business System Concept",
    title: "AI-Powered Business Operations Platform",
    status: "Concept",
    icon: Network,
    description:
      "A concept for connecting business workflows, automation, data and AI into one operational system.",
  },
];

function StatusChip({ status }: { status: string }) {
  const live = status === "Live";
  return (
    <span
      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] ${
        live
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-white/15 bg-white/[0.04] text-ink/55"
      }`}
    >
      {live && (
        <span className="relative flex h-1 w-1">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
          <span className="relative inline-flex h-1 w-1 rounded-full bg-accent" />
        </span>
      )}
      {status}
    </span>
  );
}

export default function SelectedBuilds() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Portfolio"
          title={
            <>
              Selected Builds <span className="text-accent">&amp;</span>{" "}
              Concepts
            </>
          }
          description="A small, honest selection — live experiments, concepts and work-in-progress. These are self-initiated builds, not client engagements."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {BUILDS.map((build, i) => {
            const Icon = build.icon;
            return (
              <Reveal key={build.title} delay={(i % 3) * 0.08}>
                <TiltCard className="glass flex h-full flex-col overflow-hidden rounded-3xl">
                  {build.img ? (
                    <div className="relative h-44 shrink-0 overflow-hidden border-b border-white/5 bg-surface">
                      <img
                        src={build.img}
                        alt={`Preview of ${build.title}`}
                        width={1440}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover object-top opacity-80 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
                      />
                      <span className="absolute left-3 top-3">
                        <StatusChip status={build.status} />
                      </span>
                    </div>
                  ) : (
                    <div className="relative flex h-44 shrink-0 items-center justify-center overflow-hidden border-b border-white/5">
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(70% 80% at 50% 30%, rgba(0,229,160,0.09), transparent 75%)",
                        }}
                      />
                      <div
                        aria-hidden
                        className="bg-grid absolute inset-0 opacity-50"
                      />
                      {Icon && <Icon aria-hidden size={56} className="relative text-white/10" />}
                      <span className="absolute left-3 top-3">
                        <StatusChip status={build.status} />
                      </span>
                    </div>
                  )}

                  <div className="flex grow flex-col p-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
                      {build.category}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight">
                      {build.title}
                    </h3>
                    <p className="mt-2.5 grow text-sm leading-relaxed text-ink/55">
                      {build.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                      {build.href ? (
                        <a
                          href={build.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-ink/70 transition-colors hover:text-accent"
                        >
                          {build.hrefLabel}
                          <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30">
                          Internal Concept
                        </span>
                      )}
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/25">
                        {build.live ? "Self-initiated" : "Exploration"}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}

          {/* CTA card — keeps the grid complete without fake content */}
          <Reveal delay={0.16}>
            <a
              href="#contact"
              className="group flex h-full min-h-[22rem] flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-white/15 p-8 text-center transition-colors duration-300 hover:border-accent/40"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Your Project
              </span>
              <span className="max-w-xs font-display text-2xl font-bold leading-snug tracking-tight text-ink/85">
                Every system starts as a conversation.
              </span>
              <span className="flex items-center gap-2 text-sm text-ink/55 transition-colors group-hover:text-accent">
                Start a Project
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
