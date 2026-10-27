
const favoritesList = document.querySelector("#favorites-list");
const emptyMessage = document.querySelector("#empty-message");

// Hardcoded sample books
const sampleBooks = [
  {
    id: "book-1",
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018
  },
  {
    id: "book-2",
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988
  },
  {
    id: "book-3",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    year: 1997
  }
];

// Load saved favorites from localStorage
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("bookFavorites")) || [];
  } catch (error) {
    return [];
  }
}

// Save favorites to localStorage
function saveFavorites(favorites) {
  localStorage.setItem("bookFavorites", JSON.stringify(favorites));
}

// Add a book to favorites
export function addFavorite(book) {
  const favorites = getFavorites();

  const alreadyExists = favorites.some(
    favorite => favorite.id === book.id
  );

  if (alreadyExists) return;

  favorites.push(book);
  saveFavorites(favorites);
  renderFavorites();
}

// Remove a book from favorites
export function removeFavorite(bookId) {
  const favorites = getFavorites().filter(
    book => book.id !== bookId
  );

  saveFavorites(favorites);
  renderFavorites();
}

// Display favorites on the page
function renderFavorites() {
  const favorites = getFavorites();

  favoritesList.innerHTML = "";

  emptyMessage.hidden = favorites.length > 0;

  favorites.forEach(book => {
    const card = document.createElement("article");
    card.className =
      "rounded-xl border border-stone-200 bg-white p-6 shadow-sm";

    const title = document.createElement("h2");
    title.className = "text-xl font-bold text-slate-900";
    title.textContent = book.title;

    const author = document.createElement("p");
    author.className = "mt-2 text-slate-600";
    author.textContent = `Author: ${book.author}`;

    const year = document.createElement("p");
    year.className = "mt-1 text-sm text-slate-500";
    year.textContent = `Year: ${book.year}`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove from Favorites";
    removeButton.className =
      "mt-5 rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700";

    // DOM click event
    removeButton.addEventListener("click", () => {
      removeFavorite(book.id);
    });

    card.append(title, author, year, removeButton);
    favoritesList.appendChild(card);
  });
}

// Add sample books only when storage is empty
if (localStorage.getItem("bookFavorites") === null) {
  saveFavorites(sampleBooks);
}

// Render saved favorites when the page opens
renderFavorites();
