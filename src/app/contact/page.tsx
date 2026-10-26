"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { SpatialAiCanvas } from "@/components/spatial/SpatialAiCanvas";
import { MagneticButton } from "@/components/spatial/InteractivePrimitives";

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
              Open to AI Engineering internships, Machine Learning roles, applied research
              collaborations, and technical opportunities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton onClick={handleCopyEmail} variant="primary">
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
            </MagneticButton>

            <MagneticButton
              href={`mailto:${profile.email}?subject=AI%20Engineering%20Opportunity%20%E2%80%94%20Ng%20Kai%20Sheng`}
              variant="glass"
            >
              <Mail className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
              <span>EMAIL</span>
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 hairline-t">
            <MagneticButton
              href={profile.githubUrl}
              external
              variant="outline"
              className="w-full"
            >
              <span>GITHUB</span>
              <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
            </MagneticButton>

            <MagneticButton
              href={profile.linkedInUrl}
              external
              variant="outline"
              className="w-full"
            >
              <span>LINKEDIN</span>
              <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
            </MagneticButton>

            <MagneticButton href="/resume" variant="outline" className="w-full">
              <FileText className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
              <span>PRINTABLE CV</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
