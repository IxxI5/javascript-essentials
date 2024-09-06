// users.js
// Manages user data and borrowing records.

// Importing utility functions for validation
import { formatDate } from "./utils.js";

// An array to store users
export const users = [
  { id: 1, name: "Alice", borrowedBooks: [] },
  { id: 2, name: "Bob", borrowedBooks: [] },
];

// Function to register a new user
export function addUser(user) {
  users.push(user);
}

// Function to borrow a book for a user
export async function borrowBookForUser(userId, bookId) {
  const user = users.find((u) => u.id === userId);
  if (!user) return false;

  const bookBorrowed = await import("./books.js").then((module) =>
    module.borrowBook(bookId)
  );

  if (bookBorrowed) {
    user.borrowedBooks.push({ bookId, date: formatDate(new Date()) });
    return true;
  }
  return false;
}

// Function to return a book for a user
export async function returnBookForUser(userId, bookId) {
  const user = users.find((u) => u.id === userId);
  if (!user) return false;

  const index = user.borrowedBooks.findIndex((b) => b.bookId === bookId);
  if (index !== -1) {
    user.borrowedBooks.splice(index, 1);
    return true;
  }
  return false;
}
