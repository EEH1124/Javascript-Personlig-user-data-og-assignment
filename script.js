// Load books from localStorage, or start with an empty array if nothing is saved
let books = JSON.parse(localStorage.getItem("books")) || [];

// Handle the form when a book is added
document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop the page from reloading when I submit

  // Make a new book object using the input values
  const newBook = {
    id: Date.now().toString(), // Just to make a unique ID
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    genre: document.getElementById("genre").value,
    pages: parseInt(document.getElementById("pages").value),
    favorite: false, // This is for the heart button
  };

  // Add the book to the list
  books.push(newBook);

  // Save to localStorage so it is not gone when I refresh
  localStorage.setItem("books", JSON.stringify(books));

  // Show the updated list on the page
  displayBooks();
});

