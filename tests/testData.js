// test cases - add more objects here if new cases get added
const testCases = [
  {
    id: 'TC1',
    project: 'Web Application',
    taskTitle: 'Implement user authentication',
    expectedColumn: 'To Do',
    expectedTags: ['Feature', 'High Priority'],
  },
  {
    id: 'TC2',
    project: 'Web Application',
    taskTitle: 'Fix navigation bug',
    expectedColumn: 'To Do',
    expectedTags: ['Bug'],
  },
  {
    id: 'TC3',
    project: 'Web Application',
    taskTitle: 'Design system updates',
    expectedColumn: 'In Progress',
    expectedTags: ['Design'],
  },
  {
    id: 'TC4',
    project: 'Mobile Application',
    taskTitle: 'Push notification system',
    expectedColumn: 'To Do',
    expectedTags: ['Feature'],
  },
  {
    id: 'TC5',
    project: 'Mobile Application',
    taskTitle: 'Offline mode',
    expectedColumn: 'In Progress',
    expectedTags: ['Feature', 'High Priority'],
  },
  {
    id: 'TC6',
    project: 'Mobile Application',
    taskTitle: 'App icon design',
    expectedColumn: 'Done',
    expectedTags: ['Design'],
  },
];

module.exports = { testCases };
