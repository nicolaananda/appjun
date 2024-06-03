import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/sharedui/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const { handleLogin } = useAuth({ email, password });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await handleLogin();
    if (data && data.token) {
      localStorage.setItem("token", data.token);
    } else {
      setMessage(data.message || "Login failed. Please try again.");
    }
  };

  return (
    <main>
      <Header />
      <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <section className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Login</h2>
            <p className="text-gray-600">Masuk akunmu untuk pinjam buku</p>
          </section>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            {message && (
              <p className="mt-4 text-red-500 text-center">{message}</p>
            )}
            <div className="mt-6">
              <Button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Login
              </Button>
            </div>
          </form>
          <section className="mt-4 text-center text-gray-600">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Daftar
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
