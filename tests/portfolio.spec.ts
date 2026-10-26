import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { width: 1920, height: 1080, name: "1920x1080-desktop" },
  { width: 1440, height: 900, name: "1440x900-laptop" },
  { width: 1366, height: 768, name: "1366x768-compact-laptop" },
  { width: 1024, height: 768, name: "1024x768-tablet-landscape" },
  { width: 768, height: 1024, name: "768x1024-tablet-portrait" },
  { width: 430, height: 932, name: "430x932-large-phone" },
  { width: 390, height: 844, name: "390x844-standard-phone" },
  { width: 360, height: 800, name: "360x800-compact-phone" },
];

test.describe("Kai Sheng Spatial 3D AI Portfolio — Multi-Viewport & Progressive Disclosure QA", () => {
  test("Spatial Hero, 3D AI Core, and Project Constellation operate with zero errors and zero horizontal overflow across all 8 viewports", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await expect(page.locator("h1")).toContainText("KAI SHENG");
    await expect(
      page.getByText("I build intelligent systems that turn data into predictions")
    ).toBeVisible();

    // Test Project Constellation node selection & progressive disclosure
    await page.getByRole("tab", { name: /FOODRESILIENCE/i }).click();
    await expect(
      page.locator("#constellation-preview-window").getByText("FOODRESILIENCE")
    ).toBeVisible();

    await page.getByRole("tab", { name: /OCCUPATIONAL AI/i }).click();
    await page.getByRole("button", { name: /Reveal Key Evidence/i }).click();
    await expect(page.getByText(/0\.7149/)).toBeVisible();

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

  test("All 3 spatial case studies and progressive disclosure modules work seamlessly", async ({
    page,
  }) => {
    // 1. Work Index
    await page.goto("/work");
    await expect(page.locator("h1")).toContainText("Engineering Case Studies");

    // 2. CardiOxy Pro 3D/Spatial Case Study
    await page.goto("/work/cardioxy-pro");
    await expect(page.locator("h1")).toContainText("CardiOxy Pro");
    await page.getByRole("button", { name: /Explore Model Logic/i }).click();
    await expect(page.getByText(/sliding telemetry window/i)).toBeVisible();

    // Progressive disclosure technical tabs
    await page.getByRole("tab", { name: /Validation & Metrics/i }).click();
    await expect(page.getByText(/ISIC-WOU24/i).first()).toBeVisible();

    // 3. FoodResilience Spatial Flow
    await page.goto("/work/foodresilience");
    await expect(page.locator("h1")).toContainText("FoodResilience");
    await page.getByRole("button", { name: "+30d" }).click();
    await expect(page.getByText(/5,040 units/i)).toBeVisible();

    // 4. Occupational Skills & Demand Spatial Constellation
    await page.goto("/work/occupational-skills-demand");
    await expect(page.locator("h1")).toContainText(
      "Occupational Skills & Demand Predictor"
    );
    await page
      .getByRole("button", { name: /Inspect Protocol B \/ C Benchmarks/i })
      .click();
    await expect(page.getByText(/0\.8379/).first()).toBeVisible();

    // 5. About, Achievements, Contact, Resume
    for (const route of ["/about", "/achievements", "/contact", "/resume"]) {
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
