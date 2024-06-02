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

export const useAuth = ({ name, email, password }: useAuthProps) => {
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
      console.log(data);
      setMessage("Login successful");

      // cookies and local storage
      localStorage.setItem("user", JSON.stringify(data.user));
      Cookies.set("token", data.token, { expires: 1 });
      setUser(data.token);
      navigate("/", { replace: true });

      // return data;
    } catch (error: any) {
      // Added type annotation for error
      setMessage(error.message || "Login failed");
      console.error(error);
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

      setMessage("Registration successful");
      return data;
    } catch (error: any) {
      // Added type annotation for error
      setMessage(error.message || "Registration failed");
      console.error(error);
      return null;
    }
  }

  useEffect(() => {}, []);

  return {
    handleLogin,
    handleRegister,
    message,
    user,
  };
};
