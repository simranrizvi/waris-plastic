"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    client: "FAUJI FOUNDATION",
    role: "HR MANAGER",
    text: "Waris Furniture has been an invaluable partner in our quest for a dynamic and collaborative learning environment. The versatility of their furniture solutions allows us to adapt our spaces perfectly.",
  },
  {
    id: 2,
    client: "PAKISTAN NAVY",
    role: "ADMIN OFFICER",
    text: "Exceptional quality and service define our experience with Waris Furniture. Their executive office chairs and workstations are top-notch in terms of durability and comfort.",
  },
  {
    id: 3,
    client: "INDUS HOSPITAL",
    role: "PROCUREMENT HEAD",
    text: "We needed furniture that was both hygienic and ergonomic. Waris Furniture delivered beyond our expectations with their customized solutions for our medical staff.",
  },
  {
    id: 4,
    client: "FAST UNIVERSITY",
    role: "DEAN",
    text: "The study desks and chairs provided for our campus are perfect for a long-duration academic environment. Highly recommended for any educational institution.",
  },
];

export default function ClientTestimonials() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ 
          backgroundImage: `url('/testimonial.webp')`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-white text-2xl md:text-3xl font-bold tracking-widest uppercase inline-block border-y-2 border-white/20 py-2">
            OUR <span className="text-[#D61F26]">VALUABLE CLIENTS</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Content Slider */}
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border-l-4 border-[#D61F26] p-8 md:p-12 relative min-h-[250px] flex flex-col justify-center">
            {/* Quote Icon */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#D61F26] rounded-full flex items-center justify-center shadow-xl hidden md:flex">
              <Quote className="text-white" size={24} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center md:text-left"
              >
                <p className="text-gray-200 text-sm md:text-lg italic leading-relaxed mb-6 font-light">
                  "{testimonials[current].text}"
                </p>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <h4 className="text-white font-bold tracking-widest uppercase">
                    {testimonials[current].client}
                  </h4>
                  <span className="hidden md:block text-gray-500">|</span>
                  <span className="text-[#D61F26] text-xs font-bold uppercase tracking-tighter">
                    {testimonials[current].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-20">
            <button 
              onClick={prevSlide}
              className="p-3 bg-black/50 text-white hover:bg-[#D61F26] transition-all rounded-sm border border-white/10"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16">
            <button 
              onClick={nextSlide}
              className="p-3 bg-black/50 text-white hover:bg-[#D61F26] transition-all rounded-sm border border-white/10"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 transition-all duration-300 rounded-full ${
                current === idx ? "w-8 bg-[#D61F26]" : "w-2 bg-gray-500 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}