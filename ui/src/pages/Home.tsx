import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import { Input } from "@/components/ui";
import { useBooks } from "@/hooks/useBooks";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { toast } from "sonner";

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const { books, isLoading, isBookLoading, error, setFilters, addBook } =
    useBooks();

  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setFilters((prev) => ({ ...prev, title: newTitle }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value;
    setYear(newYear);
    setFilters((prev) => ({ ...prev, year: newYear }));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8 mt-8 flex space flex-row justify-between items-center">
        <h1 className="text-4xl font-bold">Book Management System</h1>
        <ModeToggle />
      </div>
      <div className="mb-8 flex flex-row gap-4 justify-between flex-wrap">
        <div className="flex flex-row gap-4">
          <Input
            placeholder="Search by Title"
            value={title}
            onChange={handleTitleChange}
          />
          <Input
            placeholder="Filter by Year"
            type="number"
            value={year}
            onChange={handleYearChange}
          />
        </div>
        <BookForm onSubmit={addBook} isBookLoading={isBookLoading} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <BookList books={books} isLoading={isLoading} />
      </div>
    </div>
  );
}
