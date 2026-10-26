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

test.describe("Ng Kai Sheng Portfolio — Multi-Viewport & Functional QA", () => {
  test("Home page renders with zero console errors, interactive telemetry bench, and zero horizontal overflow across all 8 mandatory viewports", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Engineering AI systems");
    await expect(page.getByText("Ng Kai Sheng").first()).toBeVisible();

    // Test interactive telemetry channel switching
    await page.getByRole("tab", { name: /FoodResilience/i }).click();
    await expect(page.getByText(/Walk-Forward Horizon Explorer/i)).toBeVisible();

    await page.getByRole("tab", { name: /Skills & Demand/i }).click();
    await expect(page.locator("#panel-skills").getByText("0.7149")).toBeVisible();

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

  test("All primary routes and 3 case study simulators render and operate properly", async ({
    page,
  }) => {
    // 1. Work Index
    await page.goto("/work");
    await expect(page.locator("h1")).toContainText("Engineering Case Studies");

    // 2. CardiOxy Pro Case Study + Simulator
    await page.goto("/work/cardioxy-pro");
    await expect(page.locator("h1")).toContainText("CardiOxy Pro");
    await expect(page.getByText(/ISIC-WOU24/i).first()).toBeVisible();
    await page.getByRole("button", { name: /Offline \(ESP-NOW\)/i }).click();
    await expect(page.getByText(/ESP-NOW Peer Bus/i)).toBeVisible();

    // 3. FoodResilience Case Study + Simulator
    await page.goto("/work/foodresilience");
    await expect(page.locator("h1")).toContainText("FoodResilience");
    await page.getByRole("button", { name: "+30d" }).click();
    await expect(page.getByText(/Projected \+30d Demand/i)).toBeVisible();

    // 4. Occupational Skills & Demand Predictor Case Study + Simulator
    await page.goto("/work/occupational-skills-demand");
    await expect(page.locator("h1")).toContainText("Occupational Skills & Demand Predictor");
    await expect(page.getByText("0.8379").first()).toBeVisible();

    // 5. About, Achievements, Contact, Resume
    for (const route of ["/about", "/achievements", "/contact", "/resume"]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
    }
  });

  test("Mobile navigation drawer opens, closes on Escape, and theme toggle switches between dark and light mode", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    // Toggle theme
    const htmlBefore = await page.locator("html").getAttribute("data-theme");
    expect(htmlBefore).toBe("dark");
    await page.getByRole("button", { name: /Switch to light mode/i }).click();
    const htmlAfter = await page.locator("html").getAttribute("data-theme");
    expect(htmlAfter).toBe("light");

    // Open mobile menu
    const menuBtn = page.getByRole("button", { name: /Open navigation menu/i });
    await menuBtn.click();
    await expect(page.locator("#mobile-nav-drawer")).toBeVisible();

    // Close with Escape
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav-drawer")).toBeHidden();
  });
});
