// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

// our default array of dreams
const dreams = [
];

// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const issueIdInput = dreamsForm.elements['issue-id'];
const dreamInput = dreamsForm.elements['dream'];

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream;
  dreamsList.appendChild(newListItem);
}

// iterate through every dream and add it to our page
dreams.forEach( function(dream) {
  appendNewDream(dream);
});

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  var spacesRegex = / /g;
  var dashesRegex = /(\B-)+/g;
  
  var issueId = issueIdInput.value;
  var dream = dreamInput.value.toLowerCase();
  
  dream = dream.replace(spacesRegex, "-");
  dream = dream.replace("->", "-");
  dream = dream.replace("_", "-");
  dream = dream.replace("(", "-");
  dream = dream.replace(")", "-");
  dream = dream.replace("[be]", "");
  // replace several - by a single one
  dream = dream.replace(dashesRegex, "");
  dream = "git checkout -b " + issueId + "-" + dream.replace("[be]", "");
  dreams.push(dream);
  appendNewDream(dream);
  
//   var issueId = issueIdInput.value;
//   var dream = dreamInput.value.toLowerCase();
  
//   dream = issueId + " " + dream;
//   dreams.push(dream);
//   appendNewDream(dream);
  
  var issueTitlePartRegex = /((.*)->\s)(.*)/g;
  var issueTitlePart = issueTitlePartRegex.exec(dreamInput.value)[3];
  
  dream = issueId + " " + issueTitlePart;
  dreams.push(dream);
  appendNewDream(dream);
  
  dream = issueTitlePart;
  dreams.push(dream);
  appendNewDream(dream);

  // reset form 
  dreamInput.focus();
};
