"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from "lucide-react";

export default function Sidebar({ user }) {
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-slate-800 text-blue-400">
        Admin Panel
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg">
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link href="/dashboard/products" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg">
          <Package size={20} /> Products
        </Link>
        <Link href="/dashboard/orders" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg">
          <ShoppingCart size={20} /> Orders
        </Link>
        <Link href="/dashboard/users" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg">
          <Users size={20} /> Users
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="mb-4 px-2">
          <p className="text-sm text-slate-400">Logged in as:</p>
          <p className="text-sm font-medium truncate">{user.name}</p>
        </div>
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
}