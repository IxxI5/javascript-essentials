// index.js
// Event Handling (addEventListener, Event Object, Event Propagation)
// Open the page.html file in the browser along with its developer console (output)

try {
  const test = document.getElementById("outer");
  test.addEventListener("click", function (event) {
    console.log("Successful Test");
  });
} catch (error) {
  // Show a colored error message
  console.error(
    "%cRun the page.html file in the browser along with its developer console (output)",
    "color: red; font-weight: bold; font-size: 16px;"
  );

  // Throw a new error with a custom message and stop further execution
  throw new Error(
    "Run the page.html file in the browser along with its developer console (output)"
  );
}

// Select elements
const outerDiv = document.getElementById("outer");
const innerDiv = document.getElementById("inner");
const button = document.getElementById("button");
const res = document.getElementById("res");

// Event listener for the outer div
outerDiv.addEventListener(
  "click",
  function (event) {
    res.innerHTML =
      res.innerHTML +
      `<p>Outer Div Clicked - Event Target: ${event.target} - Current Target: ${event.currentTarget}</p>`;
    console.log("Outer Div Clicked");
    console.log("Event Target:", event.target); // The element that was actually clicked
    console.log("Current Target:", event.currentTarget); // The element to which the event handler is attached
  },
  false
); // false for bubbling

// Event listener for the inner div
innerDiv.addEventListener(
  "click",
  function (event) {
    res.innerHTML = res.innerHTML + "<p>Inner Div Clicked</p>";
    console.log("Inner Div Clicked");
    // Stop the event from propagating to parent elements
    event.stopPropagation();
  },
  false
); // false for bubbling

// Event listener for the button
button.addEventListener(
  "click",
  function (event) {
    res.innerHTML =
      res.innerHTML +
      `<p>Button Clicked - Event Type: ${event.type} - Event Target: ${event.target}</p>`;
    console.log("Button Clicked");
    // You can access more details from the event object if needed
    console.log("Event Type:", event.type); // Output the type of event (click)
    console.log("Event Target:", event.target); // The element that was clicked
  },
  false
); // false for bubbling
