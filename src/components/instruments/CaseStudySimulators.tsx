"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Activity, Cpu, TrendingUp, ChevronRight } from "lucide-react";

const CARDIOXY_NODES = [
  {
    id: "AI",
    label: "AI PREDICTION",
    angle: -90,
    summary: "Detects worsening physiological trends before emergency thresholds are crossed.",
    modelLogic:
      "Evaluates continuous rate-of-change derivatives (dHR/dt and dSpO₂/dt) across a sliding telemetry window on the ESP32. Dispatches pre-threshold warnings before hard clinical cutoffs (HR > 100 bpm, HR < 60 bpm, SpO₂ < 90%) are breached.",
    hardware: "ESP32 Edge Inference + Sliding Window Derivative Engine",
  },
  {
    id: "SENSOR",
    label: "SENSOR",
    angle: -30,
    summary: "Optical photoplethysmography (PPG) acquisition with local OLED readout.",
    modelLogic:
      "Samples dual-wavelength Red/IR absorption via MAX30102/MAX30105 over I²C with motion-artifact filtering and instant SSD1306 OLED patient display.",
    hardware: "MAX30102 / MAX30105 + SSD1306 OLED + ESP32",
  },
  {
    id: "CLOUD",
    label: "CLOUD",
    angle: 30,
    summary: "Real-time clinical synchronisation to cloud spreadsheets and historical records.",
    modelLogic:
      "In Online Mode, physiological packets stream over HTTPS to Google Sheets for longitudinal patient tracking and clinician audit trails.",
    hardware: "ESP32 Wi-Fi + Google Sheets Webhook Sync",
  },
  {
    id: "DOCTOR",
    label: "DOCTOR",
    angle: 90,
    summary: "Live remote monitoring dashboard for clinicians and family caregivers.",
    modelLogic:
      "Surfaces both real-time HR/SpO₂ waveforms and the active operating mode (Manual, Online, or Offline ESP-NOW failover) with zero ambiguity.",
    hardware: "Live Telemetry Dashboard + Historical Ledger",
  },
  {
    id: "ALERT",
    label: "EMERGENCY ALERT",
    angle: 150,
    summary: "Multi-channel escalation via Telegram messages and automated phone calls.",
    modelLogic:
      "When HR > 100 bpm, HR < 60 bpm, or SpO₂ < 90% occurs, triggers local acoustic alarm, instant Telegram bot dispatch, and automated voice telephony.",
    hardware: "Telegram Bot API + Automated Phone Call Trigger",
  },
  {
    id: "OFFLINE",
    label: "OFFLINE BACKUP",
    angle: 210,
    summary: "Zero-router ESP-NOW peer relay and hardware-timestamped SD persistence.",
    modelLogic:
      "When Wi-Fi drops, telemetry automatically fails over to ESP-NOW 2.4GHz peer frames → Wemos D1 R1 → Arduino UNO + DS1302 RTC + MicroSD card.",
    hardware: "ESP-NOW + Wemos D1 R1 + Arduino UNO + DS1302 RTC + SD",
  },
] as const;

export function CardioxyInteractiveLab() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedNodeId, setSelectedNodeId] = useState<string>("AI");
  const [showLogic, setShowLogic] = useState<boolean>(false);
  const [mode, setMode] = useState<"ONLINE" | "OFFLINE" | "MANUAL">("ONLINE");

  const activeNode =
    CARDIOXY_NODES.find((n) => n.id === selectedNodeId) || CARDIOXY_NODES[0];

  return (
    <div className="glass-workspace p-6 sm:p-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 hairline-b">
        <div className="flex items-center gap-2.5">
          <Activity className="h-5 w-5 text-[var(--accent-primary)]" aria-hidden="true" />
          <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            CardiOxy Pro — Spatial Architecture Constellation
          </h3>
        </div>
        <div className="flex items-center gap-1.5" role="group" aria-label="Operating Mode">
          {(
            [
              { id: "ONLINE", label: "Online (Wi-Fi)" },
              { id: "OFFLINE", label: "Offline (ESP-NOW)" },
              { id: "MANUAL", label: "Manual Mode" },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-colors cursor-pointer ${
                mode === m.id
                  ? "bg-[var(--accent-primary)] text-white"
                  : "hairline-border text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spatial Constellation + Single Progressive Glass Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 7 Columns: Interactive Spatial Device & 6 Orbiting Nodes */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[340px] sm:min-h-[380px] glass-panel p-6">
          <svg
            viewBox="0 0 400 320"
            className="w-full max-w-[440px] h-auto overflow-visible"
            role="img"
            aria-label="CardiOxy Pro spatial architecture network"
          >
            {CARDIOXY_NODES.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const nx = 200 + Math.cos(rad) * 128;
              const ny = 160 + Math.sin(rad) * 108;
              const isSelected = node.id === selectedNodeId;
              return (
                <g key={node.id}>
                  <line
                    x1={200}
                    y1={160}
                    x2={nx}
                    y2={ny}
                    stroke={isSelected ? "var(--accent-primary)" : "var(--border-strong)"}
                    strokeWidth={isSelected ? "2" : "1"}
                    strokeDasharray={mode === "OFFLINE" && node.id === "OFFLINE" ? "none" : "4 4"}
                  />
                  <g
                    onClick={() => {
                      setSelectedNodeId(node.id);
                      setShowLogic(false);
                    }}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={nx}
                      cy={ny}
                      r={isSelected ? 22 : 16}
                      fill={isSelected ? "var(--accent-primary)" : "var(--bg-canvas)"}
                      stroke="var(--accent-primary)"
                      strokeWidth={isSelected ? "2.5" : "1.2"}
                    />
                    <text
                      x={nx}
                      y={ny + 34}
                      textAnchor="middle"
                      fill="var(--text-primary)"
                      fontSize="10"
                      fontFamily="var(--font-mono)"
                    >
                      {node.label}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Central Device Core */}
            <circle
              cx={200}
              cy={160}
              r={36}
              fill="var(--bg-canvas)"
              stroke="var(--accent-primary)"
              strokeWidth="2"
            />
            <text
              x={200}
              y={156}
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="10"
              fontWeight="bold"
              fontFamily="var(--font-display)"
            >
              CARDIOXY
            </text>
            <text
              x={200}
              y={170}
              textAnchor="middle"
              fill="var(--accent-primary)"
              fontSize="8.5"
              fontFamily="var(--font-mono)"
            >
              {mode}
            </text>
          </svg>

          {/* Accessible Node Pill Selector for Keyboard & Touch */}
          <div className="absolute bottom-3 inset-x-3 flex flex-wrap justify-center gap-1.5">
            {CARDIOXY_NODES.map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  setSelectedNodeId(node.id);
                  setShowLogic(false);
                }}
                className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase cursor-pointer transition-colors ${
                  selectedNodeId === node.id
                    ? "bg-[var(--accent-primary)] text-white"
                    : "bg-[var(--bg-canvas)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hairline-border"
                }`}
              >
                {node.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: Single Floating Glass Information Window */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="glass-panel-active p-6 space-y-5"
            >
              <div className="space-y-2">
                <h4 className="font-display text-xl font-bold text-[var(--text-primary)]">
                  {activeNode.label}
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {activeNode.summary}
                </p>
              </div>

              <div className="p-3.5 rounded-xl hairline-border bg-[var(--bg-canvas)] font-mono text-xs text-[var(--text-secondary)] tabular-nums">
                Safety Boundaries: HR &gt; 100 bpm · HR &lt; 60 bpm · SpO₂ &lt; 90%
              </div>

              <button
                type="button"
                onClick={() => setShowLogic((prev) => !prev)}
                aria-expanded={showLogic}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] font-mono text-xs uppercase tracking-[0.06em] cursor-pointer"
              >
                <span>{showLogic ? "Hide Model Logic" : "Explore Model Logic"}</span>
                <ChevronRight
                  className={`h-3.5 w-3.5 transition-transform ${showLogic ? "rotate-90" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {showLogic && (
                <div className="pt-3 hairline-t space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                  <p>{activeNode.modelLogic}</p>
                  <p className="font-mono text-[11px] text-[var(--accent-secondary)]">
                    Hardware Bus: {activeNode.hardware}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const FOOD_STAGES = [
  {
    id: "DEMAND",
    step: "01",
    label: "DEMAND",
    visualState: "Raw Multi-Source Signal Ingestion",
    summary:
      "Aligns historical POS transactions with DOSM PriceCatcher, CPI, weather, holidays, and fuel price series using publication-lag-aware point-in-time joins.",
  },
  {
    id: "FORECAST",
    step: "02",
    label: "FORECAST",
    visualState: "Direct Multi-Horizon Trajectory (1d–30d)",
    summary:
      "Trains dedicated LightGBM, CatBoost, and XGBoost estimators across 6 horizons (1, 3, 7, 14, 21, 30 days) validated via expanding walk-forward splits.",
  },
  {
    id: "PRICE",
    step: "03",
    label: "PRICE",
    visualState: "Wholesale & Retail Price Drift Detection",
    summary:
      "Forecasts upcoming procurement cost volatility alongside unit volume so buyers know when to lock supplier pricing ahead of seasonal spikes.",
  },
  {
    id: "INVENTORY",
    step: "04",
    label: "INVENTORY",
    visualState: "Days-of-Stock Coverage & Spoilage Guard",
    summary:
      "Translates predicted demand into real-time days-of-stock buffers, balancing stockout prevention against perishable food waste (UN SDG 12).",
  },
  {
    id: "ACTION",
    step: "05",
    label: "ACTION",
    visualState: "Calibrated Procurement Recommendation",
    summary:
      "Emits a single actionable replenishment quantity and reorder timing window for store operators without overwhelming them with six simultaneous charts.",
  },
] as const;

export function FoodResilienceInteractiveLab() {
  const prefersReducedMotion = useReducedMotion();
  const [activeStageIdx, setActiveStageIdx] = useState<number>(1);
  const [horizon, setHorizon] = useState<"1d" | "3d" | "7d" | "14d" | "21d" | "30d">("14d");

  const activeStage = FOOD_STAGES[activeStageIdx];

  const horizonMetrics = {
    "1d": { demand: "140 units", daysOfStock: "11.4d", model: "LightGBM", recommendation: "Hold current stock; buffer healthy." },
    "3d": { demand: "432 units", daysOfStock: "8.9d", model: "LightGBM", recommendation: "Standard replenishment cycle active." },
    "7d": { demand: "1,036 units", daysOfStock: "6.2d", model: "CatBoost", recommendation: "Stage weekly supplier order within 48h." },
    "14d": { demand: "2,170 units", daysOfStock: "3.8d", model: "LightGBM + CatBoost", recommendation: "Order +420 units to protect 5-day safety floor." },
    "21d": { demand: "3,402 units", daysOfStock: "2.7d", model: "XGBoost + LightGBM", recommendation: "Pre-book festive allocation to avoid price surge." },
    "30d": { demand: "5,040 units", daysOfStock: "2.1d", model: "XGBoost", recommendation: "Lock 30-day forward supply contract." },
  }[horizon];

  return (
    <div className="glass-workspace p-6 sm:p-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 hairline-b">
        <div className="flex items-center gap-2.5">
          <TrendingUp className="h-5 w-5 text-[var(--accent-secondary)]" aria-hidden="true" />
          <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            FoodResilience — Spatial Flow (DEMAND → FORECAST → PRICE → INVENTORY → ACTION)
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Forecast Horizon">
          {(["1d", "3d", "7d", "14d", "21d", "30d"] as const).map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setHorizon(h)}
              className={`px-3 py-1 rounded-full font-mono text-xs tabular-nums transition-colors cursor-pointer ${
                horizon === h
                  ? "bg-[var(--accent-secondary)] text-slate-950 font-semibold"
                  : "hairline-border text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              +{h}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Stage Spatial Flow Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {FOOD_STAGES.map((st, idx) => {
          const active = idx === activeStageIdx;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => setActiveStageIdx(idx)}
              className={`p-3.5 rounded-xl text-left transition-colors cursor-pointer ${
                active
                  ? "glass-panel-active border-[var(--accent-secondary)]"
                  : "glass-panel opacity-70 hover:opacity-100"
              }`}
            >
              <div className="font-mono text-[10px] text-[var(--accent-secondary)] tabular-nums">
                STAGE {st.step}
              </div>
              <div className="mt-1 font-display text-sm font-bold text-[var(--text-primary)]">
                {st.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Single Focused Stage Visualization Window */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeStage.id}-${horizon}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="glass-panel-active p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
        >
          <div className="lg:col-span-7 space-y-3">
            <h4 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              {activeStage.step} · {activeStage.label} — {activeStage.visualState}
            </h4>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {activeStage.summary}
            </p>
            <div className="pt-2 font-mono text-xs text-[var(--accent-secondary)]">
              Actionable Output (+{horizon}): {horizonMetrics.recommendation}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-3 tabular-nums">
            <div className="p-3.5 rounded-xl hairline-border bg-[var(--bg-canvas)]">
              <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                Projected +{horizon} Demand
              </div>
              <div className="mt-1 font-display text-lg font-bold text-[var(--text-primary)]">
                {horizonMetrics.demand}
              </div>
            </div>
            <div className="p-3.5 rounded-xl hairline-border bg-[var(--bg-canvas)]">
              <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                Days of Stock
              </div>
              <div className="mt-1 font-display text-lg font-bold text-[var(--accent-secondary)]">
                {horizonMetrics.daysOfStock}
              </div>
            </div>
            <div className="p-3.5 rounded-xl hairline-border bg-[var(--bg-canvas)]">
              <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                Estimator
              </div>
              <div className="mt-1 font-mono text-xs font-semibold text-[var(--text-primary)]">
                {horizonMetrics.model}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const OCCUPATION_NETWORKS = [
  {
    id: "ai-engineer",
    role: "AI ENGINEER",
    demand: "HIGH",
    confidence: "88%",
    nodes: [
      { label: "Python", angle: -90, prob: "0.94" },
      { label: "ML", angle: -18, prob: "0.91" },
      { label: "NLP", angle: 54, prob: "0.86" },
      { label: "Cloud", angle: 126, prob: "0.78" },
      { label: "Data", angle: 198, prob: "0.84" },
    ],
  },
  {
    id: "ml-forecasting",
    role: "ML FORECASTING SCIENTIST",
    demand: "HIGH",
    confidence: "84%",
    nodes: [
      { label: "Time-Series", angle: -90, prob: "0.93" },
      { label: "LightGBM", angle: -18, prob: "0.89" },
      { label: "Python", angle: 54, prob: "0.90" },
      { label: "Validation", angle: 126, prob: "0.85" },
      { label: "SQL / Data", angle: 198, prob: "0.79" },
    ],
  },
  {
    id: "iot-architect",
    role: "EMBEDDED AI & IOT ENGINEER",
    demand: "HIGH",
    confidence: "82%",
    nodes: [
      { label: "ESP32", angle: -90, prob: "0.92" },
      { label: "ESP-NOW", angle: -18, prob: "0.87" },
      { label: "Sensors", angle: 54, prob: "0.89" },
      { label: "Edge AI", angle: 126, prob: "0.81" },
      { label: "Cloud Sync", angle: 198, prob: "0.76" },
    ],
  },
] as const;

export function SkillsDemandInteractiveLab() {
  const prefersReducedMotion = useReducedMotion();
  const [roleIdx, setRoleIdx] = useState<number>(0);
  const [showMetrics, setShowMetrics] = useState<boolean>(false);

  const activeOccupation = OCCUPATION_NETWORKS[roleIdx];

  return (
    <div className="glass-workspace p-6 sm:p-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 hairline-b">
        <div className="flex items-center gap-2.5">
          <Cpu className="h-5 w-5 text-[var(--accent-amber)]" aria-hidden="true" />
          <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            Occupational AI — Connected Skill Constellation &amp; Demand Indicator
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Select Occupation">
          {OCCUPATION_NETWORKS.map((occ, idx) => (
            <button
              key={occ.id}
              type="button"
              onClick={() => setRoleIdx(idx)}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-colors cursor-pointer ${
                roleIdx === idx
                  ? "bg-[var(--accent-amber)] text-slate-950 font-semibold"
                  : "hairline-border text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {occ.role}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Connected Skill Network SVG */}
        <div className="lg:col-span-7 glass-panel p-6 flex items-center justify-center min-h-[300px]">
          <svg
            viewBox="0 0 360 280"
            className="w-full max-w-[380px] h-auto overflow-visible"
            role="img"
            aria-label={`Skill constellation for ${activeOccupation.role}`}
          >
            {activeOccupation.nodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const nx = 180 + Math.cos(rad) * 105;
              const ny = 140 + Math.sin(rad) * 88;
              return (
                <g key={node.label}>
                  <line
                    x1={180}
                    y1={140}
                    x2={nx}
                    y2={ny}
                    stroke="var(--accent-amber)"
                    strokeWidth="1.4"
                    strokeOpacity="0.65"
                  />
                  <circle
                    cx={nx}
                    cy={ny}
                    r={22}
                    fill="var(--bg-canvas)"
                    stroke="var(--accent-amber)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={nx}
                    y={ny - 2}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="9.5"
                    fontFamily="var(--font-mono)"
                  >
                    {node.label}
                  </text>
                  <text
                    x={nx}
                    y={ny + 10}
                    textAnchor="middle"
                    fill="var(--accent-amber)"
                    fontSize="8.5"
                    fontFamily="var(--font-mono)"
                  >
                    {node.prob}
                  </text>
                </g>
              );
            })}

            <circle
              cx={180}
              cy={140}
              r={32}
              fill="var(--bg-canvas)"
              stroke="var(--accent-amber)"
              strokeWidth="2.2"
            />
            <text
              x={180}
              y={143}
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="9"
              fontWeight="bold"
              fontFamily="var(--font-display)"
            >
              CORE ROLE
            </text>
          </svg>
        </div>

        {/* Floating Demand & Confidence Window */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOccupation.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="glass-panel-active p-6 space-y-5 tabular-nums"
            >
              <h4 className="font-display text-xl font-bold text-[var(--text-primary)]">
                {activeOccupation.role}
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl hairline-border bg-[var(--bg-canvas)]">
                  <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                    Demand
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-[var(--accent-secondary)]">
                    {activeOccupation.demand}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl hairline-border bg-[var(--bg-canvas)]">
                  <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                    Confidence
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-[var(--accent-amber)]">
                    {activeOccupation.confidence}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowMetrics((prev) => !prev)}
                aria-expanded={showMetrics}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-amber-soft)] text-[var(--accent-amber)] font-mono text-xs uppercase tracking-[0.06em] cursor-pointer"
              >
                <span>
                  {showMetrics
                    ? "Hide Protocol B / C Benchmarks"
                    : "Inspect Protocol B / C Benchmarks"}
                </span>
                <ChevronRight
                  className={`h-3.5 w-3.5 transition-transform ${showMetrics ? "rotate-90" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {showMetrics && (
                <div className="pt-3 hairline-t space-y-2 font-mono text-xs text-[var(--text-secondary)]">
                  <div>Model: Word 1–3g + Char 3–5g TF-IDF · OvR LogReg (C=2.2, τ=0.42, Platt)</div>
                  <div>Protocol B: Skills Macro F1 0.7149 · Micro F1 0.6824 · Demand F1 0.7644</div>
                  <div>Calibration: ROC AUC 0.8379 · Brier 0.1668</div>
                  <div>Protocol C: Skills Macro F1 0.6196 · Micro F1 0.6712</div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
