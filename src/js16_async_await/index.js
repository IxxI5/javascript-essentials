// index.js
// Asynchronous JavaScript
// Example: Fetching user data, validating it, and processing it using async/await.
// async/await is a modern syntax in JavaScript designed to work with Promises in a more readable and cleaner way, especially when dealing
// with complex asynchronous operations.

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

// Main function to fetch, validate, and process user data using async/await
async function handleUserData(userId) {
  try {
    // Fetch user data
    const userData = await fetchUserData(userId);

    // Validate the fetched user data
    const validatedData = await validateUserData(userData);

    // Process the validated user data
    const processedData = await processUserData(validatedData);

    // Log the final processed data
    console.log("User data successfully processed:", processedData);
  } catch (error) {
    // Handle any error that occurs during the async operations
    console.error("Error:", error.message);
  }
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
 * 
 */
