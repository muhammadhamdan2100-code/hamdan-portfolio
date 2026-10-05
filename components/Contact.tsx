"use client";

import { useState, type FormEvent } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Mail,
  Send,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

const PROJECT_TYPES = [
  "AI Automation",
  "Website",
  "Web Application",
  "Mobile Application",
  "Other",
] as const;

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $10,000",
  "$10,000+",
  "Not sure yet",
] as const;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState<string>(PROJECT_TYPES[0]);
  const [budget, setBudget] = useState<string>(BUDGETS[4]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Please enter a valid email address.";
    if (!message.trim()) next.message = "Tell me a little about the project.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSent(false);
      return;
    }

    const subject = `Project Inquiry — ${projectType}${
      company.trim() ? ` (${company.trim()})` : ""
    }`;
    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      company.trim() ? `Company: ${company.trim()}` : null,
      `Project Type: ${projectType}`,
      `Budget: ${budget}`,
      "",
      message.trim(),
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-accent/60 focus:bg-white/[0.06]";
  const label =
    "mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink/50";

  return (
    <section id="contact" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Left — heading + direct contact */}
        <div>
          <SectionHeading
            index="09"
            eyebrow="Contact"
            title={"START A\nPROJECT."}
            description="Tell me what you're trying to build or automate. I'll reply with an honest assessment, a proposed approach and a rough timeline — no sales pressure."
          />

          <Reveal delay={0.15} className="mt-8 space-y-4">
            <a
              href={`mailto:${SITE.email}`}
              className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-widest text-ink/45">
                  Email me directly
                </span>
                <span className="block truncate font-mono text-sm text-ink transition-colors group-hover:text-accent">
                  {SITE.email}
                </span>
              </span>
            </a>

            <div className="glass flex items-center gap-4 rounded-2xl p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent">
                <BadgeCheck className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="flex items-center gap-2 text-sm font-medium text-ink">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Available for selected projects
                </span>
                <span className="mt-0.5 block text-sm text-ink/55">
                  Typical reply time: within 24 hours
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right — form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={label}>
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  className={field}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-danger">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={label}>
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                  className={field}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-danger">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="company" className={label}>
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company / brand (optional)"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="projectType" className={label}>
                  Project Type
                </label>
                <div className="relative">
                  <select
                    id="projectType"
                    name="projectType"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className={`${field} appearance-none pr-10`}
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-surface text-ink">
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
                    aria-hidden
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="budget" className={label}>
                  Budget
                </label>
                <div className="relative">
                  <select
                    id="budget"
                    name="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className={`${field} appearance-none pr-10`}
                  >
                    {BUDGETS.map((b) => (
                      <option key={b} value={b} className="bg-surface text-ink">
                        {b}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
                    aria-hidden
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={label}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What are you building? What problem should it solve?"
                  aria-invalid={Boolean(errors.message)}
                  className={`${field} resize-y`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-danger">{errors.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <button
                type="submit"
                className="btn-primary inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-sm font-semibold sm:w-auto"
              >
                Send Message
                <Send className="h-4 w-4" aria-hidden />
              </button>

              {sent && (
                <p
                  role="status"
                  className="flex items-center gap-2 text-sm text-accent"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                  Your email draft is ready — just press send in your mail app.
                </p>
              )}

              <p className="text-xs leading-relaxed text-ink/40">
                This form opens a pre-filled email in your mail app — no data is
                stored on this site.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
