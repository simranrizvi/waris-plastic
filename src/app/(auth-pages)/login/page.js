"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email, password, redirect: false,
    });

    if (!res.error) {
      // Role check karke sahi jagah bhejne ke liye
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      router.refresh();
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-xl w-96 border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Sign In</button>
        <p className="mt-4 text-center text-sm text-gray-600">Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link></p>
      </form>
    </div>
  );
}