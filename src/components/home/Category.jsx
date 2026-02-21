"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Link import kiya

export default function ShopByCategory() {
  // Updated Data with Better Images and Taglines
  const categories = [
    {
      id: 1,
      title: "Moulded Chairs",
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
  ];

  return (
    <section className="container mx-auto py-16 px-4 bg-white">
      {/* SECTION HEADING - Updated to Waris Red */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-2xl md:text-2xl font-light text-gray-500 uppercase tracking-widest flex items-center gap-3">
          SHOP BY <span className="font-bold text-[#D61F26]">CATEGORY</span>
        </h2>
        <div className="w-24 h-[3px] bg-[#D61F26] mt-2"></div>
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/category/${cat.title.toLowerCase().trim().replace(/\s+/g, "-")}`}
          >
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 group cursor-pointer h-full"
            >
              {/* Image Container with Hover Zoom and Overlay */}
              <div className="relative h-[300px] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Text Overlay on Image */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex flex-col justify-end p-6">
                   <p className="text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                     Explore More
                   </p>
                   <p className="text-white text-xs italic font-serif opacity-80 group-hover:opacity-100">
                     {cat.tagline}
                   </p>
                </div>
              </div>

              {/* Title Bar - Waris Red Hover */}
              <div className="p-6 text-center bg-white border-t border-gray-50">
                <h3 className="text-[#454545] font-black text-xl tracking-wide group-hover:text-[#D61F26] transition-colors ">
                  {cat.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* DOT PAGINATION - Waris Red */}
      <div className="flex justify-center mt-12 gap-2">
        <div className="w-8 h-2 bg-[#D61F26] rounded-full"></div>
        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
      </div>
    </section>
  );
}