"use client";

import React, { useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, Cpu, Database, Radio, Server, TrendingUp, Wifi, WifiOff } from "lucide-react";

export function CardioxyInteractiveLab() {
  const [mode, setMode] = useState<"MANUAL" | "ONLINE" | "OFFLINE">("ONLINE");
  const [hr, setHr] = useState<number>(94);
  const [spo2, setSpo2] = useState<number>(92);
  const [trendRising, setTrendRising] = useState<boolean>(true);

  const isCriticalBreach = hr > 100 || hr < 60 || spo2 < 90;
  const isPredictiveWarning =
    !isCriticalBreach && trendRising && (hr >= 90 || spo2 <= 93);

  const systemState = isCriticalBreach
    ? {
        label: "CRITICAL THRESHOLD BREACH (HR > 100 | HR < 60 | SpO₂ < 90%)",
        color: "text-[var(--accent-primary)]",
        bg: "bg-[var(--accent-primary-soft)]",
        action:
          mode === "ONLINE"
            ? "Immediate hardware buzzer + Telegram caregiver dispatch + Automated Phone Call + Google Sheets cloud row + SD backup."
            : mode === "OFFLINE"
            ? "Immediate hardware buzzer + ESP-NOW packet to Wemos D1 R1 → Arduino UNO + DS1302 RTC timestamped SD fault log."
            : "Immediate local buzzer + OLED high-contrast emergency overlay.",
      }
    : isPredictiveWarning
    ? {
        label: "PREDICTIVE EARLY WARNING (DETERIORATING TRAJECTORY DETECTED)",
        color: "text-[var(--accent-amber)]",
        bg: "bg-[var(--accent-amber-soft)]",
        action:
          "Worsening physiological slope identified BEFORE hard threshold breach. Early advisory sent so intervention happens ahead of crisis.",
      }
    : {
        label: "NOMINAL PHYSIOLOGICAL TELEMETRY",
        color: "text-[var(--accent-secondary)]",
        bg: "bg-[var(--accent-secondary-soft)]",
        action:
          "Continuous MAX30102 optical acquisition and multi-node logging operating within safe clinical bounds.",
      };

  return (
    <div className="surface-card hairline-border p-5 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 hairline-b">
        <div className="flex items-center gap-2.5">
          <Activity className="h-5 w-5 text-[var(--accent-primary)]" aria-hidden="true" />
          <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            Interactive Multi-MCU Telemetry &amp; Fault-Injection Simulator
          </h3>
        </div>
        <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
          ISIC-WOU24 GOLD · BIICC 2026 BEST AI TECH + GOLD
        </span>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-5 p-4 hairline-border bg-[var(--bg-canvas)]">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--text-muted)] mb-2">
              1. Operating Mode Architecture
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "MANUAL", label: "Manual Mode" },
                  { id: "ONLINE", label: "Online (Wi-Fi)" },
                  { id: "OFFLINE", label: "Offline (ESP-NOW)" },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={`py-2.5 px-2 font-mono text-xs hairline-border cursor-pointer transition-colors ${
                    mode === m.id
                      ? "bg-[var(--accent-primary)] text-white"
                      : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2 hairline-t">
            <div>
              <div className="flex justify-between font-mono text-xs mb-1.5 tabular-nums">
                <label htmlFor="sim-hr" className="text-[var(--text-secondary)]">
                  Simulated Heart Rate (bpm)
                </label>
                <span className="font-bold text-[var(--text-primary)]">{hr} bpm</span>
              </div>
              <input
                id="sim-hr"
                type="range"
                min={48}
                max={130}
                value={hr}
                onChange={(e) => setHr(Number(e.target.value))}
                className="w-full accent-[var(--accent-primary)] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[var(--text-muted)] tabular-nums">
                <span>Bradycardia &lt; 60</span>
                <span>Nominal 60–100</span>
                <span>Tachycardia &gt; 100</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-mono text-xs mb-1.5 tabular-nums">
                <label htmlFor="sim-spo2" className="text-[var(--text-secondary)]">
                  Simulated SpO₂ Saturation (%)
                </label>
                <span className="font-bold text-[var(--text-primary)]">{spo2}%</span>
              </div>
              <input
                id="sim-spo2"
                type="range"
                min={84}
                max={100}
                value={spo2}
                onChange={(e) => setSpo2(Number(e.target.value))}
                className="w-full accent-[var(--accent-primary)] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[var(--text-muted)] tabular-nums">
                <span>Hypoxemia &lt; 90%</span>
                <span>Watch 90–93%</span>
                <span>Nominal 95–100%</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="font-mono text-xs text-[var(--text-secondary)]">
                Trajectory Derivative (dHR/dt &amp; dSpO₂/dt)
              </span>
              <button
                type="button"
                onClick={() => setTrendRising((prev) => !prev)}
                className={`px-3 py-1.5 font-mono text-xs hairline-border cursor-pointer ${
                  trendRising
                    ? "bg-[var(--accent-amber-soft)] text-[var(--accent-amber)]"
                    : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
                }`}
              >
                {trendRising ? "Worsening Slope: ON" : "Slope: Flat"}
              </button>
            </div>
          </div>

          <div className="pt-2 hairline-t flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setHr(74);
                setSpo2(98);
                setTrendRising(false);
              }}
              className="px-2.5 py-1.5 font-mono text-[11px] hairline-border bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              Preset: Healthy Baseline
            </button>
            <button
              type="button"
              onClick={() => {
                setHr(95);
                setSpo2(92);
                setTrendRising(true);
              }}
              className="px-2.5 py-1.5 font-mono text-[11px] hairline-border bg-[var(--bg-surface)] text-[var(--accent-amber)] cursor-pointer"
            >
              Preset: Pre-Threshold Drift
            </button>
            <button
              type="button"
              onClick={() => {
                setHr(114);
                setSpo2(87);
                setTrendRising(true);
              }}
              className="px-2.5 py-1.5 font-mono text-[11px] hairline-border bg-[var(--bg-surface)] text-[var(--accent-primary)] cursor-pointer"
            >
              Preset: Emergency Breach
            </button>
          </div>
        </div>

        {/* Hardware Node Bus Visualization */}
        <div className="lg:col-span-7 flex flex-col justify-between p-4 sm:p-5 hairline-border bg-[var(--bg-canvas)] space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className={`px-2.5 py-1 font-mono text-xs font-semibold ${systemState.color} ${systemState.bg}`}>
                {systemState.label}
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                {mode === "ONLINE" ? (
                  <>
                    <Wifi className="h-3.5 w-3.5 text-[var(--accent-secondary)]" />
                    <span>Wi-Fi Cloud Active</span>
                  </>
                ) : mode === "OFFLINE" ? (
                  <>
                    <Radio className="h-3.5 w-3.5 text-[var(--accent-amber)]" />
                    <span>ESP-NOW Peer Bus</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                    <span>Air-Gapped Manual</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {systemState.action}
            </p>
          </div>

          {/* 4-Stage Hardware Node Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 tabular-nums">
            <div className="p-3.5 hairline-border bg-[var(--bg-surface)]">
              <div className="font-mono text-[10px] uppercase text-[var(--accent-primary)]">
                Node 01 · Edge Acquisition
              </div>
              <div className="mt-1 font-display text-sm font-semibold text-[var(--text-primary)]">
                ESP32 + MAX30102 + OLED
              </div>
              <div className="mt-1.5 font-mono text-xs text-[var(--text-secondary)]">
                PPG Red/IR active · HR {hr} bpm · SpO₂ {spo2}%
              </div>
            </div>

            <div
              className={`p-3.5 hairline-border transition-opacity ${
                mode === "OFFLINE" || mode === "ONLINE"
                  ? "bg-[var(--bg-surface)] opacity-100"
                  : "bg-[var(--bg-canvas)] opacity-50"
              }`}
            >
              <div className="font-mono text-[10px] uppercase text-[var(--accent-amber)]">
                Node 02 · Offline Relay Bus
              </div>
              <div className="mt-1 font-display text-sm font-semibold text-[var(--text-primary)]">
                ESP-NOW → Wemos D1 R1
              </div>
              <div className="mt-1.5 font-mono text-xs text-[var(--text-secondary)]">
                {mode === "OFFLINE"
                  ? "ACTIVE: Zero-router 2.4GHz peer frame transfer"
                  : mode === "ONLINE"
                  ? "STANDBY: Ready for automatic Wi-Fi failover"
                  : "DISABLED IN MANUAL MODE"}
              </div>
            </div>

            <div
              className={`p-3.5 hairline-border transition-opacity ${
                mode !== "MANUAL" ? "bg-[var(--bg-surface)] opacity-100" : "bg-[var(--bg-canvas)] opacity-50"
              }`}
            >
              <div className="font-mono text-[10px] uppercase text-[var(--accent-secondary)]">
                Node 03 · Black-Box Persistence
              </div>
              <div className="mt-1 font-display text-sm font-semibold text-[var(--text-primary)]">
                Arduino UNO + DS1302 RTC + SD
              </div>
              <div className="mt-1.5 font-mono text-xs text-[var(--text-secondary)]">
                {mode !== "MANUAL"
                  ? "WRITING: Hardware RTC timestamped CSV audit trail"
                  : "LOCAL DISPLAY ONLY"}
              </div>
            </div>

            <div
              className={`p-3.5 hairline-border transition-opacity ${
                mode === "ONLINE" ? "bg-[var(--bg-surface)] opacity-100" : "bg-[var(--bg-canvas)] opacity-50"
              }`}
            >
              <div className="font-mono text-[10px] uppercase text-[var(--accent-primary)]">
                Node 04 · Cloud &amp; Escalation
              </div>
              <div className="mt-1 font-display text-sm font-semibold text-[var(--text-primary)]">
                Google Sheets + Telegram + Call
              </div>
              <div className="mt-1.5 font-mono text-xs text-[var(--text-secondary)]">
                {mode === "ONLINE"
                  ? isCriticalBreach
                    ? "DISPATCHED: Telegram + Automated Voice Call"
                    : isPredictiveWarning
                    ? "DISPATCHED: Early-Warning Telegram Advisory"
                    : "STREAMING: Real-time Google Sheets telemetry"
                  : "QUEUED ON SD CARD UNTIL WI-FI RESTORED"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FoodResilienceInteractiveLab() {
  const [horizon, setHorizon] = useState<"1d" | "3d" | "7d" | "14d" | "21d" | "30d">("14d");
  const [model, setModel] = useState<"LightGBM" | "CatBoost" | "XGBoost">("LightGBM");
  const [currentInventory, setCurrentInventory] = useState<number>(1800);

  const dailyDemandByHorizon = {
    "1d": 140,
    "3d": 144,
    "7d": 148,
    "14d": 155,
    "21d": 162,
    "30d": 168,
  }[horizon];

  const horizonDays = parseInt(horizon.replace("d", ""), 10);
  const modelBiasFactor = model === "LightGBM" ? 1.0 : model === "CatBoost" ? 0.98 : 1.03;
  const projectedTotalDemand = Math.round(dailyDemandByHorizon * horizonDays * modelBiasFactor);
  const daysOfStock = Number((currentInventory / (dailyDemandByHorizon * modelBiasFactor)).toFixed(1));
  const netBalance = currentInventory - projectedTotalDemand;

  return (
    <div className="surface-card hairline-border p-5 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 hairline-b">
        <div className="flex items-center gap-2.5">
          <TrendingUp className="h-5 w-5 text-[var(--accent-secondary)]" aria-hidden="true" />
          <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            Interactive Multi-Horizon Forecast &amp; Days-of-Stock Decision Lab
          </h3>
        </div>
        <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
          CHRONOLOGICAL HOLDOUT: 2024-10-01 TO 2024-12-31
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-5 p-4 hairline-border bg-[var(--bg-canvas)]">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--text-muted)] mb-2">
              1. Direct Forecast Horizon (1d to 30d)
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-2">
              {(["1d", "3d", "7d", "14d", "21d", "30d"] as const).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHorizon(h)}
                  className={`py-2 px-3 font-mono text-xs hairline-border cursor-pointer tabular-nums ${
                    horizon === h
                      ? "bg-[var(--accent-secondary)] text-white"
                      : "bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                  }`}
                >
                  +{h}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 hairline-t">
            <div className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--text-muted)] mb-2">
              2. Gradient Boosted Estimator
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["LightGBM", "CatBoost", "XGBoost"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setModel(m)}
                  className={`py-2 px-2 font-mono text-xs hairline-border cursor-pointer ${
                    model === m
                      ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--accent-secondary)]"
                      : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 hairline-t">
            <div className="flex justify-between font-mono text-xs mb-1.5 tabular-nums">
              <label htmlFor="sim-inventory" className="text-[var(--text-secondary)]">
                Current On-Hand Stock (Units)
              </label>
              <span className="font-bold text-[var(--text-primary)]">
                {currentInventory.toLocaleString()} units
              </span>
            </div>
            <input
              id="sim-inventory"
              type="range"
              min={300}
              max={6000}
              step={100}
              value={currentInventory}
              onChange={(e) => setCurrentInventory(Number(e.target.value))}
              className="w-full accent-[var(--accent-secondary)] cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-7 p-4 sm:p-5 hairline-border bg-[var(--bg-canvas)] flex flex-col justify-between space-y-5 tabular-nums">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 hairline-border bg-[var(--bg-surface)]">
              <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                Projected +{horizon} Demand
              </div>
              <div className="mt-1 font-display text-2xl font-bold text-[var(--text-primary)]">
                {projectedTotalDemand.toLocaleString()} <span className="text-xs font-mono font-normal">units</span>
              </div>
            </div>

            <div className="p-3.5 hairline-border bg-[var(--bg-surface)]">
              <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                Days-of-Stock Coverage
              </div>
              <div
                className={`mt-1 font-display text-2xl font-bold ${
                  daysOfStock < horizonDays ? "text-[var(--accent-primary)]" : "text-[var(--accent-secondary)]"
                }`}
              >
                {daysOfStock} days
              </div>
            </div>

            <div className="p-3.5 hairline-border bg-[var(--bg-surface)]">
              <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                End-of-Horizon Balance
              </div>
              <div
                className={`mt-1 font-display text-2xl font-bold ${
                  netBalance < 0 ? "text-[var(--accent-primary)]" : "text-[var(--text-primary)]"
                }`}
              >
                {netBalance >= 0 ? `+${netBalance.toLocaleString()}` : netBalance.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="p-4 hairline-border bg-[var(--bg-surface)] space-y-2">
            <div className="font-mono text-xs uppercase text-[var(--accent-secondary)]">
              Operational Procurement Recommendation ({model} · +{horizon} Horizon)
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {netBalance < 0
                ? `STOCKOUT WARNING: Projected ${horizon} demand exceeds current inventory by ${Math.abs(
                    netBalance
                  ).toLocaleString()} units. Trigger immediate replenishment order of at least ${(
                    Math.abs(netBalance) + 350
                  ).toLocaleString()} units to restore a 2.5-day safety buffer.`
                : `BUFFER ADEQUATE: Current stock covers the ${horizon} forecast window with ${netBalance.toLocaleString()} units remaining (${daysOfStock} days of stock). Next scheduled review at T+24h.`}
            </p>
          </div>

          <div className="text-xs font-mono text-[var(--text-muted)] flex flex-wrap justify-between gap-2 pt-2 hairline-t">
            <span>Validation: Expanding Walk-Forward CV</span>
            <span>Leakage Guard: Strictly Causal Rolling Lags</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SAMPLE_ROLES = [
  {
    title: "AI Systems & Embedded ML Engineer",
    snippet:
      "Design Python machine learning pipelines, deploy edge telemetry firmware on ESP32 microcontrollers, calibrate statistical classifiers, and build React monitoring interfaces.",
    skills: [
      { name: "Machine Learning & Statistical Modelling", prob: 0.91 },
      { name: "Python & Scientific Computing", prob: 0.89 },
      { name: "Embedded Systems & IoT Telemetry", prob: 0.84 },
      { name: "Data Engineering & Feature Pipelines", prob: 0.76 },
      { name: "Frontend Systems & Visualization", prob: 0.64 },
      { name: "Enterprise ERP Administration", prob: 0.14 },
    ],
    ngrams: ["machine learning", "python", "esp32", "calibrat", "telemetr", "pipeline"],
    demandTier: "HIGH GROWTH DEMAND (p = 0.88)",
  },
  {
    title: "Supply Chain Forecasting & Operations Analyst",
    snippet:
      "Develop multi-horizon inventory demand forecasting models, optimize safety stock buffers, evaluate walk-forward validation metrics, and automate SQL/Python procurement reports.",
    skills: [
      { name: "Time-Series & Demand Forecasting", prob: 0.93 },
      { name: "Supply Chain & Inventory Optimization", prob: 0.87 },
      { name: "Python & Scientific Computing", prob: 0.79 },
      { name: "SQL & Relational Analytics", prob: 0.74 },
      { name: "Executive Decision Reporting", prob: 0.58 },
      { name: "Embedded Firmware C++", prob: 0.08 },
    ],
    ngrams: ["multi-horizon", "demand forecast", "safety stock", "walk-forward", "inventory"],
    demandTier: "HIGH GROWTH DEMAND (p = 0.84)",
  },
];

export function SkillsDemandInteractiveLab() {
  const [roleIdx, setRoleIdx] = useState<number>(0);
  const [threshold, setThreshold] = useState<number>(0.42);

  const activeRole = SAMPLE_ROLES[roleIdx];

  return (
    <div className="surface-card hairline-border p-5 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 hairline-b">
        <div className="flex items-center gap-2.5">
          <Cpu className="h-5 w-5 text-[var(--accent-amber)]" aria-hidden="true" />
          <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            Interactive Dual TF-IDF &amp; Platt-Calibrated Threshold Inspector
          </h3>
        </div>
        <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
          C = 2.2 · OPTIMAL τ = 0.42 · 3× GOLD HYBRID
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-5 p-4 hairline-border bg-[var(--bg-canvas)]">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--text-muted)] mb-2">
              1. Select Occupational Text Profile
            </div>
            <div className="space-y-2">
              {SAMPLE_ROLES.map((r, i) => (
                <button
                  key={r.title}
                  type="button"
                  onClick={() => setRoleIdx(i)}
                  className={`w-full text-left p-3 hairline-border cursor-pointer transition-colors ${
                    roleIdx === i
                      ? "bg-[var(--bg-elevated)] border-[var(--accent-amber)] text-[var(--text-primary)]"
                      : "bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                  }`}
                >
                  <div className="font-display text-sm font-semibold">{r.title}</div>
                  <div className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">{r.snippet}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 hairline-t">
            <div className="flex justify-between font-mono text-xs mb-1.5 tabular-nums">
              <label htmlFor="sim-tau" className="text-[var(--text-secondary)]">
                Decision Threshold (τ)
              </label>
              <span className="font-bold text-[var(--accent-amber)]">
                τ = {threshold.toFixed(2)} {threshold === 0.42 ? "(Validated Optimum)" : ""}
              </span>
            </div>
            <input
              id="sim-tau"
              type="range"
              min={0.25}
              max={0.75}
              step={0.01}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full accent-[var(--accent-amber)] cursor-pointer"
            />
            <div className="mt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setThreshold(0.42)}
                className="px-2.5 py-1 font-mono text-[11px] hairline-border bg-[var(--bg-surface)] text-[var(--accent-amber)] cursor-pointer"
              >
                Reset to Tuned τ = 0.42
              </button>
              <button
                type="button"
                onClick={() => setThreshold(0.5)}
                className="px-2.5 py-1 font-mono text-[11px] hairline-border bg-[var(--bg-surface)] text-[var(--text-muted)] cursor-pointer"
              >
                Compare Naive τ = 0.50
              </button>
            </div>
          </div>

          <div className="pt-2 hairline-t">
            <div className="font-mono text-[11px] uppercase text-[var(--text-muted)] mb-2">
              Activated Word (1–3g) &amp; Char (3–5g) Features
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeRole.ngrams.map((g) => (
                <span
                  key={g}
                  className="px-2 py-0.5 font-mono text-xs bg-[var(--bg-surface)] hairline-border text-[var(--text-secondary)]"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-4 sm:p-5 hairline-border bg-[var(--bg-canvas)] space-y-4 tabular-nums">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 hairline-b">
            <span className="font-mono text-xs uppercase text-[var(--text-secondary)]">
              Platt-Calibrated Multi-Label Skill Posteriors
            </span>
            <span className="px-2.5 py-0.5 font-mono text-xs bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)]">
              {activeRole.demandTier}
            </span>
          </div>

          <div className="space-y-3">
            {activeRole.skills.map((sk) => {
              const active = sk.prob >= threshold;
              return (
                <div key={sk.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={active ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-muted)]"}>
                      {active ? "✓ " : "· "}
                      {sk.name}
                    </span>
                    <span className={active ? "text-[var(--accent-amber)] font-semibold" : "text-[var(--text-muted)]"}>
                      p = {sk.prob.toFixed(2)} {active ? "≥ τ" : "< τ"}
                    </span>
                  </div>
                  <div className="h-2 bg-[var(--bg-surface)] relative">
                    <div
                      className={`h-full transition-all duration-150 ${
                        active ? "bg-[var(--accent-amber)]" : "bg-[var(--text-muted)] opacity-40"
                      }`}
                      style={{ width: `${sk.prob * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 hairline-t grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2.5 hairline-border bg-[var(--bg-surface)]">
              <div className="font-mono text-[10px] text-[var(--text-muted)]">Protocol B Macro F1</div>
              <div className="font-display text-base font-bold text-[var(--text-primary)]">0.7149</div>
            </div>
            <div className="p-2.5 hairline-border bg-[var(--bg-surface)]">
              <div className="font-mono text-[10px] text-[var(--text-muted)]">Protocol C Macro F1</div>
              <div className="font-display text-base font-bold text-[var(--text-primary)]">0.6196</div>
            </div>
            <div className="p-2.5 hairline-border bg-[var(--bg-surface)]">
              <div className="font-mono text-[10px] text-[var(--text-muted)]">Demand ROC AUC</div>
              <div className="font-display text-base font-bold text-[var(--accent-secondary)]">0.8379</div>
            </div>
            <div className="p-2.5 hairline-border bg-[var(--bg-surface)]">
              <div className="font-mono text-[10px] text-[var(--text-muted)]">Brier Score</div>
              <div className="font-display text-base font-bold text-[var(--text-primary)]">0.1668</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
