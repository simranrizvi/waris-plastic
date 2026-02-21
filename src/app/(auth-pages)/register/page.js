"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/login"); // Register ke baad login pe bhejo
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-xl w-96 border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <input type="text" placeholder="Full Name" className="w-full p-3 mb-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email Address" className="w-full p-3 mb-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Register</button>
        <p className="mt-4 text-center text-sm text-gray-600">Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link></p>
      </form>
    </div>
  );
}