import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, Layers, ShieldAlert } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import {
  CardioxyInteractiveLab,
  FoodResilienceInteractiveLab,
  SkillsDemandInteractiveLab,
} from "@/components/instruments/CaseStudySimulators";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Case Study Not Found" };
  }
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.tagline,
  };
}

const TOC_SECTIONS = [
  { id: "overview", code: "01", label: "Overview" },
  { id: "problem", code: "02", label: "Problem & Context" },
  { id: "why-it-matters", code: "03", label: "Why It Matters" },
  { id: "stakeholders", code: "04", label: "Users & Stakeholders" },
  { id: "constraints", code: "05", label: "Constraints" },
  { id: "research-data", code: "06", label: "Research & Data" },
  { id: "approach", code: "07", label: "Engineering Approach" },
  { id: "architecture", code: "08", label: "System Architecture" },
  { id: "methodology", code: "09", label: "AI / ML / Signal Logic" },
  { id: "implementation", code: "10", label: "Implementation" },
  { id: "interactive-lab", code: "11", label: "Interface & Live Lab" },
  { id: "results", code: "12", label: "Results & Evaluation" },
  { id: "impact", code: "13", label: "Impact" },
  { id: "limitations", code: "14", label: "Honest Limitations" },
  { id: "lessons", code: "15", label: "Lessons Learned" },
  { id: "next-steps", code: "16", label: "Next Steps" },
];

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIdx > 0 ? projects[currentIdx - 1] : projects[projects.length - 1];
  const nextProject = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : projects[0];

  return (
    <article className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-10 lg:py-16 space-y-14">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 hairline-b font-mono text-xs text-[var(--text-muted)]">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to All Engineering Folios</span>
        </Link>
        <div className="tabular-nums">
          FOLIO {project.index} · {project.category.toUpperCase()} · {project.timeframe.toUpperCase()}
        </div>
      </div>

      {/* Case Study Hero */}
      <header className="space-y-8 pb-12 hairline-b">
        <div className="space-y-4 max-w-4xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-[-0.035em] leading-[1.04] text-[var(--text-primary)]">
            {project.title}: {project.subtitle}
          </h1>
          <p className="text-base sm:text-xl text-[var(--text-secondary)] leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1.5 bg-[var(--accent-primary)] text-white font-semibold">
            ROLE: {project.role.toUpperCase()}
          </span>
          {project.awards?.map((award) => (
            <span
              key={award}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent-amber-soft)] text-[var(--accent-amber)]"
            >
              <Award className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{award}</span>
            </span>
          ))}
        </div>

        {/* 4 Key Quantitative Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
          {project.keyMetrics.map((m) => (
            <div key={m.label} className="surface-card p-5">
              <div className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]">
                {m.label}
              </div>
              <div className="mt-1.5 font-display text-2xl font-bold text-[var(--text-primary)]">
                {m.value}
              </div>
              <div className="mt-1.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                {m.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 font-mono text-xs hairline-border bg-[var(--bg-surface)] text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Main Content Grid with Sticky 16-Section TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Sticky Sidebar TOC */}
        <aside
          aria-label="Case study sections"
          className="lg:col-span-3 lg:sticky lg:top-24 surface-card p-4 space-y-3"
        >
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-primary)] pb-2 hairline-b">
            16-Section Specification
          </div>
          <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1">
            {TOC_SECTIONS.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="flex items-center gap-2 px-2 py-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] transition-colors tabular-nums"
              >
                <span className="text-[var(--accent-primary)]">{sec.code}</span>
                <span className="truncate">{sec.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* 16 Case Study Sections */}
        <div className="lg:col-span-9 space-y-14">
          {/* 01. Overview */}
          <section id="overview" className="scroll-mt-24 space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">01 /</span>
              Executive Overview
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {project.overview}
            </p>
          </section>

          {/* 02. Problem */}
          <section id="problem" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">02 /</span>
              Problem &amp; Failure Mode Analysis
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {project.problem}
            </p>
          </section>

          {/* 03. Why It Matters */}
          <section id="why-it-matters" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">03 /</span>
              Why It Matters
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {project.whyItMatters}
            </p>
          </section>

          {/* 04. Users / Stakeholders */}
          <section id="stakeholders" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">04 /</span>
              Target Users &amp; Stakeholders
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {project.usersStakeholders.map((user, idx) => (
                <li key={idx} className="surface-card p-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <div className="font-mono text-xs text-[var(--accent-primary)] mb-1.5 tabular-nums">
                    STAKEHOLDER 0{idx + 1}
                  </div>
                  {user}
                </li>
              ))}
            </ul>
          </section>

          {/* 05. Constraints */}
          <section id="constraints" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">05 /</span>
              Engineering Constraints
            </h2>
            <ul className="space-y-3">
              {project.constraints.map((c, idx) => (
                <li key={idx} className="surface-card p-4 flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="font-mono text-xs text-[var(--accent-primary)] mt-0.5 tabular-nums">
                    [C0{idx + 1}]
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 06. Research / Data / Domain Understanding */}
          <section id="research-data" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">06 /</span>
              Research, Data &amp; Domain Understanding
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {project.researchData}
            </p>
          </section>

          {/* 07. Engineering Approach */}
          <section id="approach" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">07 /</span>
              Engineering Approach &amp; Design Rationale
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {project.engineeringApproach}
            </p>
          </section>

          {/* 08. System Architecture */}
          <section id="architecture" className="scroll-mt-24 space-y-6 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">08 /</span>
              System Architecture &amp; Data Flow
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {project.systemArchitecture}
            </p>

            {/* 4-Layer Visual Schematic */}
            <div className="surface-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 hairline-b font-mono text-xs text-[var(--text-muted)]">
                <span className="text-[var(--text-primary)] uppercase">
                  Architectural Layer Decomposition
                </span>
                <span>END-TO-END TOPOLOGY</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.architectureLayers.map((layer, idx) => (
                  <div key={layer.layer} className="p-4 hairline-border bg-[var(--bg-canvas)] space-y-2">
                    <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                      <span className="font-mono text-xs text-[var(--accent-primary)] mr-2 tabular-nums">
                        L0{idx + 1}
                      </span>
                      {layer.layer}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.components.map((comp) => (
                        <span
                          key={comp}
                          className="px-2 py-0.5 font-mono text-[11px] bg-[var(--bg-surface)] hairline-border text-[var(--accent-secondary)]"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {layer.responsibility}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 09. AI / ML / Signal / Forecasting Methodology */}
          <section id="methodology" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">09 /</span>
              AI / ML / Signal &amp; Forecasting Methodology
            </h2>
            <ul className="space-y-3">
              {project.methodology.map((item, idx) => (
                <li key={idx} className="surface-card p-4 flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent-secondary)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 10. Implementation */}
          <section id="implementation" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">10 /</span>
              Implementation Details
            </h2>
            <ul className="space-y-3">
              {project.implementation.map((item, idx) => (
                <li key={idx} className="surface-card p-4 flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="font-mono text-xs text-[var(--accent-primary)] mt-0.5 tabular-nums">
                    10.{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 11. Interface / Hardware / User Experience + Embedded Interactive Simulator */}
          <section id="interactive-lab" className="scroll-mt-24 space-y-6 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">11 /</span>
              Interface Experience &amp; Live Verification Lab
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {project.interfaceExperience}
            </p>

            {/* Render the Project-Specific Interactive Simulator */}
            {project.slug === "cardioxy-pro" && <CardioxyInteractiveLab />}
            {project.slug === "foodresilience" && <FoodResilienceInteractiveLab />}
            {project.slug === "occupational-skills-demand" && <SkillsDemandInteractiveLab />}
          </section>

          {/* 12. Results / Evaluation */}
          <section id="results" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">12 /</span>
              Empirical Results &amp; Evaluation
            </h2>
            <ul className="space-y-3 tabular-nums">
              {project.resultsEvaluation.map((res, idx) => (
                <li key={idx} className="surface-card p-4 flex items-start gap-3 text-sm text-[var(--text-primary)]">
                  <span className="font-mono text-xs text-[var(--accent-secondary)] font-semibold mt-0.5">
                    [R0{idx + 1}]
                  </span>
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 13. Impact */}
          <section id="impact" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">13 /</span>
              Operational &amp; Scientific Impact
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {project.impact}
            </p>
          </section>

          {/* 14. Honest Limitations */}
          <section id="limitations" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">14 /</span>
              Honest Limitations &amp; Engineering Boundaries
            </h2>
            <ul className="space-y-3">
              {project.limitations.map((lim, idx) => (
                <li key={idx} className="surface-card p-4 flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <ShieldAlert className="h-4 w-4 text-[var(--accent-amber)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 15. Lessons Learned */}
          <section id="lessons" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">15 /</span>
              Lessons Learned
            </h2>
            <ul className="space-y-3">
              {project.lessonsLearned.map((les, idx) => (
                <li key={idx} className="surface-card p-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <strong className="font-mono text-xs text-[var(--accent-primary)] mr-2 tabular-nums">
                    L0{idx + 1}:
                  </strong>
                  {les}
                </li>
              ))}
            </ul>
          </section>

          {/* 16. Next Steps */}
          <section id="next-steps" className="scroll-mt-24 space-y-4 pt-10 hairline-t">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--accent-primary)] mr-2.5 tabular-nums">16 /</span>
              Roadmap &amp; Next Engineering Steps
            </h2>
            <ul className="space-y-3">
              {project.nextSteps.map((step, idx) => (
                <li key={idx} className="surface-card p-4 flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="font-mono text-xs text-[var(--accent-primary)] mt-0.5 tabular-nums">
                    → 0{idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Next / Previous Project Cross-Navigation */}
      <nav
        aria-label="Adjacent case studies"
        className="pt-12 hairline-t grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Link
          href={`/work/${prevProject.slug}`}
          className="surface-card p-6 group hover:border-[var(--accent-primary)] transition-colors"
        >
          <div className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
            <ArrowLeft className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
            <span>PREVIOUS FOLIO [{prevProject.index}]</span>
          </div>
          <div className="mt-2 font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
            {prevProject.title}
          </div>
          <div className="mt-1 text-xs text-[var(--text-secondary)]">{prevProject.subtitle}</div>
        </Link>

        <Link
          href={`/work/${nextProject.slug}`}
          className="surface-card p-6 text-left sm:text-right group hover:border-[var(--accent-primary)] transition-colors"
        >
          <div className="font-mono text-xs text-[var(--text-muted)] flex items-center sm:justify-end gap-2">
            <span>NEXT FOLIO [{nextProject.index}]</span>
            <ArrowRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
          </div>
          <div className="mt-2 font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
            {nextProject.title}
          </div>
          <div className="mt-1 text-xs text-[var(--text-secondary)]">{nextProject.subtitle}</div>
        </Link>
      </nav>
    </article>
  );
}
