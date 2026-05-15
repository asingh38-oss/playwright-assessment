# playwright-assessment

Playwright test suite for the demo kanban app. All test cases are data-driven using a JS array so I'm not copy-pasting the same test over and over.

## project structure

```
tests/
  helpers/
    login.js      <- login logic pulled into its own file
  testData.js     <- all 6 test cases defined here
  tasks.spec.js   <- loops over testData and runs each case
playwright.config.js
```

## setup

```bash
npm install
npx playwright install chromium
```

## running tests

```bash
npm test              # headless
npm run test:headed   # watch it run in the browser
npm run report        # open html report after a run
```

## test cases

| ID  | Project            | Task                          | Column      | Tags                   |
|-----|--------------------|-------------------------------|-------------|------------------------|
| TC1 | Web Application    | Implement user authentication | To Do       | Feature, High Priority |
| TC2 | Web Application    | Fix navigation bug            | To Do       | Bug                    |
| TC3 | Web Application    | Design system updates         | In Progress | Design                 |
| TC4 | Mobile Application | Push notification system      | To Do       | Feature                |
| TC5 | Mobile Application | Offline mode                  | In Progress | Feature, High Priority |
| TC6 | Mobile Application | App icon design               | Done        | Design                 |

## adding test cases

Add an object to the array in `testData.js` and the loop in `tasks.spec.js` picks it up automatically, nothing else needed.

```js
{
  id: 'TC7',
  project: 'Marketing Campaign',
  taskTitle: 'Social media calendar',
  expectedColumn: 'To Do',
  expectedTags: ['Feature'],
},
```
