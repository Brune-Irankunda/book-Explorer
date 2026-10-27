
const BASE_URL = "https://openlibrary.org";

export async function fetchBooks(query = "javascript") {
  const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=24`;

  try {
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
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

export function getCoverUrl(coverId) {
  if (!coverId) return null;

  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}
