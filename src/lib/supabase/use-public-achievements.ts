"use client";

import { useEffect, useState } from "react";
import { getAllVisibleAchievements, type Achievement } from "@/data/achievements";
import { createClient } from "./browser";

const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

export function usePublicAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(configured ? [] : getAllVisibleAchievements());

  useEffect(() => {
    if (!configured) return;
    createClient().from("achievements").select("*").eq("visible", true).order("display_order")
      .then(({ data, error }) => {
        if (error) console.error("Unable to load achievements:", error.message);
        else setAchievements((data ?? []) as Achievement[]);
      });
  }, []);

  return achievements;
}
