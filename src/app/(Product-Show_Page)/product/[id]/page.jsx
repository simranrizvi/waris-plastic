"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { API_ENDPOINTS } from "@/lib/constants";
import { ShoppingCart, Heart, Facebook, Twitter, PinIcon as Pinterest, Loader2, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
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

 const handleAddToCart = () => {
  if (product) {
    addToCart({ ...product, quantity: Number(quantity) });

    toast.success("Successfully added to cart!", {
      duration: 1500,
    });

    setTimeout(() => {
      router.push("/cart");
    }, 1500);
  }
};

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-[#D61F26]" size={40} />
    </div>
  );

  if (!product) return <div className="p-20 text-center text-red-500 font-bold">Product not found.</div>;

  return (
    <div className="w-full min-h-screen bg-white pb-20 font-sans">
      
      {/* 1. VIP HEADER SECTION (Centered Name Banner) */}
      <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden flex items-center justify-center">
  
  <img 
    src="https://images.unsplash.com/photo-1699831302264-936de1cd016a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="Banner" 
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-black text-white uppercase tracking-[0.15em] drop-shadow-md mb-4">
            {product.name}
          </h1>
          <div className="flex items-center justify-center gap-3 text-[10px] md:text-[11px] font-bold uppercase tracking-widest bg-black/40 py-2 px-6 rounded-full inline-flex">
            <span className="text-gray-300 hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/')}>Home</span> 
            <ChevronRight size={12} className="text-[#D61F26]" /> 
            <span className="text-[#D61F26]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* 2. Image Gallery Section (Image 9 Style) */}
          <div className="w-full lg:w-[45%]">
            <div className="border border-gray-100 bg-white p-2">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-auto object-contain" 
              />
            </div>
            {/* Thumbnails with Scroll Arrows logic */}
            <div className="flex items-center gap-2 mt-4">
               <button className="text-gray-400 hover:text-black">{"<"}</button>
               <div className="flex gap-2 overflow-x-hidden">
                {product.images?.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedImage(img)}
                    className={`w-24 h-24 border p-1 cursor-pointer transition-all ${selectedImage === img ? 'border-[#2E3192]' : 'border-gray-200'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
               </div>
               <button className="text-gray-400 hover:text-black">{">"}</button>
            </div>
          </div>

          {/* 3. Product Info Section (Exact layout of Image 7/9) */}
          <div className="w-full lg:w-[55%] space-y-5">
            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">{product.name}</h2>
            
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase">
              <span className="text-gray-400 italic font-medium">Availability: <span className="text-green-600 not-italic">✔ In stock</span></span>
              <span className="text-gray-400 italic font-medium">Vendor: <span className="text-gray-600 not-italic">Saab Pakistan</span></span>
            </div>

            <div className="flex items-baseline gap-3 border-b border-gray-100 pb-4">
              <span className="text-2xl font-black text-[#D61F26]">Rs.{product.price?.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through text-lg font-medium">Rs.{product.oldPrice?.toLocaleString()}</span>
              )}
            </div>

            {/* Description Tab Header */}
            <div className="border-b border-gray-200">
                <span className="inline-block py-2 px-4 bg-white border-t border-x border-gray-200 text-[11px] font-black uppercase text-gray-800 relative top-[1px]">Description</span>
            </div>

            <div className="space-y-4">
              <p className="text-[12px] font-black uppercase text-gray-800 tracking-tighter">Quick Overview:</p>
              <p className="text-gray-500 text-[13px] leading-relaxed text-justify">
                {product.description || "Saab SP-675 New Full Plastic Indoor and Outdoor Spectrum Patti Chair. Comfortable & graceful..."}
              </p>
            </div>

            {/* Quality Badges (Exact Circular Style from Image 7) */}
            <div className="flex gap-4 py-2">
               {[
                 { t: "WORLDWIDE", b: "SHIPPING" },
                 { t: "MONEY BACK", b: "30 DAYS" },
                 { t: "GUARANTEED", b: "QUALITY" },
                 { t: "ACCREDITED", b: "BUSINESS" }
               ].map((badge, i) => (
                 <div key={i} className="flex flex-col items-center text-center p-3 border-4 border-[#D61F26] rounded-full w-[75px] h-[75px] justify-center bg-white shadow-sm hover:scale-105 transition-transform">
                   <span className="text-[7px] font-black text-[#1A1A1A] leading-tight uppercase">{badge.t}<br/>{badge.b}</span>
                 </div>
               ))}
            </div>

            {/* Spec / Size Info */}
            <p className="text-lg font-bold text-gray-600 tracking-tight">H33 x W23 x D23.5 (inches)</p>

            {/* Color Selection (Dots like in Image 7) */}
            <div className="space-y-2">
                <span className="text-[11px] font-black uppercase text-gray-800">COLOR</span>
                <div className="flex gap-2">
                    {["#E5E4E2", "#4B2D1F", "#F5F5DC", "#DEB887", "#D61F26", "#454545", "#FFFFFF"].map((color, i) => (
                        <div key={i} className={`w-6 h-6 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-all ${i === 0 ? 'ring-2 ring-[#D61F26] ring-offset-2' : ''}`} style={{ backgroundColor: color }}></div>
                    ))}
                </div>
            </div>

            {/* Actions Bar (Exact spacing of Image 7) */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex border border-gray-300 h-10 items-center">
                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 text-gray-400 hover:text-black font-bold border-r h-full">-</button>
                 <input type="text" value={quantity} readOnly className="w-10 text-center font-bold text-sm outline-none" />
                 <button onClick={() => setQuantity(quantity + 1)} className="px-3 text-gray-400 hover:text-black font-bold border-l h-full">+</button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="bg-[#D61F26] text-white h-10 px-8 flex items-center justify-center gap-2 font-black uppercase text-[11px] tracking-widestcursor-ponter transition-all active:scale-95"
              >
                Add to Cart
              </button>

              <button className="h-10 w-10 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-red-500 transition-all">
                <Heart size={18} />
              </button>
            </div>

            {/* Share Section */}
            <div className="pt-6 border-t border-gray-50 space-y-3">
              <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase">
                <span>Share:</span>
                <div className="flex gap-4">
                  <Facebook size={14} className="hover:text-blue-600 cursor-pointer" />
                  <Pinterest size={14} className="hover:text-red-600 cursor-pointer" />
                  <Twitter size={14} className="hover:text-cyan-400 cursor-pointer" />
                </div>
              </div>
              <div className="text-[11px] font-bold text-gray-400 uppercase">
                Category: <span className="text-[#25B7D3] hover:underline cursor-pointer ml-1 font-medium italic underline">Deal of the Year , Full Plastic Chairs With Arms</span>
              </div>
              <div className="text-[11px] font-bold text-gray-400 uppercase">
                Tags: <span className="text-[#25B7D3] hover:underline cursor-pointer ml-1 font-medium italic underline italic">chairs , Dining chair , indoor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}