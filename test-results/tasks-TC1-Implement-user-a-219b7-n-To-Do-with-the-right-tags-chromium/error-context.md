# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks.spec.js >> TC1: "Implement user authentication" shows up in "To Do" with the right tags
- Location: tests\tasks.spec.js:6:3

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 148.78125
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
      - button "Web Application Main web application development" [active] [ref=e11] [cursor=pointer]:
        - heading "Web Application" [level=2] [ref=e12]
        - paragraph [ref=e13]: Main web application development
      - button "Mobile Application Native mobile app development" [ref=e14] [cursor=pointer]:
        - heading "Mobile Application" [level=2] [ref=e15]
        - paragraph [ref=e16]: Native mobile app development
      - button "Marketing Campaign Q2 Marketing initiatives" [ref=e17] [cursor=pointer]:
        - heading "Marketing Campaign" [level=2] [ref=e18]
        - paragraph [ref=e19]: Q2 Marketing initiatives
  - generic [ref=e20]:
    - banner [ref=e21]:
      - generic [ref=e22]:
        - generic [ref=e23]:
          - heading "Web Application" [level=1] [ref=e24]
          - paragraph [ref=e25]: Main web application development
        - button "Logout" [ref=e26] [cursor=pointer]:
          - img [ref=e27]
          - text: Logout
    - main [ref=e30]:
      - generic [ref=e32]:
        - generic [ref=e33]:
          - heading "To Do (2)" [level=2] [ref=e34]:
            - text: To Do
            - generic [ref=e35]: (2)
          - generic [ref=e36]:
            - generic [ref=e37]:
              - heading "Implement user authentication" [level=3] [ref=e38]
              - paragraph [ref=e39]: Add login and signup functionality
              - generic [ref=e40]:
                - generic [ref=e41]: Feature
                - generic [ref=e42]: High Priority
              - generic [ref=e43]:
                - generic [ref=e44]:
                  - img [ref=e45]
                  - generic [ref=e48]: Sarah Chen
                - generic [ref=e49]:
                  - img [ref=e50]
                  - generic [ref=e52]: 3/24/2024
            - generic [ref=e53]:
              - heading "Fix navigation bug" [level=3] [ref=e54]
              - paragraph [ref=e55]: Menu does not close on mobile
              - generic [ref=e57]: Bug
              - generic [ref=e58]:
                - generic [ref=e59]:
                  - img [ref=e60]
                  - generic [ref=e63]: John Smith
                - generic [ref=e64]:
                  - img [ref=e65]
                  - generic [ref=e67]: 3/19/2024
        - generic [ref=e68]:
          - heading "In Progress (1)" [level=2] [ref=e69]:
            - text: In Progress
            - generic [ref=e70]: (1)
          - generic [ref=e72]:
            - heading "Design system updates" [level=3] [ref=e73]
            - paragraph [ref=e74]: Update color palette and typography
            - generic [ref=e76]: Design
            - generic [ref=e77]:
              - generic [ref=e78]:
                - img [ref=e79]
                - generic [ref=e82]: Emma Wilson
              - generic [ref=e83]:
                - img [ref=e84]
                - generic [ref=e86]: 3/21/2024
        - generic [ref=e87]:
          - heading "Review (1)" [level=2] [ref=e88]:
            - text: Review
            - generic [ref=e89]: (1)
          - generic [ref=e91]:
            - heading "API integration" [level=3] [ref=e92]
            - paragraph [ref=e93]: Connect to payment gateway
            - generic [ref=e94]:
              - generic [ref=e95]: Feature
              - generic [ref=e96]: High Priority
            - generic [ref=e97]:
              - generic [ref=e98]:
                - img [ref=e99]
                - generic [ref=e102]: Mike Johnson
              - generic [ref=e103]:
                - img [ref=e104]
                - generic [ref=e106]: 3/20/2024
        - generic [ref=e107]:
          - heading "Done (1)" [level=2] [ref=e108]:
            - text: Done
            - generic [ref=e109]: (1)
          - generic [ref=e111]:
            - heading "Update documentation" [level=3] [ref=e112]
            - paragraph [ref=e113]: Add API endpoints documentation
            - generic [ref=e115]: Feature
            - generic [ref=e116]:
              - generic [ref=e117]:
                - img [ref=e118]
                - generic [ref=e121]: Lisa Brown
              - generic [ref=e122]:
                - img [ref=e123]
                - generic [ref=e125]: 3/17/2024
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