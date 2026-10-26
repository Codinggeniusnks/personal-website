import React from "react";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-24 lg:py-36">
      <div className="surface-card p-8 sm:p-12 max-w-2xl space-y-6">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
          Requested engineering folio does not exist at this address.
        </h1>
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[var(--accent-primary)]">
          <Terminal className="h-4 w-4" aria-hidden="true" />
          <span>STATUS 404 · TELEMETRY ROUTE NOT FOUND</span>
        </div>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Return to the primary calibration bench or browse the complete index of verified case studies.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex min-h-[46px] items-center gap-2 px-5 bg-[var(--accent-primary)] text-white font-mono text-xs uppercase tracking-[0.06em]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/work"
            className="inline-flex min-h-[46px] items-center gap-2 px-5 hairline-border bg-[var(--bg-elevated)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em]"
          >
            <span>Browse Case Studies</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
