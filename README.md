# data-driven-playwright

Playwright test suite for the [demo kanban app](https://animated-gingersnap-8cf7f2.netlify.app/). All 6 test cases are driven from a single JS array so there's no repeated test code.

## project structure

```
tests/
  helpers/
    login.js      <- login logic pulled out so it's not repeated in every test
  testData.js     <- all test cases defined here as objects
  tasks.spec.js   <- loops over testData and runs each one
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
npm run report        # open the html report after a run
```

## how it works

Each test case in `testData.js` has four fields: the project to navigate to, the task title to look for, the column it should be in, and the tags to verify. `tasks.spec.js` loops over that array and runs one test per object — no copy-pasting.

For finding the task card, the tests filter for a div containing both the task title and its first tag, then use `.last()` to get the innermost match (the card itself, not a page wrapper). Column membership is verified by walking up the card's DOM ancestors and checking that a column header with the right name exists somewhere in the chain.

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

Add an object to the array in `testData.js` and the loop picks it up automatically.

```js
{
  id: 'TC7',
  project: 'Marketing Campaign',
  taskTitle: 'Social media calendar',
  expectedColumn: 'To Do',
  expectedTags: ['Feature'],
},
```