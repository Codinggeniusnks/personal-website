import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return <p>Supabase is not configured.</p>;
  }

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login");

  const { data: owner, error: ownerError } = await supabase
    .from("portfolio_owners")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (ownerError || !owner) redirect("/");

  return children;
}
