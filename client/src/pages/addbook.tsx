import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "react-query";
import { bookServices } from "@/services/bookServices";
import { toast } from "sonner";
import { IBook } from "@/types/entity";
import { Header } from "@/components/sharedui/header";

const initialBookValues: IBook = {
  name: "",
  description: "",
  isbn: "",
  author: "",
  file: null,
};

export default function Addbook() {
  const [book, setBook] = useState(initialBookValues);
  const queryClient = useQueryClient();

  const handleAddBook = useMutation({
    mutationFn: bookServices.createData,
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      toast.success("Buku berhasil disubmit!!");
      setBook(initialBookValues);
    },
    onError: () => {
      toast.error("Buku gagal disubmit!!");
    },
  });

  return (
    <main>
      <Header />

      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
        <main className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Add a New Book
          </h1>
          <section className="space-y-4">
            <Input
              value={book.name}
              placeholder="Name"
              onChange={(e) => setBook({ ...book, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            />
            <Input
              value={book.description}
              placeholder="Description"
              onChange={(e) =>
                setBook({ ...book, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
            <Input
              value={book.isbn}
              placeholder="ISBN"
              onChange={(e) => setBook({ ...book, isbn: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            />
            <Input
              value={book.author}
              placeholder="Author"
              onChange={(e) => setBook({ ...book, author: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="file"
              onChange={(e) =>
                setBook({ ...book, file: e.target.files as FileList })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
            <Button
              onClick={() => handleAddBook.mutate(book)}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit your Book
            </Button>
          </section>
        </main>
      </div>
    </main>
  );
}
