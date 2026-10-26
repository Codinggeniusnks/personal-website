import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { width: 1920, height: 1080, name: "1920x1080-desktop" },
  { width: 1440, height: 900, name: "1440x900-laptop" },
  { width: 1280, height: 800, name: "1280x800-compact-laptop" },
  { width: 1024, height: 768, name: "1024x768-tablet-landscape" },
  { width: 768, height: 1024, name: "768x1024-tablet-portrait" },
  { width: 430, height: 932, name: "430x932-large-phone" },
  { width: 390, height: 844, name: "390x844-standard-phone" },
  { width: 360, height: 800, name: "360x800-compact-phone" },
];

test.describe("Kai Sheng Employer-Focused Interactive 3D Portfolio — Multi-Viewport & Technical QA", () => {
  test("Homepage 5-second employer clarity, 3D AI Core satellites, What I Build, Technical Stack, and all 8 viewports pass with zero overflow", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await expect(page.locator("h1")).toContainText("KAI SHENG");
    await expect(page.getByText("AI ENGINEER & CREATIVE TECHNOLOGIST")).toBeVisible();
    await expect(
      page.getByText("I build intelligent systems that turn data into predictions")
    ).toBeVisible();

    // Verify primary magnetic CTA and employer sections
    await expect(page.getByRole("link", { name: /VIEW MY WORK/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "FEATURED PROJECTS" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "WHAT I BUILD" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "TECHNICAL STACK" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "ABOUT ME" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /EDUCATION & JOURNEY/i })).toBeVisible();

    // Test interactive 3D satellite node selection in Featured Projects
    await page
      .locator("#featured-projects")
      .getByRole("tab", { name: /02 — FOODRESILIENCE/i })
      .click();
    await expect(
      page.locator("#featured-projects").getByText("3D SATELLITE LOCKED: 02")
    ).toBeVisible();

    await page
      .locator("#featured-projects")
      .getByRole("tab", { name: /03 — OCCUPATIONAL SKILLS/i })
      .click();
    await expect(
      page.locator("#featured-projects").getByText("3D SATELLITE LOCKED: 03")
    ).toBeVisible();

    // Check all 8 viewports for zero horizontal overflow
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(overflow, `Horizontal overflow detected at ${vp.name}`).toBe(false);
    }

    expect(errors).toEqual([]);
  });

  test("All 3 employer case studies (11-section structure + interactive metaphors) and modular placeholders work cleanly", async ({
    page,
  }) => {
    // 1. Work Index
    await page.goto("/work");
    await expect(page.locator("h1")).toContainText("Engineering Case Studies");

    // 2. CardiOxy Pro 11-Section Employer Case Study + Patient -> Sensor -> AI -> Cloud -> Doctor -> Alert metaphor
    await page.goto("/work/cardioxy-pro");
    await expect(page.locator("h1")).toContainText("CardiOxy Pro");
    await expect(page.getByRole("heading", { name: "01. OVERVIEW" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "05. SYSTEM ARCHITECTURE & INTERACTIVE SIMULATION" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "11. FUTURE IMPROVEMENTS" })).toBeVisible();
    await page.getByRole("button", { name: /Explore Model Logic/i }).click();
    await expect(
      page.getByText(/Monitors physiological rate-of-change derivatives/i)
    ).toBeVisible();

    // 3. FoodResilience Case Study + DATA -> FORECAST -> PRICE -> INVENTORY -> DECISION flow
    await page.goto("/work/foodresilience");
    await expect(page.locator("h1")).toContainText("FoodResilience");
    await page.getByRole("button", { name: "+30d" }).click();
    await expect(page.getByText(/5,040 units/i)).toBeVisible();

    // 4. Occupational Skills & Demand Case Study + Occupation-at-Centre Skills Graph
    await page.goto("/work/occupational-skills-demand");
    await expect(page.locator("h1")).toContainText(
      "Occupational Skills & Demand Predictor"
    );
    await expect(page.getByText(/OCCUPATION AT CENTRE/i)).toBeVisible();
    await page
      .getByRole("button", { name: /Inspect Protocol B \/ C Benchmarks/i })
      .click();
    await expect(page.getByText(/0\.8379/).first()).toBeVisible();

    // 5. Verify Modular Placeholders (/achievements and /resume)
    await page.goto("/achievements");
    await expect(page.locator("h1")).toContainText("ACHIEVEMENTS");
    await expect(page.getByText("[ Achievement item placeholder ]").first()).toBeVisible();

    await page.goto("/resume");
    await expect(page.locator("h1")).toContainText("PRINTABLE CV");
    await expect(
      page.getByText("My professional CV will be available here.")
    ).toBeVisible();

    // 6. Verify About & Contact pages
    for (const route of ["/about", "/contact"]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
    }
  });

  test("Floating glass navigation drawer and theme toggle work across mobile and desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: /Switch to light mode/i }).click();
    expect(await page.locator("html").getAttribute("data-theme")).toBe("light");

    await page.getByRole("button", { name: /Open navigation menu/i }).click();
    await expect(page.locator("#mobile-nav-drawer")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav-drawer")).toBeHidden();
  });
});
