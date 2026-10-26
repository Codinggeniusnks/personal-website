import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Award, ArrowRight, GraduationCap } from "lucide-react";
import { achievements } from "@/data/achievements";
import { SpatialAiCanvas } from "@/components/spatial/SpatialAiCanvas";

export const metadata: Metadata = {
  title: "Achievements & Academic Credentials",
  description:
    "International AI & innovation competition awards (BIICC 2026 Best AI Tech + Gold, ISIC-WOU24 Gold) and academic distinctions of Ng Kai Sheng.",
};

export default function AchievementsPage() {
  const competitionAwards = achievements.filter(
    (a) => a.category === "International Competition"
  );
  const academicHonours = achievements.filter(
    (a) => a.category === "Academic Distinction"
  );

  return (
    <div className="relative min-h-screen">
      <SpatialAiCanvas stage="achievements" activeProject="occupational-skills-demand" />

      <div className="relative z-10 mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-14">
        <header className="max-w-2xl space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.035em] text-[var(--text-primary)]">
            Achievements &amp; Credentials
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            International engineering innovation awards and academic distinctions across Universiti Malaya, Kolej Matrikulasi Kedah, and national examinations.
          </p>
        </header>

        {/* International Competition Honours */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
            International Innovation Awards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 tabular-nums">
            {competitionAwards.map((award) => (
              <article
                key={award.id}
                className="glass-panel-active p-6 sm:p-8 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    {award.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-amber-soft)] text-[var(--accent-amber)] font-semibold">
                      <Award className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{award.metricBadge}</span>
                    </span>
                    <span className="text-[var(--text-muted)]">· {award.year}</span>
                  </div>

                  <div className="font-mono text-xs text-[var(--text-secondary)]">
                    {award.organisation}
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {award.significance}
                  </p>
                </div>

                <div className="pt-4 hairline-t flex items-center justify-between">
                  <Link
                    href="/work/cardioxy-pro"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-primary)] hover:underline"
                  >
                    <span>Explore Project</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Academic Foundation */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
            Academic Benchmarks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 tabular-nums">
            {academicHonours.map((item) => (
              <article key={item.id} className="glass-panel p-6 space-y-3">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-secondary)]">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {item.metricBadge} · {item.year}
                  </span>
                </div>
                <div className="font-mono text-xs text-[var(--text-secondary)]">
                  {item.organisation}
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.significance}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
