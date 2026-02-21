"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HeroSection() {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1916&auto=format&fit=crop",
      title: "STUDY CHAIRS",
      subtitle: "BY WARIS FURNITURE",
      buttonText: "SHOP NOW"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop",
      title: "OFFICE IDEAS",
      subtitle: "PREMIUM COMFORT",
      buttonText: "EXPLORE"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1914&auto=format&fit=crop",
      title: "OUTDOOR CRAFT",
      subtitle: "STYLISH & DURABLE",
      buttonText: "VIEW ALL"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  // Animation Variants for smooth performance
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-[400px] md:h-[550px] overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].image})` }}
        >
          {/* Dark Overlay for better contrast */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Text Content */}
          <div className="relative z-10 text-center px-4 pointer-events-none">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-white text-4xl md:text-7xl font-serif font-bold  mb-2 drop-shadow-xl"
            >
              {slides[current].title}
            </motion.h2>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className=" text-white text-lg md:text-3xl font-bold px-6 py-2 inline-block mb-8 "
            >
              <span className="inline-block uppercase">
                {slides[current].subtitle}
              </span>
            </motion.div>
            
            <br />
            
            <button className="bg-[#D61F26] cursor-pointer text-white font-bold py-3 px-12 rounded-sm transition-all duration-300 uppercase text-sm tracking-widest shadow-lg pointer-events-auto">
              {slides[current].buttonText}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Ab sirf click par chalein ge) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-[#D61F26] text-white p-3 rounded-full transition-all group"
      >
        <ChevronLeft size={30} className="group-active:scale-90" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-[#D61F26] text-white p-3 rounded-full transition-all group"
      >
        <ChevronRight size={30} className="group-active:scale-90" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`transition-all duration-300 rounded-full h-3 ${
              index === current ? "bg-white w-8" : "bg-white/40 w-3"
            }`}
          />
        ))}
      </div>

    
    </section>
  );
}