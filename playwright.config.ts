import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: "http://localhost:3123",
    channel: "chrome",
    trace: "off",
  },
  webServer: {
    command: "npm.cmd run start -- -p 3123",
    url: "http://localhost:3123",
    reuseExistingServer: true,
    timeout: 60000,
  },
});
