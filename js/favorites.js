

const STORAGE_KEY = "bookFavorites";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

function renderFavorites() {
  const list = document.querySelector("#favorites-list");
  const emptyMessage = document.querySelector("#empty-message");

  if (!list || !emptyMessage) return;

  const favorites = getFavorites();

  list.innerHTML = "";
  emptyMessage.hidden = favorites.length > 0;

  favorites.forEach((book) => {
    const card = document.createElement("article");
    card.className = "rounded-xl border border-stone-200 bg-white p-5 shadow-sm";

    card.innerHTML = `
      <h2 class="text-xl font-bold text-slate-900"></h2>
      <p class="mt-2 text-slate-600"></p>
      <p class="mt-1 text-sm text-slate-500"></p>
      <button class="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
        Remove from Favorites
      </button>
    `;

    card.querySelector("h2").textContent = book.title || "Untitled book";
    card.querySelector("p:nth-of-type(1)").textContent =
      `Author: ${book.author || "Unknown author"}`;
    card.querySelector("p:nth-of-type(2)").textContent =
      `Year: ${book.year || "Year unknown"}`;

    card.querySelector("button").addEventListener("click", () => {
      const updatedFavorites = getFavorites().filter(
        (favorite) => favorite.id !== book.id
      );

      saveFavorites(updatedFavorites);
      renderFavorites();
    });

    list.appendChild(card);
  });
}

renderFavorites();
