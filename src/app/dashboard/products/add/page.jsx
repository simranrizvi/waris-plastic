"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/constants";
import { PackagePlus, Image as ImageIcon, IndianRupee, Tag, LayoutGrid, ListTodo, Loader2, X } from "lucide-react";
import { toast } from "sonner";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // Files store karne ke liye
  const [previews, setPreviews] = useState([]); // Preview dikhane ke liye

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Moulded",
    stock: "",
    discount: "0"
  });

  // Image selection handle karna
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...files]);

    // Previews generate karna
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...filePreviews]);
  };

  // Preview se image hatana
  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedImages.length === 0) return toast.error("Kam az kam ek image lazmi hai");
    
    setLoading(true);
    const data = new FormData();
    
    // Simple fields add karna
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("discount", formData.discount);

    // Multiple Images add karna
    selectedImages.forEach((file) => {
      data.append("images", file); // Backend pe .getAll("images") isi name se milega
    });

    try {
      const res = await fetch(API_ENDPOINTS.PRODUCTS, {
        method: "POST",
        // VIP: Headers mein Content-Type mat likhna, browser khud boundary set karega
        body: data, 
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Product images ke sath add ho gaya!");
        router.push("/dashboard/products");
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
      {/* Header section wahi rahega */}
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <div className="bg-blue-100 p-3 rounded-lg text-[#2E3192]">
          <PackagePlus size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-sm text-gray-500">Saab Pakistan Store mein naya item shamil karein</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Name, Category, Price, Stock fields same rahengi... bas onChange check karlein */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Tag size={16} /> Product Name
          </label>
          <input type="text" required className="w-full p-3 border rounded-xl" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <LayoutGrid size={16} /> Category
          </label>
          <select className="w-full p-3 border rounded-xl bg-white" 
            onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option value="Moulded">Moulded Furniture</option>
            <option value="Office">Office Furniture</option>
            <option value="Sofa">Sofa Collection</option>
          </select>
        </div>

        {/* --- MULTIPLE IMAGE UPLOAD SECTION --- */}
        <div className="md:col-span-2 space-y-4">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <ImageIcon size={16} /> Product Images (Multiple)
          </label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Image Pick Button */}
            <label className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center h-32 cursor-pointer hover:border-blue-500 transition">
              <ImageIcon className="text-gray-400" />
              <span className="text-xs text-gray-500 mt-2">Upload Images</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>

            {/* Previews */}
            {previews.map((src, index) => (
              <div key={index} className="relative h-32 w-full group">
                <img src={src} alt="preview" className="h-full w-full object-cover rounded-xl border" />
                <button type="button" onClick={() => removeImage(index)} 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold text-gray-700">Description</label>
          <textarea rows="4" required className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
        </div>

        <button type="submit" disabled={loading}
          className="md:col-span-2 w-full bg-[#2E3192] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70">
          {loading ? <Loader2 className="animate-spin" /> : "Save Product with Images"}
        </button>
      </form>
    </div>
  );
}