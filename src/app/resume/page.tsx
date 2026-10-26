"use client";

import React from "react";
import { Printer, FileDown } from "lucide-react";
import { SpatialAiCanvas } from "@/components/spatial/SpatialAiCanvas";
import { MagneticButton } from "@/components/spatial/InteractivePrimitives";

export default function PrintableCvPlaceholderPage() {
  return (
    <div className="relative min-h-[82vh]">
      {/* 3D Canvas is hidden automatically in @media print via .no-print */}
      <div className="no-print">
        <SpatialAiCanvas stage="about" />
      </div>

      <div className="relative z-10 mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10 py-12 lg:py-16 space-y-8">
        {/* Top Action Controls (Hidden when printing) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 glass-panel p-4 sm:px-6">
          <div className="font-mono text-xs text-[var(--text-secondary)]">
            A4 PRINT &amp; ATS-FRIENDLY CV INFRASTRUCTURE
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <MagneticButton
              variant="primary"
              onClick={() => window.print()}
              ariaLabel="Print A4 Curriculum Vitae"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print A4 Layout</span>
            </MagneticButton>
            <MagneticButton
              variant="glass"
              href="/cv-placeholder.pdf"
              ariaLabel="Download PDF CV Placeholder"
            >
              <FileDown className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              <span>PDF Slot</span>
            </MagneticButton>
          </div>
        </div>

        {/* Modular A4 Print-Ready Container Placeholder */}
        <section
          aria-label="Printable CV Placeholder"
          className="glass-workspace p-8 sm:p-14 space-y-8"
        >
          <header className="pb-6 hairline-b space-y-3">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              PRINTABLE CV
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              My professional CV will be available here.
            </p>
          </header>

          {/* Modular ATS-Friendly Section Slots for Future Editing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs text-[var(--text-muted)]">
            <div className="p-4 rounded-xl hairline-border border-dashed bg-[var(--bg-canvas)] space-y-1">
              <div className="text-[var(--accent-primary)]">SLOT 01 · HEADER &amp; SUMMARY</div>
              <div>Modular ATS header, contact links, and executive summary block.</div>
            </div>
            <div className="p-4 rounded-xl hairline-border border-dashed bg-[var(--bg-canvas)] space-y-1">
              <div className="text-[var(--accent-primary)]">SLOT 02 · EDUCATION</div>
              <div>Modular education entries (institution, qualification, dates, GPA).</div>
            </div>
            <div className="p-4 rounded-xl hairline-border border-dashed bg-[var(--bg-canvas)] space-y-1">
              <div className="text-[var(--accent-primary)]">SLOT 03 · PROJECTS &amp; EXPERIENCE</div>
              <div>Modular technical experience &amp; engineering project bullet blocks.</div>
            </div>
            <div className="p-4 rounded-xl hairline-border border-dashed bg-[var(--bg-canvas)] space-y-1">
              <div className="text-[var(--accent-primary)]">SLOT 04 · SKILLS &amp; ACHIEVEMENTS</div>
              <div>Modular technical stack &amp; honours entries formatted for A4 print.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
