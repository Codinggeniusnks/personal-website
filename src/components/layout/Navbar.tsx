"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, ArrowUpRight, FileText } from "lucide-react";
import { profile } from "@/data/profile";

const NAV_ITEMS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#what-i-build", label: "Capabilities" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("ks-theme") as "dark" | "light" | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.dataset.theme = saved;
    } else {
      document.documentElement.dataset.theme = "dark";
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("ks-theme", next);
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 pt-4 px-4 sm:px-6 no-print">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2.5 focus:bg-[var(--accent-primary)] focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider focus:rounded-full"
      >
        Skip to main content
      </a>

      {/* Compact Floating Glass Navigation Bar */}
      <div className="mx-auto max-w-[980px] glass-panel px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 py-1.5 focus-visible:outline-offset-4"
          aria-label="Kai Sheng — Spatial AI Portfolio Home"
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-[var(--accent-primary)] transition-transform duration-300 group-hover:scale-125" />
          <span className="font-display text-sm font-bold tracking-[0.08em] text-[var(--text-primary)]">
            {profile.displayName}
          </span>
        </Link>

        {/* Desktop Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-200 ${
                  active
                    ? "bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <Link
            href="/resume"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hairline-border font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FileText className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
            <span>CV</span>
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hairline-border text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-full hairline-border text-[var(--text-primary)] cursor-pointer"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Compact Mobile Floating Sheet */}
      {menuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="md:hidden mx-auto max-w-[980px] mt-2 glass-panel-active p-4 space-y-2"
        >
          <div className="flex flex-col divide-y divide-[var(--border-hairline)]">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-[44px] items-center justify-between py-2.5 px-2 font-mono text-xs uppercase tracking-[0.08em] ${
                    active ? "text-[var(--accent-primary)] font-semibold" : "text-[var(--text-primary)]"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 hairline-t flex gap-2">
            <Link
              href="/resume"
              onClick={() => setMenuOpen(false)}
              className="flex-1 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full hairline-border font-mono text-xs uppercase tracking-[0.06em] text-[var(--text-primary)]"
            >
              <FileText className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              <span>CV / Print</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex-1 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] text-white font-mono text-xs uppercase tracking-[0.06em]"
            >
              <span>Contact</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
