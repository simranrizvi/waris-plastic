"use client";
import React from 'react';
import { Truck, ThumbsUp, Headset, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturesBanner() {
  return (
    <section className="bg-[#D61F26] py-0 md:py-1.5 max-w-7xl mx-auto relative group overflow-hidden mt-6 mb-6 md:mt-10 md:mb-10">
      <div className="flex flex-col md:flex-row items-stretch justify-center min-h-[130px] gap-0">
        
        {/* Left Arrow (Desktop Only) */}
        <button className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-10 border border-white/20 items-center justify-center text-white hover:bg-white/10 transition-colors">
          <ChevronLeft size={20} />
        </button>

        {/* Feature 1 - Fast Shipping */}
        <div className="flex-1 bg-[#1A1A1A] flex items-center justify-center py-6 md:py-0 px-6 md:px-10 text-white relative">
           <div className="flex items-center gap-4 md:gap-5">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                 <Truck size={24} className="md:w-[35px] md:h-[35px] text-[#D61F26]" />
              </div>
              <div>
                <h3 className="font-black text-sm md:text-base lg:text-lg leading-none uppercase tracking-tight">Fast Shipping</h3>
                <p className="text-[10px] md:text-[11px] text-gray-400 mt-1 uppercase font-medium">Nationwide Fast Delivery</p>
              </div>
           </div>
        </div>

        {/* Feature 2 - Original Product (Angled only on Desktop) */}
        <div 
          className="flex-[1.2] bg-[#D61F26] flex items-center justify-center py-6 md:py-0 px-6 md:px-14 text-white z-10"
          // Style logic: Mobile par polygon khatam (none), desktop par wapis active
          style={{ 
            clipPath: typeof window !== 'undefined' && window.innerWidth < 768 
              ? 'none' 
              : 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' 
          }}
        >
           {/* Mobile pe translate-x hatane ke liye md:translate-x-[-10px] */}
           <div className="flex items-center gap-4 md:gap-5 md:translate-x-[-10px]">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                 <ThumbsUp size={24} className="md:w-[35px] md:h-[35px] text-[#D61F26]" />
              </div>
              <div>
                <h3 className="font-black text-sm md:text-base lg:text-lg leading-none uppercase tracking-tight">100% Original</h3>
                <p className="text-[10px] md:text-[11px] text-red-100 mt-1 uppercase font-medium">Guaranteed Original Product</p>
              </div>
           </div>
        </div>

        {/* Feature 3 - Support (Angled only on Desktop) */}
        <div 
          className="flex-1 bg-[#262626] flex items-center justify-center py-6 md:py-0 px-6 md:px-10 text-white md:ml-[-40px]"
          style={{ 
            clipPath: typeof window !== 'undefined' && window.innerWidth < 768 
              ? 'none' 
              : 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)' 
          }}
        >
           <div className="flex items-center gap-4 md:gap-5 md:translate-x-[10px]">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-xl">
                 <Headset size={24} className="md:w-[35px] md:h-[35px] text-[#D61F26]" />
              </div>
              <div>
                <h3 className="font-black text-sm md:text-base lg:text-lg leading-none uppercase tracking-tight">24/7 Support</h3>
                <p className="text-[10px] md:text-[11px] text-gray-400 mt-1 uppercase font-medium">Active Customer Care</p>
              </div>
           </div>
        </div>

        {/* Right Arrow (Desktop Only) */}
        <button className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-10 border border-white/20 items-center justify-center text-white hover:bg-white/10 transition-colors">
          <ChevronRight size={20} />
        </button>

      </div>

      {/* Tailwind Specific CSS for clip-path responsive handling */}
      <style jsx>{`
        @media (max-width: 767px) {
          div { clip-path: none !important; margin-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}