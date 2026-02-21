"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { API_ENDPOINTS } from "@/lib/constants"; 

export default function CategoryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]); // Best sellers state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Current category ke products
        const prodRes = await fetch(`${API_ENDPOINTS.PRODUCTS}?category=${slug}`);
        const prodResult = await prodRes.json();
        if (prodResult.success) setProducts(prodResult.data);

        // 2. Sidebar Categories aur Count
        const catRes = await fetch(API_ENDPOINTS.CATEGORIES);
        const catResult = await catRes.json();
        if (catResult.success) setDynamicCategories(catResult.data);

        // 3. Best Sellers (Puri shop se top 3 products uthana)
        // Aap backend pe query bhej sakte hain limit=3 and sort=popularity
        const bestRes = await fetch(`${API_ENDPOINTS.PRODUCTS}?limit=3`);
        const bestResult = await bestRes.json();
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
    <div className="w-full min-h-screen bg-[#f8f8f8]">
      
      {/* 1. VIP Banner Section */}
      <div className="relative w-full h-[250px] md:h-[350px] bg-gray-900 overflow-hidden flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2000" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale" 
        />
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-2 drop-shadow-lg">
            {slug?.replace("-", " ")}
          </h1>
          <p className="text-sm md:text-base opacity-90 font-medium">Home {`>`} {slug}</p>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 2. SIDEBAR SECTION */}
          <aside className="w-full lg:w-[300px] shrink-0 space-y-8">
            
            {/* Categories Widget */}
            <div className="bg-white shadow-sm border-t-4 border-[#2E3192] rounded-sm">
              <h2 className="p-5 text-[#2E3192] font-black text-[16px] uppercase border-b flex items-center gap-2">
                Shop By Category
              </h2>
              <ul className="max-h-[400px] overflow-y-auto p-2 custom-scrollbar">
                {dynamicCategories.map((cat) => (
                  <li 
                    key={cat._id}
                    onClick={() => router.push(`/category/${cat._id.toLowerCase().trim().replace(/\s+/g, '-')}`)}
                    className={`flex justify-between items-center p-3 mb-1 cursor-pointer transition-all rounded-sm group
                      ${slug === cat._id.toLowerCase().replace(/\s+/g, '-') 
                        ? 'bg-blue-50 text-[#2E3192] font-bold border-l-4 border-[#2E3192]' 
                        : 'text-gray-600 hover:bg-gray-50'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] ${slug === cat._id.toLowerCase().replace(/\s+/g, '-') ? 'text-[#2E3192]' : 'text-gray-300 group-hover:text-[#2E3192]'}`}>◆</span>
                      <span className="text-[13px] uppercase tracking-tight">{cat._id}</span>
                    </div>
                    <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-400 group-hover:bg-[#2E3192] group-hover:text-white transition-colors font-bold">
                      {cat.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Sellers Widget (Dynamic) */}
            <div className="bg-white shadow-sm border-t-4 border-[#2E3192] rounded-sm overflow-hidden">
              <h2 className="p-4 bg-zinc-800 text-white font-black text-[15px] uppercase text-center tracking-widest">
                Best Sellers
              </h2>
              <div className="p-4 space-y-6">
                {bestSellers.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex gap-4 items-center cursor-pointer group"
                    onClick={() => router.push(`/product/${item._id}`)}
                  >
                    <div className="w-20 h-20 shrink-0 bg-gray-50 border p-1 rounded-sm overflow-hidden">
                      <img 
                        src={item.images?.[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[12px] font-bold text-gray-700 uppercase leading-tight group-hover:text-[#2E3192] line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-[#ED1C24] font-black text-[14px] mt-1">
                        Rs.{item.price.toLocaleString()}
                      </p>
                      {item.oldPrice && (
                        <p className="text-gray-400 line-through text-[11px]">
                          Rs.{item.oldPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* 3. Products Grid Area */}
          <main className="flex-1">
            {/* Sorting Top Bar */}
            <div className="bg-white p-4 mb-6 shadow-sm flex flex-wrap justify-between items-center border border-gray-100 rounded-sm">
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-tighter">
                Found {products.length} Products in {slug}
              </p>
              <div className="flex items-center gap-4">
                 <select className="text-[11px] border p-2 bg-transparent outline-none text-gray-600 font-bold uppercase cursor-pointer">
                   <option>Sort By: Featured</option>
                   <option>Price: Low to High</option>
                   <option>Price: High to Low</option>
                 </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[1,2,3,4,5,6].map(i => (
                   <div key={i} className="h-[380px] bg-gray-100 animate-pulse rounded-sm border border-gray-200"></div>
                 ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 bg-white shadow-sm rounded-sm border border-dashed border-gray-200">
                <p className="text-gray-400 italic text-xl">Is category mein abhi koi products nahi hain.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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