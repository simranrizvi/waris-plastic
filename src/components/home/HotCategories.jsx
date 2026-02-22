"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function HotCategoriesCollage() {
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (id) => {
    if (activeCategory === id) {
      setActiveCategory(null);
    } else {
      setActiveCategory(id);
    }
  };

  return (
    <section className="py-10 md:py-16 px-4 font-sans bg-[#F1F1F1]" onClick={() => setActiveCategory(null)}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* --- LEFT COLUMN --- */}
        <div className="space-y-6">
          {/* STUDY - Mobile height reduced to 350px */}
          <div 
            className="relative group overflow-hidden bg-white shadow-sm h-[350px] md:h-[550px]"
            onClick={(e) => { e.stopPropagation(); toggleCategory('study'); }}
          >
            <img src="https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className={`absolute top-10 left-0 w-full text-center transition-opacity ${activeCategory === 'study' ? 'opacity-0' : 'group-hover:opacity-0'}`}>
               <h2 className="text-2xl md:text-3xl font-black text-[#2E3192] uppercase leading-none">
                 CHASE <br/> <span className="text-blue-500 border-b-4 border-blue-500">DREAMS</span> <br/> 
                 <span className="text-white text-base md:text-lg font-bold drop-shadow-md">NOT DISCOMFORT</span>
               </h2>
            </div>
            <CategoryOverlay title="STUDY" links={["School Desks", "Dual Desks", "Library Sets"]} isOpen={activeCategory === 'study'} />
          </div>

          {/* WAITING AREA - Mobile height reduced to 220px */}
          <div 
            className="relative group overflow-hidden bg-white shadow-sm h-[220px] md:h-[280px]"
            onClick={(e) => { e.stopPropagation(); toggleCategory('waiting'); }}
          >
            <img src="https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <CategoryOverlay title="WAITING AREA" links={["Public Seating", "Airport Chairs"]} isOpen={activeCategory === 'waiting'} />
          </div>
        </div>

        {/* --- CENTER COLUMN --- */}
        <div className="space-y-6 ">
          {/* HOT CATEGORIES TEXT BOX - Mobile padding and height reduced */}
          <div className="bg-white p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-sm h-[280px] md:h-[320px]">
             <div className="border-t-2 border-[#D61F26] pt-4">
               <h3 className="text-[#D61F26] font-bold text-xl md:text-2xl uppercase leading-none">
                 HOT <span className="font-light text-gray-700">CATEGORIES</span>
               </h3>
             </div>
             <p className="text-gray-400 text-[11px] md:text-[12px] mt-4 md:mt-6 mb-6 md:mb-8 max-w-[220px] leading-relaxed ">
               Each category offers a unique choice for your comfort, so dive in and explore!
             </p>
             <button className="bg-[#D61F26] cursor-pointer text-white px-5 py-2.5 md:px-6 md:py-3 text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all">
               View All Categories
             </button>
          </div>

          {/* OUTDOOR - Mobile height reduced to 300px */}
          <div 
            className="relative group overflow-hidden bg-white shadow-sm h-[300px] md:h-[400px]"
            onClick={(e) => { e.stopPropagation(); toggleCategory('outdoor'); }}
          >
            <img src="/table.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${activeCategory === 'outdoor' ? 'opacity-0' : 'group-hover:opacity-0'}`}>
               <h3 className="text-white text-3xl md:text-4xl font-black uppercase border-b-4 border-white pb-1 drop-shadow-2xl">OUTDOOR</h3>
            </div>
            <CategoryOverlay title="OUTDOOR" links={["Garden Sets", "Cafe Chairs", "Patio Sets"]} isOpen={activeCategory === 'outdoor'} />
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="space-y-6">
          {/* OFFICE - Mobile height reduced to 350px */}
          <div 
            className="relative group overflow-hidden bg-white shadow-sm h-[350px] md:h-[450px]"
            onClick={(e) => { e.stopPropagation(); toggleCategory('office'); }}
          >
            <img src="/office.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className={`absolute top-6 left-6 md:top-8 md:left-8 transition-opacity ${activeCategory === 'office' ? 'opacity-0' : 'group-hover:opacity-0'}`}>
               <div className="bg-black/10 backdrop-blur-sm p-3 md:p-4 border-l-4 border-[#D61F26]">
                  <h3 className="text-gray-800 text-lg md:text-xl font-black uppercase leading-none">OFFICE <br/><span className="text-[11px] md:text-sm font-bold opacity-60 uppercase">Comfort</span></h3>
               </div>
            </div>
            <CategoryOverlay title="OFFICE" links={["Executive Chairs", "Visitor Chairs"]} isOpen={activeCategory === 'office'} />
          </div>

          {/* URBAN SEATING - Mobile height reduced to 300px */}
          <div 
            className="relative group overflow-hidden bg-white shadow-sm h-[300px] md:h-[380px]"
            onClick={(e) => { e.stopPropagation(); toggleCategory('urban'); }}
          >
            <img src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className={`absolute top-6 right-6 text-right transition-opacity ${activeCategory === 'urban' ? 'opacity-0' : 'group-hover:opacity-0'}`}>
               <h4 className="text-[#2E3192] text-xl md:text-2xl font-black leading-none uppercase italic">Urban <br /> 
               <span className="text-[9px] md:text-[10px] font-bold text-gray-800 uppercase not-italic tracking-widest bg-white/80 px-2 py-0.5">Seating by SAAB</span></h4>
            </div>
            <CategoryOverlay title="URBAN SEATING" links={["Modern Benches", "Patio Sets"]} isOpen={activeCategory === 'urban'} />
          </div>
        </div>

      </div>
    </section>
  );
}

function CategoryOverlay({ title, links, isOpen }) {
  return (
    <div className={`absolute inset-0 bg-black/60 backdrop-blur-[3px] transition-all duration-500 flex flex-col items-center justify-center p-6 text-center 
      ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto'}`}>
      <h3 className="text-white text-xl md:text-2xl font-black uppercase mb-4 md:mb-6 border-b-2 border-white pb-2 tracking-widest">
        {title}
      </h3>
      <ul className="space-y-2 md:space-y-3">
        {links.map((link) => (
          <li key={link}>
            <Link 
              href={`/category/${link.toLowerCase().trim().replace(/\s+/g, '-')}`}
              className="text-white text-[11px] md:text-[12px] font-bold hover:text-blue-300 transition-colors uppercase tracking-widest flex items-center gap-2 justify-center"
            >
              <span className="text-[#D61F26]">◆</span> {link}
            </Link>
          </li>
        ))}
      </ul>
      <span className="mt-6 md:mt-8 text-white/40 text-[8px] md:text-[9px] uppercase tracking-widest md:hidden">Click to close</span>
    </div>
  );
}