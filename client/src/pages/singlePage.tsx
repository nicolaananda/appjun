import { useParams } from "react-router-dom";
import { Header } from "@/components/sharedui/header";
import { QueryClient, useMutation, useQuery } from "react-query";
import { bookServices } from "@/services/bookServices";
import API_URL from "@/config/apiUrl";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const queryClient = new QueryClient();

export default function SinglePage() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery([`book-${id}`], () =>
    bookServices.getSingleData(id)
  );

  const mutation = useMutation(() => bookServices.updateData(id as string), {
    onSuccess: () => {
      queryClient.invalidateQueries([`book-${id}`]);
      toast.success("Buku berhasil dipinjam");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading book data</div>;
  }

  return (
    <main className="space-y-6">
      <Header />
      <section className="flex justify-center items-center">
        <div className="grid grid-cols-2 max-w-4xl bg-white p-8 rounded-lg shadow-md">
          <img
            src={`${API_URL}/${data?.file}`}
            width={400}
            className="rounded-lg"
          />
          <div className="pl-8">
            <h1 className="font-bold text-5xl text-neutral-500">
              {data?.name}
            </h1>
            <h2 className="font-semibold text-l mb-4">{data?.author}</h2>
            <p className="text-justify">{data?.description}</p>
            <br />
            <Button onClick={() => mutation.mutate()} size={"sm"}>
              Pinjam
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
