"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Layers } from "lucide-react";
import { projects } from "@/data/projects";

export default function WorkIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <div className="pb-10 hairline-b space-y-6">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.035em] text-[var(--text-primary)]">
          Engineering Case Studies &amp; System Architecture Folios
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-[66ch] leading-relaxed">
          Each case study documents a complete engineering lifecycle—from physical or statistical constraints and leakage-free data validation to multi-layer system architecture, empirical evaluation, and interactive simulation labs.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-2" role="group" aria-label="Filter projects by domain">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[40px] px-4 py-2 font-mono text-xs uppercase tracking-[0.06em] hairline-border cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? "bg-[var(--accent-primary)] text-white"
                  : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat === "ALL" ? `All Systems (${projects.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies List */}
      <div className="divide-y divide-[var(--border-hairline)]">
        {filteredProjects.map((project) => (
          <article
            key={project.slug}
            className="py-12 first:pt-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
          >
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
                <Link
                  href={`/work/${project.slug}`}
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">
                    [{project.index}]
                  </span>
                  {project.title}
                </Link>
              </h2>

              <div className="flex flex-wrap items-center gap-2 font-mono text-xs tabular-nums">
                <span className="px-2.5 py-1 hairline-border bg-[var(--bg-surface)] text-[var(--text-secondary)]">
                  {project.category}
                </span>
                <span className="text-[var(--text-muted)]">· {project.role}</span>
              </div>

              <p className="text-sm sm:text-base font-medium text-[var(--text-primary)]">
                {project.subtitle}
              </p>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.overview}
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

              <div className="pt-3">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex min-h-[46px] items-center gap-2.5 px-5 bg-[var(--accent-primary)] text-white font-mono text-xs font-medium uppercase tracking-[0.06em] hover:bg-[var(--accent-primary-hover)] transition-colors"
                >
                  <span>Open Full 16-Section Case Study</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 tabular-nums">
                {project.keyMetrics.map((metric) => (
                  <div key={metric.label} className="p-4 surface-card">
                    <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
                      {metric.label}
                    </div>
                    <div className="mt-1 font-display text-xl font-bold text-[var(--text-primary)]">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs text-[var(--text-secondary)]">
                      {metric.detail}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 surface-card space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-primary)] uppercase">
                  <Layers className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                  <span>Technology &amp; Hardware Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 font-mono text-xs hairline-border bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Cross-Project Comparison Table */}
      <section className="pt-12 hairline-t space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
          Cross-System Engineering Comparison Matrix
        </h2>

        <div className="overflow-x-auto surface-card">
          <table className="w-full text-left border-collapse text-xs sm:text-sm tabular-nums">
            <thead>
              <tr className="hairline-b bg-[var(--bg-elevated)] font-mono text-xs uppercase text-[var(--text-muted)]">
                <th className="p-4">System</th>
                <th className="p-4">Core Architecture</th>
                <th className="p-4">Validation / Resilience Protocol</th>
                <th className="p-4">Key Quantitative Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-hairline)]">
              <tr>
                <td className="p-4 font-display font-bold text-[var(--text-primary)]">
                  <Link href="/work/cardioxy-pro" className="hover:text-[var(--accent-primary)]">
                    01 · CardiOxy Pro
                  </Link>
                </td>
                <td className="p-4 text-[var(--text-secondary)]">
                  ESP32 + MAX30102 + Wemos D1 R1 + Arduino UNO + DS1302 RTC + SD
                </td>
                <td className="p-4 text-[var(--text-secondary)]">
                  Tri-mode operation (Manual / Online / Offline ESP-NOW) + Pre-threshold trajectory detection
                </td>
                <td className="p-4 font-mono text-xs text-[var(--text-primary)]">
                  HR &gt; 100 | HR &lt; 60 | SpO₂ &lt; 90% · ISIC-WOU24 Gold · BIICC 2026 Best AI Tech + Gold
                </td>
              </tr>
              <tr>
                <td className="p-4 font-display font-bold text-[var(--text-primary)]">
                  <Link href="/work/foodresilience" className="hover:text-[var(--accent-primary)]">
                    02 · FoodResilience
                  </Link>
                </td>
                <td className="p-4 text-[var(--text-secondary)]">
                  Direct Multi-Horizon GBDTs (LightGBM, CatBoost, XGBoost) + Days-of-Stock Engine
                </td>
                <td className="p-4 text-[var(--text-secondary)]">
                  Expanding Walk-Forward CV + Strict Chronological Holdout (2024-10-01 to 2024-12-31)
                </td>
                <td className="p-4 font-mono text-xs text-[var(--text-primary)]">
                  6 Direct Horizons (1d, 3d, 7d, 14d, 21d, 30d) · Zero Look-Ahead Leakage
                </td>
              </tr>
              <tr>
                <td className="p-4 font-display font-bold text-[var(--text-primary)]">
                  <Link href="/work/occupational-skills-demand" className="hover:text-[var(--accent-primary)]">
                    03 · Occupational Skills &amp; Demand
                  </Link>
                </td>
                <td className="p-4 text-[var(--text-secondary)]">
                  Dual TF-IDF (Word 1–3g + Char 3–5g) + OvR Logistic Regression (C=2.2) + Platt Scaling
                </td>
                <td className="p-4 text-[var(--text-secondary)]">
                  Protocol B (Stratified) vs Protocol C (Strict Out-of-Cluster) + 3× GOLD Weighted Hybrid
                </td>
                <td className="p-4 font-mono text-xs text-[var(--text-primary)]">
                  Skills Macro F1 = 0.7149 · Demand Macro F1 = 0.7644 · ROC AUC = 0.8379 · Brier = 0.1668
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
