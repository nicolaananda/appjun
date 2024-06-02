import { useQuery } from "react-query";
import { bookServices } from "@/services/bookServices";
import { Header } from "@/components/sharedui/header";
import { BookCard } from "@/components/sharedui/bookCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const [searchParams] = useSearchParams();

  const {
    data: books,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["books", searchParams.get("search")],
    queryFn: async () => bookServices.getData(searchParams.get("search")),
  });

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  return (
    <main className="space-y-6">
      <Header />
      <section className="grid grid-cols-4 gap-4 max-w-4xl m-auto">
        {" "}
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error loading data</div>}
        {books?.map((book: any) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </main>
  );
}
