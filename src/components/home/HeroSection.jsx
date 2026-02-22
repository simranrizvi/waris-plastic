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
  const [direction, setDirection] = useState(0);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
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
    // Height optimized for mobile (h-[500px]) and desktop (md:h-[650px])
    <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-black">
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
          {/* Responsive Overlay Gradient */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/30" />

          {/* Text Content - Responsive padding and widths */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pointer-events-none">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              // Text size: 3xl for mobile, 5xl for tablet, 7xl for desktop
              className="text-white text-3xl sm:text-5xl md:text-7xl font-serif font-bold mb-3 drop-shadow-2xl leading-tight"
            >
              {slides[current].title}
            </motion.h2>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              // Subtitle: base for mobile, xl for tablet+
              className="text-white text-sm sm:text-lg md:text-2xl font-medium tracking-widest px-4 py-1 mb-6 sm:mb-8"
            >
              <span className="inline-block uppercase">
                {slides[current].subtitle}
              </span>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button className="bg-[#D61F26] cursor-pointer text-white font-bold py-3 px-8 sm:px-12 rounded-sm hover:scale-105 active:scale-95 transition-all duration-300 uppercase text-xs sm:text-sm tracking-widest shadow-lg pointer-events-auto">
                {slides[current].buttonText}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Smaller on mobile */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-[#D61F26] text-white p-2 sm:p-3 rounded-full transition-all group"
      >
        <ChevronLeft size={24} className="sm:w-[30px] sm:h-[30px] group-active:scale-90" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-[#D61F26] text-white p-2 sm:p-3 rounded-full transition-all group"
      >
        <ChevronRight size={24} className="sm:w-[30px] sm:h-[30px] group-active:scale-90" />
      </button>

      {/* Pagination Dots - Adjusted position for mobile */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`transition-all duration-300 rounded-full h-2 sm:h-3 ${
              index === current ? "bg-white w-6 sm:w-8" : "bg-white/40 w-2 sm:w-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
}