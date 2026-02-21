"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/constants";
import { PackagePlus, Image as ImageIcon, IndianRupee, Tag, LayoutGrid, ListTodo, Loader2 } from "lucide-react";
import { toast } from "sonner"; // Notification ke liye

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Moulded", // Default category
    images: [""],
    stock: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINTS.PRODUCTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Product successfully add ho gaya!");
        router.push("/dashboard/products"); // List page pe wapas bhej do
      } else {
        toast.error(result.message || "Kuch masla ho gaya");
      }
    } catch (error) {
      toast.error("Network error: Dubara koshish karein");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <div className="bg-blue-100 p-3 rounded-lg text-[#2E3192]">
          <PackagePlus size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-sm text-gray-500">Store mein naya furniture item shamil karein</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Product Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Tag size={16} /> Product Name
          </label>
          <input 
            type="text" 
            placeholder="e.g. Luxury Sofa Set"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <LayoutGrid size={16} /> Category
          </label>
          <select 
            className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="Moulded">Moulded Furniture</option>
            <option value="Office">Office Furniture</option>
            <option value="Sofa">Sofa Collection</option>
            <option value="Outdoor">Outdoor Furniture</option>
          </select>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <IndianRupee size={16} /> Price (Rs.)
          </label>
          <input 
            type="number" 
            placeholder="0.00"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <ListTodo size={16} /> Stock Quantity
          </label>
          <input 
            type="number" 
            placeholder="e.g. 50"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            required
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <ImageIcon size={16} /> Image URL
          </label>
          <input 
            type="text" 
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setFormData({...formData, images: [e.target.value]})}
            required
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold text-gray-700">Description</label>
          <textarea 
            rows="4"
            placeholder="Product ki details yahan likhein..."
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#2E3192] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-900 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save Product to Store"}
          </button>
        </div>
      </form>
    </div>
  );
}