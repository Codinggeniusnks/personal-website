"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer className="relative z-10 px-4 sm:px-6 lg:px-10 py-16 lg:py-24 no-print">
      <div className="mx-auto max-w-[980px] glass-panel p-8 sm:p-12 space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            LET&apos;S BUILD SOMETHING INTELLIGENT.
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {profile.fullName} — Computer Science (Artificial Intelligence) at {profile.university}. Open to AI engineering, machine learning, and research opportunities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex min-h-[44px] items-center gap-2.5 px-5 rounded-full bg-[var(--accent-primary)] text-white font-mono text-xs uppercase tracking-[0.06em] hover:bg-[var(--accent-primary-hover)] transition-colors cursor-pointer"
            aria-label={`Copy email address ${profile.email}`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Copied: {profile.email}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{profile.email}</span>
              </>
            )}
          </button>

          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-[44px] items-center gap-2 px-5 rounded-full hairline-border bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em] hover:border-[var(--border-strong)] transition-colors"
          >
            <Mail className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
            <span>Email</span>
          </a>

          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 px-5 rounded-full hairline-border bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em] transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
          </a>

          <a
            href={profile.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 px-5 rounded-full hairline-border bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em] transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
          </a>

          <Link
            href="/resume"
            className="inline-flex min-h-[44px] items-center gap-1.5 px-5 rounded-full hairline-border bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em] transition-colors"
          >
            <span>Printable CV</span>
          </Link>
        </div>

        <div className="pt-6 hairline-t flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[var(--text-muted)]">
          <span>© {new Date().getFullYear()} {profile.fullName} ({profile.displayName})</span>
          <span className="tabular-nums">SPATIAL AI PORTFOLIO · UNIVERSITI MALAYA</span>
        </div>
      </div>
    </footer>
  );
}
