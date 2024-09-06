// index.js
// Modules (Modules, Imports, Exports)
// Library Management System

// Importing functions from other modules
import { books, addBook, findBookByTitle, isBookAvailable } from "./books.js";
import { addUser, borrowBookForUser, returnBookForUser } from "./users.js";

// Adding new books
addBook({
  id: 4,
  title: "JavaScript Patterns",
  author: "Stoyan Stefanov",
  available: true,
});

// Adding new users
addUser({ id: 3, name: "Charlie", borrowedBooks: [] });

// Borrowing a book
const userId = 1; // Alice
const bookTitle = "Eloquent JavaScript";
const book = findBookByTitle(bookTitle);

if (book && isBookAvailable(book.id)) {
  borrowBookForUser(userId, book.id).then((success) => {
    if (success) {
      console.log(`User ${userId} successfully borrowed ${bookTitle}.`);
    } else {
      console.log(`Failed to borrow ${bookTitle}.`);
    }
  });
}

// Returning a book
returnBookForUser(userId, 2) // Assuming Bob borrowed book with id 2
  .then((success) => {
    if (success) {
      console.log(`User ${userId} successfully returned the book.`);
    } else {
      console.log(`Failed to return the book.`);
    }
  });

/** Output:
 *  Failed to return the book.
    User 1 successfully borrowed Eloquent JavaScript.
 */

// comments.js

// Explanation 1: Modules
// Each JavaScript file (e.g., books.js, users.js, utils.js) is treated as a module.
// This means that each file can export and import functionalities, enabling modularization of code.
// By using modules, we can better organize our code and separate concerns, making it more maintainable.

// Explanation 2: Exporting
// In JavaScript, we use the "export" keyword to expose functions, objects, or values from a module.
// This allows other modules to import and use these exported functionalities.
// For example, in books.js, we export functions like addBook, findBookByTitle, etc., using "export".
// This enables other modules to import and use these functions for managing books.

// Explanation 3: Importing
// To use functionalities from other modules, we use the "import" keyword.
// The "import" statement allows us to bring in exported functions, objects, or values from other modules.
// For example, in users.js, we import utility functions from utils.js to use them in user management operations.
// Importing helps in reusing code and managing dependencies between modules.

// Explanation 4: Dynamic Imports
// JavaScript supports dynamic imports using the "import()" function, which allows us to load modules on demand.
// This can be beneficial for performance optimization, as it defers the loading of modules until they are actually needed.
// In users.js, we use dynamic imports to load the books module only when necessary for borrowing books.
// This reduces the initial load time and helps in managing resources efficiently.

// Explanation 5: Utility Functions
// Utility functions are helper functions that perform common tasks and are used across different modules.
// For instance, in utils.js, we provide functions like formatDate and isValidBookTitle.
// These functions can be imported and used in other modules to ensure consistent functionality and avoid code duplication.
// Utility functions centralize common operations, making code cleaner and easier to maintain.
