"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Award, Filter, Globe, Settings, ShieldCheck, UserCheck } from "lucide-react";
import { initialAchievements, type Achievement } from "@/data/achievements";
import { SpatialAiCanvas } from "@/components/spatial/SpatialAiCanvas";
import { AchievementCard } from "@/components/achievements/AchievementCard";
import { CertificateViewerModal } from "@/components/achievements/CertificateViewerModal";
import { MagneticButton } from "@/components/spatial/InteractivePrimitives";

type FilterType = "all" | "featured" | "supervisory" | "international" | "national";

export default function AchievementsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeModalAchievement, setActiveModalAchievement] = useState<Achievement | null>(null);

  const filteredAchievements = initialAchievements.filter((a) => {
    if (!a.visible) return false;
    if (filter === "featured") return a.featured;
    if (filter === "supervisory") return a.role.includes("Supervisor");
    if (filter === "international") return a.category === "International Innovation";
    if (filter === "national") return a.category === "National STEM";
    return true;
  });

  return (
    <div className="relative min-h-screen">
      <SpatialAiCanvas stage="journey" />

      <div className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-12">
        {/* Header Bar */}
        <header className="glass-workspace p-8 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 hairline-b">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent-primary)] font-semibold">
                VERIFIED DISTINCTIONS &amp; COMPETITION RECORDS
              </span>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hairline-border font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors"
            >
              <Settings className="h-3 w-3 text-[var(--accent-primary)]" aria-hidden="true" />
              <span>Admin Console</span>
            </Link>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.035em] text-[var(--text-primary)]">
              ACHIEVEMENTS &amp; RECOGNITION
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Grouped international and national competition records across AI healthcare, predictive
              modelling, and embedded systems. Supervisory attributions are transparently declared.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2" role="tablist" aria-label="Achievement category filters">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] mr-2">
              <Filter className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              <span>FILTER:</span>
            </div>
            {(
              [
                { id: "all", label: "All Recognitions" },
                { id: "featured", label: "Featured" },
                { id: "supervisory", label: "Project Supervisor" },
                { id: "international", label: "International Innovation" },
                { id: "national", label: "National STEM" },
              ] as const
            ).map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-[0.06em] transition-colors cursor-pointer ${
                    active
                      ? "bg-[var(--accent-primary)] text-[#06090F] font-semibold"
                      : "glass-panel text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onOpenViewer={(ach) => setActiveModalAchievement(ach)}
            />
          ))}
        </div>

        {/* Section 36: LinkedIn Extended Record Strip */}
        <div className="glass-workspace p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                MORE BEYOND THE HIGHLIGHTS
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore my full experience, achievements and professional journey on LinkedIn.
            </p>
          </div>

          <MagneticButton
            href="https://www.linkedin.com/in/ng-kai-sheng"
            external
            variant="primary"
          >
            <Globe className="h-4 w-4 text-[#06090F]" aria-hidden="true" />
            <span>VIEW LINKEDIN</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
        </div>

        {/* Certificate Viewer Modal */}
        <CertificateViewerModal
          achievement={activeModalAchievement}
          onClose={() => setActiveModalAchievement(null)}
        />
      </div>
    </div>
  );
}
