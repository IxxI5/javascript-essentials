// index.js
// DOM Manipulation
// Open the page.html file in the browser

try {
  const test = document.getElementById("addItemBtn");
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

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener to the "Add Item" button
  document.querySelector("#addItemBtn").addEventListener("click", () => {
    // Get the list
    const itemList = document.getElementById("itemList");

    // Create a new list item
    const newItem = document.createElement("li");
    newItem.classList.add("item"); // Add class
    newItem.textContent = `Item ${itemList.children.length + 1}`;

    // Append new item to the list
    itemList.appendChild(newItem);
  });

  // Add event listener to the "Toggle Highlight" button
  document
    .querySelector("#toggleHighlightBtn")
    .addEventListener("click", () => {
      // Get all items
      const items = document.querySelectorAll(".item");

      items.forEach((item) => {
        item.classList.toggle("highlight"); // Toggle highlight class
      });
    });

  // Add event listener to the "Toggle Visibility" button
  document
    .querySelector("#toggleVisibilityBtn")
    .addEventListener("click", () => {
      // Get the list
      const itemList = document.getElementById("itemList");

      // Toggle the 'hidden' class to show/hide the list
      itemList.classList.toggle("hidden");
    });
});
