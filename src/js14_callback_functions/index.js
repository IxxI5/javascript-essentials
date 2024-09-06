// index.js
// Callback Functions

// ------------------------------------------------
// First Example: Fetching and Processing User Data from a Server
// ------------------------------------------------

// Simulates fetching user data from a server
function fetchUserData(userId, callback) {
  console.log("Fetching user data...");

  // Simulating an asynchronous operation using setTimeout
  setTimeout(() => {
    // Simulated user data
    const userData = {
      id: userId,
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
    };

    // Call the callback function with the fetched data
    callback(userData);
  }, 2000); // Simulates a 2-second delay
}

// Processes the fetched user data
function processUserData(data, callback) {
  console.log("Processing user data...");

  // Simulated processing (e.g., formatting user data)
  const processedData = {
    ...data, // Copy the existing user data
    formattedName: data.name.toUpperCase(), // Convert the name to uppercase
    formattedEmail: data.email.toLowerCase(), // Convert the email to lowercase
  };

  // Call the callback function with the processed data
  callback(processedData);
}

// Displays the user data on the console
function displayUserData(data) {
  console.log("Displaying user data:");
  console.log(`Name: ${data.formattedName}`);
  console.log(`Email: ${data.formattedEmail}`);
}

// Main function to fetch, process, and display user data subsequently (based on the callback functions concept)
function main(userId) {
  // Fetch, process, and display user data
  fetchUserData(userId, (userData) => {
    processUserData(userData, (processedData) => {
      displayUserData(processedData);
    });
  });
}

// Usage
// Call the main function with a user ID
main(1);

/** Output:
 *  Fetching user data...
    Processing user data...
    Displaying user data:
    Name: JOHN DOE
    Email: john.doe@example.com
 */

// --------------------------------
// Second Example: Posts Management
// --------------------------------

// Array of posts
const posts = [
  { title: "Post One", body: "This is post one" },
  { title: "Post Two", body: "This is post two" },
];

// Function to get posts and display them
function getPosts() {
  setTimeout(() => {
    let output = "";
    posts.forEach((post) => {
      output += `${post.title}\n`; // Concatenate post titles
    });
    console.log("Posts:\n" + output);
  }, 1000); // Simulates a 1-second delay
}

// Function to create a new post and then call a callback function
function createPost(post, callback) {
  setTimeout(() => {
    posts.push(post); // Add the new post
    callback(); // Call the callback function to refresh the posts list
  }, 2000); // Simulates a 2-second delay
}

// Usage
// Create a new post and then get and display all posts
createPost({ title: "Post Four", body: "This is post four" }, getPosts);

/** Output:
 *  Posts:
    Post One
    Post Two
    Post Four
 */
