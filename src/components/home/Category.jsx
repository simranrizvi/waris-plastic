"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ShopByCategory() {
  const categories = [
    {
      id: 1,
      title: "Office",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=1000&auto=format&fit=crop",
      tagline: "SIT IN ENCHANTED COMFORT",
    },
    {
      id: 2,
      title: "Academic Ideas",
      image: "/academic.webp",
      tagline: "ROCKING STUDY THRONE",
    },
    {
      id: 3,
      title: "Revolving Chair",
      image: "/revolving.webp",
      tagline: "ELEVATED OFFICE STYLE",
    },
    {
      id: 4,
      title: "Tables", // "Tabes" ko "Tables" kar diya hai
      image: "/revolving.webp",
      tagline: "ELEVATED OFFICE STYLE",
    },
  ];

  return (
    <section className="container mx-auto py-10 md:py-16 px-4 bg-white">
      {/* SECTION HEADING */}
      <div className="flex flex-col items-center mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-light text-gray-500 uppercase tracking-widest flex items-center gap-2 md:gap-3 text-center">
          SHOP BY <span className="font-bold text-[#D61F26]">CATEGORY</span>
        </h2>
        <div className="w-16 md:w-24 h-[3px] bg-[#D61F26] mt-2"></div>
      </div>

      {/* CATEGORY GRID: 
          Mobile pe 2 items (grid-cols-2)
          Desktop pe sab ek hi line mein (md:grid-cols-4) 
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/category/${cat.title.toLowerCase().trim().replace(/\s+/g, "-")}`}
            className="h-full"
          >
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-lg shadow-lg md:shadow-md overflow-hidden border border-gray-100 group cursor-pointer h-full flex flex-col"
            >
              {/* Image Height: Desktop pe row mein fit karne ke liye thodi kam ki hai (md:h-[220px]) */}
              <div className="relative h-[160px] sm:h-[200px] md:h-[220px] lg:h-[250px] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex flex-col justify-end p-3 md:p-4">
                   <p className="text-white text-[8px] md:text-[9px] font-bold tracking-[0.1em] uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                     Explore More
                   </p>
                   <p className="text-white text-[9px] md:text-[10px] italic font-serif opacity-0 sm:opacity-80 group-hover:opacity-100 line-clamp-1">
                     {cat.tagline}
                   </p>
                </div>
              </div>

              {/* Title Bar - Spacing adjusted for 4 columns */}
              <div className="p-3 md:p-4 text-center bg-white border-t border-gray-50 flex-grow flex items-center justify-center">
                <h3 className="text-[#454545] font-black text-xs md:text-base lg:text-lg tracking-tight group-hover:text-[#D61F26] transition-colors uppercase leading-tight">
                  {cat.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* DOT PAGINATION */}
      <div className="flex justify-center mt-8 md:mt-12 gap-2">
        <div className="w-6 md:w-8 h-2 bg-[#D61F26] rounded-full"></div>
        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
      </div>
    </section>
  );
}