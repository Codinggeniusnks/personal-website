"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Award, ChevronRight, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillClusters } from "@/data/skills";
import { journeyNodes } from "@/data/journey";
import {
  SpatialAiCanvas,
  type ActiveProjectId,
  type SpatialStage,
} from "@/components/spatial/SpatialAiCanvas";

const CONSTELLATION_NODES: {
  id: ActiveProjectId;
  index: string;
  label: string;
  category: string;
  summary: string;
  tags: string;
  href?: string;
  metricsPreview: string;
  positionClass: string;
}[] = [
  {
    id: "cardioxy-pro",
    index: "01",
    label: "CARDIOXY PRO",
    category: "AI Healthcare + IoT",
    summary:
      "Predictive patient monitoring and intelligent early-warning system for elderly, chronic, and high-risk care.",
    tags: "AI · IoT · ESP32 · ESP-NOW",
    href: "/work/cardioxy-pro",
    metricsPreview:
      "Pre-threshold AI trend warnings · HR > 100 | HR < 60 | SpO₂ < 90% · ISIC-WOU24 Gold & BIICC 2026 Best AI Tech + Gold",
    positionClass: "top-2 left-1/2 -translate-x-1/2",
  },
  {
    id: "foodresilience",
    index: "02",
    label: "FOODRESILIENCE",
    category: "Predictive AI + Sustainability",
    summary:
      "Multi-horizon food demand and purchase-price forecasting with days-of-stock inventory recommendations (DORMATHON 2026).",
    tags: "LightGBM · CatBoost · XGBoost · SDG 12",
    href: "/work/foodresilience",
    metricsPreview:
      "1d, 3d, 7d, 14d, 21d, 30d horizons · Expanding walk-forward validation (2024-Q4 holdout)",
    positionClass: "top-1/2 right-2 -translate-y-1/2",
  },
  {
    id: "occupational-skills-demand",
    index: "03",
    label: "OCCUPATIONAL AI",
    category: "Machine Learning + NLP",
    summary:
      "Calibrated multi-label occupational skill and labour-market demand predictor across MASCO, MyCOL, O*NET, ESCO & ILO.",
    tags: "Dual TF-IDF · OvR LogReg · Platt Calibration",
    href: "/work/occupational-skills-demand",
    metricsPreview:
      "Protocol B: 0.7149 Skills Macro F1 · 0.6824 Micro F1 · 0.7644 Demand F1 · 0.8379 ROC AUC · 0.1668 Brier (Protocol C: 0.6196)",
    positionClass: "top-1/2 left-2 -translate-y-1/2",
  },
  {
    id: "future-research",
    index: "04",
    label: "FUTURE RESEARCH",
    category: "Multimodal & Edge AI Systems",
    summary:
      "Ongoing exploration at Universiti Malaya in calibrated foundation models, sensor-grounded agents, and spatial interfaces.",
    tags: "UM CS (AI) · Applied Research",
    href: "/about",
    metricsPreview:
      "Hybrid sparse-dense retrieval · On-device neural telemetry · High-reliability AI systems",
    positionClass: "bottom-2 left-1/2 -translate-x-1/2",
  },
];

const ORBIT_ACHIEVEMENTS = [
  {
    id: "isic-2024",
    year: "2024",
    title: "ISIC-WOU24 — Gold Award",
    subtitle: "International Science & Innovation Competition + SPM 10A (6A+, 4A)",
    detail:
      "Awarded international Gold for CardiOxy Pro's fault-tolerant patient telemetry architecture, alongside achieving 10A (6A+, 4A) in SPM.",
  },
  {
    id: "kmk-2025",
    year: "2025",
    title: "Matriculation — PNGK 4.00 & MUET Band 4.5",
    subtitle: "Kolej Matrikulasi Kedah (KMK)",
    detail:
      "Graduated with a perfect 4.00 cumulative GPA across computer science, mathematics, and physical sciences, plus MUET Band 4.5.",
  },
  {
    id: "biicc-2026",
    year: "2026",
    title: "Best AI Technology Award + Gold Award",
    subtitle: "Borneo International Innovation & Creativity Competition 2026",
    detail:
      "Dual international honours recognising CardiOxy Pro's pre-threshold predictive physiological trajectory engine and tri-mode hardware resilience.",
  },
  {
    id: "um-2026",
    year: "2026",
    title: "Universiti Malaya — Artificial Intelligence",
    subtitle: "Bachelor of Computer Science (Major in AI)",
    detail:
      "Advancing applied machine learning, walk-forward forecasting (FoodResilience), and calibrated NLP (Occupational Skills & Demand Predictor).",
  },
];

export default function SpatialHomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<SpatialStage>("hero");
  const [ctaHovered, setCtaHovered] = useState(false);
  const [activeProject, setActiveProject] = useState<ActiveProjectId>("cardioxy-pro");
  const [showMetricsDetail, setShowMetricsDetail] = useState(false);
  const [activeClusterId, setActiveClusterId] = useState<string>("ai-ml");
  const [activeAchievementIdx, setActiveAchievementIdx] = useState<number>(2);
  const [activeJourneyIdx, setActiveJourneyIdx] = useState<number>(4);

  const selectedNode =
    CONSTELLATION_NODES.find((n) => n.id === activeProject) ||
    CONSTELLATION_NODES[0];

  const selectedCluster =
    skillClusters.find((c) => c.id === activeClusterId) || skillClusters[0];

  const selectedAchievement = ORBIT_ACHIEVEMENTS[activeAchievementIdx];
  const selectedJourney = journeyNodes[activeJourneyIdx];

  const handleExploreWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setStage("work");
    const target = document.getElementById("selected-work");
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Layer 0: Interactive 3D AI Core Environment */}
      <SpatialAiCanvas
        stage={stage}
        activeProject={activeProject}
        ctaHovered={ctaHovered}
      />

      <div className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10 space-y-28 sm:space-y-36 pb-20">
        {/* 1. SPATIAL HERO (Generous Negative Space + 5–10s Clarity) */}
        <section
          onMouseEnter={() => setStage("hero")}
          className="min-h-[82vh] flex flex-col justify-center py-12"
        >
          <div className="max-w-2xl space-y-6">
            <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-[-0.04em] leading-[0.98] text-[var(--text-primary)]">
              {profile.displayName}
            </h1>

            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.16em] text-[var(--accent-primary)] font-medium">
              AI ENGINEER + CREATIVE TECHNOLOGIST
            </p>

            <p className="text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed max-w-[50ch]">
              I build intelligent systems that turn data into predictions, decisions and real-world impact.
            </p>

            <p className="text-sm text-[var(--text-secondary)] font-mono">
              {profile.fullName} · Computer Science (Artificial Intelligence), {profile.university}
            </p>

            {/* Primary & Secondary Spatial CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#selected-work"
                onClick={handleExploreWorkClick}
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                className="inline-flex min-h-[48px] items-center gap-2.5 px-6 rounded-full bg-[var(--accent-primary)] text-white font-mono text-xs font-medium uppercase tracking-[0.08em] hover:bg-[var(--accent-primary-hover)] transition-all cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#about-window"
                onClick={() => setStage("about")}
                className="inline-flex min-h-[48px] items-center gap-2 px-6 rounded-full glass-panel text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.08em] hover:border-[var(--border-strong)] transition-colors"
              >
                <span>About Me</span>
              </a>
            </div>

            {/* Small Tertiary Links */}
            <div className="flex items-center gap-5 pt-2 font-mono text-xs text-[var(--text-muted)]">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              </a>
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              </a>
              <Link
                href="/resume"
                className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors"
              >
                <span>CV</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* 2. SELECTED WORK — SPATIAL PROJECT CONSTELLATION + SINGLE PREVIEW WINDOW */}
        <section
          id="selected-work"
          onMouseEnter={() => setStage("work")}
          className="scroll-mt-24 space-y-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                Project Constellation
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                Select a node orbiting the AI Core to focus and inspect its system preview.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent-primary)] hover:underline"
            >
              <span>All Projects Matrix</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Columns: Interactive Spatial Constellation Map */}
            <div
              role="tablist"
              aria-label="Project Constellation Nodes"
              className="lg:col-span-7 relative min-h-[340px] sm:min-h-[400px] glass-panel p-6 flex items-center justify-center"
            >
              {/* Subtle Orbital Guide Rings */}
              <svg
                viewBox="0 0 360 360"
                className="w-64 h-64 sm:w-80 sm:h-80 pointer-events-none opacity-45"
                aria-hidden="true"
              >
                <circle
                  cx="180"
                  cy="180"
                  r="128"
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="56"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="1"
                  strokeOpacity="0.45"
                />
                <circle cx="180" cy="180" r="8" fill="var(--accent-primary)" />
              </svg>

              {/* Center AI Core Label */}
              <div className="absolute pointer-events-none text-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-primary)]">
                  ◉ AI CORE
                </div>
              </div>

              {/* 4 Orbiting Project Nodes */}
              {CONSTELLATION_NODES.map((node) => {
                const isSelected = activeProject === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    role="tab"
                    id={`tab-${node.id}`}
                    aria-selected={isSelected}
                    aria-controls="constellation-preview-window"
                    onMouseEnter={() => setActiveProject(node.id)}
                    onClick={() => {
                      setActiveProject(node.id);
                      setShowMetricsDetail(false);
                    }}
                    className={`absolute ${node.positionClass} px-4 py-2.5 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "glass-panel-active border-[var(--accent-primary)] text-[var(--text-primary)] scale-105"
                        : "glass-panel text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isSelected ? "bg-[var(--accent-primary)]" : "bg-[var(--text-muted)]"
                      }`}
                    />
                    <span className="font-semibold">{node.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right 5 Columns: Single Floating Glass Project Preview Window (Section 14) */}
            <div className="lg:col-span-5" id="constellation-preview-window" role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNode.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="glass-panel-active p-7 sm:p-8 space-y-6"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-[var(--accent-primary)] tabular-nums">
                    <span>{selectedNode.index}</span>
                    <span>{selectedNode.category}</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
                      {selectedNode.label}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {selectedNode.summary}
                    </p>
                  </div>

                  <div className="font-mono text-xs text-[var(--text-muted)]">
                    {selectedNode.tags}
                  </div>

                  {/* Progressive Disclosure Metric Toggle */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowMetricsDetail((prev) => !prev)}
                      aria-expanded={showMetricsDetail}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-secondary)] hover:underline cursor-pointer"
                    >
                      <span>
                        {showMetricsDetail ? "Hide Key Evidence" : "Reveal Key Evidence"}
                      </span>
                      <ChevronRight
                        className={`h-3.5 w-3.5 transition-transform ${
                          showMetricsDetail ? "rotate-90" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {showMetricsDetail && (
                      <p className="mt-2.5 p-3.5 rounded-xl hairline-border bg-[var(--bg-canvas)] font-mono text-xs text-[var(--text-secondary)] leading-relaxed tabular-nums">
                        {selectedNode.metricsPreview}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <Link
                      href={selectedNode.href || "/work"}
                      className="inline-flex min-h-[46px] items-center gap-2.5 px-6 rounded-full bg-[var(--accent-primary)] text-white font-mono text-xs font-medium uppercase tracking-[0.08em] hover:bg-[var(--accent-primary-hover)] transition-colors"
                    >
                      <span>Explore Project</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 3. ABOUT ME — CONCISE FLOATING GLASS WINDOW (Section 23) */}
        <section
          id="about-window"
          onMouseEnter={() => setStage("about")}
          className="scroll-mt-24 max-w-3xl mx-auto"
        >
          <div className="glass-panel p-8 sm:p-10 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              About Kai Sheng
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              I am a Computer Science student at <strong className="text-[var(--text-primary)] font-semibold">Universiti Malaya</strong> majoring in <strong className="text-[var(--text-primary)] font-semibold">Artificial Intelligence</strong>. My work focuses on building intelligent systems that connect machine learning, data, software and real-world applications.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "AI engineering",
                "machine learning",
                "predictive modelling",
                "NLP",
                "IoT",
                "data systems",
                "creative technology",
              ].map((interest) => (
                <span
                  key={interest}
                  className="px-3.5 py-1.5 rounded-full hairline-border bg-[var(--bg-canvas)] font-mono text-xs text-[var(--text-secondary)]"
                >
                  {interest}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent-primary)] hover:underline"
              >
                <span>Expand Engineering Philosophy</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. TECHNICAL CAPABILITIES — EVIDENCE-CONNECTED CLUSTERS (Section 26) */}
        <section
          onMouseEnter={() => setStage("capabilities")}
          className="space-y-8"
        >
          <div className="max-w-xl space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              Capability Clusters
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Every capability connects directly to the system where it was engineered and validated.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 4 Cluster Selector Pills */}
            <div className="lg:col-span-4 flex flex-col gap-2.5">
              {skillClusters.map((cluster) => {
                const active = cluster.id === activeClusterId;
                return (
                  <button
                    key={cluster.id}
                    type="button"
                    onClick={() => setActiveClusterId(cluster.id)}
                    className={`p-4 text-left transition-all cursor-pointer ${
                      active
                        ? "glass-panel-active border-[var(--accent-primary)]"
                        : "glass-panel opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {cluster.label}
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--text-secondary)]">
                      {cluster.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Cluster Detail Window */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCluster.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="glass-panel-active p-6 sm:p-8 space-y-4"
                >
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)] pb-3 hairline-b">
                    {selectedCluster.label} — {selectedCluster.subtitle}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {selectedCluster.skills.map((sk) => (
                      <Link
                        key={sk.name}
                        href={`/work/${sk.projectSlug}`}
                        className="p-4 rounded-xl hairline-border bg-[var(--bg-canvas)] hover:border-[var(--accent-primary)] transition-colors space-y-1.5 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                            {sk.name}
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]" />
                        </div>
                        <div className="font-mono text-[11px] text-[var(--accent-secondary)]">
                          Used in: {sk.usedIn}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                          {sk.detail}
                        </p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 5. ACHIEVEMENTS ORBIT TIMELINE (Sections 24 & 25) */}
        <section
          onMouseEnter={() => setStage("achievements")}
          className="space-y-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                Achievements &amp; Credentials Orbit
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                Select a year node to inspect international competition awards and academic benchmarks.
              </p>
            </div>
            <Link
              href="/achievements"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent-primary)] hover:underline"
            >
              <span>Full Credentials Ledger</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2.5">
              {ORBIT_ACHIEVEMENTS.map((ach, idx) => {
                const active = idx === activeAchievementIdx;
                return (
                  <button
                    key={ach.id}
                    type="button"
                    onClick={() => setActiveAchievementIdx(idx)}
                    className={`p-4 text-left transition-colors cursor-pointer flex items-center justify-between ${
                      active
                        ? "glass-panel-active border-[var(--accent-amber)]"
                        : "glass-panel opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div>
                      <div className="font-mono text-xs text-[var(--accent-amber)] tabular-nums">
                        {ach.year}
                      </div>
                      <div className="mt-0.5 font-display text-sm font-bold text-[var(--text-primary)]">
                        {ach.title}
                      </div>
                    </div>
                    <Award className="h-4 w-4 text-[var(--accent-amber)] shrink-0 hidden sm:block" />
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedAchievement.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="glass-panel-active p-7 sm:p-9 space-y-4"
                >
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                    {selectedAchievement.title}
                  </h3>
                  <div className="font-mono text-xs text-[var(--accent-amber)] tabular-nums">
                    {selectedAchievement.year} · {selectedAchievement.subtitle}
                  </div>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {selectedAchievement.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 6. JOURNEY — LIGHTWEIGHT INTERACTIVE PROGRESSION (Section 27) */}
        <section
          id="journey"
          onMouseEnter={() => setStage("journey")}
          className="scroll-mt-24 space-y-8"
        >
          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              Engineering Journey
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Progression from foundational mathematics and sciences to Artificial Intelligence at Universiti Malaya.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {journeyNodes.map((node, idx) => {
              const active = idx === activeJourneyIdx;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveJourneyIdx(idx)}
                  className={`p-4 text-left transition-colors cursor-pointer ${
                    active
                      ? "glass-panel-active border-[var(--accent-primary)]"
                      : "glass-panel opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="font-mono text-[11px] text-[var(--accent-primary)] tabular-nums">
                    {node.step} · {node.year}
                  </div>
                  <div className="mt-1 font-display text-sm font-bold text-[var(--text-primary)] line-clamp-1">
                    {node.title}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedJourney.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                  {selectedJourney.title} — {selectedJourney.subtitle}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {selectedJourney.detail}
                </p>
              </div>
              <div className="px-4 py-2 rounded-full bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)] font-mono text-xs font-semibold shrink-0 tabular-nums">
                {selectedJourney.metric}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
