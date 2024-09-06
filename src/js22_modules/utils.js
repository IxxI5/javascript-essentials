// utils.js
// Provides utility functions.

// Function to format date as YYYY-MM-DD
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Function to validate if a book title is valid
export function isValidBookTitle(title) {
  return typeof title === "string" && title.length > 0;
}
