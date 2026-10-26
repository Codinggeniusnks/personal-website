# Graphify Architecture & AST Dependency Report

## 1. Summary Metrics
- **Total AST Modules**: 20 (`src/data/*`, `src/components/*`, `src/app/*`)
- **Total Dependency Edges**: 22 (Strictly unidirectional: `app/*` → `components/*` → `data/*`)
- **Circular Dependencies**: `0`
- **God Components**: `0` (Interactive simulators are cleanly separated from route layouts and typed data layers)

## 2. Community Clusters
1. **Cluster A — Typed Evidence Layer (`src/data/`)**:
   - `profile.ts`, `projects.ts`, `capabilities.ts`, `achievements.ts`
   - Zero outward dependencies; pure TypeScript interfaces and verified data records.
2. **Cluster B — Layout & Interactive Instrument Layer (`src/components/`)**:
   - `Navbar.tsx`, `Footer.tsx`, `HeroTelemetryBench.tsx`, `CaseStudySimulators.tsx`
   - Consumes `@/data/*` and `motion/react` with `useReducedMotion()` compliance.
3. **Cluster C — App Router Surface Layer (`src/app/`)**:
   - `layout.tsx`, `page.tsx`, `work/page.tsx`, `work/[slug]/page.tsx`, `about/page.tsx`, `achievements/page.tsx`, `contact/page.tsx`, `resume/page.tsx`, `not-found.tsx`, `sitemap.ts`, `robots.ts`
   - Statically prerendered (`SSG` / `Static`) with minimal First Load JS (~103–155 kB).
