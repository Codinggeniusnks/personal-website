"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, ArrowUpRight, FileText } from "lucide-react";
import { profile } from "@/data/profile";

const NAV_ITEMS = [
  { href: "/work", label: "Work", code: "01" },
  { href: "/about", label: "About", code: "02" },
  { href: "/achievements", label: "Credentials", code: "03" },
  { href: "/resume", label: "Resume", code: "04" },
  { href: "/contact", label: "Contact", code: "05" },
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
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 hairline-b bg-[var(--bg-glass)] backdrop-blur-md no-print">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2.5 focus:bg-[var(--accent-primary)] focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider"
      >
        Skip to main content
      </a>

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Signature */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group flex items-center gap-3 py-2 focus-visible:outline-offset-4"
              aria-label="Kai Sheng — Home"
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent-primary)] transition-transform duration-200 group-hover:scale-125" />
              <span className="font-display text-sm sm:text-base font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                {profile.displayName}
              </span>
              <span className="hidden md:inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)] pl-2 hairline-l">
                UM · CS (AI)
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                    active
                      ? "text-[var(--text-primary)] bg-[var(--accent-primary-soft)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[var(--accent-primary)] mr-1.5 tabular-nums">
                    {item.code}
                  </span>
                  {item.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--accent-primary)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Status & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 hairline-border bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-secondary)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-secondary)]" aria-hidden="true" />
              <span>OPEN FOR AI / ML ROLES</span>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center hairline-border bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Link
              href="/contact"
              className="hidden sm:inline-flex h-11 items-center gap-2 px-4 bg-[var(--accent-primary)] text-white font-mono text-xs font-medium uppercase tracking-[0.06em] hover:bg-[var(--accent-primary-hover)] transition-colors"
            >
              <span>Initiate Contact</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex lg:hidden h-11 w-11 items-center justify-center hairline-border bg-[var(--bg-surface)] text-[var(--text-primary)] cursor-pointer"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="lg:hidden hairline-t bg-[var(--bg-surface)] px-4 pt-3 pb-6"
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
                  className={`flex min-h-[48px] items-center justify-between py-3 px-2 text-base font-medium ${
                    active ? "text-[var(--accent-primary)]" : "text-[var(--text-primary)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
                      {item.code}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 hairline-t flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 px-4 bg-[var(--accent-primary)] text-white font-mono text-xs font-medium uppercase tracking-[0.06em]"
            >
              <span>Contact Kai Sheng</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/resume"
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 px-4 hairline-border bg-[var(--bg-elevated)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.06em]"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Inspect CV / Print</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
