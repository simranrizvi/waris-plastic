"use client";
import React from 'react';
import { Truck, ThumbsUp, Headset, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturesBanner() {
  return (
    <section className="bg-[#D61F26] py-1.5 max-w-7xl mx-auto relative group overflow-hidden mt-10 mb-10">
      <div className="flex flex-col md:flex-row items-stretch justify-center min-h-[130px] gap-0">
        
        {/* Left Arrow */}
        <button className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-10 border border-white/20 items-center justify-center text-white hover:bg-white/10 transition-colors">
          <ChevronLeft size={20} />
        </button>

        {/* Feature 1 - Darker Red/Grey Mix */}
        <div className="flex-1 bg-[#1A1A1A] flex items-center justify-center px-10 text-white relative">
           <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                 <Truck size={35} className="text-[#D61F26]" />
              </div>
              <div>
                <h3 className="font-black text-base lg:text-lg leading-none uppercase tracking-tight">Fast Shipping</h3>
                <p className="text-[11px] text-gray-400 mt-1 uppercase font-medium">Nationwide Fast Delivery</p>
              </div>
           </div>
        </div>

        {/* Feature 2 - Main Brand Red with Angled Cut */}
        <div 
          className="flex-[1.2] bg-[#D61F26] flex items-center justify-center px-14 text-white z-10"
          style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
        >
           <div className="flex items-center gap-5 translate-x-[-10px]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                 <ThumbsUp size={35} className="text-[#D61F26]" />
              </div>
              <div>
                <h3 className="font-black text-base lg:text-lg leading-none uppercase tracking-tight">100% Original</h3>
                <p className="text-[11px] text-red-100 mt-1 uppercase font-medium">Guaranteed Original Product</p>
              </div>
           </div>
        </div>

        {/* Feature 3 - Dark Grey with Angled Entry */}
        <div 
          className="flex-1 bg-[#262626] flex items-center justify-center px-10 text-white ml-[-40px]"
          style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        >
           <div className="flex items-center gap-5 translate-x-[10px]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-xl">
                 <Headset size={35} className="text-[#D61F26]" />
              </div>
              <div>
                <h3 className="font-black text-base lg:text-lg leading-none uppercase tracking-tight">24/7 Support</h3>
                <p className="text-[11px] text-gray-400 mt-1 uppercase font-medium">Active Customer Care</p>
              </div>
           </div>
        </div>

        {/* Right Arrow */}
        <button className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-10 border border-white/20 items-center justify-center text-white hover:bg-white/10 transition-colors">
          <ChevronRight size={20} />
        </button>

      </div>
    </section>
  );
}