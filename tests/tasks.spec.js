const { test, expect } = require('@playwright/test');
const { login } = require('./helpers/login');
const { testCases } = require('./testData');

for (const tc of testCases) {
  test(`${tc.id}: "${tc.taskTitle}" shows up in "${tc.expectedColumn}" with the right tags`, async ({ page }) => {
    await login(page);

    await page.getByText(tc.project).first().click();
    await page.waitForLoadState('networkidle');

    // column headers say "To Do (2)" etc - regex matches just the name
    const columnHeader = page.locator('h2, h3, h4').filter({
      hasText: new RegExp(`^${tc.expectedColumn}`)
    });
    await expect(columnHeader).toBeVisible({ timeout: 8000 });

    // find the card - filter for divs containing both the title AND first tag
    // .last() gets the innermost matching div (the card itself, not a page wrapper)
    // .first() was grabbing the outermost ancestor div which had x=0
    const taskCard = page.locator('div').filter({
      hasText: tc.taskTitle
    }).filter({
      hasText: tc.expectedTags[0]
    }).last();

    await expect(taskCard).toBeVisible({ timeout: 5000 });

    // verify the card is actually inside the right column by walking up its ancestors
    // more reliable than bounding boxes which depend on viewport/layout
    const isInCorrectColumn = await taskCard.evaluate((cardEl, columnName) => {
      let el = cardEl.parentElement;
      while (el) {
        const headers = el.querySelectorAll('h2, h3, h4');
        for (const header of headers) {
          if (header.textContent.trim().startsWith(columnName)) return true;
        }
        el = el.parentElement;
      }
      return false;
    }, tc.expectedColumn);

    expect(isInCorrectColumn).toBe(true);

    // check all expected tags are on the card
    for (const tag of tc.expectedTags) {
      await expect(taskCard.getByText(tag, { exact: true })).toBeVisible();
    }
  });
}
