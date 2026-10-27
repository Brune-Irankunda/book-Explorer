
const BASE_URL = "https://openlibrary.org";

export async function fetchBooks(query = "romance") {
  const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=24`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  const data = await response.json();

  return data.docs.map((book) => ({
    id: book.key,
    title: book.title || "Untitled book",
    author: book.author_name?.join(", ") || "Unknown author",
    year: book.first_publish_year || "Year unknown",
    coverId: book.cover_i || null,
    subjects: book.subject?.slice(0, 10) || []
  }));
}

export function getCoverUrl(coverId) {
  if (!coverId) return "https://placehold.co/160x220?text=No+Cover";

  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}
