"use client";
import React from 'react';
import { Phone, Mail, MapPin, Send, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full font-sans">
      
      {/* 1. Newsletter / Support Bar */}
      <div className="bg-gray-300 py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h2 className="text-[#454545] font-bold text-lg md:text-xl uppercase tracking-tighter">
              Need Help? Call Us At
            </h2>
            <p className="text-gray-500 font-bold text-sm md:text-md mt-1">
              SUPPORT TEAM 24/7 AT <span className="text-[#D61F26]">0331-2216249</span>
            </p>
          </div>

          <div className="flex w-full max-w-md border-2 border-[#D61F26] rounded-sm overflow-hidden">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 p-3 outline-none text-sm w-full"
            />
            <button className="bg-[#D61F26] text-white px-4 md:px-6 py-3 font-bold uppercase text-[10px] md:text-xs hover:bg-[#b0191f] transition-colors flex items-center gap-2 shrink-0">
              Subscribe <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links Area */}
      <div className="bg-[#231F20] text-gray-300 py-12 md:py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-2">
          
          {/* Column 1: Resources */}
          <div>
            <h4 className="text-white font-black uppercase mb-6 md:mb-8 border-l-4 border-[#D61F26] pl-3 tracking-widest text-sm">
              Resources
            </h4>
            <ul className="space-y-4 text-[13px]">
              {["Corporate Profile", "Premium Catalog", "Regular Brochure", "Waris Craft Catalog"].map((item) => (
                <li key={item} className="hover:text-[#D61F26] transition-colors cursor-pointer flex items-center gap-2">
                  <span className="text-[10px]">▶</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-white font-black uppercase mb-6 md:mb-8 border-l-4 border-[#D61F26] pl-3 tracking-widest text-sm">
              Company
            </h4>
            <ul className="space-y-4 text-[13px]">
              {["About Us", "Contact Us", "Careers", "Blog", "Privacy Policy", "Terms & Conditions"].map((item) => (
                <li key={item} className="hover:text-[#D61F26] transition-colors cursor-pointer flex items-center gap-2">
                  <span className="text-[10px]">▶</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Let Us Help You */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-white font-black uppercase mb-6 md:mb-8 border-l-4 border-[#D61F26] pl-3 tracking-widest text-sm">
              Let Us Help You
            </h4>
            <ul className="space-y-4 text-[13px]">
              {["Returns Centre", "100% Purchase Protection", "Waris App Download", "Shipping Policy"].map((item) => (
                <li key={item} className="hover:text-[#D61F26] transition-colors cursor-pointer flex items-center gap-2">
                  <span className="text-[10px]">▶</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          {/* -mt-16 sirf desktop (md) pe rakha hai */}
          <div className="bg-[#D61F26] p-8 text-white md:-mt-16 shadow-2xl relative overflow-hidden">
            <h4 className="font-black uppercase mb-6 tracking-widest text-sm border-b border-white/20 pb-2">
              Contact Us
            </h4>
            <div className="space-y-6 text-[13px]">
              <div className="flex gap-3">
                <MapPin size={24} className="flex-shrink-0" />
                <p>Main Khayban-e-Jami, Opp, MCB & Altamash Dental Hospital, Clifton, Karachi.</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <p>92-21-35370057</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <p className="lowercase">warisfurniture@gmail.com</p>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 pt-4 border-t border-white/20">
                <Facebook size={18} className="cursor-pointer hover:scale-110 transition-transform" />
                <Instagram size={18} className="cursor-pointer hover:scale-110 transition-transform" />
                <Twitter size={18} className="cursor-pointer hover:scale-110 transition-transform" />
                <Youtube size={18} className="cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="bg-[#1a1a1a] py-6 border-t border-white/5">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-gray-500 text-[10px] md:text-[11px] uppercase tracking-widest">
            © 2026 <span className="text-gray-300 font-bold">Waris Plastic</span> All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}