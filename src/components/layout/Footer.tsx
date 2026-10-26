"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, ArrowUpRight, Mail, FileText } from "lucide-react";
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
    <footer className="hairline-t bg-[var(--bg-surface)] no-print">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        {/* Top Ledger Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 hairline-b font-mono text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-secondary)]" aria-hidden="true" />
            <span>TERMINAL DOCK · DIRECT CHANNEL OPEN</span>
          </div>
          <div className="tabular-nums">
            <span>{profile.location.toUpperCase()}</span>
            <span className="mx-2">·</span>
            <span>UNIVERSITI MALAYA (CS — AI)</span>
          </div>
        </div>

        {/* Main Closing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12 hairline-b">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.06] text-[var(--text-primary)]">
              Let&apos;s build something intelligent.
            </h2>
            <p className="max-w-2xl text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Available for AI Engineer internships, Machine Learning engineering roles, applied research collaborations, and high-stakes technical hackathons. Every system documented here was engineered for measurable real-world reliability.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex min-h-[48px] items-center gap-3 px-5 bg-[var(--accent-primary)] text-white font-mono text-xs font-medium uppercase tracking-[0.06em] hover:bg-[var(--accent-primary-hover)] transition-colors cursor-pointer"
                aria-label={`Copy email address ${profile.email}`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>Copied: {profile.email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    <span>Copy {profile.email}</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${profile.email}?subject=AI%20Engineering%20Opportunity%20%E2%80%94%20Ng%20Kai%20Sheng`}
                className="inline-flex min-h-[48px] items-center gap-2.5 px-5 hairline-border bg-[var(--bg-elevated)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em] hover:border-[var(--border-strong)] transition-colors"
              >
                <Mail className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                <span>Launch Mail Client</span>
              </a>

              <Link
                href="/resume"
                className="inline-flex min-h-[48px] items-center gap-2.5 px-5 hairline-border bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em] transition-colors"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Print-Ready CV</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pl-8 lg: border-l lg:border-[var(--border-hairline)]">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-muted)] mb-4">
                System Directory
              </div>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    00 / Overview &amp; Signal Bench
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    01 / Engineering Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/work/cardioxy-pro" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    01.1 / CardiOxy Pro (IoT + Early Warning)
                  </Link>
                </li>
                <li>
                  <Link href="/work/foodresilience" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    01.2 / FoodResilience (1d–30d ML)
                  </Link>
                </li>
                <li>
                  <Link href="/work/occupational-skills-demand" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    01.3 / Occupational Skills &amp; Demand NLP
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    02 / Engineering Philosophy
                  </Link>
                </li>
                <li>
                  <Link href="/achievements" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    03 / Honours &amp; Credentials
                  </Link>
                </li>
                <li>
                  <Link href="/resume" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    04 / Curriculum Vitae
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    05 / Direct Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-muted)] mb-4">
                Verified Profiles
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <span>GitHub (@{profile.githubHandle})</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <span>LinkedIn (Ng Kai Sheng)</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <span>{profile.email}</span>
                  </a>
                </li>
              </ul>

              <div className="mt-8 p-3.5 hairline-border bg-[var(--bg-canvas)]">
                <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
                  Key Distinctions
                </div>
                <p className="mt-1.5 font-mono text-xs text-[var(--text-secondary)] leading-relaxed tabular-nums">
                  BIICC 2026 Best AI Tech + Gold · ISIC-WOU24 Gold · KMK CGPA 4.00 · SPM 10A
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} {profile.fullName} ({profile.displayName}). Engineered with Next.js, TypeScript, Tailwind CSS &amp; Motion.
          </div>
          <div className="tabular-nums">
            PRECISION FIELD INSTRUMENT · REV 2026.10
          </div>
        </div>
      </div>
    </footer>
  );
}
