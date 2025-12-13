"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaMoon, FaSun } from "react-icons/fa";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   async function login() {
    try {
      const res = await axios.post("http://localhost:3001/login", {  email: email,
        password: password });
      localStorage.setItem("token", res.data.token);
      router.push("/employees");
    } catch {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 backdrop-blur-xl">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-yellow-600">Employee Login</h1>
          <ThemeToggle />
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 outline-primary"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-lg dark:bg-gray-700 outline-primary"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-yellow-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
