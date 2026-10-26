# Design Exploration & Competing Concepts Evaluation (`21st-ui-explore` & `arena`)

## 1. Context & Shared Constraints
- **Owner**: Ng Kai Sheng (`KAI SHENG`), CS (Artificial Intelligence) undergraduate at Universiti Malaya, AI Engineer + Creative Technologist.
- **Fixed Constraints**:
  - Next.js App Router + React + TypeScript + Tailwind CSS + Motion
  - Dual-theme token architecture (`Carbon Signal Bench` dark `#090C10` & `Archival Scientific Monograph` light `#F7F6F2`)
  - 5–10 second recruiter comprehension
  - Zero AI clichés (no purple neon, no glowing brains, no percentage bars, no blocking intros)
  - Full WCAG AA accessibility and `prefers-reduced-motion` support

---

## 2. Three Competing Architectural Directions (`21st-ui-explore` Contract)

### Direction A — "Precision Field Instrument & Editorial Systems Monograph" (SELECTED CHAMPION)
- **Core Idea & User Effect**: Combines the structural authority of a Swiss scientific monograph (inspired by Stripe Press / ETH Zürich publications) with a live, detented Signal & Model Calibration Bench (inspired by Tektronix oscilloscopes and Linear's precision UI).
- **Meaningful Differences**:
  1. **Interactive Multi-Channel Hero Bench**: Rather than a decorative animation, the hero right-hand panel is a functional 3-channel engineering bench where visitors can toggle between **CH1: CardiOxy Pro** (live PPG/SpO₂ waveform with predictive trend vs threshold breach toggle), **CH2: FoodResilience** (walk-forward horizon forecast fan across 1d–30d), and **CH3: Occupational Skills NLP** (Platt scaling calibration curve + Protocol B/C holdout inspector).
  2. **Exposed Structural Spine & Folio Ledgers**: Projects are presented as full-width numbered engineering folios (`FOLIO 01 // HEALTHCARE IOT`, `FOLIO 02 // FORECASTING`, `FOLIO 03 // LABOUR NLP`) with architectural block diagrams, explicit headline metrics in tabular monospace, and direct deep-dive links.
- **Accessibility & Responsive Profile**: Zero WebGL GPU bottleneck on mobile; responsive SVG schematics adapt cleanly from `1920×1080` down to `360×800`; full keyboard support on all channel switches and simulation sliders.
- **Best-Fit Scenario**: Maximizes both 5-second recruiter clarity and deep technical interviewer credibility.

### Direction B — "3D WebGL Neural Point-Cloud & Spatial Bento"
- **Core Idea & User Effect**: Full-viewport Three.js / React Three Fiber particle lattice with floating glassmorphic bento cards.
- **Why Eliminated in Arena**:
  - High risk of looking like a generic AI-generated WebGL template.
  - Heavy GPU load and poor mobile readability at `360×800` and `390×844`.
  - Particle fields carry zero factual information about CardiOxy Pro, FoodResilience, or Occupational Skills NLP.

### Direction C — "Minimalist Academic CV & Text-Only Paper Index"
- **Core Idea & User Effect**: Single-column LaTeX/arXiv-inspired reading layout with static tables and plain links.
- **Why Eliminated in Arena**:
  - Strong for academic reviewers, but under-delivers on the **Creative Technologist** and **Frontend/Product Engineering** dimensions required for hackathons and product-focused AI engineering roles.

---

## 3. Component-Level Arena Tournament Matrix

| Element | Concept 1 | Concept 2 (Winner) | Decisive Criterion |
|---|---|---|---|
| **Hero Section** | Centered display typography over abstract canvas wave | **Asymmetric 7/5 Swiss Grid**: Left = Identity, UM AI & Gold Award proof + CTAs; Right = Interactive 3-Channel System Telemetry Bench | Proves engineering depth within 5 seconds without blocking content |
| **Navigation** | Floating bottom dock with icon-only buttons | **Sticky Top Calibration Bar** with route index (`/work`, `/about`, `/achievements`, `/contact`, `/resume`), live status indicator, and theme toggle | Icon-only docks fail first-time recruiter recognition (`Jordan` persona) |
| **Project Presentation** | 3-column equal-height card grid with thumbnail + button | **Full-Width Editorial Engineering Folios** with system architecture preview, problem-to-method-to-metric ledger, and award badges | Gives flagship projects the narrative weight of real engineering systems |
| **Case Study Hero & Body** | Long single-column prose essay | **2-Column Sticky Specification Spine + Interactive System Simulator** + 16-section structured engineering narrative | Allows technical interviewers to jump directly to Architecture, Validation, or Limitations |
| **Metrics Presentation** | Animated count-up numbers in rounded cards | **Calibrated Protocol Comparison Tables & Ablation Bars** with baseline vs. holdout context (e.g., Protocol B `0.7149` vs Protocol C `0.6196`, `0%` vs `100%` synthetic ablation) | Communicates why evaluation protocols matter rather than showing isolated numbers |
| **Technical Capabilities** | Categorized pill clouds or skill bars | **Evidence-Verified Capability Matrix**: Domain → Core Stack → Architectural Application → Direct Link to Verifying Project Folio | 100% compliant with "Evidence Over Adjectives" rule |
| **Contact Experience** | Multi-field contact form requiring backend mail relay | **High-Contrast Direct Connection Dock** with one-click copyable email (`ngkaisheng@um.edu.my`), verified GitHub/LinkedIn/Resume actions, and optional mailto composer | Zero friction for recruiters; zero fake form failure states |
