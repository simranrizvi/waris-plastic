"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ProductShowcase() {
  const mainProducts = [
    { id: 1, name: "COMFORTO STUDY CHAIR S-02-SCB", price: "8,545.00", img: "/study.webp" },
    { id: 2, name: "EXECUTIVE OFFICE CHAIR E-44", price: "12,300.00", img: "/office.webp" },
    { id: 3, name: "MODERN DINING TABLE T-10", price: "25,000.00", img: "/table.webp" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === mainProducts.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-5 shadow-xl bg-white">
        
       {/* LEFT COLUMN: DEALS OF THE SEASON */}
<div className="w-full lg:w-1/3 bg-[#D61F26] text-white p-5 md:p-8 flex flex-col">
  <h2 className="text-lg md:text-xl font-bold border-b border-red-400 pb-3 md:pb-4 mb-4 md:mb-6 uppercase tracking-wider">
    Deals <span className="font-light">of the Season</span>
  </h2>
  <p className="text-[12px] md:text-[13px] leading-relaxed mb-6 md:mb-8 opacity-90">
    If you're looking for the best deals on furniture this season, you're in luck!
  </p>
  
  {/* 4-Grid Categories: Icons aur Padding mobile pe choti kar di gayi hai */}
  <div className="grid grid-cols-2 gap-[1px] bg-white mt-auto shadow-inner border border-gray-100">
    
    {/* LIVING ROOM */}
    <Link href="/category/living-room" className="bg-[#D61F26] p-3 md:p-5 flex flex-col items-center justify-center hover:bg-[#b0191f] transition-all group">
       <img 
         src="https://cdn-icons-png.flaticon.com/512/2603/2603741.png" 
         className="w-8 h-8 md:w-12 md:h-12 invert mb-2 md:mb-3 group-hover:scale-110 transition-transform" 
         alt="living room" 
       />
       <span className="text-[8px] md:text-[10px] font-black tracking-tighter text-center leading-none uppercase text-white">LIVING ROOM</span>
    </Link>

    {/* OUTDOOR */}
    <Link href="/category/outdoor" className="bg-[#e2e4e7] p-3 md:p-5 flex flex-col items-center justify-center hover:bg-gray-300 transition-all group">
       <img 
         src="https://cdn-icons-png.flaticon.com/512/2732/2732431.png" 
         className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-3 group-hover:scale-110 transition-transform" 
         alt="outdoor" 
       />
       <span className="text-[8px] md:text-[10px] font-black tracking-tighter text-center leading-none text-[#D61F26] uppercase">OUTDOOR</span>
    </Link>

    {/* OFFICE */}
    <Link href="/category/office" className="bg-white p-3 md:p-5 flex flex-col items-center justify-center hover:bg-gray-50 transition-all group border-t border-gray-100">
       <img 
         src="https://cdn-icons-png.flaticon.com/512/725/725015.png" 
         className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-3 group-hover:scale-110 transition-transform" 
         alt="office" 
       />
       <span className="text-[8px] md:text-[10px] font-black tracking-tighter text-center leading-none text-gray-800 uppercase">OFFICE</span>
    </Link>

    {/* STUDY */}
    <Link href="/category/study" className="bg-[#D61F26] p-3 md:p-5 flex flex-col items-center justify-center hover:bg-[#b0191f] transition-all group border-l border-t border-red-500">
       <img 
         src="https://cdn-icons-png.flaticon.com/512/2950/2950701.png" 
         className="w-8 h-8 md:w-12 md:h-12 invert mb-2 md:mb-3 group-hover:scale-110 transition-transform" 
         alt="study" 
       />
       <span className="text-[8px] md:text-[10px] font-black tracking-tighter text-center leading-none uppercase text-white">STUDY</span>
    </Link>

  </div>
</div>
        {/* MIDDLE COLUMN: SLIDER (Aapka Original Size Fixed) */}
        <div className="hidden lg:block lg:w-2/5 relative border-r border-gray-100 bg-white">
          <div className="relative h-[500px] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full flex flex-col items-center"
              >
                <Link
                  href={`/category/${mainProducts[current].name.toLowerCase().trim().replace(/\s+/g, '-')}`}
                  className="cursor-pointer group flex justify-center items-center h-[400px] w-full"
                >
                  {/* Image size wahi rakha ha jo ap ne bola tha */}
                  <img
                    src={mainProducts[current].img}
                    alt="main-prod"
                    className="h-[350px] w-[400px] object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="text-center mt-6 py-5 px-2">
                    <Link href={`/category/${mainProducts[current].name.toLowerCase().trim().replace(/\s+/g, '-')}`}>
                        <h3 className="text-gray-700 font-bold text-lg hover:text-[#D61F26] transition-colors cursor-pointer leading-tight">
                            {mainProducts[current].name}
                        </h3>
                    </Link>
                   <p className="text-[#D61F26] font-bold text-xl">Rs.{mainProducts[current].price}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: POPULAR PRODUCTS (Mobile pe 2 items per row) */}
        <div className="w-full lg:w-1/3 p-6">
            <div className="flex flex-col items-center mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-light text-gray-500 uppercase tracking-widest flex items-center gap-2 md:gap-3 text-center">
          POPULAR <span className="font-bold text-[#D61F26]">PRODUCT</span>
        </h2>
        <div className="w-16 md:w-24 h-[3px] bg-[#D61F26] mt-2"></div>
      </div>
           
           {/* Grid layout changed for Mobile (2 columns) and Tablet+ (1 column) */}
           <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-8 lg:gap-y-6">
             {[
               { name: "SAAB SP-675 SPECTRUM PATTI", price: "5,480.00", old: "6,300.00", img: "/office.webp" },
               { name: "COMFORTO STUDY CHAIR S-02", price: "8,545.00", old: "7,300.00", img: "/study.webp" },
               { name: "TREE CHAIR SP-313-PL", price: "4,115.00", old: "3,300.00", img: "/table.webp" },
               { name: "office CHAIR SP-313-PL", price: "4,315.00", old: "3,700.00", img: "/officeChair.webp" }
             ].map((item, i) => (
               <div key={i} className="flex flex-col sm:flex-row lg:flex-row gap-3 items-start sm:items-center group">
                  <Link href={`/category/${item.name.toLowerCase().trim().replace(/\s+/g, '-')}`} className="w-full sm:w-20 h-28 sm:h-20 border border-gray-100 overflow-hidden flex-shrink-0">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform cursor-pointer" alt={item.name} />
                  </Link>
                  <div className="w-full">
                    <Link href={`/category/${item.name.toLowerCase().trim().replace(/\s+/g, '-')}`}>
                        <h4 className="text-[10px] md:text-[11px] font-bold text-gray-700 leading-tight mb-1 hover:text-[#D61F26] cursor-pointer min-h-[24px]">
                            {item.name}
                        </h4>
                    </Link>
                    <p className="text-[#D61F26] font-bold text-[13px]">Rs.{item.price}</p>
                    {item.old && <p className="text-gray-400 text-[10px] line-through">Rs.{item.old}</p>}
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  )
}