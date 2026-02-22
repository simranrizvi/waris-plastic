"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const OrderSuccessPage = () => {
  const { clearCart } = useCart();

  // Order success hone par cart khali kar dena chahiye
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* 1. HEADER BANNER (Consistent with your theme) */}
      <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop" 
          alt="Success Banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-[0.2em] mb-2">
            Order <span className="text-[#D61F26]">Confirmed</span>
          </h1>
          <p className="text-gray-300 text-xs md:text-sm font-bold uppercase tracking-widest">
            Thank you for choosing Waris Furniture
          </p>
        </motion.div>
      </div>

      {/* 2. SUCCESS CONTENT */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-block mb-8"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto border-4 border-green-100">
            <CheckCircle2 size={48} className="text-green-500 md:size-60" />
          </div>
        </motion.div>

        <h2 className="text-2xl md:text-4xl font-black text-[#454545] uppercase tracking-tight mb-4">
  Order Placed <span className="text-[#D61F26]">Successfully!</span>
</h2>
        
        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-12">
          We've received your order and our team is already working to get your premium furniture ready. 
          A confirmation email with your order details has been sent to you.
        </p>

        {/* 3. ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <Link 
            href="/" 
            className="w-full sm:w-auto bg-[#D61F26] text-white px-10 py-4 font-black uppercase tracking-widest text-xs md:text-sm shadow-xl hover:bg-[#b0191f] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Home size={18} /> Back to Home
          </Link>
          
          <Link 
            href="/category/office" 
            className="w-full sm:w-auto border-2 border-[#454545] text-[#454545] px-10 py-4 font-black uppercase tracking-widest text-xs md:text-sm hover:bg-[#454545] hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>

        {/* 4. SUPPORT TEXT */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">
            Need immediate help? Call us at <span className="text-[#D61F26]">0331-2216249</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;