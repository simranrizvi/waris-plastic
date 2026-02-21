"use client";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/constants";
import { Edit, Trash2, Plus, Package, Search } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Data Fetching Logic
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.PRODUCTS);
      const result = await res.json();
      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      toast.error("Products load nahi ho sakay");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Delete Logic (Placeholder)
  const handleDelete = async (id) => {
    if (confirm("Kya aap waqai ye product delete karna chahte hain?")) {
      toast.success("Product delete ho gaya (API integration pending)");
      // Yahan aap delete API hit karenge
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse text-blue-900 font-bold">Loading Store Inventory...</div>;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-[#2E3192]" /> Product Inventory
          </h1>
          <p className="text-gray-500 text-sm">Total {products.length} products found in store</p>
        </div>
        <Link href="/dashboard/products/add" className="bg-[#2E3192] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold hover:bg-blue-900 transition shadow-lg shadow-blue-900/20">
          <Plus size={18} /> Add New Product
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Product</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Category</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Price</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Stock</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={product.images?.[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                    <div>
                      <p className="font-bold text-gray-800">{product.name}</p>
                      <p className="text-[11px] text-gray-400 font-mono">{product._id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="bg-blue-50 text-[#2E3192] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
                    {product.category}
                  </span>
                </td>
                <td className="p-4 font-bold text-gray-700">Rs.{product.price.toLocaleString()}</td>
                <td className="p-4">
                  <div className={`flex items-center gap-2 font-medium ${product.stock < 5 ? 'text-red-500' : 'text-gray-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${product.stock < 5 ? 'bg-red-500 animate-ping' : 'bg-green-500'}`}></div>
                    {product.stock} units
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}