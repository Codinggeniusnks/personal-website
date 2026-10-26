# DESIGN.md — KAI SHENG Interactive 3D Spatial AI Portfolio

## 1. Primary Design Principle
> **SHOW LESS. REVEAL MORE THROUGH INTERACTION.** (`COMPLEX TECHNOLOGY. SIMPLE EXPERIENCE.`)

- **Core Aesthetic**: **Dark Cinematic + Optical Glass & Layered + Minimal Premium + Interactive 3D**
- **Interaction Paradigm**:
  - `hover → preview`
  - `click → expand`
  - `scroll → transform`
  - `focus → reveal detail`
  - `select project → transition into spatial case study`
- **Density Guardrail**: At most **1–3 major floating panels** occupy the viewport at any time, preserving generous negative space around the central 3D **AI Core**.

---

## 2. Five-Layer Spatial Hierarchy
| Layer | Role | Implementation |
|---|---|---|
| **Layer 0** | 3D Background Environment | [`SpatialAiCanvas.tsx`](file:///C:/Users/LENOVO/.gemini/antigravity/scratch/kai-sheng-portfolio/src/components/spatial/SpatialAiCanvas.tsx) — Three.js / React Three Fiber geodesic icosahedron + Fibonacci neural lattice + 4 orbiting project satellites |
| **Layer 1** | Ambient Depth Elements | Controlled radial atmosphere synchronized to the active project accent (`#E86238`, `#2DD4BF`, `#F59E0B`) |
| **Layer 2** | Floating Information Windows | `.glass-panel` — `rgba(12, 16, 24, 0.58)`, `backdrop-filter: blur(20px) saturate(135%)`, `1px` optical highlight border |
| **Layer 3** | Active Project Preview Window | `.glass-panel-active` — `rgba(18, 24, 36, 0.82)`, `backdrop-filter: blur(28px) saturate(150%)`, elevated focus border |
| **Layer 4** | Expanded Case-Study Workspace | `.glass-workspace` — progressive disclosure tabs (`Architecture & Data`, `AI / ML Methodology`, `Validation & Metrics`, `Implementation & Constraints`, `Limitations & Future Work`) |

---

## 3. Color & Typography Tokens
- **Graphite Canvas (`--bg-canvas`)**: `#07090E` (near-black graphite with subtle cool tint)
- **Warm White Typography (`--text-primary`)**: `#F5F4F0`
- **Controlled Accent (`--accent-primary`)**: `#E86238` (Signal Coral-Vermilion)
- **Supporting Telemetry Accents**: `#2DD4BF` (Teal — FoodResilience), `#F59E0B` (Amber — Occupational AI & Gold Awards)
- **Fonts**: `Space Grotesk` (display), `Plus Jakarta Sans` (body), `JetBrains Mono` (`tabular-nums` technical tokens)
