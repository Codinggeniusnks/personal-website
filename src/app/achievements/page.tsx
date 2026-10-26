import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Award, ArrowRight, GraduationCap } from "lucide-react";
import { achievements } from "@/data/achievements";

export const metadata: Metadata = {
  title: "Honours, Awards & Academic Credentials",
  description:
    "International AI & innovation competition awards (BIICC 2026 Best AI Tech + Gold, ISIC-WOU24 Gold) and academic distinctions of Ng Kai Sheng.",
};

export default function AchievementsPage() {
  const competitionAwards = achievements.filter((a) => a.category === "International Competition");
  const academicHonours = achievements.filter((a) => a.category === "Academic Distinction");

  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-16">
      <header className="pb-10 hairline-b space-y-4 max-w-3xl">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.035em] text-[var(--text-primary)]">
          Honours, Competition Awards &amp; Academic Credentials
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          Independent validation from international engineering competitions and rigorous pre-university and university computer science benchmarks.
        </p>
      </header>

      {/* International Competition Awards */}
      <section className="space-y-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
          01 / International Innovation &amp; AI Competition Awards
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 tabular-nums">
          {competitionAwards.map((award) => (
            <article key={award.id} className="surface-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  {award.title}
                </h3>

                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent-amber-soft)] text-[var(--accent-amber)] font-semibold">
                    <Award className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{award.metricBadge}</span>
                  </span>
                  <span className="px-2.5 py-1 hairline-border bg-[var(--bg-canvas)] text-[var(--text-secondary)]">
                    {award.year}
                  </span>
                  <span className="text-[var(--text-muted)]">· {award.id}</span>
                </div>

                <div className="font-mono text-xs text-[var(--text-primary)]">
                  {award.organisation}
                </div>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {award.significance}
                </p>
              </div>

              <div className="pt-4 hairline-t flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  SYSTEM: CARDIOXY PRO
                </span>
                <Link
                  href="/work/cardioxy-pro"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-primary)] hover:underline"
                >
                  <span>Inspect Awarded Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Academic Distinctions */}
      <section className="space-y-8 pt-12 hairline-t">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
          02 / Academic Foundation &amp; Examination Benchmarks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 tabular-nums">
          {academicHonours.map((item) => (
            <article key={item.id} className="surface-card p-6 space-y-4">
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                {item.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)] font-semibold">
                  <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{item.metricBadge}</span>
                </span>
                <span className="text-[var(--text-muted)]">{item.year}</span>
              </div>

              <div className="font-mono text-xs text-[var(--text-secondary)]">
                {item.organisation}
              </div>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {item.significance}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
