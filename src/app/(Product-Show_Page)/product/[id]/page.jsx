"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext"; // 1. Context import kiya
import { API_ENDPOINTS } from "@/lib/constants";
import { ShoppingCart, Heart, Facebook, Twitter, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { toast } from "sonner"; // Notification ke liye

export default function ProductDetailPage() {
const { id } = useParams();
  const { addToCart } = useCart(); // 2. Context se function nikaala
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Yahan bhi ID se slug alag karein taake API ko sahi ID mile
        const actualId = id.includes("-") ? id.split("-")[0] : id;
        
        const res = await fetch(`${API_ENDPOINTS.PRODUCTS}/${actualId}`);
        const result = await res.json();
        if (result.success) {
          setProduct(result.data);
          setSelectedImage(result.data.images[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  // 3. Add to Cart Handler
  const handleAddToCart = () => {
    if (product) {
      // Hum poora product object aur selected quantity bhej rahe hain
      addToCart({ 
        ...product, 
        quantity: Number(quantity) 
      });
      
      // Professional feel ke liye ek toast notification
      toast.success(`${product.name} cart mein add ho gaya!`);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse">Loading Product Details...</div>;
  if (!product) return <div className="p-20 text-center text-red-500 font-bold">Product not found.</div>;

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      {/* 1. Header Banner */}
      <div className="w-full h-80 bg-gray-900 overflow-hidden flex items-center justify-center relative">
        <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2000" className="absolute w-full h-full object-cover opacity-30 grayscale" />
        <div className="relative text-center text-white">
           <h1 className="text-3xl font-black uppercase tracking-widest">{product.name}</h1>
           <p className="text-sm opacity-80 font-medium tracking-tighter">Home {">"} {product.category} {">"} {product.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-sm flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Image Gallery */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="border border-gray-100 p-2 overflow-hidden bg-white">
              <img src={selectedImage} alt={product.name} className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {product.images?.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 border-2 p-1 cursor-pointer transition shrink-0 ${selectedImage === img ? 'border-[#2E3192]' : 'border-gray-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Product Info */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">{product.name}</h2>
              <div className="flex items-center gap-4 mt-2 border-b pb-4">
                <span className="text-xs text-green-600 font-bold uppercase flex items-center gap-1">
                   <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div> In Stock
                </span>
                <span className="text-xs text-gray-400 font-semibold tracking-widest">Vendor: Saab Pakistan</span>
              </div>
            </div>

            <div className="py-2">
              <span className="text-3xl font-black text-[#ED1C24]">Rs.{product.price?.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through ml-4 font-medium">Rs.{product.oldPrice?.toLocaleString()}</span>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b pb-2">Quick Overview:</p>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">{product.description}</p>
            </div>

            {/* Badges Section */}
            <div className="flex gap-4 py-4 border-y border-gray-50 justify-between">
               <div className="flex flex-col items-center gap-1"><Truck size={28} className="text-cyan-500" /><span className="text-[10px] font-bold text-gray-500">SHIPPING</span></div>
               <div className="flex flex-col items-center gap-1"><RefreshCcw size={28} className="text-cyan-500" /><span className="text-[10px] font-bold text-gray-500">MONEY BACK</span></div>
               <div className="flex flex-col items-center gap-1"><ShieldCheck size={28} className="text-cyan-500" /><span className="text-[10px] font-bold text-gray-500">QUALITY</span></div>
            </div>

            {/* 4. Controls & Click Action */}
            <div className="pt-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex border border-gray-200 h-14 bg-gray-50">
                   <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 hover:bg-gray-200 font-bold text-xl">-</button>
                   <input type="text" value={quantity} readOnly className="w-12 text-center border-x font-black bg-white" />
                   <button onClick={() => setQuantity(quantity + 1)} className="px-5 hover:bg-gray-200 font-bold text-xl">+</button>
                </div>
                
                {/* VIP Button: handleAddToCart call kiya */}
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#2E3192] text-white h-14 flex items-center justify-center gap-2 font-black uppercase tracking-widest hover:bg-blue-900 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                >
                  <ShoppingCart size={20} strokeWidth={2.5} /> Add to Cart
                </button>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Share:</span>
                    <Facebook size={16} className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
                    <Twitter size={16} className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                 </div>
                 <button className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase">
                    <Heart size={16} /> Add to Wishlist
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}