"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Code2,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  Trophy,
} from "lucide-react";
import {
  SpatialAiCanvas,
  type ActiveProjectId,
  type SpatialStage,
} from "@/components/spatial/SpatialAiCanvas";
import { MagneticButton } from "@/components/spatial/InteractivePrimitives";
import { SelectedRecognitionSection } from "@/components/achievements/SelectedRecognitionSection";

interface EmployerProjectSummary {
  id: ActiveProjectId;
  code: string;
  title: string;
  category: string;
  subtitle: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  features: string[];
  outcome: string;
  metrics: { label: string; value: string }[];
  href: string;
}

const EMPLOYER_PROJECTS: EmployerProjectSummary[] = [
  {
    id: "cardioxy-pro",
    code: "01",
    title: "CARDIOXY PRO",
    category: "AI Healthcare & IoT Monitoring",
    subtitle: "AI + IoT Healthcare Monitoring & Early-Warning System",
    summary:
      "Dual-tier physiological telemetry system combining predictive trend detection, deterministic emergency thresholds, and ESP-NOW offline resilience for high-risk patients.",
    problem:
      "Conventional pulse oximeters only react after a patient crosses a crisis threshold and fail silently when residential Wi-Fi drops.",
    solution:
      "Built a tri-mode (Manual, Online, Offline) hardware-software vital monitor that separates AI pre-threshold trajectory warnings from hard emergency cutoffs (HR > 100, HR < 60, SpO₂ < 90%).",
    architecture: "Patient → Sensor (MAX30102) → AI Edge (ESP32) → Cloud / ESP-NOW → Doctor Dashboard → Telegram & Phone Call Alert",
    technologies: [
      "ESP32",
      "Arduino UNO",
      "Wemos D1 R1",
      "MAX30102 / MAX30105",
      "OLED Display",
      "ESP-NOW",
      "SD Card + DS1302 RTC",
      "Google Sheets",
      "Telegram Bot",
    ],
    features: [
      "Manual, Online, and Offline operational modes",
      "Predictive AI early warning before threshold breach",
      "Hard threshold emergency alerts (HR > 100, HR < 60, SpO₂ < 90%)",
      "Live web dashboard + Telegram alert + automated phone call",
    ],
    outcome:
      "2× International Gold & Best AI Technology Award (BIICC 2026 Best AI Tech + Gold, ISIC-WOU24 Gold) with 100% offline packet continuity.",
    metrics: [
      { label: "Safety Cutoffs", value: "HR 60–100 · SpO₂ ≥90%" },
      { label: "Operation Modes", value: "Manual · Online · Offline" },
      { label: "Recognition", value: "2× Gold + Best AI Award" },
    ],
    href: "/work/cardioxy-pro",
  },
  {
    id: "foodresilience",
    code: "02",
    title: "FOODRESILIENCE",
    category: "Predictive Retail & Inventory AI",
    subtitle: "Predictive Demand, Price & Inventory Decision System",
    summary:
      "Multi-horizon forecasting and inventory decision engine developed for DORMATHON 2026 (UN SDG 12) to optimise perishable stock coverage and reduce food waste.",
    problem:
      "Food retailers face simultaneous demand and supplier price volatility; static reorder rules cause either perishable spoilage or stockouts.",
    solution:
      "Engineered a dual-stream gradient-boosted forecasting pipeline across 1, 3, 7, 14, 21, and 30-day horizons evaluated under strict Walk-Forward Validation (2024-10-01 to 2024-12-31 holdout).",
    architecture: "DATA (POS + PriceCatcher + CPI) → FORECAST (1–30d GBDT) → PRICE → INVENTORY (Days-of-Stock) → DECISION",
    technologies: [
      "LightGBM",
      "CatBoost",
      "XGBoost",
      "Walk-Forward Validation",
      "Python / Pandas",
      "DOSM PriceCatcher",
      "CPI & Weather Signals",
    ],
    features: [
      "6 explicit forecasting horizons (1, 3, 7, 14, 21, 30 days)",
      "Leakage-free Walk-Forward holdout (2024-10-01 to 2024-12-31)",
      "Shelf-life-bounded Days-of-Stock recommendations",
      "Honest epistemic confidence disclosure on external datasets",
    ],
    outcome:
      "Delivered auditable multi-horizon demand and purchase-price decision support aligned with UN SDG 12 (Responsible Consumption & Production).",
    metrics: [
      { label: "Horizons", value: "1 · 3 · 7 · 14 · 21 · 30d" },
      { label: "Holdout Split", value: "2024-Q4 Walk-Forward" },
      { label: "Models", value: "LightGBM · CatBoost · XGB" },
    ],
    href: "/work/foodresilience",
  },
  {
    id: "occupational-skills-demand",
    code: "03",
    title: "OCCUPATIONAL SKILLS & DEMAND PREDICTOR",
    category: "NLP & Labour Intelligence",
    subtitle: "Calibrated Multi-Label NLP & Labour-Market Demand Classifier",
    summary:
      "Applied NLP system mapping unstructured occupation descriptions to canonical skills and labour demand tiers across Malaysian and international taxonomies.",
    problem:
      "Unstructured job descriptions and national taxonomies (MASCO, O*NET, ESCO) suffer from uncalibrated probabilities and synthetic training illusions.",
    solution:
      "Combined Word 1–3 gram + Character 3–5 gram TF-IDF with 3× GOLD-weighted One-vs-Rest Logistic Regression (C = 2.2) and Platt calibration (threshold = 0.42).",
    architecture: "Occupation Text → Dual Word/Char TF-IDF → 3× GOLD OvR Logistic Regression → Platt Calibration → Skills & Demand Output",
    technologies: [
      "Word 1–3 Gram TF-IDF",
      "Char 3–5 Gram TF-IDF",
      "OvR Logistic Regression",
      "Platt Calibration",
      "Scikit-Learn",
      "MASCO 2020 & MyCOL",
      "O*NET / ESCO / ILO",
      "OpenDOSM",
    ],
    features: [
      "Protocol B Skills Macro F1 = 0.7149, Micro F1 = 0.6824",
      "Demand Macro F1 = 0.7644, ROC AUC = 0.8379, Brier = 0.1668",
      "Protocol C strict holdout audit (Macro F1 = 0.6196, Micro F1 = 0.6712)",
      "Synthetic data ablation (0% = 0.1678 → 100% = 0.6612 → 3× GOLD = 0.7149)",
    ],
    outcome:
      "Established a fast, explainable, and calibrated multi-label NLP benchmark with full transparency across Protocol B, Protocol C, and synthetic ablation.",
    metrics: [
      { label: "Skills Macro F1", value: "0.7149 (Protocol B)" },
      { label: "Demand F1 / AUC", value: "0.7644 · 0.8379 AUC" },
      { label: "Calibration", value: "0.1668 Brier (Platt)" },
    ],
    href: "/work/occupational-skills-demand",
  },
];

const WHAT_I_BUILD = [
  {
    capability: "AI Systems",
    description: "End-to-end intelligent systems combining predictive models, edge hardware, and human-in-the-loop alerting.",
    projectProof: "CardiOxy Pro & FoodResilience",
    href: "/work/cardioxy-pro",
  },
  {
    capability: "Machine Learning",
    description: "Rigorous supervised pipelines with walk-forward validation, holdout auditing, and probability calibration.",
    projectProof: "FoodResilience & Occupational AI",
    href: "/work/occupational-skills-demand",
  },
  {
    capability: "Predictive Modelling",
    description: "Multi-horizon time-series forecasting (1–30 days) and pre-threshold physiological trajectory detection.",
    projectProof: "FoodResilience & CardiOxy Pro",
    href: "/work/foodresilience",
  },
  {
    capability: "Natural Language Processing (NLP)",
    description: "Dual word/character TF-IDF feature unions, multi-label skill extraction, and Platt-calibrated classification.",
    projectProof: "Occupational Skills & Demand Predictor",
    href: "/work/occupational-skills-demand",
  },
  {
    capability: "IoT & Embedded Telemetry",
    description: "Multi-MCU sensor fusion (ESP32, Arduino, Wemos, MAX30102) with connectionless ESP-NOW offline failover.",
    projectProof: "CardiOxy Pro",
    href: "/work/cardioxy-pro",
  },
  {
    capability: "Data Engineering",
    description: "Point-in-time feature pipelines harmonizing retail POS, DOSM PriceCatcher, CPI, MASCO 2020, and O*NET.",
    projectProof: "FoodResilience & Occupational AI",
    href: "/work/foodresilience",
  },
  {
    capability: "Cloud & Resilient Deployment",
    description: "Real-time cloud synchronization, Telegram Bot dispatch, automated voice escalation, and RTC SD logging.",
    projectProof: "CardiOxy Pro",
    href: "/work/cardioxy-pro",
  },
  {
    capability: "Interactive Web Applications",
    description: "Spatial 3D interfaces, decision-support simulators, and accessible technical dashboards in React & Next.js.",
    projectProof: "Spatial AI Portfolio & Dashboards",
    href: "/work",
  },
];

const TECHNICAL_STACK_GROUPS = [
  {
    category: "AI / ML",
    items: [
      "Python",
      "Scikit-Learn",
      "LightGBM",
      "CatBoost",
      "XGBoost",
      "Time-Series Forecasting",
      "Walk-Forward Validation",
      "Platt Probability Calibration",
    ],
  },
  {
    category: "NLP",
    items: [
      "TF-IDF (Word 1–3 & Char 3–5 Gram)",
      "Multi-Label Classification",
      "One-vs-Rest Logistic Regression",
      "Text Feature Engineering",
      "Threshold & Brier Optimization",
    ],
  },
  {
    category: "IoT",
    items: [
      "ESP32",
      "Arduino UNO",
      "Wemos D1 R1",
      "MAX30102 / MAX30105 PPG",
      "ESP-NOW Local Mesh",
      "SSD1306 OLED & DS1302 RTC",
    ],
  },
  {
    category: "WEB",
    items: [
      "React 19",
      "Next.js 15",
      "TypeScript",
      "Three.js / WebGL",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    category: "DATA",
    items: [
      "Pandas",
      "NumPy",
      "Data Pipelines",
      "Feature Engineering",
      "MASCO / O*NET / ESCO",
      "DOSM PriceCatcher & OpenDOSM",
    ],
  },
];

export default function EmployerSpatialHomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<SpatialStage>("hero");
  const [activeProject, setActiveProject] = useState<ActiveProjectId>("cardioxy-pro");
  const [ctaHovered, setCtaHovered] = useState(false);

  const selectedProject =
    EMPLOYER_PROJECTS.find((p) => p.id === activeProject) ?? EMPLOYER_PROJECTS[0];

  return (
    <div className="relative min-h-screen selection:bg-[var(--accent-primary)] selection:text-[#06090F]">
      {/* Layer 0: Persistent Interactive 3D AI Core & Orbiting Project Satellites */}
      <SpatialAiCanvas
        stage={stage}
        activeProject={activeProject}
        ctaHovered={ctaHovered}
      />

      {/* Layer 1: Directly Readable Employer-Focused Spatial Content */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        {/* =================================================================
            SECTION 1 — HERO (5-Second Employer Clarity + Interactive 3D Core)
            ================================================================= */}
        <section
          id="hero"
          onMouseEnter={() => setStage("hero")}
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-10 lg:py-16"
        >
          {/* Top Employer Identity Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span className="font-mono text-xs tracking-[0.08em] uppercase text-[var(--text-primary)]">
                UNIVERSITI MALAYA · COMPUTER SCIENCE (AI MAJOR)
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
              <a
                href="https://github.com/kaisheng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel hover:text-[var(--accent-primary)] transition-colors"
              >
                <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ng-kai-sheng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel hover:text-[var(--accent-primary)] transition-colors"
              >
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Main Hero Typography & Magnetic CTAs */}
          <div className="my-auto py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.25rem] font-bold tracking-[-0.04em] leading-[0.96] text-[var(--text-primary)]">
                  KAI SHENG
                </h1>
                <p className="font-mono text-sm sm:text-base lg:text-lg uppercase tracking-[0.14em] text-[var(--accent-primary)] font-semibold">
                  AI ENGINEER &amp; CREATIVE TECHNOLOGIST
                </p>
              </div>

              <p className="text-base sm:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                I build intelligent systems that turn data into predictions, decisions and
                real-world impact.
              </p>

              {/* Primary & Secondary Magnetic CTAs (Section 8 & 11) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <MagneticButton
                  href="#featured-projects"
                  variant="primary"
                  onMouseEnter={() => setCtaHovered(true)}
                  onMouseLeave={() => setCtaHovered(false)}
                >
                  <span>VIEW MY WORK</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </MagneticButton>

                <MagneticButton href="#about" variant="glass">
                  <span>ABOUT ME</span>
                </MagneticButton>

                <MagneticButton
                  href="https://github.com/kaisheng"
                  external
                  variant="outline"
                >
                  <Code2 className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                  <span>GitHub</span>
                </MagneticButton>

                <MagneticButton
                  href="https://www.linkedin.com/in/ng-kai-sheng"
                  external
                  variant="outline"
                >
                  <Globe className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                  <span>LinkedIn</span>
                </MagneticButton>
              </div>

              {/* 5-Second Employer Proof Strip */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                <div className="glass-panel p-3.5 space-y-1">
                  <div className="font-mono text-[11px] uppercase text-[var(--accent-primary)]">
                    01 · HEALTHCARE AI + IOT
                  </div>
                  <div className="text-xs font-medium text-[var(--text-primary)]">
                    CardiOxy Pro (2× Int&apos;l Gold)
                  </div>
                </div>
                <div className="glass-panel p-3.5 space-y-1">
                  <div className="font-mono text-[11px] uppercase text-[var(--accent-primary)]">
                    02 · FORECASTING ENGINE
                  </div>
                  <div className="text-xs font-medium text-[var(--text-primary)]">
                    FoodResilience (1–30d GBDT)
                  </div>
                </div>
                <div className="glass-panel p-3.5 space-y-1">
                  <div className="font-mono text-[11px] uppercase text-[var(--accent-primary)]">
                    03 · CALIBRATED NLP
                  </div>
                  <div className="text-xs font-medium text-[var(--text-primary)]">
                    Occupational AI (0.7149 F1)
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D AI Core Control Window */}
            <div className="lg:col-span-5 lg:justify-self-end w-full max-w-md">
              <div className="glass-workspace p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-2 pb-3 hairline-b">
                  <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent-primary)]">
                    3D AI CORE · INTERACTIVE TELEMETRY
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    CURSOR &amp; NODE REACTIVE
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Select any project satellite below or move your cursor to orient the 3D AI Core
                  and inspect live system telemetry:
                </p>

                <div className="space-y-2" role="tablist" aria-label="3D AI Core Project Nodes">
                  {EMPLOYER_PROJECTS.map((proj) => {
                    const isSelected = proj.id === activeProject;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onMouseEnter={() => setActiveProject(proj.id)}
                        onClick={() => setActiveProject(proj.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? "bg-[var(--accent-cyan-soft)] border border-[var(--accent-primary)] text-[var(--text-primary)]"
                            : "glass-panel text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                            {proj.code}
                          </span>
                          <span className="font-display text-sm font-bold truncate">
                            {proj.title}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[var(--text-muted)] shrink-0">
                          {proj.category.split("&")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                  <span className="font-mono text-[11px] text-[var(--text-muted)] truncate">
                    ACTIVE: {selectedProject.title}
                  </span>
                  <Link
                    href={selectedProject.href}
                    data-cursor="view"
                    className="font-mono text-xs text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Explore Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 2 — FEATURED PROJECTS (3D Object Selector + Readable Cards)
            ================================================================= */}
        <section
          id="featured-projects"
          onMouseEnter={() => setStage("work")}
          className="py-16 lg:py-24 space-y-10 scroll-mt-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 hairline-b">
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                FEATURED PROJECTS
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
                Three flagship engineering systems across Healthcare IoT, Multi-Horizon Predictive
                Forecasting, and Calibrated NLP. Hover or select any node to synchronise the 3D AI
                Core, or scan the full engineering summary directly below.
              </p>
            </div>
            <MagneticButton href="/work" variant="glass">
              <span>VIEW ALL CASE STUDIES</span>
              <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
            </MagneticButton>
          </div>

          {/* Interactive 3D Core Synchronised Preview Window (Section 16) */}
          <div className="glass-workspace p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 hairline-b">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Featured project selector">
                {EMPLOYER_PROJECTS.map((proj) => {
                  const active = proj.id === activeProject;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onMouseEnter={() => setActiveProject(proj.id)}
                      onClick={() => setActiveProject(proj.id)}
                      className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-[0.06em] transition-all cursor-pointer ${
                        active
                          ? "bg-[var(--accent-primary)] text-[#06090F] font-semibold"
                          : "glass-panel text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {proj.code} — {proj.title}
                    </button>
                  );
                })}
              </div>
              <span className="font-mono text-xs text-[var(--accent-primary)]">
                3D SATELLITE LOCKED: {selectedProject.code}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[var(--accent-cyan-soft)] text-[var(--accent-primary)] font-mono text-xs">
                      {selectedProject.code} · {selectedProject.category}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                    {selectedProject.title} — {selectedProject.subtitle}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {selectedProject.summary}
                  </p>
                  <div className="p-4 rounded-xl bg-[var(--bg-canvas)] hairline-border space-y-1.5">
                    <div className="font-mono text-[11px] uppercase text-[var(--accent-primary)]">
                      SYSTEM ARCHITECTURE PIPELINE
                    </div>
                    <p className="font-mono text-xs text-[var(--text-primary)] leading-relaxed">
                      {selectedProject.architecture}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 tabular-nums">
                    {selectedProject.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-3.5 rounded-xl bg-[var(--bg-canvas)] hairline-border flex items-center justify-between gap-3"
                      >
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          {m.label}
                        </span>
                        <span className="font-display text-sm font-bold text-[var(--accent-primary)]">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <MagneticButton
                    href={selectedProject.href}
                    cursorType="view"
                    variant="primary"
                    className="w-full"
                  >
                    <span>Explore Project →</span>
                  </MagneticButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Directly Readable Employer-Facing Project Cards (Section 2 & 17: Text First, Effects Second) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {EMPLOYER_PROJECTS.map((proj) => (
              <article
                key={proj.id}
                onMouseEnter={() => setActiveProject(proj.id)}
                className="glass-workspace p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[var(--accent-primary)] transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 pb-3 hairline-b">
                    <span className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                      {proj.code} — {proj.category.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {proj.summary}
                  </p>

                  <div className="space-y-2.5 pt-1 text-xs">
                    <div className="p-3 rounded-xl bg-[var(--bg-canvas)] hairline-border">
                      <strong className="font-mono text-[11px] uppercase text-[var(--accent-primary)] block mb-1">
                        PROBLEM
                      </strong>
                      <span className="text-[var(--text-secondary)] leading-relaxed">
                        {proj.problem}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[var(--bg-canvas)] hairline-border">
                      <strong className="font-mono text-[11px] uppercase text-[var(--accent-primary)] block mb-1">
                        SOLUTION &amp; OUTCOME
                      </strong>
                      <span className="text-[var(--text-secondary)] leading-relaxed">
                        {proj.solution} {proj.outcome}
                      </span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[11px] uppercase text-[var(--text-muted)]">
                      IMPORTANT FEATURES
                    </div>
                    <ul className="space-y-1 text-xs text-[var(--text-secondary)]">
                      {proj.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <span className="text-[var(--accent-primary)] font-mono">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[var(--bg-canvas)] hairline-border font-mono text-[11px] text-[var(--text-primary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 hairline-t">
                  <MagneticButton
                    href={proj.href}
                    cursorType="view"
                    variant="glass"
                    className="w-full"
                  >
                    <span>Explore Project →</span>
                  </MagneticButton>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================================
            SECTION 3 — WHAT I BUILD (Employer Capability-to-Project Matrix)
            ================================================================= */}
        <section
          id="what-i-build"
          onMouseEnter={() => setStage("build")}
          className="py-16 lg:py-24 space-y-8 scroll-mt-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 hairline-b">
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                WHAT I BUILD
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
                Employer-verifiable engineering capabilities backed directly by completed AI,
                forecasting, NLP, and IoT systems — never arbitrary skill percentages.
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--accent-primary)]">
              8 CORE ENGINEERING CAPABILITIES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHAT_I_BUILD.map((item, idx) => (
              <Link
                key={item.capability}
                href={item.href}
                data-cursor="view"
                className="glass-workspace p-5 flex flex-col justify-between space-y-4 group hover:border-[var(--accent-primary)] transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-xs text-[var(--accent-primary)]">
                    <span>0{idx + 1}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {item.capability}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 hairline-t font-mono text-[11px] text-[var(--text-muted)]">
                  PROOF: <span className="text-[var(--text-primary)]">{item.projectProof}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =================================================================
            SECTION 4 — SELECTED RECOGNITION (Sections 26, 27, 28, 36)
            ================================================================= */}
        <div onMouseEnter={() => setStage("recognition")}>
          <SelectedRecognitionSection />
        </div>

        {/* =================================================================
            SECTION 5 — TECHNICAL CAPABILITIES / STACK (Section 21)
            ================================================================= */}
        <section
          id="technical-stack"
          onMouseEnter={() => setStage("stack")}
          className="py-12 lg:py-20 space-y-8 scroll-mt-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 hairline-b">
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                TECHNICAL STACK
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
                Clean, recruiter-scannable overview of the languages, machine learning libraries,
                embedded hardware, and web technologies I use to ship systems.
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--accent-primary)]">
              AI / ML · NLP · IOT · WEB · DATA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {TECHNICAL_STACK_GROUPS.map((group) => (
              <div key={group.category} className="glass-workspace p-5 space-y-4">
                <div className="flex items-center justify-between pb-2.5 hairline-b">
                  <h3 className="font-display text-base font-bold text-[var(--accent-primary)]">
                    {group.category}
                  </h3>
                  <Layers className="h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
                </div>
                <ul className="space-y-2">
                  {group.items.map((tech) => (
                    <li
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-canvas)] hairline-border font-mono text-xs text-[var(--text-primary)]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================
            SECTION 5 & 6 — ABOUT ME + EDUCATION / JOURNEY + MODULAR SLOTS
            ================================================================= */}
        <section
          id="about"
          onMouseEnter={() => setStage("about")}
          className="py-16 lg:py-24 space-y-8 scroll-mt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Section 22: ABOUT ME (Concise 3-Sentence Employer Summary) */}
            <div className="lg:col-span-6 glass-workspace p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 hairline-b">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                    ABOUT ME
                  </h2>
                  <span className="font-mono text-xs text-[var(--accent-primary)]">
                    PROFILE SUMMARY
                  </span>
                </div>

                <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed">
                  I am a Computer Science student at Universiti Malaya majoring in Artificial
                  Intelligence. I focus on building practical AI systems that combine machine
                  learning, data engineering and real-world deployment. My projects span healthcare
                  monitoring, predictive analytics and labour intelligence.
                </p>
              </div>

              <div className="pt-4 hairline-t flex flex-wrap items-center gap-3">
                <MagneticButton href="/about" variant="glass">
                  <span>READ FULL PROFILE &amp; PHILOSOPHY</span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                </MagneticButton>
                <MagneticButton href="#contact-footer" variant="outline">
                  <span>CONTACT ME</span>
                </MagneticButton>
              </div>
            </div>

            {/* Section 23: EDUCATION / JOURNEY */}
            <div
              id="journey"
              className="lg:col-span-6 glass-workspace p-6 sm:p-8 space-y-5 scroll-mt-20"
            >
              <div className="flex items-center justify-between pb-3 hairline-b">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  EDUCATION &amp; JOURNEY
                </h2>
                <GraduationCap className="h-5 w-5 text-[var(--accent-primary)]" aria-hidden="true" />
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[var(--bg-canvas)] hairline-border space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)]">
                      UNIVERSITI MALAYA
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-cyan-soft)] text-[var(--accent-primary)] font-mono text-xs">
                      Current
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                    Bachelor of Computer Science — Major in Artificial Intelligence
                  </p>
                </div>

                <div className="flex justify-center font-mono text-sm text-[var(--accent-primary)]">
                  ↓
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-canvas)] hairline-border space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)]">
                      KOLEJ MATRIKULASI KEDAH
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-amber-soft)] text-[var(--accent-amber)] font-mono text-xs tabular-nums">
                      PNGK 4.00
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                    Science Computer Stream — Perfect 4.00 Cumulative GPA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sections 24 & 25: Modular Placeholder Slots for Achievements & Printable CV */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-workspace p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    ACHIEVEMENTS
                  </h3>
                  <Trophy className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                </div>
                <p className="font-mono text-xs text-[var(--accent-primary)]">
                  [ Achievement item placeholder ]
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Selected competitions, awards, and technical recognitions. Modular schema ready
                  for title, competition, award, year, organisation, image, description, and
                  verification link.
                </p>
              </div>
              <div>
                <MagneticButton href="/achievements" variant="glass">
                  <span>OPEN ACHIEVEMENTS PLACEHOLDER</span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                </MagneticButton>
              </div>
            </div>

            <div className="glass-workspace p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    PRINTABLE CV
                  </h3>
                  <FileText className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                </div>
                <p className="font-mono text-xs text-[var(--accent-primary)]">
                  My professional CV will be available here.
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Clean A4 print-friendly layout (`@page &#123; size: A4 &#125;`), PDF download
                  slot, and ATS-friendly modular structure with zero 3D effects when printing.
                </p>
              </div>
              <div>
                <MagneticButton href="/resume" variant="glass">
                  <span>OPEN PRINTABLE CV PLACEHOLDER</span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
