"use client";

import MegaMenu from "./MegaMenu"; 
import { Search, ShoppingCart, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.details?.price * item.quantity), 0);

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="w-full font-sans">
      {/* 1. Top Bar */}
      <div className="bg-[#f5f5f5] py-2 text-[12px] border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-6 text-gray-600">
             <div className="flex items-center gap-1 cursor-pointer hover:text-[#D61F26]">
               <img src="/uk-flag.png" className="w-4 h-3" alt="en" /> English ▾
             </div>
             <div className="flex items-center gap-1 cursor-pointer hover:text-[#D61F26]">
               <span className="text-[14px]">👤</span> My Account ▾
             </div>
             <div className="flex items-center gap-1 cursor-pointer hover:text-[#D61F26]">
               <span className="text-[14px]">❤</span> My Wishlist
             </div>
          </div>
          <div className="flex items-center gap-4 text-gray-600 font-medium">
             <span className="flex items-center gap-1"><Phone size={14} className="text-gray-400"/> +923312216249</span>
             <span className="flex items-center gap-1 cursor-pointer hover:text-[#D61F26]"><MapPin size={14} className="text-gray-400"/> OUR OUTLETS</span>
          </div>
        </div>
      </div>

      {/* 2. Middle Bar */}
      <div className="container mx-auto py-5 px-4 flex items-center justify-between">
        <div className="w-[120px] cursor-pointer" onClick={() => router.push("/")}>
          {/* Logo updated for Waris */}
          <img src="/logo.webp" alt="Waris Logo" className="w-full object-contain" />
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-[500px] flex border-[1px] border-gray-300 rounded-sm overflow-hidden mx-10">
          <div className="bg-white px-3 flex items-center border-r border-gray-200">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search for furniture..." 
            className="w-full p-2 text-[14px] outline-none placeholder:text-gray-300" 
          />
          {/* Updated to Waris Red */}
          <button className="bg-[#D61F26] text-white px-7 py-2 font-bold text-[14px] uppercase hover:bg-[#b0191f] transition-colors">
            Search
          </button>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-3 border-l border-gray-200 pl-8">
            <img src="/truck-icon.png" className="w-10 h-10 opacity-60" alt="delivery" />
            <div>
              <p className="text-[#A7A9AC] italic font-serif text-[18px] leading-tight">Fast Delivery</p>
              <p className="text-gray-400 text-[12px] uppercase tracking-tighter">Karachi & Beyond</p>
            </div>
          </div>

          {/* 4. DYNAMIC CART SECTION - Updated to Waris Red */}
          <div 
            onClick={() => router.push("/cart")}
            className="bg-[#D61F26] text-white p-3 flex items-center gap-4 min-w-[210px] rounded-sm cursor-pointer hover:bg-[#b0191f] shadow-md transition-all active:scale-95"
          >
            <div className="relative">
              <ShoppingCart size={28} strokeWidth={1.5} />
              {/* Dynamic Count Badge */}
              <span className="absolute -top-1 -right-1 bg-white text-[#D61F26] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-[#D61F26]">
                {totalItems}
              </span>
            </div>
            <div>
              <p className="text-[11px] font-light opacity-90 truncate">
                {totalItems} items - Rs.{totalPrice.toLocaleString()}
              </p>
              <p className="font-bold text-[13px] uppercase tracking-wide">My Cart</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Bar (Mega Menu) - Updated to Dark Gray matching image */}
      <div className="relative bg-[#454545]">
        <div className="container mx-auto flex justify-between items-center pr-6 w-full">
          <MegaMenu />
          {/* Social Icons matching your provided image layout */}
          <div className="flex items-center gap-4 text-gray-300">
            <Facebook size={16} className="hover:text-[#D61F26] cursor-pointer transition-colors" />
            <Twitter size={16} className="hover:text-[#D61F26] cursor-pointer transition-colors" />
            <span className="text-[14px] font-bold hover:text-[#D61F26] cursor-pointer">P</span>
            <Instagram size={16} className="hover:text-[#D61F26] cursor-pointer transition-colors" />
            <Youtube size={16} className="hover:text-[#D61F26] cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
}