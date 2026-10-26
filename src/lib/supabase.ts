import { initialAchievements, type Achievement } from "@/data/achievements";

export interface SupabaseConfig {
  url: string | null;
  anonKey: string | null;
  isConfigured: boolean;
}

export function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || null;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null;
  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey),
  };
}

/**
 * Fetch achievements from Supabase if configured, or return local content fallback.
 */
export async function fetchLiveAchievements(): Promise<Achievement[]> {
  const config = getSupabaseConfig();

  if (!config.isConfigured || !config.url || !config.anonKey) {
    return initialAchievements;
  }

  try {
    const res = await fetch(`${config.url}/rest/v1/achievements?select=*&order=display_order.asc`, {
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn("Supabase fetch returned non-200. Falling back to local data.", res.status);
      return initialAchievements;
    }

    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data as Achievement[];
    }
    return initialAchievements;
  } catch (error) {
    console.error("Error communicating with Supabase:", error);
    return initialAchievements;
  }
}

/**
 * Save or update achievement in Supabase if configured.
 */
export async function upsertAchievementSupabase(achievement: Achievement): Promise<{ success: boolean; error?: string }> {
  const config = getSupabaseConfig();

  if (!config.isConfigured || !config.url || !config.anonKey) {
    return { success: true };
  }

  try {
    const res = await fetch(`${config.url}/rest/v1/achievements`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(achievement),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { success: false, error: errText };
    }

    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
