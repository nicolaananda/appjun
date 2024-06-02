import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Header } from "@/components/sharedui/header";
import { useAuth } from "@/hooks/useAuth";
import { Toaster, toast } from "sonner";

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const { handleRegister } = useAuth(user);

  const handleSubmit = async () => {
    const result = await handleRegister();
    if (result) {
      toast.success("Registration successful");
    } else {
      toast.error("Registration failed");
    }
  };

  return (
    <main>
      <Header />
      <Toaster position="top-right" />
      <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <section className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Register</h2>
            <p className="text-gray-600">Buat akunmu untuk pinjam buku</p>
          </section>
          <div className="space-y-4">
            <Input
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Input
              placeholder="Password"
              type="password"
              className="w-full px-4 py-2 border rounded-md"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="mt-6">
            <Button
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Register
            </Button>
          </div>
          <section className="mt-4 text-center text-gray-600">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
