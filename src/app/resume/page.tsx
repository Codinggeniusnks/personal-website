"use client";

import React from "react";
import Link from "next/link";
import { Printer, Mail, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { achievements } from "@/data/achievements";
import { capabilityGroups } from "@/data/capabilities";

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-10 py-10 lg:py-16 space-y-10">
      {/* Action Bar (Hidden in Print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 p-4 surface-card">
        <div className="font-mono text-xs text-[var(--text-secondary)]">
          CURRICULUM VITAE · PRINT-OPTIMISED ENGINEERING SPECIFICATION
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[44px] items-center gap-2 px-5 bg-[var(--accent-primary)] text-white font-mono text-xs font-medium uppercase tracking-[0.06em] hover:bg-[var(--accent-primary-hover)] transition-colors cursor-pointer"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            <span>Print / Save as PDF</span>
          </button>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-[44px] items-center gap-2 px-4 hairline-border bg-[var(--bg-elevated)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em]"
          >
            <Mail className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
            <span>Email Candidate</span>
          </a>
        </div>
      </div>

      {/* Printable CV Sheet */}
      <div className="surface-card p-6 sm:p-10 lg:p-12 space-y-8 tabular-nums">
        {/* CV Header */}
        <header className="pb-6 hairline-b flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              {profile.fullName} ({profile.displayName})
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[var(--accent-primary)] font-medium">
              {profile.degree} · {profile.university}
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl">
              AI Engineer &amp; Applied Machine Learning Systems Builder specialising in predictive biomedical IoT telemetry, multi-horizon time-series forecasting, and calibrated NLP classification.
            </p>
          </div>

          <div className="font-mono text-xs text-[var(--text-secondary)] space-y-1 md:text-right">
            <div>{profile.location}</div>
            <div>
              <a href={`mailto:${profile.email}`} className="hover:underline text-[var(--text-primary)]">
                {profile.email}
              </a>
            </div>
            <div>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                github.com/{profile.githubHandle}
              </a>
            </div>
            <div>
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                linkedin.com/in/ng-kai-sheng-64ab9942b
              </a>
            </div>
          </div>
        </header>

        {/* Education */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent-primary)] pb-1.5 hairline-b">
            01 / Education &amp; Academic Qualifications
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                  Universiti Malaya (UM) — Kuala Lumpur, Malaysia
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  Bachelor of Computer Science (Artificial Intelligence)
                </p>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)]">Current Undergraduate</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                  Kolej Matrikulasi Kedah (KMK)
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  Pre-University Matriculation Programme (Computer Science, Mathematics &amp; Sciences)
                </p>
              </div>
              <span className="font-mono text-xs font-semibold text-[var(--accent-secondary)]">
                CGPA 4.00 / 4.00 · MUET Band 4.5
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                  Sijil Pelajaran Malaysia (SPM)
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  National Secondary Examination — Science &amp; Mathematics Track
                </p>
              </div>
              <span className="font-mono text-xs font-semibold text-[var(--accent-secondary)]">
                10 As Distinction
              </span>
            </div>
          </div>
        </section>

        {/* Flagship Engineering Projects */}
        <section className="space-y-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent-primary)] pb-1.5 hairline-b">
            02 / Selected Engineering &amp; AI Systems
          </h2>

          <div className="space-y-6">
            {projects.map((p) => (
              <div key={p.slug} className="space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)]">
                    <Link href={`/work/${p.slug}`} className="hover:underline inline-flex items-center gap-1">
                      <span>
                        {p.title} — {p.subtitle}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 no-print text-[var(--accent-primary)]" />
                    </Link>
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">{p.role}</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {p.overview}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-secondary)]">
                  {p.resultsEvaluation.slice(0, 3).map((res, i) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
                <div className="font-mono text-[11px] text-[var(--text-muted)]">
                  Stack: {p.stack.join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards & Honours */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent-primary)] pb-1.5 hairline-b">
            03 / Honours &amp; International Awards
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((a) => (
              <div key={a.id} className="p-3.5 hairline-border bg-[var(--bg-canvas)] space-y-1">
                <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">{a.title}</h3>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-semibold text-[var(--accent-primary)]">{a.metricBadge}</span>
                  <span className="text-[var(--text-muted)]">{a.year}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{a.organisation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Capabilities Summary */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent-primary)] pb-1.5 hairline-b">
            04 / Verified Technical Stack
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {capabilityGroups.map((group) => (
              <div key={group.code} className="space-y-1">
                <h3 className="font-mono font-semibold text-[var(--text-primary)]">
                  {group.domain}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {group.items.map((i) => i.technology).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
