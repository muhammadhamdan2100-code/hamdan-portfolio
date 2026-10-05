import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const STATS = [
  {
    label: "Experience",
    value: "1+ Year",
    note: "Hands-on, shipping real builds",
  },
  {
    label: "Expertise",
    value: "AI • Web • Apps",
    note: "Automation to full product builds",
  },
  {
    label: "Availability",
    value: "Selected Projects",
    note: "Focused, limited workload",
  },
  {
    label: "Approach",
    value: "Business-First",
    note: "Systems before screens",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="05"
                eyebrow="About"
                title={
                  <>
                    I build with code.
                    <br />
                    <span className="text-accent">I think in systems.</span>
                  </>
                }
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink/75">
                I&apos;m Muhammad Hamdan — an AI automation specialist and
                full-stack developer focused on building practical digital
                systems for modern businesses.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 leading-relaxed text-ink/60">
                With 1+ year of hands-on experience across AI automation,
                full-stack web development and application development, I
                build practical digital solutions focused on real business
                needs.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 leading-relaxed text-ink/60">
                My work combines software development, AI and automation to
                turn business processes into scalable digital experiences.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 leading-relaxed text-ink/60">
                I don&apos;t just focus on writing code. I focus on
                understanding the problem, designing the system and building
                the technology required to solve it.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={0.08 * i}>
                  <div className="glass rounded-2xl p-6 transition-colors duration-300 hover:border-accent/25">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent/80">
                      {stat.label}
                    </p>
                    <p className="mt-2.5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-xs text-ink/45">{stat.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
