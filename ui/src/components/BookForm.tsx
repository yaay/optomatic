import { useState } from "react";
import {
  Input,
  Button,
  Textarea,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  Dialog,
} from "./ui";
import { Book } from "@/models/book";
import { DatePicker } from "./ui/date-picker";
import { Spinner } from "./ui/spinner";

interface BookFormProps {
  onSubmit: (book: Omit<Book, "id">) => void;
  isBookLoading: boolean;
}

export default function BookForm({ onSubmit, isBookLoading }: BookFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    publishedDate: new Date(),
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
    setFormData({
      title: "",
      author: "",
      publishedDate: new Date(),
      description: "",
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Book</Button>
        </DialogTrigger>
        <DialogContent className="fixed">
          <DialogHeader>
            <DialogHeader>Add New Book</DialogHeader>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <Input
              placeholder="Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />

            <DatePicker
              date={formData.publishedDate}
              onDateChange={(newDate) =>
                setFormData({
                  ...formData,
                  publishedDate: newDate || new Date(),
                })
              }
            />
            <Textarea
              placeholder="Description (optional)"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <Button type="submit">Add Book</Button>
          </form>
          {isBookLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-sm">
              <Spinner show={isBookLoading} />
            </div>
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
