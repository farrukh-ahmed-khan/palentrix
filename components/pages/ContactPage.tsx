"use client";

import { useState } from "react";
import { Calendar, Clock, CreditCard, LifeBuoy, Mail } from "lucide-react";
import { Noise } from "@/components/site/Noise";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import Antigravity from "@/components/reactbits/Antigravity/Antigravity";
import { siteConfig } from "@/lib/site";

export function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <section className="relative bg-void overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 opacity-50">
          <Antigravity
            count={140}
            color="#43B4FF"
            particleShape="capsule"
            particleSize={0.8}
            ringRadius={5}
            magnetRadius={7}
            autoAnimate
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(11,95,170,0.14)_0%,rgba(11,15,26,0.74)_58%,var(--void)_100%)]" />
        <Noise />
        <div className="relative mx-auto max-w-[1200px] px-6 grid gap-16 md:grid-cols-2 md:items-start">
          <Reveal>
            <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-indigo mb-6">
              [ Get in Touch ]
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl tracking-normal leading-[1.1]">
              Tell us what you're building.
            </h1>
            <p className="mt-6 text-white/90 text-[17px] leading-relaxed max-w-[480px]">
              We read every message and respond within 4 hours during working
              hours. No autoresponders, no sales sequence: a real engineer
              replies.
            </p>

            <div className="mt-12 space-y-5">
              <ContactRow
                Icon={Mail}
                label="Contact"
                value={siteConfig.emails.contact}
                href={`mailto:${siteConfig.emails.contact}`}
              />
              <ContactRow
                Icon={LifeBuoy}
                label="Support"
                value={siteConfig.emails.support}
                href={`mailto:${siteConfig.emails.support}`}
              />

              <ContactRow
                Icon={Calendar}
                label="Book a call"
                value="30-minute discovery call"
                href={siteConfig.calendlyUrl}
                external
              />
              <ContactRow
                Icon={Clock}
                label="Response time"
                value="Within 4 hours - Mon-Fri - PKT"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="rb-card bg-slate rounded-2xl p-8 md:p-10 border"
              style={{ borderColor: "var(--border-color)" }}
            >
              {sent ? (
                <div className="text-center py-12">
                  <div className="font-display font-bold text-3xl text-indigo">
                    Message received.
                  </div>
                  <p className="mt-4 text-muted">We'll reply within 4 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-5"
                >
                  <Field label="Name" name="name" />
                  <Field label="Company" name="company" />
                  <Field label="Email" name="email" type="email" />
                  <Field label="What are you building?" name="brief" textarea />
                  <Select
                    label="Budget range"
                    name="budget"
                    options={["< $10k", "$10k - $25k", "$25k - $50k", "$50k+"]}
                  />
                  <Select
                    label="How soon?"
                    name="when"
                    options={[
                      "ASAP",
                      "In 1-2 months",
                      "This quarter",
                      "Exploring",
                    ]}
                  />
                  <button
                    type="submit"
                    className="w-full btn-teal py-3.5 rounded-md font-medium text-[14px]"
                  >
                    Send message
                  </button>
                  <p className="text-center text-[12px] text-muted pt-2">
                    Or{" "}
                    <a
                      href={siteConfig.calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo hover:text-violet transition-colors"
                    >
                      book a 30-minute discovery call directly
                    </a>
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
  external = false,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-md bg-slate border border-[var(--border-color)] flex items-center justify-center shrink-0">
        <Icon size={16} className="text-indigo" />
      </div>
      <div>
        <div className="font-mono text-[11px] uppercase tracking-wider text-black/70">
          {label}
        </div>
        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="mt-1 text-[15px] hover:text-indigo transition-colors"
          >
            {value}
          </a>
        ) : (
          <div className="mt-1 text-[15px]">{value}</div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full bg-white border border-[var(--border-color)] rounded-md px-4 py-3 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-indigo/60 transition-colors";
  return (
    <label className="block">
      <span className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-2">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required
          rows={4}
          className={cls}
          placeholder="A few sentences is enough."
        />
      ) : (
        <input name={name} type={type} required className={cls} />
      )}
    </label>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-2">
        {label}
      </span>
      <select
        name={name}
        required
        className="w-full bg-white border border-[var(--border-color)] rounded-md px-4 py-3 text-[14px] text-ink focus:outline-none focus:border-indigo/60 transition-colors"
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
