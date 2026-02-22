"use client";

import { useState, useEffect } from "react";
import MegaMenu from "./MegaMenu";
import {
  Search,
  ShoppingCart,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
  Truck,
  Heart,
  ChevronDown,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { categories } from "./MenuData";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  // Jab sidebar khula ho to background scroll lock karne ke liye
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.details?.price || 0) * item.quantity,
    0,
  );

  if (pathname.startsWith("/dashboard")) return null;

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <header className="w-full font-sans  top-0 z-50 bg-white shadow-sm">
      {/* --- 1. TOP BAR (DESKTOP ONLY) --- */}
      <div className="hidden md:block bg-[#f5f5f5] py-2 text-[12px] border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#D61F26]">
              <img src="/uk-flag.png" className="w-4 h-3" alt="en" /> English ▾
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#D61F26]">
              <span className="text-[14px]">👤</span> My Account ▾
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#D61F26]">
              <span className="text-[14px]">❤</span> My Wishlist
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-600 font-medium">
            <span className="flex items-center gap-1">
              <Phone size={14} className="text-gray-400" /> +923312216249
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-[#D61F26]">
              <MapPin size={14} className="text-gray-400" /> OUR OUTLETS
            </span>
          </div>
        </div>
      </div>

      {/* --- 2. MIDDLE BAR (RESPONSIVE) --- */}
      <div className="container mx-auto py-3 md:py-5 px-4 flex items-center justify-between">
        <button
          className="md:hidden p-2 border border-gray-200 rounded"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} className="text-gray-700" />
        </button>

        <div
          className="w-[100px] md:w-[120px] cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img src="/logo.webp" alt="Logo" className="w-full object-contain" />
        </div>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:flex flex-1 max-w-[500px] border-[1px] border-gray-300 rounded-sm overflow-hidden mx-10">
          <div className="bg-white px-3 flex items-center border-r border-gray-200">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for furniture..."
            className="w-full p-2 text-[14px] outline-none"
          />
          <button className="bg-[#D61F26] text-white px-7 py-2 font-bold text-[14px] uppercase hover:bg-[#b0191f] transition-colors">
            Search
          </button>
        </div>

        <div className="flex items-center gap-3 md:gap-8">
          <div className="flex items-center gap-4 md:hidden">
            <Search size={22} className="text-gray-700" />
            <Heart size={22} className="text-gray-700" />
          </div>

          {/* FAST DELIVERY (RESTORED - Desktop Only) */}
          <div className="hidden lg:flex items-center gap-3 border-l border-gray-200 pl-8">
            <Truck size={40} className="text-gray-400 opacity-70" />
            <div>
              <p className="text-[#A7A9AC] italic font-serif text-[18px] leading-tight">
                Fast Delivery
              </p>
              <p className="text-gray-400 text-[12px] uppercase tracking-tighter">
                Karachi & Beyond
              </p>
            </div>
          </div>

          {/* Cart Section */}
          <div
            onClick={() => router.push("/cart")}
            className="flex items-center md:bg-[#D61F26] md:text-white md:p-3 gap-2 md:gap-4 md:min-w-[210px] rounded-sm cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart size={26} className="text-gray-700 md:text-white" />
              <span className="absolute -top-1 -right-1 bg-[#D61F26] md:bg-white text-white md:text-[#D61F26] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border md:border-none">
                {totalItems}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-[11px] font-light opacity-90">
                Rs.{totalPrice.toLocaleString()}
              </p>
              <p className="font-bold text-[13px] uppercase tracking-wide">
                My Cart
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. NAVIGATION BAR (DESKTOP ONLY) --- */}
      <div className="hidden md:block relative bg-[#454545]">
        <div className="container mx-auto flex justify-between items-center pr-6 w-full">
          <MegaMenu />
          <div className="flex items-center gap-4 text-gray-300">
            <Facebook
              size={16}
              className="hover:text-[#D61F26] cursor-pointer"
            />
            <Twitter
              size={16}
              className="hover:text-[#D61F26] cursor-pointer"
            />
            <Instagram
              size={16}
              className="hover:text-[#D61F26] cursor-pointer"
            />
            <Youtube
              size={16}
              className="hover:text-[#D61F26] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* --- 4. MOBILE SIDEBAR MENU (SMOOTH ANIMATION) --- */}
      {/* Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 left-0 z-[101] w-[85%] max-w-[320px] bg-[#1a1a1a] h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-800 bg-white flex justify-between items-center sticky top-0 z-10">
          <img src="/logo.webp" alt="Logo" className="h-8 object-contain" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-black"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col text-white overflow-y-auto">
          <Link
            href="/"
            className="p-4 border-b border-gray-800 font-bold text-[14px] hover:bg-[#D61F26]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            HOME
          </Link>

          {categories.map((cat) => {
            const isOpen = openCategory === cat.id;
            const hasSubItems =
              (cat.links && cat.links.length > 0) ||
              (cat.sections && cat.sections.length > 0);

            return (
              <div key={cat.id} className="border-b border-gray-800">
                <div
                  className={`p-4 flex justify-between items-center cursor-pointer font-bold text-[14px] uppercase transition-colors ${
                    isOpen ? "text-[#D61F26]" : "text-white"
                  }`}
                  onClick={() =>
                    hasSubItems
                      ? toggleCategory(cat.id)
                      : router.push(`/category/${cat.id}`)
                  }
                >
                  {cat.title}
                  {hasSubItems && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </div>

                {/* Submenu with slide-down effect */}
                <div
                  className={`bg-[#111] overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {cat.links?.map((link) => (
                    <Link
                      key={link}
                      href={`/category/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block p-4 pl-8 border-b border-gray-800 text-gray-400 text-[13px] hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link}
                    </Link>
                  ))}
                  {cat.sections?.map((section, sIdx) => (
                    <div key={sIdx} className="border-b border-gray-800">
                      <div className="p-3 pl-6 text-[#D61F26] text-[11px] font-black uppercase bg-[#0a0a0a]">
                        {section.heading}
                      </div>
                      {section.links.map((link) => (
                        <Link
                          key={link}
                          href={`/category/${link.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block p-3 pl-10 text-gray-400 text-[13px] hover:text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="mt-auto p-4 bg-[#1a1a1a]">
          <a
            href="https://wa.me/923307474045"
            target="_blank"
            className="flex items-center gap-3 bg-white p-2 rounded shadow-lg transition-transform active:scale-95"
          >
            <div className="bg-[#25D366] p-2 rounded-full">
              <Phone size={18} className="text-white" />
            </div>
            <span className="text-black text-[13px] font-semibold">
              Need Help? Chat with us
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
