"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  X,
} from "lucide-react";
import type { Achievement, CertificateItem } from "@/data/achievements";

interface CertificateViewerModalProps {
  achievement: Achievement | null;
  initialIndex?: number;
  onClose: () => void;
}

export function CertificateViewerModal({
  achievement,
  initialIndex = 0,
  onClose,
}: CertificateViewerModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, achievement]);

  useEffect(() => {
    if (!achievement) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [achievement, currentIndex]);

  if (!achievement) return null;

  const certs = achievement.certificates;
  const currentCert: CertificateItem | undefined = certs[currentIndex] || certs[0];
  const total = certs.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Certificate viewer for ${achievement.title}`}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8"
      >
        {/* Softened Optical Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#06090F]/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl glass-workspace p-6 sm:p-8 space-y-6 shadow-2xl border border-[var(--border-strong)]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 hairline-b">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[var(--accent-cyan-soft)] text-[var(--accent-primary)] font-mono text-xs font-semibold">
                {achievement.category.toUpperCase()}
              </span>
              <span className="font-mono text-xs text-[var(--text-secondary)]">
                {achievement.year} · ROLE: {achievement.role.toUpperCase()}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close certificate viewer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full glass-panel hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Certificate Document Canvas */}
          <div className="relative rounded-2xl bg-[var(--bg-canvas)] hairline-border p-6 sm:p-8 overflow-hidden min-h-[300px] flex flex-col justify-between">
            {/* Top Certificate Status Ribbon */}
            <div className="flex items-center justify-between gap-2 pb-6 hairline-b">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent-primary)]">
                  VERIFIED DISTINCTION RECORD
                </span>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
                CERTIFICATE {currentIndex + 1} OF {total}
              </span>
            </div>

            {/* Certificate Core Content */}
            <div className="my-auto py-6 space-y-4 text-center max-w-xl mx-auto">
              {currentCert?.badge && (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--accent-amber-soft)] text-[var(--accent-amber)] font-mono text-xs font-semibold">
                  <Award className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{currentCert.badge}</span>
                </div>
              )}

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-[-0.02em]">
                {currentCert?.title || achievement.title}
              </h2>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Presented by <strong className="text-[var(--text-primary)] font-medium">{currentCert?.issuer || achievement.competition}</strong> in recognition of project excellence on <strong className="text-[var(--accent-primary)] font-medium">{achievement.project}</strong>.
              </p>

              {currentCert?.imageUrl && (
                <a href={currentCert.imageUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--accent-primary)] underline text-sm">
                  Open original certificate <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              )}
              {achievement.role === "Project Supervisor" && (
                <div className="p-3 rounded-xl bg-[var(--bg-glass)] hairline-border text-xs text-[var(--text-secondary)] text-left flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[var(--text-primary)]">Supervisory Attribution:</strong> Ng Kai Sheng is formally designated as Project Supervisor on this competition record, overseeing architecture, algorithms, and system verification.
                  </span>
                </div>
              )}
            </div>

            {/* Footer Verification Row */}
            <div className="pt-4 hairline-t flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-mono text-[11px] text-[var(--text-muted)]">
                COMPETITION: {achievement.competition}
              </span>

              {achievement.verification_url && (
                <a
                  href={achievement.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Verification Portal</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Carousel Controls */}
          {total > 1 && (
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex min-h-[40px] items-center gap-2 px-4 rounded-full glass-panel text-xs font-mono uppercase tracking-[0.06em] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
                <span>Previous</span>
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Certificate navigation">
                {certs.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={i === currentIndex}
                    aria-label={`Go to certificate ${i + 1}`}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === currentIndex
                        ? "w-6 bg-[var(--accent-primary)]"
                        : "w-2 bg-[var(--border-strong)] hover:bg-[var(--text-muted)]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex min-h-[40px] items-center gap-2 px-4 rounded-full glass-panel text-xs font-mono uppercase tracking-[0.06em] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
