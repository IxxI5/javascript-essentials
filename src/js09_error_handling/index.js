// index.js
// Error Handling (try, catch, throw, finally)
// A simple user registration example

// Function to validate user input
function validateUserInput(user) {
  if (!user.username || !user.password) {
    throw new Error("Username and password are required.");
  }
  if (user.password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }
}

// Function to simulate a server request
function simulateServerRequest(user) {
  // Simulate a server error
  const serverErrorOccurred = Math.random() > 0.8; // 20% chance of error
  if (serverErrorOccurred) {
    throw new Error("Server error: Unable to complete registration.");
  }
  // Simulate successful registration
  return true;
}

// Function to register a user
function registerUser(user) {
  try {
    validateUserInput(user); // Validate user input
    console.log("Input validation passed.");

    try {
      const registrationSuccessful = simulateServerRequest(user); // Simulate server request
      if (registrationSuccessful) {
        console.log("User registered successfully!");
      }
    } catch (serverError) {
      console.error(`Server error: ${serverError.message}`);
    }
  } catch (validationError) {
    console.error(`Validation error: ${validationError.message}`);
  } finally {
    console.log("Registration process finished.");
  }
}

// Example usage
const user = {
  username: "john_doe",
  password: "12345", // This will trigger a validation error
};

registerUser(user);

/** Output:
 *  Validation error: Password must be at least 6 characters long.
    Registration process finished.
 */
