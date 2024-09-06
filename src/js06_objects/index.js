// index.js
// Objects (Properties, Methods, Object Literals, Constructors)
// A simple system to manage a library's collection of books example.

// Constructor function to create Book objects
function Book(title, author, yearPublished) {
  // Properties of the Book
  this.title = title;
  this.author = author;
  this.yearPublished = yearPublished;

  // Method to get the book's description
  this.getDescription = function () {
    return `${this.title} by ${this.author}, published in ${this.yearPublished}.`;
  };
}

// Creating book objects using the Book constructor
const book1 = new Book("1984", "George Orwell", 1949);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 1960);
const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);

// Using the method to get descriptions
console.log(book1.getDescription()); // "1984 by George Orwell, published in 1949."
console.log(book2.getDescription()); // "To Kill a Mockingbird by Harper Lee, published in 1960."
console.log(book3.getDescription()); // "The Great Gatsby by F. Scott Fitzgerald, published in 1925."

// Object literal to manage a library catalog
const libraryCatalog = {
  books: [book1, book2, book3],

  // Method to add a book to the catalog
  addBook: function (book) {
    this.books.push(book);
  },

  // Method to list all books in the catalog
  listBooks: function () {
    return this.books.map((book) => book.getDescription()).join("\n");
  },

  // Method to find a book by title
  findBookByTitle: function (title) {
    const book = this.books.find((book) => book.title === title);
    return book ? book.getDescription() : "Book not found.";
  },
};

// Adding a new book to the catalog
const book4 = new Book("Brave New World", "Aldous Huxley", 1932);
libraryCatalog.addBook(book4);

// Listing all books in the catalog
console.log("Library Catalog:\n" + libraryCatalog.listBooks());

// Finding a book by title
console.log(libraryCatalog.findBookByTitle("The Great Gatsby")); // "The Great Gatsby by F. Scott Fitzgerald, published in 1925."
console.log(libraryCatalog.findBookByTitle("Moby Dick")); // "Book not found."

/** Output:
 *  1984 by George Orwell, published in 1949.
    To Kill a Mockingbird by Harper Lee, published in 1960.
    The Great Gatsby by F. Scott Fitzgerald, published in 1925.
    Library Catalog:
    1984 by George Orwell, published in 1949.
    To Kill a Mockingbird by Harper Lee, published in 1960.
    The Great Gatsby by F. Scott Fitzgerald, published in 1925.
    Brave New World by Aldous Huxley, published in 1932.
    The Great Gatsby by F. Scott Fitzgerald, published in 1925.
    Book not found.
 */
