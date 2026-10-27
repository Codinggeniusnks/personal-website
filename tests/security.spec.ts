import { test, expect } from "@playwright/test";

test("anonymous /admin request cannot receive the management console", async ({ request }) => {
  const response = await request.get("/admin", { maxRedirects: 0 });
  const body = await response.text();
  expect(body).not.toContain("Content Management Console");
  expect(body).not.toContain("admin-pin");
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    expect([307, 308]).toContain(response.status());
    expect(response.headers().location).toBe("/login");
  } else {
    expect(response.status()).toBe(200);
    expect(body).toContain("Supabase is not configured");
  }
});
