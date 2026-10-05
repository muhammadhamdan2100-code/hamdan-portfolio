import { Bot, Globe, Smartphone, BadgeCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { TiltCard } from "./TiltCard";

type Service = {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    icon: Bot,
    number: "01",
    title: "AI Automation",
    description:
      "Intelligent systems that automate repetitive business processes, customer communication, lead qualification, follow-ups and workflows.",
    tags: [
      "AI Agents",
      "Workflow Automation",
      "WhatsApp Automation",
      "Lead Automation",
      "CRM Integration",
      "Appointment Automation",
      "RAG",
      "AI-powered Business Processes",
    ],
  },
  {
    icon: Globe,
    number: "02",
    title: "Web Development",
    description:
      "High-performance websites and custom web applications designed around business goals.",
    tags: [
      "Business Websites",
      "E-commerce",
      "Landing Pages",
      "Admin Dashboards",
      "Custom Web Apps",
      "API Integration",
      "Database Systems",
    ],
  },
  {
    icon: Smartphone,
    number: "03",
    title: "App Development",
    description:
      "Modern application experiences designed for customers, teams and business operations.",
    tags: [
      "Mobile Apps",
      "Cross-platform Applications",
      "Customer Portals",
      "Business Apps",
      "Internal Tools",
      "Authentication",
      "API Integration",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Services"
          title={
            <>
              What I Build<span className="text-accent">.</span>
            </>
          }
          description="Three focused disciplines, one goal: systems that make a business work better."
          right={
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
              <BadgeCheck size={12} className="text-accent" />
              1+ Year Experience
            </span>
          }
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.1}>
                <TiltCard className="glass flex h-full flex-col rounded-3xl p-8 transition-colors duration-300 hover:border-accent/30">
                  <div className="flex items-start justify-between">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent"
                      style={{ transform: "translateZ(35px)" }}
                    >
                      <Icon size={20} />
                    </span>
                    <span
                      aria-hidden
                      className="select-none font-display text-5xl font-bold text-white/5"
                    >
                      {service.number}
                    </span>
                  </div>
                  <h3
                    className="mt-8 font-display text-2xl font-bold tracking-tight"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    {service.description}
                  </p>
                  <div className="my-6 h-px bg-white/5" aria-hidden />
                  <ul className="mt-auto flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10.5px] tracking-wide text-ink/60"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
