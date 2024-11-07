import { config } from "@/config/env";
import { Book, BookDTO } from "@/models/book";
import { dateUtils } from "@/utlis/dateUtlis";

export type BookFilters = {
  title?: string;
  year?: string;
};

export const bookService = {
  async getBooks(filters: BookFilters = {}) {
    const params = new URLSearchParams();
    if (filters.title) params.append("title", filters.title);
    if (filters.year) params.append("year", filters.year);

    const response = await fetch(`${config.apiUrl}/books?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const booksDTO: BookDTO[] = await response.json();
    return booksDTO.map((bookDTO) =>
      dateUtils.transformBookFromServer(bookDTO)
    );
  },

  async createBook(book: Omit<Book, "id">) {
    const bookDTO = dateUtils.transformBookToServer(book);

    const response = await fetch(`${config.apiUrl}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookDTO),
    });
    if (!response.ok) {
      throw new Error("Failed to create book");
    }
    const createdBookDTO: BookDTO = await response.json();
    return dateUtils.transformBookFromServer(createdBookDTO);
  },
};
