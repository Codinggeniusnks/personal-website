"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Check,
  Eye,
  EyeOff,
  Lock,
  Plus,
  RotateCcw,
  Save,
  Star,
  StarOff,
  Trash2,
  Unlock,
} from "lucide-react";
import { initialAchievements, type Achievement } from "@/data/achievements";
import { getSupabaseConfig, upsertAchievementSupabase } from "@/lib/supabase";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const supabaseConfig = getSupabaseConfig();

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ks-achievements-admin");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAchievements(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 or env override
    if (pin === "1234" || pin === (process.env.NEXT_PUBLIC_ADMIN_PIN || "kaisheng")) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleToggleVisible = (id: string) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, visible: !a.visible } : a))
    );
  };

  const handleToggleFeatured = (id: string) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, featured: !a.featured } : a))
    );
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setAchievements((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy.map((item, idx) => ({ ...item, display_order: idx + 1 }));
    });
  };

  const handleMoveDown = (index: number) => {
    setAchievements((prev) => {
      if (index >= prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy.map((item, idx) => ({ ...item, display_order: idx + 1 }));
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      setAchievements((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleSaveAll = async () => {
    setSaveStatus("Saving...");
    try {
      localStorage.setItem("ks-achievements-admin", JSON.stringify(achievements));

      if (supabaseConfig.isConfigured) {
        for (const item of achievements) {
          await upsertAchievementSupabase(item);
        }
        setSaveStatus("Saved to Supabase & Local Cache!");
      } else {
        setSaveStatus("Saved locally (Supabase not configured in .env)");
      }
    } catch {
      setSaveStatus("Error saving records.");
    }

    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset achievements back to factory default data?")) {
      setAchievements(initialAchievements);
      localStorage.removeItem("ks-achievements-admin");
      setSaveStatus("Reset to default content.");
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setAchievements((prev) => {
      const exists = prev.some((a) => a.id === editingItem.id);
      if (exists) {
        return prev.map((a) => (a.id === editingItem.id ? editingItem : a));
      } else {
        return [...prev, { ...editingItem, display_order: prev.length + 1 }];
      }
    });

    setEditingItem(null);
  };

  // Locked View
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--bg-glass-active)] hairline-border space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] flex items-center justify-center">
              <Lock className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                Admin Authentication
              </h1>
              <p className="text-xs text-[var(--text-secondary)]">
                Private management portal for Kai Sheng&apos;s portfolio.
              </p>
            </div>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-pin" className="font-mono text-xs text-[var(--text-muted)] uppercase">
                Passcode / PIN (Default: 1234)
              </label>
              <input
                id="admin-pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-canvas)] hairline-border font-mono text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none"
              />
              {pinError && (
                <p className="text-xs text-rose-400 font-mono">Incorrect passcode. Try default: 1234</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] rounded-xl bg-[var(--accent-primary)] text-[#06090F] font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer"
            >
              Unlock Admin Portal
            </button>
          </form>

          <div className="pt-2 hairline-t text-center">
            <Link href="/" className="font-mono text-xs text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-10 max-w-[1200px] mx-auto space-y-8">
      {/* Top Controls Bar */}
      <header className="p-6 rounded-2xl bg-[var(--bg-glass-active)] hairline-border flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Unlock className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
            <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              Content Management Console
            </h1>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Supabase status:{" "}
            <span className={supabaseConfig.isConfigured ? "text-emerald-400" : "text-amber-400"}>
              {supabaseConfig.isConfigured ? "Connected (Live DB)" : "Local Storage Mode (Ready for Supabase URL/Key)"}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl hairline-border text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingItem({
                id: `ach-${Date.now()}`,
                year: new Date().getFullYear().toString(),
                title: "",
                competition: "",
                project: "",
                role: "Participant / Project Developer",
                recognitions: ["Gold Award"],
                category: "International Innovation",
                description: "",
                featured: true,
                visible: true,
                display_order: achievements.length + 1,
                certificates: [],
              });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+ Add Achievement</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-[#06090F] text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Changes</span>
          </button>

          <Link
            href="/achievements"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl hairline-border text-xs font-mono text-[var(--text-primary)] hover:border-[var(--accent-primary)]"
          >
            <span>View Public Page</span>
          </Link>
        </div>
      </header>

      {saveStatus && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Achievements Table */}
      <div className="overflow-x-auto rounded-2xl bg-[var(--bg-glass-active)] hairline-border p-2">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="hairline-b font-mono text-[11px] uppercase text-[var(--text-muted)]">
              <th className="p-3.5">Order</th>
              <th className="p-3.5">Title &amp; Competition</th>
              <th className="p-3.5">Role</th>
              <th className="p-3.5">Recognitions</th>
              <th className="p-3.5 text-center">Featured</th>
              <th className="p-3.5 text-center">Visible</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-hairline)] font-mono">
            {achievements.map((ach, idx) => (
              <tr key={ach.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-3.5 font-bold text-[var(--accent-primary)] tabular-nums">
                  {idx + 1}
                </td>
                <td className="p-3.5 font-sans">
                  <div className="font-bold text-[var(--text-primary)]">{ach.title}</div>
                  <div className="text-xs text-[var(--text-secondary)] font-mono">
                    {ach.year} · {ach.competition} ({ach.project})
                  </div>
                </td>
                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      ach.role.includes("Supervisor")
                        ? "bg-amber-950/60 text-amber-300 border border-amber-600/30"
                        : "bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {ach.role}
                  </span>
                </td>
                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1">
                    {ach.recognitions.map((r) => (
                      <span key={r} className="px-2 py-0.5 rounded bg-[var(--bg-canvas)] text-[10px] text-[var(--text-primary)]">
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(ach.id)}
                    title={ach.featured ? "Featured on Homepage" : "Not Featured"}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-amber-400 cursor-pointer"
                  >
                    {ach.featured ? <Star className="h-4 w-4 fill-amber-400" /> : <StarOff className="h-4 w-4 text-[var(--text-muted)]" />}
                  </button>
                </td>
                <td className="p-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleToggleVisible(ach.id)}
                    title={ach.visible ? "Visible on Public Site" : "Hidden"}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--accent-primary)] cursor-pointer"
                  >
                    {ach.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-rose-400" />}
                  </button>
                </td>
                <td className="p-3.5 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      title="Move Up"
                      className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === achievements.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      title="Move Down"
                      className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingItem(ach)}
                      className="px-2.5 py-1 rounded-lg bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[#06090F] transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(ach.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-950/40 text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-[var(--bg-glass-active)] hairline-border space-y-5 max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
              {editingItem.title ? `Edit: ${editingItem.title}` : "Add New Achievement"}
            </h2>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[var(--text-muted)] uppercase">Year</label>
                  <input
                    type="text"
                    required
                    value={editingItem.year}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] hairline-border text-[var(--text-primary)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[var(--text-muted)] uppercase">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] hairline-border text-[var(--text-primary)]"
                  >
                    <option value="International Innovation">International Innovation</option>
                    <option value="Supervisory Honour">Supervisory Honour</option>
                    <option value="National STEM">National STEM</option>
                    <option value="Commendation">Commendation</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[var(--text-muted)] uppercase">Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] hairline-border text-[var(--text-primary)] font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[var(--text-muted)] uppercase">Competition</label>
                  <input
                    type="text"
                    required
                    value={editingItem.competition}
                    onChange={(e) => setEditingItem({ ...editingItem, competition: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] hairline-border text-[var(--text-primary)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[var(--text-muted)] uppercase">Project</label>
                  <input
                    type="text"
                    required
                    value={editingItem.project}
                    onChange={(e) => setEditingItem({ ...editingItem, project: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] hairline-border text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[var(--text-muted)] uppercase">Role</label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] hairline-border text-[var(--text-primary)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[var(--text-muted)] uppercase">Recognitions (comma separated)</label>
                  <input
                    type="text"
                    value={editingItem.recognitions.join(", ")}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        recognitions: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] hairline-border text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[var(--text-muted)] uppercase">Description / Supervisory Attribution</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] hairline-border text-[var(--text-primary)] font-sans text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--text-muted)] uppercase">Verification URL</label>
                <input
                  type="url"
                  value={editingItem.verification_url || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, verification_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] hairline-border text-[var(--text-primary)]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.featured}
                    onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                    className="rounded"
                  />
                  <span>Featured on Homepage</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.visible}
                    onChange={(e) => setEditingItem({ ...editingItem, visible: e.target.checked })}
                    className="rounded"
                  />
                  <span>Visible</span>
                </label>
              </div>

              <div className="pt-4 hairline-t flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl hairline-border text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[var(--accent-primary)] text-[#06090F] font-semibold cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
