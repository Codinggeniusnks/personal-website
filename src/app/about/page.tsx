import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { profile } from "@/data/profile";
import { capabilityGroups } from "@/data/capabilities";

export const metadata: Metadata = {
  title: "About & Engineering Philosophy",
  description:
    "Engineering philosophy, academic training at Universiti Malaya, and systems methodology of Ng Kai Sheng (KAI SHENG).",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <header className="pb-12 hairline-b grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-5">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.035em] leading-[1.05] text-[var(--text-primary)]">
            {profile.fullName} ({profile.displayName}) — Applied AI &amp; Resilient Systems Engineer
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {profile.longBio[0]}
          </p>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {profile.longBio[1]}
          </p>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {profile.longBio[2]}
          </p>
        </div>

        <aside className="lg:col-span-4 surface-card p-6 space-y-5 tabular-nums">
          <h2 className="font-display text-lg font-bold text-[var(--text-primary)] pb-3 hairline-b">
            Engineer Specification Sheet
          </h2>
          <dl className="space-y-3 text-xs sm:text-sm">
            <div>
              <dt className="font-mono text-[11px] uppercase text-[var(--text-muted)]">Full Name</dt>
              <dd className="mt-0.5 font-medium text-[var(--text-primary)]">{profile.fullName}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase text-[var(--text-muted)]">Institution</dt>
              <dd className="mt-0.5 font-medium text-[var(--text-primary)]">{profile.university}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase text-[var(--text-muted)]">Programme</dt>
              <dd className="mt-0.5 font-medium text-[var(--text-primary)]">{profile.degree}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase text-[var(--text-muted)]">Pre-University Track</dt>
              <dd className="mt-0.5 font-mono text-xs text-[var(--accent-secondary)]">
                Kolej Matrikulasi Kedah (CGPA 4.00) · SPM 10A · MUET Band 4.5
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase text-[var(--text-muted)]">Direct Contact</dt>
              <dd className="mt-0.5 font-mono text-xs text-[var(--accent-primary)]">{profile.email}</dd>
            </div>
          </dl>

          <div className="pt-3 hairline-t flex flex-col gap-2.5">
            <Link
              href="/resume"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 px-4 bg-[var(--accent-primary)] text-white font-mono text-xs uppercase tracking-[0.06em]"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Inspect Full Engineering CV</span>
            </Link>
            <Link
              href="/work"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 px-4 hairline-border bg-[var(--bg-elevated)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em]"
            >
              <span>Inspect Case Studies</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </header>

      {/* Core Engineering Principles */}
      <section className="space-y-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
          01 / Four Non-Negotiable Engineering Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.engineeringPrinciples.map((p, idx) => (
            <div key={p.title} className="surface-card p-6 space-y-3">
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                <span className="font-mono text-xs text-[var(--accent-primary)] mr-2.5 tabular-nums">
                  [0{idx + 1}]
                </span>
                {p.title}
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Chronological Trajectory */}
      <section className="space-y-8 pt-12 hairline-t">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
          02 / Academic &amp; Technical Progression
        </h2>

        <div className="divide-y divide-[var(--border-hairline)] surface-card">
          {profile.journey.map((stage, idx) => (
            <div key={stage.title} className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start tabular-nums">
              <div className="lg:col-span-3 font-mono text-xs text-[var(--accent-primary)]">
                STAGE 0{idx + 1} · {stage.period}
              </div>
              <div className="lg:col-span-6 space-y-1.5">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  {stage.title}
                </h3>
                <div className="font-mono text-xs text-[var(--text-secondary)]">{stage.organisation}</div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{stage.summary}</p>
              </div>
              <div className="lg:col-span-3 lg:text-right font-mono text-xs text-[var(--accent-secondary)] font-semibold">
                {stage.highlightMetric}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence-Backed Capabilities */}
      <section className="space-y-8 pt-12 hairline-t">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
          03 / Complete Capability-to-Evidence Ledger
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilityGroups.map((group) => (
            <div key={group.code} className="surface-card p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)] pb-3 hairline-b">
                <span className="font-mono text-xs text-[var(--accent-primary)] mr-2 tabular-nums">
                  {group.code}
                </span>
                {group.domain}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.technology} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[var(--accent-secondary)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="text-[var(--text-primary)] font-mono text-xs">
                        {item.technology}
                      </strong>{" "}
                      <span className="font-mono text-[11px] text-[var(--accent-primary)]">
                        ({item.whereUsed})
                      </span>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">{item.evidence}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
