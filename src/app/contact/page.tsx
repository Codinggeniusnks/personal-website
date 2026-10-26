"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, FileText, Mail, Send } from "lucide-react";
import { profile } from "@/data/profile";

const TOPIC_OPTIONS = [
  "AI / ML Engineering Internship",
  "Software Engineering Opportunity",
  "University Research Collaboration",
  "Hackathon / Technical Partnership",
];

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [topic, setTopic] = useState(TOPIC_OPTIONS[0]);
  const [senderName, setSenderName] = useState("");
  const [senderOrg, setSenderOrg] = useState("");
  const [message, setMessage] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleDispatchEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[${topic}] — ${senderName || "Engineering Inquiry"}${senderOrg ? ` (${senderOrg})` : ""}`
    );
    const body = encodeURIComponent(
      `Hi Kai Sheng,\n\n${
        message || "I reviewed your engineering portfolio and would like to connect regarding an opportunity."
      }\n\nBest regards,\n${senderName || ""}${senderOrg ? `\n${senderOrg}` : ""}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-16">
      <header className="pb-10 hairline-b space-y-4 max-w-3xl">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.035em] text-[var(--text-primary)]">
          Direct Connection &amp; Opportunity Dispatch
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          Currently open to AI Engineering internships, Machine Learning engineering opportunities, research collaborations, and technical interviews. Reach out directly via institutional email, LinkedIn, or GitHub.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left 6 Columns: Direct Channels & Availability */}
        <div className="lg:col-span-6 space-y-6">
          <div className="surface-card p-6 sm:p-8 space-y-6">
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              01 / Primary Institutional Channel
            </h2>

            <div className="p-4 hairline-border bg-[var(--bg-canvas)] flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] uppercase text-[var(--text-muted)]">
                  Universiti Malaya Email
                </div>
                <div className="mt-1 font-mono text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                  {profile.email}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[44px] items-center gap-2 px-4 bg-[var(--accent-primary)] text-white font-mono text-xs uppercase tracking-[0.06em] cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-[44px] items-center gap-2 px-4 hairline-border bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-xs uppercase"
                >
                  <Mail className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                  <span>Mailto</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 hairline-border bg-[var(--bg-canvas)] hover:border-[var(--accent-primary)] transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-mono text-xs text-[var(--text-muted)]">GITHUB PROFILE</div>
                  <div className="mt-1 font-display text-base font-bold text-[var(--text-primary)]">
                    @{profile.githubHandle}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
              </a>

              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 hairline-border bg-[var(--bg-canvas)] hover:border-[var(--accent-primary)] transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-mono text-xs text-[var(--text-muted)]">LINKEDIN NETWORK</div>
                  <div className="mt-1 font-display text-base font-bold text-[var(--text-primary)]">
                    Ng Kai Sheng
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="surface-card p-6 sm:p-8 space-y-4">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
              02 / Target Roles &amp; Collaboration Scope
            </h2>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-secondary)]" />
                <span>AI Engineer &amp; Machine Learning Engineer Internships</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-secondary)]" />
                <span>Applied Time-Series Forecasting &amp; NLP Engineering</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-secondary)]" />
                <span>Embedded Intelligence, Edge IoT &amp; Biomedical Telemetry</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-secondary)]" />
                <span>University Research Labs &amp; High-Impact Hackathons</span>
              </li>
            </ul>
            <div className="pt-3 hairline-t">
              <Link
                href="/resume"
                className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-[var(--accent-primary)] hover:underline"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Inspect or Print 1-Page Engineering CV →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Structured Direct Dispatch Composer */}
        <div className="lg:col-span-6 surface-card p-6 sm:p-8 space-y-6">
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
            03 / Structured Message Launcher
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Compose a structured inquiry below. Submitting opens your configured mail client addressed to{" "}
            <span className="font-mono text-[var(--text-primary)]">{profile.email}</span> with zero third-party tracking.
          </p>

          <form onSubmit={handleDispatchEmail} className="space-y-4">
            <div>
              <label htmlFor="contact-topic" className="block font-mono text-xs uppercase text-[var(--text-muted)] mb-2">
                Inquiry Classification
              </label>
              <select
                id="contact-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2 hairline-border bg-[var(--bg-canvas)] text-sm text-[var(--text-primary)] font-mono"
              >
                {TOPIC_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block font-mono text-xs uppercase text-[var(--text-muted)] mb-2">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Jane Tan"
                  className="w-full min-h-[44px] px-3.5 py-2 hairline-border bg-[var(--bg-canvas)] text-sm text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label htmlFor="contact-org" className="block font-mono text-xs uppercase text-[var(--text-muted)] mb-2">
                  Team / Organisation
                </label>
                <input
                  id="contact-org"
                  type="text"
                  value={senderOrg}
                  onChange={(e) => setSenderOrg(e.target.value)}
                  placeholder="e.g. AI Systems Team"
                  className="w-full min-h-[44px] px-3.5 py-2 hairline-border bg-[var(--bg-canvas)] text-sm text-[var(--text-primary)]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block font-mono text-xs uppercase text-[var(--text-muted)] mb-2">
                Message / Role Context
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share role details, timeline, or technical questions..."
                className="w-full p-3.5 hairline-border bg-[var(--bg-canvas)] text-sm text-[var(--text-primary)]"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 bg-[var(--accent-primary)] text-white font-mono text-xs font-medium uppercase tracking-[0.06em] hover:bg-[var(--accent-primary-hover)] transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Launch Pre-Addressed Email</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
