# DESIGN.md — Ng Kai Sheng (`KAI SHENG`) Engineering Portfolio

## 1. Visual Thesis & Aesthetic Direction
- **Archetype**: Precision Field Instrument & Editorial Systems Monograph (`P4 Atmospheric Minimalism & High-Craft Dark UI` + `P2 Kinetic Typography & Neo-Brutalist Swiss Grids`).
- **Core Philosophy**: Every surface behaves like a calibrated laboratory instrument and technical monograph—built to communicate complex AI, machine learning, and embedded IoT engineering with immediate clarity (5–10s recruiter scan) and deep inspectability (technical interviewer & research review).
- **Anti-Patterns Strictly Rejected**:
  - Zero generic AI purple/cyan neon gradients or floating glowing orbs.
  - Zero arbitrary skill percentage bars (`Python — 95%`); all capabilities map directly to project deployments and verified empirical metrics.
  - Zero decorative tiled grid backgrounds (`codex-grid-background`).
  - Zero eyebrows/kickers directly above `<h1-h6>` headings (`craft-floor.md` compliance).

---

## 2. Dual-Theme Token Architecture

### Primary Theme: Dark (`Carbon Signal Bench` — Default)
| Token | Hex / Value | Purpose |
|---|---|---|
| `--bg-canvas` | `#090C10` | Primary carbon obsidian background |
| `--bg-surface` | `#0F141C` | Instrument panel & folio surface |
| `--bg-elevated` | `#151C28` | Active interactive control & header surface |
| `--text-primary` | `#F2F4F8` | High-contrast alabaster primary typography (AAA) |
| `--text-secondary` | `#A6B0C3` | Technical body copy & specification prose (AA+) |
| `--text-muted` | `#6C778C` | Metadata, timestamps, and axis labels |
| `--accent-primary` | `#FF5A26` | International Signal Vermilion — primary CTAs, active channels, critical breaches |
| `--accent-secondary` | `#10B981` | Calibrated Emerald — verified benchmarks, nominal telemetry, holdout pass |
| `--accent-amber` | `#F59E0B` | Telemetry Amber — predictive early-warning drift, competition gold badges |
| `--border-hairline` | `rgba(242, 244, 248, 0.09)` | 1px exposed structural cell dividers |

### Secondary Theme: Light (`Archival Scientific Monograph` — `[data-theme="light"]`)
| Token | Hex / Value | Purpose |
|---|---|---|
| `--bg-canvas` | `#F7F6F2` | Warm archival paper background |
| `--bg-surface` | `#EFECE6` | Stone card & specification surface |
| `--bg-elevated` | `#FFFFFF` | Pure crisp elevated control surface |
| `--text-primary` | `#0F141C` | Deep carbon ink primary typography |
| `--text-secondary` | `#3E4859` | Slate technical prose |
| `--text-muted` | `#647084` | Muted archival metadata |
| `--accent-primary` | `#D93800` | High-contrast Signal Vermilion |
| `--accent-secondary` | `#047857` | Deep Calibrated Emerald |
| `--accent-amber` | `#B45309` | Deep Amber Gold |
| `--border-hairline` | `rgba(15, 20, 28, 0.12)` | Crisp 1px ink hairlines |

---

## 3. Typography & Scannable Hierarchy
- **Display (`--font-display`)**: `Space Grotesk` (`600`, `700`) — tight tracking (`-0.03em` to `-0.035em`), authoritative geometric structure for hero statements, project titles, and quantitative readouts.
- **Body (`--font-sans`)**: `Plus Jakarta Sans` (`400`, `500`, `600`, `700`) — comfortable `60ch–68ch` line width for 16-section engineering case studies.
- **Technical / Telemetry (`--font-mono`)**: `JetBrains Mono` (`400`, `500`, `600`) with `font-variant-numeric: tabular-nums` enforced across all metrics (`0.7149`, `0.8379`, `0.1668`, `HR > 100`, `SpO₂ < 90%`, `2024-10-01 to 2024-12-31`).

---

## 4. Layout, Grid & Interactive Instruments
- **Max Container**: `1360px` centered with `1px` exposed hairline borders (`hairline-t`, `hairline-b`, `hairline-border`).
- **Interactive Verification Instruments**:
  1. `HeroTelemetryBench`: 3-channel live inspection bench in the Hero right column (`CH-01 CardiOxy Pro`, `CH-02 FoodResilience`, `CH-03 Skills & Demand NLP`) with `AnimatePresence mode="wait"` transitions.
  2. `CardioxyInteractiveLab`: Multi-MCU tri-mode (`Manual`, `Online Wi-Fi`, `Offline ESP-NOW`) & physiological slope simulator on `/work/cardioxy-pro`.
  3. `FoodResilienceInteractiveLab`: Direct multi-horizon (`1d`, `3d`, `7d`, `14d`, `21d`, `30d`) walk-forward demand & days-of-stock decision calculator on `/work/foodresilience`.
  4. `SkillsDemandInteractiveLab`: Dual TF-IDF n-gram & Platt-calibrated threshold (`τ = 0.42`, `C = 2.2`, `3× GOLD`) inspector on `/work/occupational-skills-demand`.
