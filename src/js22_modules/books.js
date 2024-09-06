// books.js
// Manages book data and operations.

// An array to store books
export const books = [
  {
    id: 1,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    available: true,
  },
  {
    id: 2,
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    available: true,
  },
  {
    id: 3,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    available: false,
  },
];

// Function to add a new book
export function addBook(book) {
  books.push(book);
}

// Function to find a book by title
export function findBookByTitle(title) {
  return books.find((book) => book.title === title);
}

// Function to check if a book is available
export function isBookAvailable(id) {
  const book = books.find((b) => b.id === id);
  return book ? book.available : false;
}

// Function to borrow a book
export function borrowBook(id) {
  const book = books.find((b) => b.id === id);
  if (book && book.available) {
    book.available = false;
    return true;
  }
  return false;
}
