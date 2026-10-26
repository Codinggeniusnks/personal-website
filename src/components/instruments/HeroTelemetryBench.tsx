"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Activity, TrendingUp, Cpu, ArrowUpRight, ShieldAlert, CheckCircle2, Radio } from "lucide-react";

type ChannelId = "cardioxy" | "food" | "skills";

type CardioScenario = "normal" | "predictive" | "critical";
type HorizonOption = "1d" | "7d" | "14d" | "30d";
type ProtocolMode = "protocolB" | "protocolC" | "ablation";

export function HeroTelemetryBench() {
  const prefersReducedMotion = useReducedMotion();
  const [channel, setChannel] = useState<ChannelId>("cardioxy");
  const [cardioScenario, setCardioScenario] = useState<CardioScenario>("predictive");
  const [cardioMode, setCardioMode] = useState<"ONLINE" | "OFFLINE_ESPNOW" | "MANUAL">("ONLINE");
  const [horizon, setHorizon] = useState<HorizonOption>("14d");
  const [protocolMode, setProtocolMode] = useState<ProtocolMode>("protocolB");

  const cardioMetrics = {
    normal: {
      hr: 74,
      spo2: 98.2,
      slope: "+0.1 bpm/min",
      status: "STABLE BASELINE",
      tone: "text-[var(--accent-secondary)]",
      badgeBg: "bg-[var(--accent-secondary-soft)]",
      action: "MAX30102 optical sampling active · Cloud & SD telemetry nominal",
      points: "0,48 20,47 35,44 45,16 55,58 65,40 85,48 110,47 125,44 135,16 145,58 155,40 180,48 205,47 220,44 230,16 240,58 250,40 280,48",
    },
    predictive: {
      hr: 94,
      spo2: 92.4,
      slope: "+4.8 bpm/min · -0.9% SpO₂/min",
      status: "EARLY WARNING: DETERIORATING TRAJECTORY",
      tone: "text-[var(--accent-amber)]",
      badgeBg: "bg-[var(--accent-amber-soft)]",
      action: "Pre-threshold trajectory detected before HR>100 / SpO₂<90% · Early caregiver alert dispatched",
      points: "0,50 18,48 30,42 38,14 46,60 54,36 72,46 88,40 96,12 104,62 112,34 130,44 146,38 154,10 162,64 170,32 190,40 210,35 220,8 228,64 238,30 265,36 280,32",
    },
    critical: {
      hr: 112,
      spo2: 87.6,
      slope: "+8.2 bpm/min · THRESHOLD BREACH",
      status: "CRITICAL BREACH: HR > 100 | SpO₂ < 90%",
      tone: "text-[var(--accent-primary)]",
      badgeBg: "bg-[var(--accent-primary-soft)]",
      action: "Immediate escalation: Local buzzer + Telegram + Automated Phone Call + DS1302 RTC SD log",
      points: "0,44 12,38 20,6 28,66 36,28 50,40 62,36 70,6 78,66 86,28 100,40 112,36 120,6 128,66 136,28 150,40 162,36 170,6 178,66 186,28 205,40 218,36 226,6 234,66 242,28 265,38 280,34",
    },
  }[cardioScenario];

  const foodData = {
    "1d": {
      daysOfStock: 11.4,
      forecastUnits: 142,
      safetyStock: 110,
      modelWinner: "LightGBM (Direct 1d)",
      riskLevel: "LOW STOCKOUT RISK",
      action: "Maintain current replenishment schedule; monitor tomorrow's walk-forward residual.",
      bars: [42, 46, 44, 51, 49, 53],
    },
    "7d": {
      daysOfStock: 6.2,
      forecastUnits: 980,
      safetyStock: 860,
      modelWinner: "CatBoost (Direct 7d)",
      riskLevel: "MODERATE BUFFER",
      action: "Stage weekly supplier order within 48 hours to preserve 5-day safety floor.",
      bars: [48, 52, 58, 63, 68, 71],
    },
    "14d": {
      daysOfStock: 3.8,
      forecastUnits: 2140,
      safetyStock: 2350,
      modelWinner: "LightGBM + CatBoost Ensemble (14d)",
      riskLevel: "REPLENISHMENT TRIGGERED",
      action: "14d cumulative demand exceeds current buffer. Issue priority procurement of +420 units.",
      bars: [54, 61, 69, 76, 84, 89],
    },
    "30d": {
      daysOfStock: 2.1,
      forecastUnits: 4680,
      safetyStock: 5100,
      modelWinner: "XGBoost + LightGBM (Direct 30d)",
      riskLevel: "HIGH SURGE EXPOSURE",
      action: "Seasonal demand spike projected in W3–W4. Lock forward allocation across backup suppliers.",
      bars: [60, 68, 77, 85, 92, 96],
    },
  }[horizon];

  return (
    <section
      aria-label="Interactive Engineering Telemetry Bench"
      className="surface-card hairline-border flex flex-col justify-between"
    >
      {/* Top Instrument Header */}
      <div className="px-4 sm:px-5 py-3.5 hairline-b bg-[var(--bg-elevated)] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <Radio className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
          <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[var(--text-primary)]">
            SYSTEM TELEMETRY BENCH · INTERACTIVE VERIFICATION
          </span>
        </div>
        <span className="font-mono text-[11px] text-[var(--text-muted)] tabular-nums">
          3 DEPLOYED ARCHITECTURES
        </span>
      </div>

      {/* Channel Selector Tabs */}
      <div
        role="tablist"
        aria-label="Select flagship system channel"
        className="grid grid-cols-3 hairline-b bg-[var(--bg-canvas)]"
      >
        <button
          type="button"
          role="tab"
          id="tab-cardioxy"
          aria-selected={channel === "cardioxy"}
          aria-controls="panel-cardioxy"
          onClick={() => setChannel("cardioxy")}
          className={`flex flex-col items-start p-3 sm:p-3.5 text-left transition-colors cursor-pointer hairline-r ${
            channel === "cardioxy"
              ? "bg-[var(--bg-surface)] text-[var(--text-primary)] border-b-2 border-b-[var(--accent-primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          }`}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--accent-primary)] tabular-nums">
            CH-01 · BIOMED IOT
          </span>
          <span className="mt-0.5 font-display text-xs sm:text-sm font-semibold truncate w-full">
            CardiOxy Pro
          </span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-food"
          aria-selected={channel === "food"}
          aria-controls="panel-food"
          onClick={() => setChannel("food")}
          className={`flex flex-col items-start p-3 sm:p-3.5 text-left transition-colors cursor-pointer hairline-r ${
            channel === "food"
              ? "bg-[var(--bg-surface)] text-[var(--text-primary)] border-b-2 border-b-[var(--accent-primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          }`}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--accent-secondary)] tabular-nums">
            CH-02 · 1D–30D ML
          </span>
          <span className="mt-0.5 font-display text-xs sm:text-sm font-semibold truncate w-full">
            FoodResilience
          </span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-skills"
          aria-selected={channel === "skills"}
          aria-controls="panel-skills"
          onClick={() => setChannel("skills")}
          className={`flex flex-col items-start p-3 sm:p-3.5 text-left transition-colors cursor-pointer ${
            channel === "skills"
              ? "bg-[var(--bg-surface)] text-[var(--text-primary)] border-b-2 border-b-[var(--accent-primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          }`}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--accent-amber)] tabular-nums">
            CH-03 · NLP / CALIB
          </span>
          <span className="mt-0.5 font-display text-xs sm:text-sm font-semibold truncate w-full">
            Skills &amp; Demand
          </span>
        </button>
      </div>

      {/* Active Channel Body */}
      <div className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={channel}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="space-y-5"
          >
        {channel === "cardioxy" && (
          <div id="panel-cardioxy" role="tabpanel" aria-labelledby="tab-cardioxy" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--text-secondary)]">
                  MAX30102 PPG + Predictive Trajectory Simulator
                </span>
              </div>
              <div className="flex items-center gap-1">
                {(["ONLINE", "OFFLINE_ESPNOW", "MANUAL"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setCardioMode(m)}
                    className={`px-2 py-1 font-mono text-[10px] uppercase cursor-pointer transition-colors ${
                      cardioMode === m
                        ? "bg-[var(--accent-primary)] text-white"
                        : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {m === "OFFLINE_ESPNOW" ? "ESP-NOW OFFLINE" : m}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario Controls */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "normal", label: "Normal Vitals" },
                { id: "predictive", label: "Predictive Trend" },
                { id: "critical", label: "Threshold Breach" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCardioScenario(s.id as CardioScenario)}
                  className={`py-2 px-2.5 font-mono text-xs text-center hairline-border cursor-pointer transition-colors ${
                    cardioScenario === s.id
                      ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--accent-primary)]"
                      : "bg-[var(--bg-canvas)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Waveform & Readout */}
            <div className="p-4 hairline-border bg-[var(--bg-canvas)] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`px-2 py-0.5 font-mono text-[11px] font-medium ${cardioMetrics.tone} ${cardioMetrics.badgeBg}`}>
                  {cardioMetrics.status}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
                  {cardioMetrics.slope}
                </span>
              </div>

              <svg
                viewBox="0 0 280 72"
                className="w-full h-20 overflow-visible"
                role="img"
                aria-label={`Simulated PPG waveform for ${cardioMetrics.status}`}
              >
                <line x1="0" y1="18" x2="280" y2="18" stroke="var(--border-hairline)" strokeDasharray="3 3" />
                <line x1="0" y1="36" x2="280" y2="36" stroke="var(--border-hairline)" />
                <line x1="0" y1="54" x2="280" y2="54" stroke="var(--border-hairline)" strokeDasharray="3 3" />
                <polyline
                  fill="none"
                  stroke={
                    cardioScenario === "critical"
                      ? "var(--accent-primary)"
                      : cardioScenario === "predictive"
                      ? "var(--accent-amber)"
                      : "var(--accent-secondary)"
                  }
                  strokeWidth="2.2"
                  points={cardioMetrics.points}
                />
              </svg>

              <div className="grid grid-cols-3 gap-3 pt-2 hairline-t tabular-nums">
                <div>
                  <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">Heart Rate</div>
                  <div className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {cardioMetrics.hr} <span className="font-mono text-xs font-normal text-[var(--text-muted)]">bpm</span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">SpO₂ Saturation</div>
                  <div className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {cardioMetrics.spo2}%
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">Transport Bus</div>
                  <div className="font-mono text-xs font-semibold text-[var(--text-primary)] mt-1">
                    {cardioMode === "ONLINE"
                      ? "Wi-Fi → Sheets + TG"
                      : cardioMode === "OFFLINE_ESPNOW"
                      ? "ESP-NOW → UNO SD"
                      : "OLED Local Only"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] p-3 hairline-border">
              <ShieldAlert className="h-4 w-4 text-[var(--accent-primary)] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{cardioMetrics.action}</span>
            </div>
          </div>
        )}

        {channel === "food" && (
          <div id="panel-food" role="tabpanel" aria-labelledby="tab-food" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[var(--accent-secondary)]" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--text-secondary)]">
                  Walk-Forward Horizon Explorer (Holdout: 2024-10-01 → 2024-12-31)
                </span>
              </div>
            </div>

            {/* Horizon Selector */}
            <div className="grid grid-cols-4 gap-2">
              {(["1d", "7d", "14d", "30d"] as const).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHorizon(h)}
                  className={`py-2 px-3 font-mono text-xs text-center hairline-border cursor-pointer tabular-nums transition-colors ${
                    horizon === h
                      ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--accent-secondary)]"
                      : "bg-[var(--bg-canvas)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  Horizon +{h}
                </button>
              ))}
            </div>

            <div className="p-4 hairline-border bg-[var(--bg-canvas)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--accent-secondary)] bg-[var(--accent-secondary-soft)]">
                  {foodData.riskLevel}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  Active Model: {foodData.modelWinner}
                </span>
              </div>

              {/* Trajectory Bars */}
              <div className="grid grid-cols-6 gap-2 items-end h-20 pt-2 px-1">
                {foodData.bars.map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className="w-full bg-[var(--accent-secondary)] transition-all duration-200"
                      style={{ height: `${val}%`, opacity: 0.45 + idx * 0.1 }}
                    />
                    <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums">
                      T+{idx + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 hairline-t tabular-nums">
                <div>
                  <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">Days of Stock</div>
                  <div className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {foodData.daysOfStock}d
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">Forecast Demand</div>
                  <div className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {foodData.forecastUnits.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">Safety Buffer</div>
                  <div className="font-display text-xl font-bold text-[var(--text-secondary)]">
                    {foodData.safetyStock.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] p-3 hairline-border">
              <CheckCircle2 className="h-4 w-4 text-[var(--accent-secondary)] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{foodData.action}</span>
            </div>
          </div>
        )}

        {channel === "skills" && (
          <div id="panel-skills" role="tabpanel" aria-labelledby="tab-skills" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[var(--accent-amber)]" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--text-secondary)]">
                  Dual TF-IDF + OvR Logistic Regression + Platt Scaling
                </span>
              </div>
            </div>

            {/* Protocol Switcher */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "protocolB", label: "Protocol B (Standard)" },
                { id: "protocolC", label: "Protocol C (Strict)" },
                { id: "ablation", label: "3× GOLD Ablation" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProtocolMode(p.id as ProtocolMode)}
                  className={`py-2 px-2.5 font-mono text-xs text-center hairline-border cursor-pointer transition-colors ${
                    protocolMode === p.id
                      ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--accent-amber)]"
                      : "bg-[var(--bg-canvas)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {protocolMode === "ablation" ? (
              <div className="p-4 hairline-border bg-[var(--bg-canvas)] space-y-3 tabular-nums">
                <div className="font-mono text-xs text-[var(--accent-amber)] uppercase">
                  Synthetic Augmentation vs. 3× GOLD Weighted Hybrid (Skills Macro F1)
                </div>
                <div className="space-y-2.5 pt-1">
                  <div>
                    <div className="flex justify-between font-mono text-xs mb-1">
                      <span className="text-[var(--text-muted)]">0% Synthetic (GOLD-only under-powered)</span>
                      <span className="text-[var(--text-primary)]">0.1678</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-elevated)]">
                      <div className="h-full bg-[var(--text-muted)]" style={{ width: "23.5%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono text-xs mb-1">
                      <span className="text-[var(--text-secondary)]">100% Synthetic Unweighted</span>
                      <span className="text-[var(--text-primary)]">0.6612</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-elevated)]">
                      <div className="h-full bg-[var(--accent-amber)]" style={{ width: "92.5%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono text-xs mb-1">
                      <span className="text-[var(--accent-secondary)] font-semibold">3× GOLD Weighted Hybrid (C=2.2, τ=0.42)</span>
                      <span className="text-[var(--accent-secondary)] font-semibold">0.7149</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-elevated)]">
                      <div className="h-full bg-[var(--accent-secondary)]" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 hairline-border bg-[var(--bg-canvas)] space-y-3 tabular-nums">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--accent-amber)] uppercase">
                    {protocolMode === "protocolB"
                      ? "Protocol B — Stratified Holdout Evaluation"
                      : "Protocol C — Strict Out-of-Cluster Generalisation"}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    C = 2.2 · τ = 0.42
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 hairline-t">
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">Skills Macro F1</div>
                    <div className="font-display text-xl font-bold text-[var(--text-primary)]">
                      {protocolMode === "protocolB" ? "0.7149" : "0.6196"}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">Skills Micro F1</div>
                    <div className="font-display text-xl font-bold text-[var(--text-primary)]">
                      {protocolMode === "protocolB" ? "0.6824" : "0.6712"}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">Demand ROC AUC</div>
                    <div className="font-display text-xl font-bold text-[var(--accent-secondary)]">
                      0.8379
                    </div>
                  </div>
                </div>

                <div className="pt-2 hairline-t flex flex-wrap justify-between gap-2 font-mono text-xs text-[var(--text-secondary)]">
                  <span>Demand Macro F1: 0.7644</span>
                  <span>Brier Calibration: 0.1668</span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] p-3 hairline-border">
              <CheckCircle2 className="h-4 w-4 text-[var(--accent-amber)] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Trained on 2,000 occupations across 18 skill categories. Dual Word (1–3g) + Character (3–5g) TF-IDF prevents black-box hallucination.
              </span>
            </div>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Instrument Footer */}
      <div className="px-4 sm:px-6 py-3.5 hairline-t bg-[var(--bg-elevated)] flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-[var(--text-muted)]">
          {channel === "cardioxy"
            ? "01 / CARDIOXY PRO ARCHITECTURE"
            : channel === "food"
            ? "02 / FOODRESILIENCE PIPELINE"
            : "03 / SKILLS & DEMAND NLP ENGINE"}
        </span>
        <Link
          href={
            channel === "cardioxy"
              ? "/work/cardioxy-pro"
              : channel === "food"
              ? "/work/foodresilience"
              : "/work/occupational-skills-demand"
          }
          className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--accent-primary)] hover:underline"
        >
          <span>Inspect Full Case Study</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
