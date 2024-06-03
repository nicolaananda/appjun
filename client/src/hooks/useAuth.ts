import API_URL from "@/config/apiUrl";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/context/user";
import { useNavigate } from "react-router-dom";

interface useAuthProps {
  name?: string;
  email?: string;
  password?: string;
}

export const useAuth = ({ name, email, password }: useAuthProps = {}) => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [message, setMessage] = useState<string | null>(null);

  async function handleLogin() {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      console.log("Login success:", data);

      localStorage.setItem("user", JSON.stringify(data.user));
      Cookies.set("token", data.token);
      setUser(data.user);

      navigate("/", { replace: true });
      return data;
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.message);
      return null;
    }
  }

  async function handleRegister() {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
      console.log("Registration success:", data);
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(error.message);
      return null;
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");
    Cookies.remove("token");
    setUser(null);
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  return {
    handleLogin,
    handleLogout,
    user,
    handleRegister,
    message,
  };
};
