"use client";
import React from 'react';
import Link from 'next/link';

export default function HotCategoriesCollage() {
  return (
    <section className="py-16 px-4 font-sans bg-[#F1F1F1]">
      {/* 3 Column Grid Structure */}
      <div className="max-w-6xl mx-auto  grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* --- LEFT COLUMN --- */}
        <div className="space-y-6">
          {/* STUDY (Large) */}
          <div className="relative group overflow-hidden bg-white shadow-sm h-[550px]">
            <img src="https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-10 left-0 w-full text-center group-hover:opacity-0 transition-opacity">
               <h2 className="text-3xl font-black text-[#2E3192] uppercase leading-none">
                 CHASE <br/> <span className="text-blue-500 border-b-4 border-blue-500">DREAMS</span> <br/> 
                 <span className="text-white text-lg font-bold drop-shadow-md">NOT DISCOMFORT</span>
               </h2>
            </div>
            <CategoryOverlay title="STUDY" links={["School Desks", "Dual Desks", "Library Sets"]} />
          </div>

          {/* WAITING AREA (Small) */}
          <div className="relative group overflow-hidden bg-white shadow-sm h-[280px]">
            <img src="https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <CategoryOverlay title="WAITING AREA" links={["Public Seating", "Airport Chairs"]} />
          </div>
        </div>

        {/* --- CENTER COLUMN (Vertically Shifted Up) --- */}
        <div className="space-y-6 "> {/* VIP: -mt-10 is ko uper shift karega */}
          {/* HOT CATEGORIES TEXT BOX */}
          <div className="bg-white p-10 flex flex-col items-center justify-center text-center shadow-sm h-[320px]">
             <div className="border-t-2 border-[#D61F26] pt-4">
               <h3 className="text-[#D61F26] font-bold text-2xl uppercase leading-none">
                 HOT <span className="font-light text-gray-700">CATEGORIES</span>
               </h3>
             </div>
             <p className="text-gray-400 text-[12px] mt-6 mb-8 max-w-[220px] leading-relaxed ">
               Each category offers a unique choice for your comfort, so dive in and explore!
             </p>
             <button className="bg-[#D61F26] cursor-pointer text-white px-6 py-3 text-[11px] font-black uppercase tracking-widest  transition-all">
               View All Categories
             </button>
          </div>

          {/* OUTDOOR */}
          <div className="relative group overflow-hidden bg-white shadow-sm h-[400px]">
            <img src="/table.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity">
               <h3 className="text-white text-4xl font-black uppercase border-b-4 border-white pb-1 drop-shadow-2xl">OUTDOOR</h3>
            </div>
            <CategoryOverlay title="OUTDOOR" links={["Garden Sets", "Cafe Chairs", "Patio Sets"]} />
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="space-y-6">
          {/* OFFICE */}
          <div className="relative group overflow-hidden bg-white shadow-sm h-[450px]">
            <img src="/office.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-8 left-8 group-hover:opacity-0 transition-opacity">
               <div className="bg-black/10 backdrop-blur-sm p-4 border-l-4 border-[#D61F26]">
                  <h3 className="text-gray-800 text-xl font-black uppercase leading-none">OFFICE <br/><span className="text-sm font-bold opacity-60 uppercase">Comfort</span></h3>
               </div>
            </div>
            <CategoryOverlay title="OFFICE" links={["Executive Chairs", "Visitor Chairs"]} />
          </div>

          {/* URBAN SEATING */}
          <div className="relative group overflow-hidden bg-white shadow-sm h-[380px]">
            <img src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-6 right-6 text-right group-hover:opacity-0 transition-opacity">
               <h4 className="text-[#2E3192] text-2xl font-black leading-none uppercase italic">Urban <br /> 
               <span className="text-[10px] font-bold text-gray-800 uppercase not-italic tracking-widest bg-white/80 px-2 py-0.5">Seating by SAAB</span></h4>
            </div>
            <CategoryOverlay title="URBAN SEATING" links={["Modern Benches", "Patio Sets"]} />
          </div>
        </div>

      </div>
    </section>
  );
}

function CategoryOverlay({ title, links }) {
  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-white text-2xl font-black uppercase mb-6 border-b-2 border-white pb-2 tracking-widest">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <Link 
              href={`/category/${link.toLowerCase().trim().replace(/\s+/g, '-')}`}
              className="text-white text-[12px] font-bold hover:text-blue-300 transition-colors uppercase tracking-widest flex items-center gap-2 justify-center"
            >
              <span className="text-[#D61F26]">◆</span> {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}