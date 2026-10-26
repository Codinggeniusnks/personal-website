import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileText } from "lucide-react";
import { profile } from "@/data/profile";
import { educationData } from "@/data/education";
import { SpatialAiCanvas } from "@/components/spatial/SpatialAiCanvas";

export const metadata: Metadata = {
  title: "About & Engineering Identity",
  description:
    "Engineering philosophy, academic training at Universiti Malaya, and systems methodology of Ng Kai Sheng (KAI SHENG).",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <SpatialAiCanvas stage="about" />

      <div className="relative z-10 mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-14">
        {/* Panel 1: Concise Personal Positioning Window */}
        <section className="glass-workspace p-8 sm:p-12 space-y-6">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.035em] leading-[1.04] text-[var(--text-primary)]">
            {profile.fullName} ({profile.displayName})
          </h1>

          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.14em] text-[var(--accent-primary)]">
            AI ENGINEER · MACHINE LEARNING ENGINEER · CREATIVE TECHNOLOGIST
          </p>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            I am a Computer Science student at <strong className="text-[var(--text-primary)] font-semibold">Universiti Malaya</strong> majoring in <strong className="text-[var(--text-primary)] font-semibold">Artificial Intelligence</strong>. My work focuses on building intelligent systems that connect machine learning, data, software and real-world applications.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/work"
              className="inline-flex min-h-[46px] items-center gap-2 px-6 rounded-full bg-[var(--accent-primary)] text-[#06090F] font-mono text-xs font-semibold uppercase tracking-[0.08em]"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex min-h-[46px] items-center gap-2 px-6 rounded-full glass-panel font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-primary)]"
            >
              <FileText className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
              <span>Inspect CV</span>
            </Link>
          </div>
        </section>

        {/* Panel 2: Four Engineering Principles */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
            Engineering Principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {profile.engineeringPrinciples.map((p, idx) => (
              <div key={p.title} className="glass-panel p-6 space-y-2.5">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  <span className="font-mono text-xs text-[var(--accent-primary)] mr-2 tabular-nums">
                    0{idx + 1}
                  </span>
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Panel 3: Education Milestones */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
            Academic Foundation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 tabular-nums">
            {educationData.map((ed) => (
              <div key={ed.id} className="glass-panel p-6 space-y-2">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  {ed.institution}
                </h3>
                <div className="font-mono text-xs text-[var(--accent-secondary)]">
                  {ed.distinction} · {ed.year}
                </div>
                <div className="text-xs font-medium text-[var(--text-primary)]">
                  {ed.programme}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {ed.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
