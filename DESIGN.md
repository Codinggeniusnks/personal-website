# DESIGN.md — KAI SHENG Employer-Focused Interactive 3D Portfolio

## 1. Primary Design Principle
> **GOAL A — EMPLOYER CLARITY (`TEXT FIRST. EFFECTS SECOND.`) + GOAL B — PREMIUM INTERACTION**

- **5-Second Employer Comprehension**:
  1. **WHO?**: Kai Sheng (`Ng Kai Sheng`)
  2. **WHAT?**: AI Engineer, Machine Learning Engineer & Creative Technologist (Universiti Malaya — Bachelor of Computer Science, Major in Artificial Intelligence)
  3. **WHAT CAN HE BUILD?**: Real AI and intelligent systems (`I build intelligent systems that turn data into predictions, decisions and real-world impact.`)
  4. **PROOF?**: Three flagship technical projects (`01 — CARDIOXY PRO`, `02 — FOODRESILIENCE`, `03 — OCCUPATIONAL SKILLS & DEMAND PREDICTOR`) with directly readable problem, solution, architecture, technologies, key features, and outcomes.
  5. **NEXT ACTION?**: `VIEW MY WORK`, `ABOUT ME`, `GitHub`, `LinkedIn`, `Contact`.

---

## 2. Visual & Colour System (Dark Cinematic + Controlled Electric Cyan)
- **Primary Background (`--bg-canvas`)**: `#06090F` (near-black graphite with subtle cool tint)
- **Glass Surface (`--bg-glass`)**: `rgba(11, 16, 27, 0.64)` with `backdrop-filter: blur(20px) saturate(140%)` and `1px` semi-transparent border
- **Primary Text (`--text-primary`)**: `#F4F4F0` (soft warm white, AAA contrast)
- **Secondary Text (`--text-secondary`)**: `#98A4B8` (muted cool grey)
- **Single Controlled Technological Accent (`--accent-primary`)**: `#22D3EE` / `#38BDF8` (Electric Cyan / Clean Blue-Cyan), used exclusively for interaction, active state, focus, project selection, connection lines, and subtle highlights.
- **Typography**: `Space Grotesk` (Display), `Plus Jakarta Sans` (Body), `JetBrains Mono` (`tabular-nums` Technical Metadata).

---

## 3. Motion & Interaction Timing System
| Tier | Token | Duration | Usage |
|---|---|---|---|
| **MICRO** | `--dur-micro` | `150ms` (`120–180ms`) | Icon shifts, border brightening, badge highlights |
| **BUTTON** | `--dur-button` | `210ms` (`180–250ms`) | `<MagneticButton>` proximity pull, radial spotlight |
| **PANEL** | `--dur-panel` | `360ms` (`300–450ms`) | `.glass-panel` / `.glass-workspace` state transitions |
| **SECTION** | `--dur-section` | `600ms` (`500–700ms`) | Section reveal & project preview transitions |
| **CAMERA** | `--dur-camera` | `750ms` (`600–900ms`) | 3D AI Core stage & satellite orientation damping |
| **CINEMATIC** | `--dur-cinematic` | `1050ms` (`900–1200ms`) | Deep case-study entry transitions |
