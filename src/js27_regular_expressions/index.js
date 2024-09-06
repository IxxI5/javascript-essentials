// index.js
// Regular Expressions
// Form validation example

// Function to validate email
function validateEmail(email) {
  // Regex pattern for validating an email address
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Function to validate phone number
function validatePhoneNumber(phone) {
  // Regex pattern for validating a phone number (10 digits with optional dashes or spaces)
  const phonePattern = /^\d{10}$|^\d{3}[-\s]\d{3}[-\s]\d{4}$/;
  return phonePattern.test(phone);
}

// Function to validate password
function validatePassword(password) {
  // Regex pattern for validating a password (at least 8 characters, 1 uppercase, 1 lowercase, 1 digit)
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordPattern.test(password);
}

// Test cases
const emailTests = [
  "user@example.com",
  "invalid-email@",
  "user.name@domain.co",
];
const phoneTests = ["1234567890", "123 456 7890", "123-456-7890", "123-4567"];
const passwordTests = [
  "Password1",
  "password",
  "PASSWORD123",
  "Pass1",
  "P@ssw0rd",
];

console.log("Email Validation:");
emailTests.forEach((email) => console.log(`${email}: ${validateEmail(email)}`));

console.log("\nPhone Number Validation:");
phoneTests.forEach((phone) =>
  console.log(`${phone}: ${validatePhoneNumber(phone)}`)
);

console.log("\nPassword Validation:");
passwordTests.forEach((password) =>
  console.log(`${password}: ${validatePassword(password)}`)
);

/** Output:
 *  Email Validation:
    user@example.com: true
    invalid-email@: false
    user.name@domain.co: true

    Phone Number Validation:
    1234567890: true
    123 456 7890: true
    123-456-7890: true
    123-4567: false

    Password Validation:
    Password1: true
    password: false
    PASSWORD123: false
    Pass1: false
    P@ssw0rd: false
 */
