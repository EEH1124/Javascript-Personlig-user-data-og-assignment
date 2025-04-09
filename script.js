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

  // Save to localStorage so it's not gone when I refresh
  localStorage.setItem("books", JSON.stringify(books));

  // Show the updated list on the page
  displayBooks();

  // Clear the form
  this.reset();
});

// Show the books on the page
function displayBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  books.map(({ id, title, author, genre, pages, favorite }) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${title}</strong> by ${author}, genre: ${genre}, pages: ${pages}
      ${favorite ? "" : ""}
      <button onclick="toggleFavorite('${id}')"></button>
      <button onclick="deleteBook('${id}')"></button>
    `;
    list.appendChild(li);
  });

  showStats();
}

// Toggle favorite status
function toggleFavorite(id) {
  books = books.map((book) =>
    book.id === id ? { ...book, favorite: !book.favorite } : book
  );
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}

// Delete a single book
function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}

// Delete all books
function clearBooks() {
  books = [];
  localStorage.removeItem("books");
  displayBooks();
}

// Show stats using reduce()
function showStats() {
  const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
  const statsDiv = document.getElementById("stats");
  statsDiv.textContent = `Total pages: ${totalPages}`;
}

// Load saved books on page load
displayBooks();
