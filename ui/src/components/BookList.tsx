import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui";
import { Book } from "@/models/book";
import { Spinner } from "./ui/spinner";

interface BookListProps {
  books: Book[];
  isLoading: boolean;
}

export default function BookList({ books, isLoading }: BookListProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <CardTitle>Books</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly pt-4 flex-wrap">
          {books.map((book) => (
            <Card key={book.id} className="relative p-4">
              <div className="absolute w-full h-full top-0 left-0 bg-white opacity-0 z-10 transition-opacity duration-300 hover:opacity-20 rounded-xl"></div>
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <CardDescription>By {book.author}</CardDescription>
              <p className="text-gray-500 text-sm">
                Published: {new Date(book.publishedDate).toLocaleDateString()}
              </p>
              {book.description && (
                <p className="mt-2 text-gray-700">{book.description}</p>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
      {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-sm">
            <Spinner show={isLoading} />
          </div>
        ) : (
          ""
        )}
    </Card>
  );
}
