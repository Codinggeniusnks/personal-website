"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, ShieldAlert } from "lucide-react";
import type { NormalizedProject } from "@/data/projects";
import { SpatialAiCanvas, type ActiveProjectId } from "./SpatialAiCanvas";
import { MagneticButton } from "./InteractivePrimitives";
import {
  CardioxyInteractiveLab,
  FoodResilienceInteractiveLab,
  SkillsDemandInteractiveLab,
} from "@/components/instruments/CaseStudySimulators";

const EMPLOYER_CASE_STUDY_SECTIONS = [
  { id: "overview", code: "01", label: "OVERVIEW" },
  { id: "problem", code: "02", label: "PROBLEM" },
  { id: "solution", code: "03", label: "SOLUTION" },
  { id: "my-role", code: "04", label: "MY ROLE" },
  { id: "system-architecture", code: "05", label: "SYSTEM ARCHITECTURE" },
  { id: "technologies", code: "06", label: "TECHNOLOGIES" },
  { id: "ai-ml-approach", code: "07", label: "AI / ML APPROACH" },
  { id: "results", code: "08", label: "RESULTS" },
  { id: "challenges", code: "09", label: "CHALLENGES" },
  { id: "what-i-learned", code: "10", label: "WHAT I LEARNED" },
  { id: "future-improvements", code: "11", label: "FUTURE IMPROVEMENTS" },
];

export function ProgressiveCaseStudy({
  project,
  prevProject,
  nextProject,
}: {
  project: NormalizedProject;
  prevProject: NormalizedProject;
  nextProject: NormalizedProject;
}) {
  const activeProjectId = (
    ["cardioxy-pro", "foodresilience", "occupational-skills-demand"].includes(
      project.slug
    )
      ? project.slug
      : "cardioxy-pro"
  ) as ActiveProjectId;

  return (
    <div className="relative min-h-screen">
      {/* Layer 0: Project-Synchronised 3D AI Core */}
      <SpatialAiCanvas stage="work" activeProject={activeProjectId} />

      <article className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10 py-10 lg:py-16 space-y-10">
        {/* Top Employer Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
          <MagneticButton href="/work" variant="glass">
            <ArrowLeft className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
            <span>ALL PROJECTS</span>
          </MagneticButton>
          <span className="tabular-nums text-[var(--text-secondary)]">
            PROJECT {project.index} · {project.category.toUpperCase()} · {project.timeframe}
          </span>
        </div>

        {/* Case Study Hero Header */}
        <header className="glass-workspace p-6 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 hairline-b">
            <span className="px-3 py-1 rounded-full bg-[var(--accent-cyan-soft)] text-[var(--accent-primary)] font-mono text-xs">
              {project.index} — {project.category.toUpperCase()}
            </span>
            <span className="font-mono text-xs text-[var(--text-secondary)]">
              ROLE: {project.role}
            </span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.035em] leading-[1.06] text-[var(--text-primary)]">
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

          {/* Headline Employer Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 tabular-nums">
            {project.keyMetrics.map((m) => (
              <div
                key={m.label}
                className="p-4 rounded-xl hairline-border bg-[var(--bg-canvas)] space-y-1"
              >
                <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                  {m.label}
                </div>
                <div className="font-display text-lg sm:text-xl font-bold text-[var(--accent-primary)]">
                  {m.value}
                </div>
                <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {m.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Jump Index for Recruiters & Technical Interviewers */}
          <nav
            aria-label="Case study sections"
            className="pt-4 hairline-t flex flex-wrap gap-2"
          >
            {EMPLOYER_CASE_STUDY_SECTIONS.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="px-3 py-1.5 rounded-full glass-panel font-mono text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors"
              >
                <span className="text-[var(--accent-primary)] mr-1.5">{sec.code}</span>
                {sec.label}
              </a>
            ))}
          </nav>
        </header>

        {/* 1. OVERVIEW, 2. PROBLEM, 3. SOLUTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div id="overview" className="glass-workspace p-6 space-y-3 scroll-mt-24">
            <div className="flex items-center justify-between pb-2 hairline-b">
              <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
                01. OVERVIEW
              </h2>
              <span className="font-mono text-xs text-[var(--accent-primary)]">SUMMARY</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div id="problem" className="glass-workspace p-6 space-y-3 scroll-mt-24">
            <div className="flex items-center justify-between pb-2 hairline-b">
              <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
                02. PROBLEM
              </h2>
              <span className="font-mono text-xs text-[var(--accent-primary)]">WHAT EXISTED?</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div id="solution" className="glass-workspace p-6 space-y-3 scroll-mt-24">
            <div className="flex items-center justify-between pb-2 hairline-b">
              <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
                03. SOLUTION
              </h2>
              <span className="font-mono text-xs text-[var(--accent-primary)]">WHAT I BUILT</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.engineeringApproach}
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-1">
              {project.whyItMatters}
            </p>
          </div>
        </section>

        {/* 4. MY ROLE & 6. TECHNOLOGIES */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div id="my-role" className="lg:col-span-7 glass-workspace p-6 sm:p-8 space-y-4 scroll-mt-24">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 hairline-b">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                04. MY ROLE — What I Personally Implemented
              </h2>
              <span className="font-mono text-xs text-[var(--accent-primary)]">
                {project.role}
              </span>
            </div>
            <ul className="space-y-3">
              {project.implementation.map((imp, idx) => (
                <li
                  key={idx}
                  className="glass-panel p-4 flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed"
                >
                  <CheckCircle2
                    className="h-4 w-4 text-[var(--accent-primary)] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="technologies" className="lg:col-span-5 glass-workspace p-6 sm:p-8 space-y-4 scroll-mt-24">
            <div className="flex items-center justify-between pb-3 hairline-b">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                06. TECHNOLOGIES
              </h2>
              <span className="font-mono text-xs text-[var(--text-muted)]">STACK &amp; HARDWARE</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Core languages, ML frameworks, hardware sensors, and data standards used in production:
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-[var(--bg-canvas)] hairline-border font-mono text-xs text-[var(--text-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] hairline-border space-y-1.5">
              <div className="font-mono text-[11px] uppercase text-[var(--accent-primary)]">
                DATA SOURCES &amp; STANDARDS
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {project.researchData}
              </p>
            </div>
          </div>
        </section>

        {/* 5. SYSTEM ARCHITECTURE + INTERACTIVE 3D / SPATIAL METAPHOR */}
        <section id="system-architecture" className="glass-workspace p-6 sm:p-10 space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 hairline-b">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              05. SYSTEM ARCHITECTURE &amp; INTERACTIVE SIMULATION
            </h2>
            <span className="font-mono text-xs text-[var(--accent-primary)]">
              VISUAL PIPELINE + LIVE SIMULATOR
            </span>
          </div>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-4xl">
            {project.systemArchitecture}
          </p>

          {/* 4-Layer Architecture Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.architectureLayers.map((layer, idx) => (
              <div key={layer.layer} className="glass-panel p-5 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                    {layer.layer}
                  </h3>
                  <span className="font-mono text-xs text-[var(--accent-primary)] tabular-nums">
                    STAGE 0{idx + 1}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {layer.components.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-0.5 rounded-full font-mono text-[11px] bg-[var(--bg-canvas)] hairline-border text-[var(--accent-primary)]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {layer.responsibility}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Spatial Metaphor Component (Section 19) */}
          <div aria-label="Interactive Project Metaphor">
            {project.slug === "cardioxy-pro" && <CardioxyInteractiveLab />}
            {project.slug === "foodresilience" && <FoodResilienceInteractiveLab />}
            {project.slug === "occupational-skills-demand" && <SkillsDemandInteractiveLab />}
          </div>
        </section>

        {/* 7. AI / ML APPROACH & 8. RESULTS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div id="ai-ml-approach" className="lg:col-span-7 glass-workspace p-6 sm:p-8 space-y-4 scroll-mt-24">
            <div className="flex items-center justify-between pb-3 hairline-b">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                07. AI / ML APPROACH
              </h2>
              <span className="font-mono text-xs text-[var(--accent-primary)]">
                TECHNICAL DECISIONS
              </span>
            </div>
            <ul className="space-y-3">
              {project.methodology.map((item, idx) => (
                <li
                  key={idx}
                  className="glass-panel p-4 flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed"
                >
                  <span className="font-mono text-xs text-[var(--accent-primary)] font-semibold mt-0.5 tabular-nums">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="results" className="lg:col-span-5 glass-workspace p-6 sm:p-8 space-y-4 tabular-nums scroll-mt-24">
            <div className="flex items-center justify-between pb-3 hairline-b">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                08. RESULTS &amp; OUTCOMES
              </h2>
              <span className="font-mono text-xs text-[var(--accent-primary)]">
                EMPIRICAL PROOF
              </span>
            </div>
            <ul className="space-y-3">
              {project.resultsEvaluation.map((res, idx) => (
                <li
                  key={idx}
                  className="glass-panel p-4 flex items-start gap-3 text-sm text-[var(--text-primary)] leading-relaxed"
                >
                  <CheckCircle2
                    className="h-4 w-4 text-[var(--accent-primary)] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] hairline-border space-y-1">
              <div className="font-mono text-[11px] uppercase text-[var(--accent-primary)]">
                REAL-WORLD IMPACT
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {project.impact}
              </p>
            </div>
          </div>
        </section>

        {/* 9. CHALLENGES, 10. WHAT I LEARNED, 11. FUTURE IMPROVEMENTS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div id="challenges" className="glass-workspace p-6 space-y-3 scroll-mt-24">
            <div className="flex items-center justify-between pb-2 hairline-b">
              <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
                09. CHALLENGES
              </h2>
              <span className="font-mono text-xs text-[var(--accent-amber)]">CONSTRAINTS</span>
            </div>
            <ul className="space-y-2.5">
              {[...project.constraints, ...project.limitations].slice(0, 4).map((lim, idx) => (
                <li
                  key={idx}
                  className="glass-panel p-3.5 flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
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

          <div id="what-i-learned" className="glass-workspace p-6 space-y-3 scroll-mt-24">
            <div className="flex items-center justify-between pb-2 hairline-b">
              <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
                10. WHAT I LEARNED
              </h2>
              <span className="font-mono text-xs text-[var(--accent-primary)]">REFLECTION</span>
            </div>
            <ul className="space-y-2.5">
              {project.lessonsLearned.map((lesson, idx) => (
                <li
                  key={idx}
                  className="glass-panel p-3.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                >
                  {lesson}
                </li>
              ))}
            </ul>
          </div>

          <div id="future-improvements" className="glass-workspace p-6 space-y-3 scroll-mt-24">
            <div className="flex items-center justify-between pb-2 hairline-b">
              <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
                11. FUTURE IMPROVEMENTS
              </h2>
              <span className="font-mono text-xs text-[var(--accent-primary)]">NEXT STEPS</span>
            </div>
            <ul className="space-y-2.5">
              {project.nextSteps.map((step, idx) => (
                <li
                  key={idx}
                  className="glass-panel p-3.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                >
                  <span className="font-mono text-xs text-[var(--accent-primary)] mr-2">→</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Adjacent Project Nodes */}
        <nav
          aria-label="Adjacent projects"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
        >
          <Link
            href={`/work/${prevProject.slug}`}
            data-cursor="view"
            className="glass-panel p-6 group hover:border-[var(--accent-primary)] transition-colors"
          >
            <div className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
              <ArrowLeft className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              <span>PREVIOUS PROJECT · {prevProject.index}</span>
            </div>
            <div className="mt-2 font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              {prevProject.title}
            </div>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            data-cursor="view"
            className="glass-panel p-6 text-left sm:text-right group hover:border-[var(--accent-primary)] transition-colors"
          >
            <div className="font-mono text-xs text-[var(--text-muted)] flex items-center sm:justify-end gap-2">
              <span>NEXT PROJECT · {nextProject.index}</span>
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
