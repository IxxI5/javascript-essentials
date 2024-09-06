// index.js
// Date and Time Methods

// Function to display the current date and time
function displayCurrentDateTime() {
  // Create a new Date object with the current date and time
  const now = new Date();

  // Retrieve different parts of the current date and time
  const year = now.getFullYear(); // Get the full year (e.g., 2024)
  const month = now.getMonth() + 1; // Get the month (0-11), add 1 to make it 1-12
  const day = now.getDate(); // Get the day of the month (1-31)
  const hours = now.getHours(); // Get the hour of the day (0-23)
  const minutes = now.getMinutes(); // Get the minutes past the hour (0-59)
  const seconds = now.getSeconds(); // Get the seconds past the minute (0-59)

  // Display the current date and time in YYYY-MM-DD HH:MM:SS format
  console.log(
    `Current Date and Time: ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  );
}

// Function to calculate the number of days until a specific event
function daysUntilEvent(eventDate) {
  // Create Date objects for the current date and the event date
  const now = new Date();
  const event = new Date(eventDate);

  // Calculate the difference in milliseconds between the event date and the current date
  const diffTime = event - now;

  // Convert the difference from milliseconds to days
  // 1000 milliseconds = 1 second
  // 60 seconds = 1 minute
  // 60 minutes = 1 hour
  // 24 hours = 1 day
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays; // Return the number of days until the event
}

// Function to format a date into a readable string
function formatDate(date) {
  // Define options for formatting the date
  // 'numeric' for numbers, 'long' for full month names
  const options = { year: "numeric", month: "long", day: "numeric" };

  // Create a new Intl.DateTimeFormat object with the specified options
  // 'en-US' is the locale for US English
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

// Display the current date and time
displayCurrentDateTime();

// Define the date for the upcoming New Year's Day
const newYearsDay = "2030-01-01";

// Calculate the number of days until New Year's Day
const daysLeft = daysUntilEvent(newYearsDay);
console.log(`Days until ${newYearsDay}: ${daysLeft} days`);

// Format and display today's date in a readable format
const today = new Date();
console.log(`Formatted Date: ${formatDate(today)}`);

/** Output:
 *  Current Date and Time: 2024-9-6 15:7:41
    Days until 2030-01-01: 1943 days
    Formatted Date: September 6, 2024
 */
