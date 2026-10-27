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

test.describe("Kai Sheng Master AI/ML Portfolio — Multi-Viewport & Technical QA", () => {
  test("Homepage 5-second employer clarity, 3D AI Core satellites, What I Build, Selected Recognition, and all 8 viewports pass with zero overflow", async ({
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

    // Verify primary magnetic CTA and employer sections in exact Section 17 order
    await expect(page.getByRole("link", { name: /VIEW MY WORK/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "FEATURED PROJECTS" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "WHAT I BUILD" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "SELECTED RECOGNITION" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "TECHNICAL STACK" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "ABOUT ME" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /EDUCATION & JOURNEY/i })).toBeVisible();

    // Verify Section 36: More Beyond the Highlights & LinkedIn CTA
    await expect(page.getByRole("heading", { name: "MORE BEYOND THE HIGHLIGHTS" })).toBeVisible();
    await expect(page.getByRole("link", { name: /VIEW LINKEDIN/i })).toBeVisible();

    // Test interactive 3D satellite node selection in Featured Projects
    await page
      .locator("#featured-projects")
      .getByRole("tab", { name: /02 — FOODRESILIENCE/i })
      .click();
    await expect(
      page.locator("#featured-projects").getByText("3D SATELLITE LOCKED: 02")
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

  test("All 3 employer case studies (11-section structure + interactive metaphors) and Certificate Viewer work cleanly", async ({
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

    // 5. Verify Achievements page & Certificate Viewer Modal
    await page.goto("/achievements");
    await expect(page.locator("h1")).toContainText("ACHIEVEMENTS & RECOGNITION");
    await expect(page.getByText(/PROJECT SUPERVISOR/i).first()).toBeVisible();

    // Open certificate viewer
    await page.getByRole("button", { name: /View Certificates/i }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText(/VERIFIED DISTINCTION RECORD/i)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();

    // 6. Verify Printable CV (/resume and /cv)
    for (const route of ["/resume", "/cv"]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toContainText("PRINTABLE CV");
    }

    // 7. Anonymous requests never receive the management console.
    await page.goto("/admin");
    await expect(page.getByText("Content Management Console")).toHaveCount(0);
    await expect(page.locator("#admin-pin")).toHaveCount(0);
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
