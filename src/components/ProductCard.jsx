"use client";
import { Search, Heart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Same slug logic as Featured
  const cleanName =
    product.name?.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") || "product";

  const productSlug = `${product._id}-${cleanName}`;

  return (
    <div className="group border-[1px] border-gray-300 bg-white transition-all duration-300 flex flex-col h-full relative">
      
      {/* Product Image */}
      <Link
        href={`/product/${productSlug}`}
        className="relative aspect-square overflow-hidden bg-gray-50 block"
      >
        <img
          src={product.images?.[0] || product.image || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {product.discount && (
          <div className="absolute top-4 right-0 bg-[#D61F26] text-white text-[10px] font-bold px-3 py-1 z-10 uppercase">
            Save {product.discount}%
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4 text-center flex-1 flex flex-col justify-between border-b border-gray-100 group-hover:bg-gray-50 transition-colors">
        <div>
          <Link href={`/product/${productSlug}`}>
            <h3 className="text-[13px] font-bold text-[#454545] uppercase leading-tight line-clamp-2 mb-0">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex flex-col items-center mt-0">
          <span className="text-[#D61F26] font-bold text-md">
            Rs.{Number(product.price || 0).toLocaleString()}
          </span>

          {product.oldPrice && (
            <span className="text-gray-400 text-xs line-through">
              Rs.{Number(product.oldPrice).toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Action Bar - SAME as Featured */}
      <div className="flex items-center divide-x divide-gray-100 bg-[#fcfcfc] mt-auto border-t border-gray-300">
        
        {/* Search Icon */}
        <Link
          href={`/product/${productSlug}`}
          className="p-3 hover:bg-gray-100 transition-colors flex-shrink-0 group/icon"
        >
          <Search
            size={16}
            className="text-gray-400 group-hover/icon:text-[#D61F26]"
          />
        </Link>

        {/* Select Options */}
        <Link
          href={`/product/${productSlug}`}
          className="flex-1 py-4 text-center text-[11px] font-bold text-[#454545] uppercase tracking-tighter hover:bg-[#D61F26] hover:text-white transition-all duration-300"
        >
          Select Options
        </Link>

        {/* Wishlist */}
        <button
          onClick={() => addToCart(product)}
          className="p-3 hover:bg-gray-100 transition-colors flex-shrink-0 group/icon"
        >
          <Heart
            size={16}
            className="text-gray-400 group-hover/icon:text-red-500"
          />
        </button>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-[1px] border-transparent group-hover:border-[#D61F26] pointer-events-none transition-all duration-300" />
    </div>
  );
}