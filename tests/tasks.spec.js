const { test, expect } = require('@playwright/test');
const { login } = require('./helpers/login');
const { testCases } = require('./testData');

for (const tc of testCases) {
  test(`${tc.id}: "${tc.taskTitle}" shows up in "${tc.expectedColumn}" with the right tags`, async ({ page }) => {
    await login(page);

    // click the project in the sidebar
    await page.getByText(tc.project).first().click();
    await page.waitForLoadState('networkidle');

    // column headers say "To Do (2)" etc - match just the name part
    const columnHeader = page.locator('h2, h3, h4').filter({
      hasText: new RegExp(`^${tc.expectedColumn}`)
    });
    await expect(columnHeader).toBeVisible({ timeout: 8000 });

    // find the card by looking for a div that has both the task title and its first tag
    // this avoids relying on class names (the old xpath approach broke because the app
    // uses tailwind utility classes, not semantic ones like "card")
    const taskCard = page.locator('div').filter({
      hasText: tc.taskTitle
    }).filter({
      hasText: tc.expectedTags[0]
    }).first();

    await expect(taskCard).toBeVisible({ timeout: 5000 });

    // verify the card is actually under the right column by comparing x positions
    const headerBox = await columnHeader.boundingBox();
    const cardBox = await taskCard.boundingBox();
    expect(cardBox.x).toBeGreaterThanOrEqual(headerBox.x - 20);
    expect(cardBox.x).toBeLessThanOrEqual(headerBox.x + 350);

    // check all expected tags show up on the card
    for (const tag of tc.expectedTags) {
      await expect(taskCard.getByText(tag, { exact: true })).toBeVisible();
    }
  });
}
