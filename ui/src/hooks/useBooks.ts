import { useState, useEffect, useCallback } from "react";
import { Book } from "@/models/book";
import { bookService, BookFilters } from "@/services/book.service";

export const useBooks = (initialFilters: BookFilters = {}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState<BookFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [isBookLoading, setIsBookLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await bookService.getBooks(filters);
      setBooks(data);
    } catch (err) {
      setError("Failed to get books");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const addBook = async (book: Omit<Book, "id">) => {
    try {
      setIsBookLoading(true);
      setError(null);
      await bookService.createBook(book);
      await fetchBooks();
    } catch (err) {
      setError("Failed to add book");
      throw err;
    } finally {
      setIsBookLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    isLoading,
    isBookLoading,
    error,
    setFilters,
    addBook,
  };
};
