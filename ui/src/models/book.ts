export interface Book {
    id: string;
    title: string;
    author: string;
    publishedDate: Date;
    description?: string;
  }

export interface BookDTO {
  id: string;
  title: string;
  author: string;
  publishedDate: number;
  description?: string;
}