
const STORAGE_KEY = "bookFavorites";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function addFavorite(book) {
  const favorites = getFavorites();

  const alreadyExists = favorites.some(
    favorite => favorite.id === book.id
  );

  if (alreadyExists) {
    return favorites;
  }

  favorites.push(book);
  saveFavorites(favorites);

  return favorites;
}

export function removeFavorite(bookId) {
  const favorites = getFavorites().filter(
    book => book.id !== bookId
  );

  saveFavorites(favorites);

  return favorites;
}

export function getAllFavorites() {
  return getFavorites();
}
