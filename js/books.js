
import { fetchBooks } from "./fetchbooks.js";

const STORAGE_KEY = "bookFavorites";
const booksGrid = document.querySelector("#books-grid");
const statusMessage = document.querySelector("#status-message");

let books = [];

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function renderBooks(items) {
  if (!booksGrid) return;

  booksGrid.innerHTML = "";

  if (items.length === 0) {
    booksGrid.textContent = "No books found for this category.";
    return;
  }

  items.forEach((book) => {
    const card = document.createElement("article");
    card.className =
      "rounded-xl border border-stone-200 bg-white p-5 shadow-sm";

    // Book cover picture
    const cover = document.createElement("img");

    cover.src = book.coverId
      ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
      : "https://placehold.co/160x220?text=No+Cover";

    cover.alt = `Cover of ${book.title}`;
    cover.className =
      "mx-auto mb-4 h-56 w-40 rounded-lg object-cover";

    cover.onerror = () => {
      cover.onerror = null;
      cover.src = "https://placehold.co/160x220?text=No+Cover";
    };

    const title = document.createElement("h2");
    title.className = "text-xl font-bold";
    title.textContent = book.title || "Untitled book";

    const author = document.createElement("p");
    author.className = "mt-2 text-slate-600";
    author.textContent = `Author: ${book.author || "Unknown author"}`;

    const year = document.createElement("p");
    year.className = "mt-1 text-sm text-slate-500";
    year.textContent = `Year: ${book.year || "Year unknown"}`;

    const favoriteButton = document.createElement("button");
    favoriteButton.className =
      "mt-4 rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700";
    favoriteButton.textContent = "Add to Favorites";

    favoriteButton.addEventListener("click", () => {
      const favorites = getFavorites();
      const alreadySaved = favorites.some(
        (item) => item.id === book.id
      );

      if (alreadySaved) {
        favoriteButton.textContent = "Already in Favorites";
        return;
      }

      favorites.push(book);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      favoriteButton.textContent = "Added to Favorites";
    });

    card.append(cover, title, author, year, favoriteButton);
    booksGrid.appendChild(card);
  });
}

async function loadBooks(query = "romance") {
  try {
    if (statusMessage) {
      statusMessage.textContent = "Loading books...";
    }

    books = await fetchBooks(query);
    renderBooks(books);

    if (statusMessage) {
      statusMessage.textContent = books.length
        ? `${books.length} books found.`
        : "No books found.";
    }
  } catch (error) {
    if (statusMessage) {
      statusMessage.textContent =
        "Could not load books. Please try again.";
    }

    console.error("Error loading books:", error);
  }
}


 // Read the selected category from the URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "love";

const categorySearchTerms = {
  love: "romance love stories",
  romance: "romance love stories",
  science: "science",
  history: "history",
  fantasy: "fantasy",
  "self-development": "self help personal development",
  politics: "politics government",
  business: "business entrepreneurship management",
};

loadBooks(categorySearchTerms[category] || category);

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = searchInput.value.trim();

    if (title) {
      loadBooks(title);
    }
  });
}
