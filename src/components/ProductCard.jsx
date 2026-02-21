"use client";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; // Cart hook import kiya

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); // addToCart function nikaala

  // Discount percentage calculate karne ke liye logic
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : null;

  return (
    <div className="group bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 relative">
      
      {/* 1. Badge (Discount) */}
      {discount && (
        <span className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm z-10">
          -{discount}%
        </span>
      )}

      {/* 2. Image Area */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images?.[0] || "/placeholder-furniture.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full text-[#2E3192] hover:bg-[#2E3192] hover:text-white transition-colors">
            <Heart size={18} />
          </button>
          <Link href={`/product/${product._id}`} className="bg-white p-2 rounded-full text-[#2E3192] hover:bg-[#2E3192] hover:text-white transition-colors">
            <Eye size={18} />
          </Link>
        </div>
      </div>

      {/* 3. Product Info */}
      <div className="p-4 text-center">
        <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="text-[14px] font-bold text-gray-800 truncate mb-2 group-hover:text-[#2E3192]">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-[#2E3192] font-bold text-[16px]">
            Rs.{product.price?.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-[13px]">
              Rs.{product.oldPrice?.toLocaleString()}
            </span>
          )}
        </div>

        {/* 4. Updated Add to Cart Button */}
        <button 
          onClick={() => addToCart(product)} // Ab ye login aur non-login dono ko handle karega
          className="w-full flex items-center justify-center gap-2 bg-[#2E3192] text-white py-2 text-[12px] font-bold uppercase tracking-wider hover:bg-blue-900 transition-colors rounded-sm shadow-md active:scale-95 duration-150"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}