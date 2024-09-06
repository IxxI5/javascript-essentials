// index.js
// JSON Stringify and Parse

// Define a JavaScript object
const userProfile = {
  name: "Alice",
  age: 30,
  hobbies: ["reading", "hiking", "coding"],
};

// Convert the JavaScript object to a JSON string
const jsonString = JSON.stringify(userProfile);

// Display the JSON string
console.log("JSON String:", jsonString);

// Simulate saving to and retrieving from localStorage (or any other storage)
const storage = {};
storage["userProfile"] = jsonString;

// Retrieve the JSON string from storage
const retrievedJsonString = storage["userProfile"];

// Convert the JSON string back to a JavaScript object
const retrievedUserProfile = JSON.parse(retrievedJsonString);

// Display the retrieved object
console.log("Retrieved JavaScript Object:", retrievedUserProfile);

// Display each property of the retrieved object
console.log("Name:", retrievedUserProfile.name);
console.log("Age:", retrievedUserProfile.age);
console.log("Hobbies:", retrievedUserProfile.hobbies.join(", "));

/** Output:
 *  JSON String: {"name":"Alice","age":30,"hobbies":["reading","hiking","coding"]}
    Retrieved JavaScript Object: { name: 'Alice', age: 30, hobbies: [ 'reading', 'hiking', 'coding' ] }
    Name: Alice
    Age: 30
    Hobbies: reading, hiking, coding
 */
