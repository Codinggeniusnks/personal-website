"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorMode, setCursorMode] = useState<"default" | "interactive" | "view" | "drag">("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let rafId = 0;

    const handlePointerMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }

      const el = (e.target as HTMLElement | null)?.closest(
        "[data-cursor], a, button, [role='tab']"
      ) as HTMLElement | null;
      if (!el) {
        setCursorMode("default");
      } else {
        const attr = el.getAttribute("data-cursor");
        if (attr === "view") setCursorMode("view");
        else if (attr === "drag") setCursorMode("drag");
        else setCursorMode("interactive");
      }
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  if (!enabled) return null;

  const isExpanded = cursorMode === "view" || cursorMode === "drag";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden lg:block no-print">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[var(--accent-primary)] transition-opacity duration-150"
        style={{ opacity: isExpanded ? 0 : 0.9 }}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border transition-[width,height,margin,background-color,border-color] duration-200 ${
          isExpanded
            ? "-ml-8 -mt-8 h-16 w-16 border-[var(--accent-primary)] bg-[var(--bg-glass-active)] font-mono text-[10px] font-semibold tracking-[0.12em] text-[var(--accent-primary)]"
            : cursorMode === "interactive"
            ? "-ml-5 -mt-5 h-10 w-10 border-[var(--accent-primary)] bg-[var(--accent-primary-soft)]"
            : "-ml-3.5 -mt-3.5 h-7 w-7 border-[var(--border-strong)] bg-transparent"
        }`}
      >
        {cursorMode === "view" ? "VIEW" : cursorMode === "drag" ? "DRAG" : null}
      </div>
    </div>
  );
}

interface MagneticProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant?: "primary" | "glass" | "outline";
  cursorType?: "interactive" | "view";
  className?: string;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  href,
  external,
  onClick,
  onMouseEnter,
  onMouseLeave,
  variant = "primary",
  cursorType = "interactive",
  className = "",
  ariaLabel,
}: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const dx = ((relX - rect.width / 2) / (rect.width / 2)) * 5.5;
    const dy = ((relY - rect.height / 2) / (rect.height / 2)) * 4.5;
    setOffset({ x: dx, y: dy });
    setSpot({
      x: Math.round((relX / rect.width) * 100),
      y: Math.round((relY / rect.height) * 100),
      active: true,
    });
  };

  const handleReset = () => {
    setOffset({ x: 0, y: 0 });
    setSpot((s) => ({ ...s, active: false }));
    onMouseLeave?.();
  };

  const baseStyles =
    variant === "primary"
      ? "bg-[var(--accent-primary)] text-slate-950 font-semibold hover:bg-[var(--accent-primary-hover)] border border-transparent"
      : variant === "outline"
      ? "bg-[var(--bg-canvas)] hairline-border text-[var(--text-primary)] hover:border-[var(--accent-primary)]"
      : "glass-panel text-[var(--text-primary)] hover:border-[var(--border-strong)]";

  const sharedClasses = `group relative inline-flex min-h-[48px] items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 font-mono text-xs uppercase tracking-[0.08em] transition-all duration-200 cursor-pointer ${baseStyles} ${className}`;

  const innerContent = (
    <>
      {spot.active && variant !== "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(34, 211, 238, 0.22), transparent 70%)`,
          }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-0.5">
        {children}
      </span>
    </>
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleReset}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: spot.active
          ? "transform 120ms ease-out"
          : "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className="inline-block"
    >
      {href ? (
        external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            data-cursor={cursorType}
            aria-label={ariaLabel}
            className={sharedClasses}
          >
            {innerContent}
          </a>
        ) : (
          <Link
            href={href}
            onClick={onClick}
            data-cursor={cursorType}
            aria-label={ariaLabel}
            className={sharedClasses}
          >
            {innerContent}
          </Link>
        )
      ) : (
        <button
          type="button"
          onClick={onClick}
          data-cursor={cursorType}
          aria-label={ariaLabel}
          className={sharedClasses}
        >
          {innerContent}
        </button>
      )}
    </div>
  );
}
