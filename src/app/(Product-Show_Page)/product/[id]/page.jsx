"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { API_ENDPOINTS } from "@/lib/constants";
import { ShoppingCart, Heart, Facebook, Twitter, PinIcon as Pinterest, Loader2, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const colorsMap = [
  { name: "Grey", hex: "#E5E4E2" },
  { name: "Brown", hex: "#4B2D1F" },
  { name: "Cream", hex: "#F5F5DC" },
  { name: "Beige", hex: "#DEB887" },
  { name: "Red", hex: "#D61F26" },
  { name: "Dark Grey", hex: "#454545" },
  { name: "White", hex: "#FFFFFF" },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colorsMap[0]);

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
      addToCart({ 
        ...product, 
        quantity: Number(quantity), 
        color: selectedColor.name 
      });

      toast.success(`Added to cart!`, { duration: 1500 });
      setTimeout(() => router.push("/cart"), 1500);
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
      
      {/* 1. HEADER BANNER - Responsive Height */}
      <div className="relative w-full h-[180px] md:h-[350px] lg:h-[400px] overflow-hidden flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1699831302264-936de1cd016a?q=80&w=774&auto=format&fit=crop" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-wider mb-2 md:mb-4">
            {product.name}
          </h1>
          <div className="flex items-center justify-center gap-2 text-[9px] md:text-[11px] font-bold uppercase tracking-widest bg-black/40 py-1.5 px-4 md:px-6 rounded-full inline-flex">
            <span className="text-gray-300 hover:text-white cursor-pointer" onClick={() => router.push('/')}>Home</span> 
            <ChevronRight size={10} className="text-[#D61F26]" /> 
            <span className="text-[#D61F26] truncate max-w-[150px] md:max-w-none">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 md:mt-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* 2. IMAGE GALLERY - Full Width on Mobile */}
          <div className="w-full lg:w-[45%]">
            <div className="border border-gray-100 bg-white p-2 shadow-sm">
              <img src={selectedImage} alt={product.name} className="w-full h-auto max-h-[350px] md:max-h-none object-contain mx-auto" />
            </div>
            {/* Thumbnails with horizontal scroll on mobile */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images?.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 md:w-20 md:h-20 border p-1 cursor-pointer shrink-0 transition-all ${selectedImage === img ? 'border-[#D61F26]' : 'border-gray-200'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* 3. PRODUCT INFO */}
          <div className="w-full lg:w-[55%] space-y-5">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 uppercase tracking-tight leading-tight">{product.name}</h2>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[10px] md:text-[11px] font-bold uppercase">
              <span className="text-gray-400 italic">Availability: <span className="text-green-600 not-italic">✔ In stock</span></span>
              <span className="text-gray-400 italic">Vendor: <span className="text-gray-600 not-italic">Saab Pakistan</span></span>
            </div>

            <div className="flex items-baseline gap-3 border-b border-gray-100 pb-4">
              <span className="text-xl md:text-2xl font-black text-[#D61F26]">Rs.{product.price?.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through text-base md:text-lg">Rs.{product.oldPrice?.toLocaleString()}</span>
              )}
            </div>

            <div className="border-b border-gray-200">
                <span className="inline-block py-2 px-4 bg-white border-t border-x border-gray-200 text-[10px] md:text-[11px] font-black uppercase text-gray-800 relative top-[1px]">Description</span>
            </div>

            <div className="space-y-3 md:space-y-4">
              <p className="text-[11px] md:text-[12px] font-black uppercase text-gray-800">Quick Overview:</p>
              <p className="text-gray-500 text-[12px] md:text-[13px] leading-relaxed">
                {product.description || "High quality furniture designed for comfort and durability."}
              </p>
            </div>

            {/* Quality Badges - Horizontal Scroll on Mobile */}
            <div className="flex gap-3 md:gap-4 py-2 overflow-x-auto md:overflow-visible pb-4">
               {[
                 { t: "WORLDWIDE", b: "SHIPPING" },
                 { t: "MONEY BACK", b: "30 DAYS" },
                 { t: "GUARANTEED", b: "QUALITY" },
                 { t: "ACCREDITED", b: "BUSINESS" }
               ].map((badge, i) => (
                 <div key={i} className="flex flex-col items-center text-center p-2 border-4 border-[#D61F26] rounded-full w-[65px] h-[65px] md:w-[70px] md:h-[70px] shrink-0 justify-center bg-white shadow-sm transition-transform hover:scale-105">
                   <span className="text-[6px] md:text-[7px] font-black text-[#1A1A1A] leading-tight uppercase">{badge.t}<br/>{badge.b}</span>
                 </div>
               ))}
            </div>

            <p className="text-base md:text-lg font-bold text-gray-600 tracking-tight">H33 x W23 x D23.5 (inches)</p>

            {/* COLOR SELECTION */}
            <div className="space-y-3 py-2">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-[11px] font-black uppercase text-gray-800 tracking-widest">COLOR:</span>
                    <span className="text-[10px] md:text-[11px] font-bold text-[#D61F26] uppercase">{selectedColor.name}</span>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {colorsMap.map((color, i) => (
                        <div 
                          key={i} 
                          onClick={() => setSelectedColor(color)}
                          className={`w-7 h-7 md:w-8 md:h-8 rounded-full border border-gray-300 cursor-pointer transition-all flex items-center justify-center
                            ${selectedColor.name === color.name ? 'ring-2 ring-[#D61F26] ring-offset-2 scale-110' : 'hover:scale-105'}
                          `}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                            {selectedColor.name === color.name && (
                                <div className="w-full h-full rounded-full border-2 border-white/30"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ACTIONS BAR - Responsive Layout */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <div className="flex items-center w-full sm:w-auto">
                <div className="flex border border-gray-300 h-11 items-center w-full sm:w-auto justify-between sm:justify-start">
                   <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-gray-400 hover:text-black font-bold border-r h-full">-</button>
                   <input type="text" value={quantity} readOnly className="w-12 text-center font-bold text-sm outline-none" />
                   <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-gray-400 hover:text-black font-bold border-l h-full">+</button>
                </div>
              </div>
              
              <div className="flex gap-3 w-full sm:flex-1">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#D61F26] text-white h-11 px-6 md:px-10 flex items-center justify-center gap-2 font-black uppercase text-[10px] md:text-[11px] tracking-widest transition-all active:scale-95 shadow-md"
                >
                  Add to Cart
                </button>

                <button className="h-11 w-11 shrink-0 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-red-500 transition-all">
                  <Heart size={18} />
                </button>
              </div>
            </div>

            {/* Share & Meta */}
            <div className="pt-6 border-t border-gray-50 space-y-3">
              <div className="flex items-center gap-4 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase">
                <span>Share:</span>
                <div className="flex gap-4">
                  <Facebook size={14} className="hover:text-blue-600 cursor-pointer" />
                  <Pinterest size={14} className="hover:text-red-600 cursor-pointer" />
                  <Twitter size={14} className="hover:text-cyan-400 cursor-pointer" />
                </div>
              </div>
              <div className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase">
                Category: <span className="text-[#25B7D3] italic underline cursor-pointer ml-1">Furniture, Chairs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}