"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/spatial/InteractivePrimitives";

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
      <div className="mx-auto max-w-[1040px] glass-panel p-8 sm:p-12 space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            LET&apos;S BUILD SOMETHING INTELLIGENT.
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {profile.fullName} — Computer Science (Artificial Intelligence) at {profile.university}. Available for AI engineering, machine learning, and software opportunities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton
            variant="primary"
            href={`mailto:${profile.email}`}
            ariaLabel="Send email to Kai Sheng"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <span>EMAIL</span>
          </MagneticButton>

          <MagneticButton
            variant="glass"
            href={profile.githubUrl}
            external
            ariaLabel="Open GitHub profile"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
          </MagneticButton>

          <MagneticButton
            variant="glass"
            href={profile.linkedInUrl}
            external
            ariaLabel="Open LinkedIn profile"
          >
            <span>LINKEDIN</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
          </MagneticButton>

          <MagneticButton
            variant="glass"
            onClick={handleCopyEmail}
            ariaLabel={`Copy email ${profile.email}`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
                <span>COPIED: {profile.email}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
                <span>{profile.email}</span>
              </>
            )}
          </MagneticButton>
        </div>

        <div className="pt-6 hairline-t flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[var(--text-muted)]">
          <span>© {new Date().getFullYear()} {profile.fullName} ({profile.displayName})</span>
          <span className="tabular-nums">UNIVERSITI MALAYA · ARTIFICIAL INTELLIGENCE</span>
        </div>
      </div>
    </footer>
  );
}
