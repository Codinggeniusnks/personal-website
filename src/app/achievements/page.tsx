import React from "react";
import type { Metadata } from "next";
import { SpatialAiCanvas } from "@/components/spatial/SpatialAiCanvas";

export const metadata: Metadata = {
  title: "Achievements — Modular Placeholder Architecture",
  description:
    "Reusable achievement section infrastructure for Kai Sheng's AI Engineer portfolio.",
};

export interface AchievementSlotSchema {
  id: string;
  title: string;
  competition: string;
  award: string;
  year: string;
  organisation: string;
  image?: string;
  description: string;
  verificationLink?: string;
}

const ACHIEVEMENT_PLACEHOLDERS: AchievementSlotSchema[] = [
  {
    id: "slot-01",
    title: "[ Achievement item placeholder ]",
    competition: "[ Competition / Programme field ]",
    award: "[ Award / Distinction field ]",
    year: "[ Year ]",
    organisation: "[ Issuing Organisation field ]",
    description:
      "Editable schema slot supporting title, competition, award, year, organisation, image, description, and verification link.",
    verificationLink: "#",
  },
  {
    id: "slot-02",
    title: "[ Achievement item placeholder ]",
    competition: "[ Competition / Programme field ]",
    award: "[ Award / Distinction field ]",
    year: "[ Year ]",
    organisation: "[ Issuing Organisation field ]",
    description:
      "Editable schema slot supporting title, competition, award, year, organisation, image, description, and verification link.",
    verificationLink: "#",
  },
  {
    id: "slot-03",
    title: "[ Achievement item placeholder ]",
    competition: "[ Competition / Programme field ]",
    award: "[ Award / Distinction field ]",
    year: "[ Year ]",
    organisation: "[ Issuing Organisation field ]",
    description:
      "Editable schema slot supporting title, competition, award, year, organisation, image, description, and verification link.",
    verificationLink: "#",
  },
];

export default function AchievementsPlaceholderPage() {
  return (
    <div className="relative min-h-[82vh]">
      <SpatialAiCanvas stage="journey" />

      <div className="relative z-10 mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-10 py-14 lg:py-20 space-y-10">
        <header className="max-w-2xl space-y-3">
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.035em] text-[var(--text-primary)]">
            ACHIEVEMENTS
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Modular achievements component architecture ready for custom ordering and final records.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENT_PLACEHOLDERS.map((slot) => (
            <article
              key={slot.id}
              className="glass-panel p-6 flex flex-col justify-between space-y-5 border-dashed"
            >
              <div className="space-y-3">
                <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  {slot.title}
                </h2>
                <div className="font-mono text-xs text-[var(--accent-primary)]">
                  {slot.award} · {slot.year}
                </div>
                <div className="font-mono text-xs text-[var(--text-secondary)]">
                  {slot.competition} — {slot.organisation}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {slot.description}
                </p>
              </div>

              <div className="pt-3 hairline-t font-mono text-[11px] text-[var(--text-muted)]">
                Fields: title · competition · award · year · organisation · image · description · verificationLink
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
