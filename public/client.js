// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

// our default array of issues
const issues = [];

// define variables that reference elements on our page
const issuesList = document.getElementById('issues');
const issuesForm = document.forms[0];
const issueIdInput = issuesForm.elements['issue-id'];
const issueInput = issuesForm.elements['issue'];

// a helper function that creates a list item for a given issue
const appendNewIssue = function(issue) {
    const newListItem = document.createElement('li');
    newListItem.innerHTML = issue;
    issuesList.appendChild(newListItem);
}

// iterate through every issue and add it to our page
issues.forEach( function(issue) {
    appendNewIssue(issue);
});

// listen for the form to be submitted and add a new issue when it is
issuesForm.onsubmit = function(event) {
    // stop our form submission from refreshing the page
    event.preventDefault();

    // get issue value and add it to the list
    var spacesRegex = / /g;
    var dashesRegex = /(\B-)+/g;
    var quotesRegex = /"/g;
//   labels are in the form [*]
    var labelsRegex = /\[.*\]/gm;

    var issueId = issueIdInput.value;
    var issue = issueInput.value.toLowerCase();

    issue = issue.replace(quotesRegex, "");
    issue = issue.replace(spacesRegex, "-");
    issue = issue.replace(labelsRegex, "");

    issue = issue.replace("->", "-");
    issue = issue.replace("_", "-");
    issue = issue.replace("(", "-");
    issue = issue.replace(")", "-");
    issue = issue.replace("\'", "");

    var issueGitClone = "git checkout -b " + issueId + "-" + issue;

    // replace several `-`` with a single one
    issueGitClone = issueGitClone.replace(dashesRegex, "");

    issues.push(issueGitClone);
    appendNewIssue(issueGitClone);

    // var issueTitlePartRegex = /((.*)->\s)(.*)/g;
    var issueTitle = issueInput.value.replace(labelsRegex, "");

    issue = issueId + " - " + issueTitle;
    issues.push(issue);
    appendNewIssue(issue);

    issue = issueTitle;
    issues.push(issue);
    appendNewIssue(issue);

    // reset form
    issueInput.focus();
};
