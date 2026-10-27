"use client";

import React, { useState } from "react";
import { ArrowUpRight, Award, Globe, ShieldCheck } from "lucide-react";
import { type Achievement } from "@/data/achievements";
import { usePublicAchievements } from "@/lib/supabase/use-public-achievements";
import { AchievementCard } from "./AchievementCard";
import { CertificateViewerModal } from "./CertificateViewerModal";
import { MagneticButton } from "@/components/spatial/InteractivePrimitives";

interface SelectedRecognitionSectionProps {
  achievements?: Achievement[];
}

export function SelectedRecognitionSection({
  achievements,
}: SelectedRecognitionSectionProps) {
  const [activeModalAchievement, setActiveModalAchievement] = useState<Achievement | null>(null);

  const liveAchievements = usePublicAchievements();
  const featured = (achievements ?? liveAchievements).filter((a) => a.visible && a.featured).sort((a, b) => a.display_order - b.display_order);

  return (
    <section id="recognition" className="py-16 lg:py-24 space-y-12 scroll-mt-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 hairline-b">
        <div className="space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            SELECTED RECOGNITION
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            International and national STEM innovation honours earned across healthcare telemetry,
            predictive AI, and embedded computing. Supervised competitions are explicitly identified.
          </p>
        </div>

        <span className="font-mono text-xs text-[var(--accent-primary)]">
          5 GROUPED COMPETITIONS · MULTI-AWARD RECORDS
        </span>
      </div>

      {/* Featured Achievements Grid (Sections 26 & 28) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            onOpenViewer={(ach) => setActiveModalAchievement(ach)}
          />
        ))}
      </div>

      {/* Section 36: MORE BEYOND THE HIGHLIGHTS + Magnetic LinkedIn CTA */}
      <div className="glass-workspace p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              MORE BEYOND THE HIGHLIGHTS
            </h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Explore my full experience, achievements and professional journey on LinkedIn.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <MagneticButton
            href="https://www.linkedin.com/in/ng-kai-sheng"
            external
            variant="primary"
          >
            <Globe className="h-4 w-4 text-[#06090F]" aria-hidden="true" />
            <span>VIEW LINKEDIN</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>

          <MagneticButton href="/achievements" variant="glass">
            <span>ALL AWARDS &amp; CERTIFICATES →</span>
          </MagneticButton>
        </div>
      </div>

      {/* Interactive Certificate Viewer Modal */}
      <CertificateViewerModal
        achievement={activeModalAchievement}
        onClose={() => setActiveModalAchievement(null)}
      />
    </section>
  );
}
