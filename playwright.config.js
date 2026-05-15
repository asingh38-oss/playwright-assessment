const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false, // running parallel caused flaky login issues
  retries: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
