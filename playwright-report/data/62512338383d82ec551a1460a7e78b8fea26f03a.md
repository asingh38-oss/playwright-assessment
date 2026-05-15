# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks.spec.js >> TC6: "App icon design" shows up in "Done" with the right tags
- Location: tests\tasks.spec.js:6:3

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 1180.78125
Received:    0
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e6]:
      - img [ref=e7]
      - heading "Projects" [level=1] [ref=e9]
    - navigation [ref=e10]:
      - button "Web Application Main web application development" [ref=e11] [cursor=pointer]:
        - heading "Web Application" [level=2] [ref=e12]
        - paragraph [ref=e13]: Main web application development
      - button "Mobile Application Native mobile app development" [active] [ref=e14] [cursor=pointer]:
        - heading "Mobile Application" [level=2] [ref=e15]
        - paragraph [ref=e16]: Native mobile app development
      - button "Marketing Campaign Q2 Marketing initiatives" [ref=e17] [cursor=pointer]:
        - heading "Marketing Campaign" [level=2] [ref=e18]
        - paragraph [ref=e19]: Q2 Marketing initiatives
  - generic [ref=e20]:
    - banner [ref=e21]:
      - generic [ref=e22]:
        - generic [ref=e23]:
          - heading "Mobile Application" [level=1] [ref=e24]
          - paragraph [ref=e25]: Native mobile app development
        - button "Logout" [ref=e26] [cursor=pointer]:
          - img [ref=e27]
          - text: Logout
    - main [ref=e30]:
      - generic [ref=e32]:
        - generic [ref=e33]:
          - heading "To Do (1)" [level=2] [ref=e34]:
            - text: To Do
            - generic [ref=e35]: (1)
          - generic [ref=e37]:
            - heading "Push notification system" [level=3] [ref=e38]
            - paragraph [ref=e39]: Implement push notifications for iOS and Android
            - generic [ref=e41]: Feature
            - generic [ref=e42]:
              - generic [ref=e43]:
                - img [ref=e44]
                - generic [ref=e47]: David Kim
              - generic [ref=e48]:
                - img [ref=e49]
                - generic [ref=e51]: 3/27/2024
        - generic [ref=e52]:
          - heading "In Progress (1)" [level=2] [ref=e53]:
            - text: In Progress
            - generic [ref=e54]: (1)
          - generic [ref=e56]:
            - heading "Offline mode" [level=3] [ref=e57]
            - paragraph [ref=e58]: Enable offline data synchronization
            - generic [ref=e59]:
              - generic [ref=e60]: Feature
              - generic [ref=e61]: High Priority
            - generic [ref=e62]:
              - generic [ref=e63]:
                - img [ref=e64]
                - generic [ref=e67]: Rachel Green
              - generic [ref=e68]:
                - img [ref=e69]
                - generic [ref=e71]: 3/23/2024
        - heading "Review (0)" [level=2] [ref=e73]:
          - text: Review
          - generic [ref=e74]: (0)
        - generic [ref=e75]:
          - heading "Done (1)" [level=2] [ref=e76]:
            - text: Done
            - generic [ref=e77]: (1)
          - generic [ref=e79]:
            - heading "App icon design" [level=3] [ref=e80]
            - paragraph [ref=e81]: Create app icons for all required sizes
            - generic [ref=e83]: Design
            - generic [ref=e84]:
              - generic [ref=e85]:
                - img [ref=e86]
                - generic [ref=e89]: Emma Wilson
              - generic [ref=e90]:
                - img [ref=e91]
                - generic [ref=e93]: 3/14/2024
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { login } = require('./helpers/login');
  3  | const { testCases } = require('./testData');
  4  | 
  5  | for (const tc of testCases) {
  6  |   test(`${tc.id}: "${tc.taskTitle}" shows up in "${tc.expectedColumn}" with the right tags`, async ({ page }) => {
  7  |     await login(page);
  8  | 
  9  |     // click the project in the sidebar
  10 |     await page.getByText(tc.project).first().click();
  11 |     await page.waitForLoadState('networkidle');
  12 | 
  13 |     // column headers say "To Do (2)" etc - match just the name part
  14 |     const columnHeader = page.locator('h2, h3, h4').filter({
  15 |       hasText: new RegExp(`^${tc.expectedColumn}`)
  16 |     });
  17 |     await expect(columnHeader).toBeVisible({ timeout: 8000 });
  18 | 
  19 |     // find the card by looking for a div that has both the task title and its first tag
  20 |     // this avoids relying on class names (the old xpath approach broke because the app
  21 |     // uses tailwind utility classes, not semantic ones like "card")
  22 |     const taskCard = page.locator('div').filter({
  23 |       hasText: tc.taskTitle
  24 |     }).filter({
  25 |       hasText: tc.expectedTags[0]
  26 |     }).first();
  27 | 
  28 |     await expect(taskCard).toBeVisible({ timeout: 5000 });
  29 | 
  30 |     // verify the card is actually under the right column by comparing x positions
  31 |     const headerBox = await columnHeader.boundingBox();
  32 |     const cardBox = await taskCard.boundingBox();
> 33 |     expect(cardBox.x).toBeGreaterThanOrEqual(headerBox.x - 20);
     |                       ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  34 |     expect(cardBox.x).toBeLessThanOrEqual(headerBox.x + 350);
  35 | 
  36 |     // check all expected tags show up on the card
  37 |     for (const tag of tc.expectedTags) {
  38 |       await expect(taskCard.getByText(tag, { exact: true })).toBeVisible();
  39 |     }
  40 |   });
  41 | }
  42 | 
```