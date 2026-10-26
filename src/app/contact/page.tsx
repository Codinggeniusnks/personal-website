"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { SpatialAiCanvas } from "@/components/spatial/SpatialAiCanvas";

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="relative min-h-[82vh] flex items-center">
      {/* Calm Contact State for AI Core */}
      <SpatialAiCanvas stage="contact" />

      <div className="relative z-10 mx-auto max-w-[820px] w-full px-4 sm:px-6 lg:px-10 py-16">
        <div className="glass-workspace p-8 sm:p-14 space-y-8">
          <div className="space-y-4">
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.035em] leading-[1.05] text-[var(--text-primary)]">
              LET&apos;S BUILD SOMETHING INTELLIGENT.
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Open to AI Engineering internships, Machine Learning roles, applied research collaborations, and technical opportunities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex min-h-[48px] items-center gap-2.5 px-6 rounded-full bg-[var(--accent-primary)] text-white font-mono text-xs font-medium uppercase tracking-[0.08em] hover:bg-[var(--accent-primary-hover)] transition-colors cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>Copied: {profile.email}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>{profile.email}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${profile.email}?subject=AI%20Engineering%20Opportunity%20%E2%80%94%20Ng%20Kai%20Sheng`}
              className="inline-flex min-h-[48px] items-center gap-2 px-6 rounded-full glass-panel text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.08em] hover:border-[var(--border-strong)] transition-colors"
            >
              <Mail className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
              <span>Launch Mail</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 hairline-t">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 flex items-center justify-between hover:border-[var(--accent-primary)] transition-colors"
            >
              <div>
                <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">GitHub</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[var(--text-primary)]">
                  @{profile.githubHandle}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
            </a>

            <a
              href={profile.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 flex items-center justify-between hover:border-[var(--accent-primary)] transition-colors"
            >
              <div>
                <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">LinkedIn</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[var(--text-primary)]">
                  Ng Kai Sheng
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
            </a>

            <Link
              href="/resume"
              className="glass-panel p-4 flex items-center justify-between hover:border-[var(--accent-primary)] transition-colors"
            >
              <div>
                <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">Curriculum Vitae</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[var(--text-primary)]">
                  Print-Ready CV
                </div>
              </div>
              <FileText className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
