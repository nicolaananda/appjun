import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/sharedui/header";
import { QueryClient, useMutation, useQuery } from "react-query";
import { bookServices } from "@/services/bookServices";
import API_URL from "@/config/apiUrl";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";

const queryClient = new QueryClient();

export default function SinglePage() {
  const { id } = useParams();
  const [pin, setPin] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);

  const { data, error, isLoading } = useQuery([`book-${id}`], () =>
    bookServices.getSingleData(id)
  );

  const { mutate: handlePinjam } = useMutation({
    mutationFn: () => bookServices.updateData(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries([`book-${id}`]);
      toast.success("Buku berhasil dipinjam");
      window.location.reload(); // Refresh the page after successful mutation
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const { mutate: handleKembalikan } = useMutation({
    mutationFn: () => bookServices.returnBook(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries([`book-${id}`]);
      toast.success("Buku berhasil dikembalikan");
      window.location.reload(); // Refresh the page after successful mutation

      setShowPinInput(false);
      setPin("");
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const handleReturn = () => {
    if (pin === "1905") {
      handleKembalikan();
    } else {
      toast.error("PIN salah");
    }
  };

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
            {data?.isAvailable ? (
              <Button size={"sm"} onClick={() => handlePinjam()}>
                Pinjam
              </Button>
            ) : (
              <div>
                <p id="tgl" className="text-red-500">
                  Sudah dipinjam pada{" "}
                  {format(new Date(data.borrowedAt), "dd MMMM yyyy HH:mm")}
                </p>
                <Button
                  size={"sm"}
                  onClick={() => setShowPinInput(true)}
                  className="mt-2"
                >
                  Kembalikan
                </Button>
                {showPinInput && (
                  <div className="mt-2">
                    <input
                      type="password"
                      placeholder="Masukkan PIN"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="border rounded p-2 w-full"
                    />
                    <Button size={"sm"} onClick={handleReturn} className="mt-2">
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
