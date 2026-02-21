"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { API_ENDPOINTS } from "@/lib/constants"; 
import { Loader2, ChevronRight, LayoutGrid } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Category slug logic update: spaces handles
        const formattedSlug = slug?.replace(/-/g, " ");

        const [prodRes, catRes, bestRes] = await Promise.all([
          fetch(`${API_ENDPOINTS.PRODUCTS}?category=${formattedSlug}`),
          fetch(API_ENDPOINTS.CATEGORIES),
          fetch(`${API_ENDPOINTS.PRODUCTS}?limit=3`)
        ]);

        const prodResult = await prodRes.json();
        const catResult = await catRes.json();
        const bestResult = await bestRes.json();

        if (prodResult.success) setProducts(prodResult.data);
        if (catResult.success) setDynamicCategories(catResult.data);
        if (bestResult.success) setBestSellers(bestResult.data.slice(0, 3));

      } catch (error) {
        console.error("Data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  return (
    <div className="w-full min-h-screen bg-[#f3eeee]">
      
      {/* 1. WARIS THEME BANNER */}
      <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden flex items-center justify-center">
  
  <img 
    src="https://images.unsplash.com/photo-1699831302264-936de1cd016a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="Banner" 
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-[0.2em] mb-3">
            {slug?.replace(/-/g, " ")}
          </h1>
          <div className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-black/30 py-2 px-4 inline-flex">
            <span className="text-gray-400 hover:text-white cursor-pointer" onClick={() => router.push('/')}>Home</span> 
            <ChevronRight size={12} className="text-[#D61F26]" /> 
            <span className="text-[#D61F26]">{slug?.replace(/-/g, " ")}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12  px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* 2. SIDEBAR SECTION (Waris Styling) */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-10">
            
            {/* Categories Widget */}
            <div className="bg-white border border-gray-100 shadow-sm">
              <h2 className="p-4 bg-[#454545] text-white font-bold text-[14px] uppercase tracking-widest flex items-center gap-3">
                <div className="w-1.5 h-4 bg-[#D61F26]"></div>
                Product Categories
              </h2>
              <ul className="p-1">
                {dynamicCategories.map((cat) => (
                  <li 
                    key={cat._id}
                    onClick={() => router.push(`/category/${cat._id.toLowerCase().trim().replace(/\s+/g, '-')}`)}
                    className={`flex justify-between items-center p-3.5 border-b border-gray-50 last:border-none cursor-pointer transition-all group
                      ${slug === cat._id.toLowerCase().replace(/\s+/g, '-') 
                        ? 'bg-gray-50 text-[#D61F26]' 
                        : 'text-gray-600 hover:bg-gray-50'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[8px] ${slug === cat._id.toLowerCase().replace(/\s+/g, '-') ? 'text-[#D61F26]' : 'text-gray-300 group-hover:text-[#D61F26]'}`}>◆</span>
                      <span className="text-[12px] font-bold uppercase tracking-tight">{cat._id}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 font-bold border ${slug === cat._id.toLowerCase().replace(/\s+/g, '-') ? 'bg-[#D61F26] text-white border-[#D61F26]' : 'text-gray-400 border-gray-200 group-hover:text-[#D61F26] group-hover:border-[#D61F26]'}`}>
                      {cat.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Sellers Widget */}
            <div className="bg-white border border-gray-100 shadow-sm">
              <h2 className="p-4 bg-[#454545] text-white font-bold text-[14px] uppercase tracking-widest flex items-center gap-3">
                 <div className="w-1.5 h-4 bg-[#D61F26]"></div>
                 Top Rated
              </h2>
              <div className="p-5 space-y-6">
                {bestSellers.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex gap-4 items-center cursor-pointer group border-b border-gray-50 pb-4 last:border-none last:pb-0"
                    onClick={() => router.push(`/product/${item._id}-${item.name.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    <div className="w-20 h-20 shrink-0 bg-gray-50 border border-gray-100 p-1 overflow-hidden">
                      <img 
                        src={item.images?.[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[11px] font-black text-[#454545] uppercase leading-tight group-hover:text-[#D61F26] line-clamp-2 tracking-tighter">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[#D61F26] font-bold text-[14px]">Rs.{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* 3. PRODUCTS GRID AREA */}
          <main className="flex-1 ">
            {/* Sorting Top Bar */}
            <div className="bg-white px-4 py-2 mb-8 border border-gray-100 flex flex-wrap justify-between items-center">
              <div className="flex items-center gap-2 text-gray-500">
                <LayoutGrid size={16} />
                <p className="text-[11px] font-bold uppercase tracking-widest">
                  Showing {products.length} Results
                </p>
              </div>
              <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Sort By:</span>
                  <select className="text-[11px] border border-gray-200 p-2 bg-transparent outline-none text-[#454545] font-bold uppercase cursor-pointer focus:border-[#D61F26]">
                    <option>Default Sorting</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="h-[400px] bg-gray-100 animate-pulse border border-gray-100"></div>
                  ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-32 bg-white border-2 border-dashed border-gray-100">
                <div className="text-gray-300 mb-4 flex justify-center"><Loader2 size={48} className="animate-spin" /></div>
                <p className="text-[#454545] font-bold uppercase tracking-[0.2em]">No Products Found</p>
                <button onClick={() => router.push('/')} className="mt-6 text-[11px] font-bold text-[#D61F26] border-b-2 border-[#D61F26] pb-1 uppercase">Back to Home</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}