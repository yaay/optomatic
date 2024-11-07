export class Book {
  id: string;
  title: string;
  author: string;
  publishedDate: number;
  description?: string;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}
