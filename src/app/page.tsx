import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award, CheckCircle2, Cpu, FileText, Layers, Mail, ShieldCheck, Terminal } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { capabilityGroups } from "@/data/capabilities";
import { achievements } from "@/data/achievements";
import { HeroTelemetryBench } from "@/components/instruments/HeroTelemetryBench";

export default function HomePage() {
  return (
    <div className="divide-y divide-[var(--border-hairline)]">
      {/* 1. HERO SECTION */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 pt-10 pb-16 lg:py-20">
        {/* Top Calibration Bar (Separate structural row, not an eyebrow inside heading block) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 hairline-b font-mono text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)]" aria-hidden="true" />
            <span className="text-[var(--text-primary)] font-medium">
              {profile.fullName.toUpperCase()} ({profile.displayName})
            </span>
            <span>·</span>
            <span>{profile.degree}</span>
          </div>
          <div className="tabular-nums text-[var(--text-secondary)]">
            {profile.university.toUpperCase()} · {profile.location.toUpperCase()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left 7 Columns: Editorial Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl xl:text-[3.5rem] font-bold tracking-[-0.035em] leading-[1.03] text-[var(--text-primary)]">
              Engineering AI systems that survive contact with physical sensors, noisy markets, and strict calibration.
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[64ch]">
              I am <strong className="text-[var(--text-primary)] font-semibold">{profile.fullName}</strong>, a Computer Science (Artificial Intelligence) undergraduate at <strong className="text-[var(--text-primary)] font-semibold">Universiti Malaya</strong>. I build end-to-end applied machine learning and embedded intelligence—spanning fault-tolerant multi-MCU biomedical telemetry, walk-forward multi-horizon demand forecasting, and Platt-calibrated NLP classification engines.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/work"
                className="inline-flex min-h-[48px] items-center gap-2.5 px-6 bg-[var(--accent-primary)] text-white font-mono text-xs font-medium uppercase tracking-[0.06em] hover:bg-[var(--accent-primary-hover)] transition-colors"
              >
                <span>Inspect Selected Work</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center gap-2 px-5 hairline-border bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em] hover:border-[var(--border-strong)] transition-colors"
              >
                <Mail className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                <span>Initiate Contact</span>
              </Link>

              <Link
                href="/resume"
                className="inline-flex min-h-[48px] items-center gap-2 px-4 hairline-border bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em] transition-colors"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>CV / Print</span>
              </Link>
            </div>

            {/* Verified Credibility Ledger Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 tabular-nums">
              {profile.heroMetrics.map((m) => (
                <div key={m.label} className="p-3.5 hairline-border bg-[var(--bg-surface)]">
                  <div className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                    {m.value}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.05em] text-[var(--accent-primary)]">
                    {m.label}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--text-muted)]">{m.context}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: Live Interactive Telemetry Bench */}
          <div className="lg:col-span-5">
            <HeroTelemetryBench />
          </div>
        </div>
      </section>

      {/* 2. SELECTED WORK — EDITORIAL ENGINEERING FOLIOS */}
      <section id="selected-work" className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 hairline-b items-end">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              Selected Engineering Folios
            </h2>
            <p className="mt-3 text-base text-[var(--text-secondary)] max-w-[62ch]">
              Three complete systems documented with problem context, hardware/ML architecture, leakage-safe validation protocols, and honest engineering trade-offs.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href="/work"
              className="inline-flex min-h-[44px] items-center gap-2 px-4 hairline-border bg-[var(--bg-surface)] font-mono text-xs uppercase tracking-[0.06em] text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
            >
              <span>View Full Case Study Matrix</span>
              <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="divide-y divide-[var(--border-hairline)]">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
            >
              {/* Left Column: System Index, Title, Awards, Primary CTA */}
              <div className="lg:col-span-5 space-y-5">
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
                  <Link
                    href={`/work/${project.slug}`}
                    className="hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">
                      [{project.index}]
                    </span>
                    {project.title}
                  </Link>
                </h3>

                <div className="flex flex-wrap items-center gap-2 font-mono text-xs tabular-nums">
                  <span className="px-2.5 py-1 bg-[var(--accent-primary)] text-white font-semibold">
                    FOLIO {project.index}
                  </span>
                  <span className="px-2.5 py-1 hairline-border bg-[var(--bg-surface)] text-[var(--text-secondary)]">
                    {project.category}
                  </span>
                  <span className="text-[var(--text-muted)]">{project.timeframe}</span>
                </div>

                <p className="text-sm sm:text-base font-medium text-[var(--text-primary)] leading-snug">
                  {project.subtitle}
                </p>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.tagline}
                </p>

                {project.awards && project.awards.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {project.awards.map((award) => (
                      <div
                        key={award}
                        className="flex items-center gap-2 font-mono text-xs text-[var(--accent-amber)] bg-[var(--accent-amber-soft)] px-3 py-1.5"
                      >
                        <Award className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{award}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 font-mono text-[11px] hairline-border bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-3">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex min-h-[46px] items-center gap-2.5 px-5 bg-[var(--bg-elevated)] hairline-border text-[var(--text-primary)] font-mono text-xs font-medium uppercase tracking-[0.06em] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <span>Inspect 16-Section Case Study &amp; Lab</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Quantitative Evidence & Architecture Layers */}
              <div className="lg:col-span-7 space-y-6">
                {/* 4 Verified Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 tabular-nums">
                  {project.keyMetrics.map((metric) => (
                    <div key={metric.label} className="p-4 surface-card">
                      <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
                        {metric.label}
                      </div>
                      <div className="mt-1 font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                        {metric.value}
                      </div>
                      <div className="mt-1 text-xs text-[var(--text-secondary)]">
                        {metric.detail}
                      </div>
                    </div>
                  ))}
                </div>

                {/* System Architecture Layers Preview */}
                <div className="surface-card p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 hairline-b font-mono text-xs text-[var(--text-muted)]">
                    <span className="uppercase tracking-[0.06em] text-[var(--text-primary)]">
                      System Architecture Topology
                    </span>
                    <span className="tabular-nums">4-LAYER PIPELINE</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.architectureLayers.map((layer, idx) => (
                      <div key={layer.layer} className="p-3 hairline-border bg-[var(--bg-canvas)]">
                        <div className="font-mono text-[11px] text-[var(--accent-primary)] tabular-nums">
                          L0{idx + 1} · {layer.layer}
                        </div>
                        <div className="mt-1 font-mono text-xs text-[var(--text-primary)]">
                          {layer.components.join(" · ")}
                        </div>
                        <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">
                          {layer.responsibility}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. SHORT PROFESSIONAL INTRODUCTION & ENGINEERING PRINCIPLES */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              Why I build across silicon, statistical models, and interfaces.
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              Too many student AI projects stop at a notebook metric on a clean dataset. In real operations—whether monitoring a patient&apos;s oxygen saturation during a Wi-Fi outage or planning regional food reserves—models only matter when wrapped in resilient systems.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-[var(--accent-primary)] hover:underline"
              >
                <span>Read Full Engineering Philosophy</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.engineeringPrinciples.map((principle, idx) => (
              <div key={principle.title} className="surface-card p-5 space-y-2.5">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  <span className="font-mono text-xs text-[var(--accent-primary)] mr-2 tabular-nums">
                    0{idx + 1}
                  </span>
                  {principle.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED TECHNICAL CAPABILITIES (EVIDENCE MATRIX — NO PERCENTAGE BARS) */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div className="max-w-3xl mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            Verified Technical Capabilities
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)]">
            Every technical claim is mapped directly to the system where it was deployed and the empirical evidence it produced—never arbitrary skill percentage bars.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {capabilityGroups.map((group) => (
            <div key={group.code} className="surface-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 hairline-b">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  {group.domain}
                </h3>
                <span className="font-mono text-xs text-[var(--accent-primary)] tabular-nums">
                  {group.code}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {group.summary}
              </p>

              <div className="divide-y divide-[var(--border-hairline)] pt-1">
                {group.items.map((item) => (
                  <div key={item.technology} className="py-3 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                        {item.technology}
                      </span>
                      <span className="font-mono text-[11px] text-[var(--accent-secondary)]">
                        {item.whereUsed}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed tabular-nums">
                      {item.evidence}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ACHIEVEMENTS & CREDIBILITY LEDGER */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              Honours, Awards &amp; Academic Credentials
            </h2>
            <p className="mt-3 text-base text-[var(--text-secondary)] max-w-[60ch]">
              Peer-reviewed international innovation awards and consistent top-tier academic execution across computing, mathematics, and sciences.
            </p>
          </div>
          <Link
            href="/achievements"
            className="inline-flex min-h-[44px] items-center gap-2 px-4 hairline-border bg-[var(--bg-surface)] font-mono text-xs uppercase tracking-[0.06em] text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
          >
            <span>Inspect Full Credentials Ledger</span>
            <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 tabular-nums">
          {achievements.map((item) => (
            <div key={item.id} className="surface-card p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2 py-0.5 bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] font-semibold">
                    {item.metricBadge}
                  </span>
                  <span className="text-[var(--text-muted)]">{item.year}</span>
                </div>
                <div className="font-mono text-xs text-[var(--text-secondary)]">
                  {item.organisation}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {item.significance}
                </p>
              </div>
              <div className="pt-3 hairline-t font-mono text-[11px] uppercase text-[var(--text-muted)]">
                ID: {item.id} · {item.category}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. JOURNEY / EXPERIENCE TIMELINE */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div className="max-w-3xl mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            Engineering &amp; Academic Trajectory
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)]">
            Progression from foundational sciences and mathematical excellence to international AI innovation awards and formal AI training at Universiti Malaya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
          {profile.journey.map((step, idx) => (
            <div key={step.title} className="surface-card p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  <span className="font-mono text-xs text-[var(--accent-primary)] mr-2">
                    0{idx + 1}
                  </span>
                  {step.title}
                </h3>
                <div className="font-mono text-xs text-[var(--text-muted)]">
                  {step.period} · {step.organisation}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {step.summary}
                </p>
              </div>
              <div className="pt-3 hairline-t font-mono text-xs font-semibold text-[var(--accent-secondary)]">
                {step.highlightMetric}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT CTA STRIP */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <div className="surface-card p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              Recruiting for AI Engineering, Applied ML, or Research Roles?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-[62ch]">
              Inspect the interactive case studies, print the one-page engineering CV, or reach out directly at{" "}
              <span className="font-mono text-[var(--text-primary)]">{profile.email}</span>.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center gap-2 px-6 bg-[var(--accent-primary)] text-white font-mono text-xs font-medium uppercase tracking-[0.06em] hover:bg-[var(--accent-primary-hover)] transition-colors"
            >
              <span>Open Direct Contact Dock</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex min-h-[48px] items-center gap-2 px-5 hairline-border bg-[var(--bg-elevated)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em]"
            >
              <span>View Resume</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
