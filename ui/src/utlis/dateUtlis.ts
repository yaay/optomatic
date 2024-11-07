import { Book, BookDTO } from "@/models/book";

export const dateUtils = {
  toUnixTimestamp(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  },

  fromUnixTimestamp(unixTimestamp: number): Date {
    return new Date(unixTimestamp * 1000);
  },

  transformBookFromServer(bookDTO: BookDTO): Book {
    return {
      ...bookDTO,
      publishedDate: this.fromUnixTimestamp(bookDTO.publishedDate),
    };
  },

  transformBookToServer(book: Omit<Book, "id">): Omit<BookDTO, "id"> {
    return {
      ...book,
      publishedDate: this.toUnixTimestamp(book.publishedDate),
    };
  },

  formatForInput(date: Date): string {
    return date.toISOString().split("T")[0];
  },

  parseFromInput(dateString: string): Date {
    return new Date(dateString);
  },
};
