// index.js
// Promises
// Example: Fetching user data, validating it, and processing it using traditional Promise chaining with .then() and .catch()
// methods to handle the asynchronous operations and errors.
// A Promise in JavaScript is a native object that represents the eventual completion (or failure) of an asynchronous operation and its resulting
// value. It provides a way to handle asynchronous operations more effectively and elegantly compared to traditional callback methods.

// Simulate fetching user data from an API
function fetchUserData(userId) {
  console.log("Fetching user data...");

  // Return a Promise that resolves with user data after 2 seconds
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulated user data
      const userData = {
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com",
      };

      // Simulate a successful fetch operation
      resolve(userData);

      // Uncomment the following line to simulate a fetch error
      // reject(new Error('Failed to fetch user data'));
    }, 2000);
  });
}

// Simulate validating user data
function validateUserData(userData) {
  console.log("Validating user data...");

  // Return a Promise that resolves if the email domain is valid, otherwise rejects
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate validation: check if email contains '@example.com'
      if (userData.email.includes("@example.com")) {
        resolve(userData); // Validation passed
      } else {
        reject(new Error("Invalid email domain")); // Validation failed
      }
    }, 1000);
  });
}

// Simulate processing user data
function processUserData(userData) {
  console.log("Processing user data...");

  // Return a Promise that adds a `processed` flag to the user data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate processing by adding a `processed` flag
      userData.processed = true;
      resolve(userData); // Processing complete
    }, 1000);
  });
}

// Main function to fetch, validate, and process user data
function handleUserData(userId) {
  // Call fetchUserData and handle the result
  fetchUserData(userId)
    .then((userData) => {
      // On successful fetch, validate the user data
      return validateUserData(userData);
    })
    .then((validatedData) => {
      // On successful validation, process the validated data
      return processUserData(validatedData);
    })
    .then((processedData) => {
      // On successful processing, log the final processed data
      console.log("User data successfully processed:", processedData);
    })
    .catch((error) => {
      // Handle any error that occurs during the Promise chain
      console.error("Error:", error.message);
    });
}

// Execute the main function with a user ID of 1
handleUserData(1);

/** Output:
 *  Fetching user data...
    Validating user data...
    Processing user data...
    User data successfully processed: {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    processed: true
    }
 */
