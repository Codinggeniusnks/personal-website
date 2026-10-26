"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, ShieldAlert } from "lucide-react";
import type { NormalizedProject } from "@/data/projects";
import { SpatialAiCanvas, type ActiveProjectId } from "./SpatialAiCanvas";
import {
  CardioxyInteractiveLab,
  FoodResilienceInteractiveLab,
  SkillsDemandInteractiveLab,
} from "@/components/instruments/CaseStudySimulators";

type DeepTabId =
  | "architecture"
  | "methodology"
  | "results"
  | "implementation"
  | "limitations";

export function ProgressiveCaseStudy({
  project,
  prevProject,
  nextProject,
}: {
  project: NormalizedProject;
  prevProject: NormalizedProject;
  nextProject: NormalizedProject;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<DeepTabId>("architecture");

  const activeProjectId = (
    ["cardioxy-pro", "foodresilience", "occupational-skills-demand"].includes(
      project.slug
    )
      ? project.slug
      : "cardioxy-pro"
  ) as ActiveProjectId;

  const DEEP_TABS: { id: DeepTabId; label: string; code: string }[] = [
    { id: "architecture", label: "Architecture & Data", code: "01" },
    { id: "methodology", label: "AI / ML Methodology", code: "02" },
    { id: "results", label: "Validation & Metrics", code: "03" },
    { id: "implementation", label: "Implementation & Constraints", code: "04" },
    { id: "limitations", label: "Limitations & Future Work", code: "05" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Layer 0: Project-Synchronised 3D AI Core */}
      <SpatialAiCanvas stage="work" activeProject={activeProjectId} />

      <article className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10 py-10 lg:py-16 space-y-12">
        {/* Top Spatial Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
            <span>Return to Project Constellation</span>
          </Link>
          <span className="tabular-nums">
            NODE {project.index} · {project.category.toUpperCase()}
          </span>
        </div>

        {/* Concise Spatial Case Study Header */}
        <header className="glass-workspace p-6 sm:p-10 space-y-6">
          <div className="space-y-3 max-w-3xl">
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.035em] leading-[1.05] text-[var(--text-primary)]">
              {project.title}
            </h1>
            <p className="text-base sm:text-xl text-[var(--text-secondary)] leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {project.awards.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.awards.map((award) => (
                <span
                  key={award}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent-amber-soft)] text-[var(--accent-amber)] font-mono text-xs"
                >
                  <Award className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{award}</span>
                </span>
              ))}
            </div>
          )}

          {/* High-Level Progressive Summary: Problem / Solution / Impact (Max 3 panels) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="glass-panel p-5 space-y-2">
              <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent-primary)]">
                Problem
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="glass-panel p-5 space-y-2">
              <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent-secondary)]">
                Solution
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.overview}
              </p>
            </div>

            <div className="glass-panel p-5 space-y-2">
              <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent-amber)]">
                Impact &amp; Why It Matters
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.impact}
              </p>
            </div>
          </div>

          {/* Concise Headline Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2 tabular-nums">
            {project.keyMetrics.map((m) => (
              <div key={m.label} className="p-4 rounded-xl hairline-border bg-[var(--bg-canvas)]">
                <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                  {m.label}
                </div>
                <div className="mt-1 font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  {m.value}
                </div>
                <div className="mt-0.5 text-[11px] text-[var(--text-secondary)]">{m.detail}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Project-Specific Spatial Interactive Experience */}
        <section aria-label="Interactive Spatial Experience">
          {project.slug === "cardioxy-pro" && <CardioxyInteractiveLab />}
          {project.slug === "foodresilience" && <FoodResilienceInteractiveLab />}
          {project.slug === "occupational-skills-demand" && <SkillsDemandInteractiveLab />}
        </section>

        {/* Progressive Disclosure Technical Workspace */}
        <section className="glass-workspace p-6 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 hairline-b">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              Technical Specification &amp; Engineering Depth
            </h2>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              PROGRESSIVE DISCLOSURE · SELECT MODULE
            </span>
          </div>

          {/* Module Selector Tabs */}
          <div
            role="tablist"
            aria-label="Technical case study modules"
            className="flex flex-wrap gap-2"
          >
            {DEEP_TABS.map((t) => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-2.5 rounded-full font-mono text-xs uppercase tracking-[0.06em] transition-colors cursor-pointer ${
                    active
                      ? "bg-[var(--accent-primary)] text-white"
                      : "glass-panel text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="mr-1.5 opacity-75">{t.code}</span>
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Active Technical Module Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {activeTab === "architecture" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                      System Architecture &amp; Data Foundation
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {project.systemArchitecture}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.architectureLayers.map((layer, idx) => (
                      <div key={layer.layer} className="glass-panel p-5 space-y-2">
                        <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                          <span className="font-mono text-xs text-[var(--accent-primary)] mr-2 tabular-nums">
                            L0{idx + 1}
                          </span>
                          {layer.layer}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {layer.components.map((c) => (
                            <span
                              key={c}
                              className="px-2.5 py-0.5 rounded-full font-mono text-[11px] bg-[var(--bg-canvas)] hairline-border text-[var(--accent-secondary)]"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          {layer.responsibility}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="glass-panel p-5 space-y-2">
                    <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                      Data Sources &amp; Domain Grounding
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {project.researchData}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "methodology" && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    AI, Machine Learning &amp; Signal Methodology
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.engineeringApproach}
                  </p>
                  <ul className="space-y-3">
                    {project.methodology.map((item, idx) => (
                      <li
                        key={idx}
                        className="glass-panel p-4 flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                      >
                        <CheckCircle2
                          className="h-4 w-4 text-[var(--accent-secondary)] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "results" && (
                <div className="space-y-4 tabular-nums">
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    Validation Protocol &amp; Empirical Results
                  </h3>
                  <ul className="space-y-3">
                    {project.resultsEvaluation.map((res, idx) => (
                      <li
                        key={idx}
                        className="glass-panel p-4 flex items-start gap-3 text-sm text-[var(--text-primary)]"
                      >
                        <span className="font-mono text-xs text-[var(--accent-secondary)] font-semibold mt-0.5">
                          [0{idx + 1}]
                        </span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "implementation" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      Implementation Details
                    </h3>
                    <ul className="space-y-2.5">
                      {project.implementation.map((imp, idx) => (
                        <li
                          key={idx}
                          className="glass-panel p-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                        >
                          {imp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      Constraints &amp; Stakeholders
                    </h3>
                    <ul className="space-y-2.5">
                      {project.constraints.map((c, idx) => (
                        <li
                          key={idx}
                          className="glass-panel p-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "limitations" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      Honest Limitations &amp; Lessons Learned
                    </h3>
                    <ul className="space-y-2.5">
                      {project.limitations.map((lim, idx) => (
                        <li
                          key={idx}
                          className="glass-panel p-4 flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]"
                        >
                          <ShieldAlert
                            className="h-4 w-4 text-[var(--accent-amber)] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{lim}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      Future Engineering Roadmap
                    </h3>
                    <ul className="space-y-2.5">
                      {project.nextSteps.map((step, idx) => (
                        <li
                          key={idx}
                          className="glass-panel p-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                        >
                          <span className="font-mono text-xs text-[var(--accent-primary)] mr-2">
                            →
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Adjacent Constellation Nodes */}
        <nav
          aria-label="Adjacent projects"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <Link
            href={`/work/${prevProject.slug}`}
            className="glass-panel p-6 group hover:border-[var(--accent-primary)] transition-colors"
          >
            <div className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
              <ArrowLeft className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              <span>PREVIOUS NODE · {prevProject.index}</span>
            </div>
            <div className="mt-2 font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              {prevProject.title}
            </div>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="glass-panel p-6 text-left sm:text-right group hover:border-[var(--accent-primary)] transition-colors"
          >
            <div className="font-mono text-xs text-[var(--text-muted)] flex items-center sm:justify-end gap-2">
              <span>NEXT NODE · {nextProject.index}</span>
              <ArrowRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
            </div>
            <div className="mt-2 font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              {nextProject.title}
            </div>
          </Link>
        </nav>
      </article>
    </div>
  );
}
