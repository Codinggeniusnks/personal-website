"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Award, FileText, UserCheck } from "lucide-react";
import type { Achievement } from "@/data/achievements";

interface AchievementCardProps {
  achievement: Achievement;
  onOpenViewer: (achievement: Achievement) => void;
}

export function AchievementCard({ achievement, onOpenViewer }: AchievementCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -4.5;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 4.5;
    setRotation({ x: rx, y: ry });
    setSpotlight({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, active: false }));
  };

  const isSupervisor = achievement.role.includes("Supervisor");

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: prefersReducedMotion
          ? undefined
          : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: spotlight.active
          ? "transform 100ms ease-out"
          : "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className="group relative glass-workspace p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[var(--accent-primary)] transition-colors overflow-hidden"
    >
      {/* Optical Glass Spotlight Effect */}
      {spotlight.active && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(34, 211, 238, 0.16), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 space-y-4">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 hairline-b">
          <span className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
            {achievement.year} · {achievement.category.toUpperCase()}
          </span>

          {isSupervisor ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--accent-amber-soft)] text-[var(--accent-amber)] font-mono text-[11px] font-semibold">
              <UserCheck className="h-3 w-3" aria-hidden="true" />
              <span>PROJECT SUPERVISOR</span>
            </span>
          ) : (
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              {achievement.role}
            </span>
          )}
        </div>

        {/* Title & Competition */}
        <div className="space-y-1.5">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
            {achievement.title}
          </h3>
          <p className="font-mono text-xs text-[var(--text-secondary)]">
            Project: <strong className="text-[var(--text-primary)]">{achievement.project}</strong>
          </p>
        </div>

        {/* Recognitions List */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {achievement.recognitions.map((rec) => (
            <span
              key={rec}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-canvas)] hairline-border text-[var(--text-primary)] font-mono text-xs font-medium"
            >
              <Award className="h-3 w-3 text-[var(--accent-primary)] shrink-0" aria-hidden="true" />
              <span>{rec}</span>
            </span>
          ))}
        </div>

        {/* Description / Attribution Note */}
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {achievement.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 pt-4 hairline-t flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onOpenViewer(achievement)}
          data-cursor="view"
          className="inline-flex min-h-[42px] items-center gap-2 px-4 rounded-full bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[#06090F] font-mono text-xs uppercase tracking-[0.06em] font-semibold transition-colors cursor-pointer"
        >
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          <span>View Certificates ({achievement.certificates.length})</span>
        </button>

        <span className="font-mono text-[11px] text-[var(--text-muted)]">
          ORDER 0{achievement.display_order}
        </span>
      </div>
    </div>
  );
}
