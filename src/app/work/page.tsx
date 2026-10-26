"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { projects } from "@/data/projects";
import { SpatialAiCanvas, type ActiveProjectId } from "@/components/spatial/SpatialAiCanvas";
import { MagneticButton } from "@/components/spatial/InteractivePrimitives";

export default function WorkIndexPage() {
  const [focusedProject, setFocusedProject] = useState<ActiveProjectId>("cardioxy-pro");
  const [showMatrix, setShowMatrix] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen">
      <SpatialAiCanvas stage="work" activeProject={focusedProject} />

      <div className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-14">
        <header className="max-w-2xl space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.035em] text-[var(--text-primary)]">
            Engineering Case Studies
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Select a system node below to enter its dedicated employer-focused case study and
            interactive verification simulator.
          </p>
        </header>

        {/* 3 Concise Spatial Project Windows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const active = focusedProject === project.slug;
            return (
              <article
                key={project.slug}
                onMouseEnter={() => setFocusedProject(project.slug as ActiveProjectId)}
                className={`p-7 flex flex-col justify-between space-y-6 transition-all ${
                  active ? "glass-panel-active" : "glass-panel"
                }`}
              >
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
                    <Link
                      href={`/work/${project.slug}`}
                      data-cursor="view"
                      className="hover:text-[var(--accent-primary)] transition-colors"
                    >
                      <span className="font-mono text-xs text-[var(--accent-primary)] mr-2 tabular-nums">
                        {project.index}
                      </span>
                      {project.title}
                    </Link>
                  </h2>

                  <div className="font-mono text-xs text-[var(--accent-primary)]">
                    {project.category}
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.tagline}
                  </p>

                  {project.awards.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.awards.map((award) => (
                        <span
                          key={award}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-amber-soft)] text-[var(--accent-amber)] font-mono text-[11px]"
                        >
                          <Award className="h-3 w-3 shrink-0" aria-hidden="true" />
                          <span>{award}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-4 hairline-t">
                  <div className="font-mono text-xs text-[var(--text-muted)]">
                    {project.stack.slice(0, 4).join(" · ")}
                  </div>

                  <MagneticButton
                    href={`/work/${project.slug}`}
                    cursorType="view"
                    variant="primary"
                    className="w-full"
                  >
                    <span>Explore Project</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </MagneticButton>
                </div>
              </article>
            );
          })}
        </div>

        {/* Progressive Disclosure Comparison Matrix */}
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setShowMatrix((prev) => !prev)}
            aria-expanded={showMatrix}
            className="px-5 py-2.5 rounded-full glass-panel font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-primary)] hover:border-[var(--border-strong)] cursor-pointer"
          >
            {showMatrix
              ? "Hide Cross-System Engineering Matrix"
              : "Reveal Cross-System Engineering Matrix →"}
          </button>

          {showMatrix && (
            <div className="overflow-x-auto glass-workspace p-6">
              <table className="w-full text-left border-collapse text-xs sm:text-sm tabular-nums">
                <thead>
                  <tr className="hairline-b font-mono text-xs uppercase text-[var(--text-muted)]">
                    <th className="p-3.5">System</th>
                    <th className="p-3.5">Architecture</th>
                    <th className="p-3.5">Validation Protocol</th>
                    <th className="p-3.5">Key Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-hairline)]">
                  <tr>
                    <td className="p-3.5 font-display font-bold text-[var(--text-primary)]">
                      01 · CardiOxy Pro
                    </td>
                    <td className="p-3.5 text-[var(--text-secondary)]">
                      ESP32 + MAX30102 + Wemos D1 R1 + Arduino UNO + DS1302 RTC + SD
                    </td>
                    <td className="p-3.5 text-[var(--text-secondary)]">
                      Tri-mode (Manual / Online / Offline ESP-NOW) + Pre-threshold trend detection
                    </td>
                    <td className="p-3.5 font-mono text-xs text-[var(--text-primary)]">
                      HR &gt; 100 | HR &lt; 60 | SpO₂ &lt; 90% · ISIC-WOU24 Gold · BIICC 2026 Best AI Tech + Gold
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-display font-bold text-[var(--text-primary)]">
                      02 · FoodResilience
                    </td>
                    <td className="p-3.5 text-[var(--text-secondary)]">
                      Direct Multi-Horizon LightGBM, CatBoost, XGBoost + Days-of-Stock Engine
                    </td>
                    <td className="p-3.5 text-[var(--text-secondary)]">
                      Expanding Walk-Forward CV (2024-10-01 to 2024-12-31)
                    </td>
                    <td className="p-3.5 font-mono text-xs text-[var(--text-primary)]">
                      1d, 3d, 7d, 14d, 21d, 30d horizons · UN SDG 12
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-display font-bold text-[var(--text-primary)]">
                      03 · Occupational AI
                    </td>
                    <td className="p-3.5 text-[var(--text-secondary)]">
                      Word 1–3g + Char 3–5g TF-IDF · OvR LogReg (C=2.2, τ=0.42) · Platt
                    </td>
                    <td className="p-3.5 text-[var(--text-secondary)]">
                      Protocol B vs Protocol C + 3× GOLD Weighted Hybrid
                    </td>
                    <td className="p-3.5 font-mono text-xs text-[var(--text-primary)]">
                      Skills Macro F1 0.7149 · Demand F1 0.7644 · ROC AUC 0.8379 · Brier 0.1668
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
