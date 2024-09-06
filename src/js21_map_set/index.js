// index.js
// Map and Set
// User Management System example
// Map: A collection of key-value pairs with unique keys. Keys can be of any data type, and the insertion order is maintained.
// Set: A collection of unique values. Values can be of any data type, and the insertion order is maintained.
// Map is used to store and retrieve users and roles efficiently.
// Set ensures that each role has unique permissions, avoiding duplicates.
// WeakMap is ideal for storing sensitive data (like session data) that should not prevent users from being garbage-collected.
// WeakSet is used to keep track of logged-in users without holding strong references to user objects, ensuring garbage collection when appropriate.

// Step 1: Create a User class to represent users in the system
class User {
  constructor(name) {
    this.name = name;
  }
}

// Step 2: Using a Map to store users and their roles
const userRoles = new Map();

// Step 3: Using a Set to store unique permissions for each role
const rolePermissions = new Map();
rolePermissions.set("admin", new Set(["read", "write", "delete"]));
rolePermissions.set("editor", new Set(["read", "write"]));
rolePermissions.set("viewer", new Set(["read"]));

// Step 4: Adding users to the system and assigning roles using Map
const user1 = new User("Alice");
const user2 = new User("Bob");
const user3 = new User("Charlie");

userRoles.set(user1, "admin");
userRoles.set(user2, "editor");
userRoles.set(user3, "viewer");

// Step 5: Using WeakMap to store sensitive metadata (e.g., session data) associated with users
const userSessionData = new WeakMap();
userSessionData.set(user1, { lastLogin: "2024-09-06", sessionId: "abc123" });
userSessionData.set(user2, { lastLogin: "2024-09-05", sessionId: "def456" });
userSessionData.set(user3, { lastLogin: "2024-09-04", sessionId: "ghi789" });

// Step 6: Using WeakSet to track which users are currently logged in
const loggedInUsers = new WeakSet();
loggedInUsers.add(user1);
loggedInUsers.add(user2);

// ------------------------------ Example Usage ----------------------------------

// Step 7: Checking roles and permissions for users
function checkUserPermissions(user, action) {
  const role = userRoles.get(user); // Get the user's role from the Map
  if (!role) {
    console.log(`${user.name} does not have a role assigned.`);
    return;
  }

  const permissions = rolePermissions.get(role); // Get the permissions from the Set based on the user's role
  if (permissions.has(action)) {
    console.log(`${user.name} (${role}) is allowed to perform ${action}.`);
  } else {
    console.log(`${user.name} (${role}) is not allowed to perform ${action}.`);
  }
}

checkUserPermissions(user1, "delete"); // Alice is an admin and can delete
checkUserPermissions(user2, "delete"); // Bob is an editor and cannot delete
checkUserPermissions(user3, "read"); // Charlie is a viewer and can read

// Step 8: Checking if a user is logged in
function isLoggedIn(user) {
  if (loggedInUsers.has(user)) {
    console.log(`${user.name} is currently logged in.`);
  } else {
    console.log(`${user.name} is not logged in.`);
  }
}

isLoggedIn(user1); // Alice is logged in
isLoggedIn(user3); // Charlie is not logged in

// Step 9: Accessing sensitive user session data
function getSessionData(user) {
  const sessionData = userSessionData.get(user);
  if (sessionData) {
    console.log(`Session data for ${user.name}:`, sessionData);
  } else {
    console.log(`No session data found for ${user.name}.`);
  }
}

getSessionData(user1); // Get Alice's session data
getSessionData(user3); // Get Charlie's session data

// Step 10: Removing user references
console.log("\nRemoving Bob from the system...");
userRoles.delete(user2); // Bob is removed from the Map (roles)
loggedInUsers.delete(user2); // Bob is removed from the WeakSet (logged-in users)

// Check if Bob still exists in the system
checkUserPermissions(user2, "write");
isLoggedIn(user2);

/** Output:
 *  Alice (admin) is allowed to perform delete.
    Bob (editor) is not allowed to perform delete.
    Charlie (viewer) is allowed to perform read.
    Alice is currently logged in.
    Charlie is not logged in.
    Session data for Alice: { lastLogin: '2024-09-06', sessionId: 'abc123' }
    Session data for Charlie: { lastLogin: '2024-09-04', sessionId: 'ghi789' }

    Removing Bob from the system...
    Bob does not have a role assigned.
    Bob is not logged in.
 */
