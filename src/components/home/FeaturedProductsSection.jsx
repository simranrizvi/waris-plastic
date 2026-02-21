"use client";
import React, { useState, useEffect } from 'react';
import { Search, Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/lib/constants'; 

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.PRODUCTS}`);
        const result = await response.json();
        
        const finalArray = Array.isArray(result) ? result : (result.products || result.data || []);
        setProducts(finalArray.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#D61F26]" size={40} />
      </div>
    );
  }

  return (
    <section className="bg-white py-12 px-4 max-w-7xl mx-auto font-sans">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="text-center flex-1">
          <div className="inline-block relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#D61F26] tracking-widest uppercase pb-2">
              Featured <span className="font-light text-gray-500">Products</span>
            </h2>
            <div className="h-[2px] w-2/3 bg-[#D61F26] mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          const productSlug = product.name?.toLowerCase().trim().replace(/\s+/g, '-') || 'product';
          
          return (
            <div 
              // FIX: Agar id nahi hai to index use karega taake console error khatam ho jaye
              key={product.id || `prod-${index}`} 
              className="group border-[1px] border-gray-100 bg-white transition-all duration-300 flex flex-col h-full relative"
            >
              {/* Product Image */}
              <Link href={`/product/${productSlug}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {product.discount && (
                  <div className="absolute top-4 right-0 bg-[#D61F26] text-white text-[10px] font-bold px-3 py-1 z-10 uppercase">
                    Save {product.discount}
                  </div>
                )}
              </Link>

              {/* Product Info */}
              <div className="p-4 text-center flex-1 flex flex-col justify-between border-b border-gray-100 group-hover:bg-gray-50 transition-colors">
                <div>
                  <Link href={`/product/${productSlug}`}>
                    <h3 className="text-[13px] font-bold text-[#454545] group-hover:text-[#D61F26] uppercase leading-tight min-h-[40px] line-clamp-2 mb-2 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                </div>
                
                <div className="flex flex-col items-center mt-auto">
                  <span className="text-[#D61F26] font-bold text-lg">
                    Rs.{Number(product.price || 0).toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 text-xs line-through">
                      Rs.{Number(product.oldPrice).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center divide-x divide-gray-100 bg-[#fcfcfc] mt-auto">
                <button className="p-3 hover:bg-gray-100 transition-colors flex-shrink-0 group/icon">
                  <Search size={16} className="text-gray-400 group-hover/icon:text-[#D61F26]" />
                </button>
                
                <button className="flex-1 py-4 text-[11px] font-bold text-[#454545] uppercase tracking-tighter hover:bg-[#D61F26] hover:text-white transition-all duration-300">
                  Select Options
                </button>

                <button className="p-3 hover:bg-gray-100 transition-colors flex-shrink-0 group/icon">
                  <Heart size={16} className="text-gray-400 group-hover/icon:text-red-500" />
                </button>
              </div>

              {/* Hover Border Effect - Now Thinner (1px) */}
              <div className="absolute inset-0 border-[1px] border-transparent group-hover:border-[#D61F26] pointer-events-none transition-all duration-300" />
            </div>
          );
        })}
      </div>
    </section>
  );
}