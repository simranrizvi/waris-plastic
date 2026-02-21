"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  // FIX: Data access logic ko sahi kiya taake NaN na aaye
  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    return acc + (price * item.quantity);
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 bg-white">
        <ShoppingBag size={80} className="text-gray-100 mb-6" />
        <h2 className="text-2xl font-black uppercase text-[#454545] tracking-widest">Your Cart is Empty</h2>
        <p className="text-gray-400 mt-2 mb-8 text-center text-sm font-bold uppercase">Furniture shopping awaits you!</p>
        <Link href="/" className="bg-[#454545] text-white px-10 py-4 rounded-none font-black uppercase tracking-[3px] hover:bg-[#D61F26] transition-all">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 font-sans">
      
    {/* Waris Theme Header Banner */}
<div className="relative w-full h-[200px] md:h-[380px] overflow-hidden flex items-center justify-center">
  
  <img 
    src="https://images.unsplash.com/photo-1699831302264-936de1cd016a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="Banner" 
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  <h1 className="relative z-10 text-3xl md:text-4xl font-black text-white uppercase tracking-[0.2em]">
    Shopping Bag
  </h1>
</div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* 1. Product Table Area */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto rounded-none">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-black uppercase text-gray-500 tracking-[0.2em]">
                    <th className="p-6">Product Detail</th>
                    <th className="p-6">Price</th>
                    <th className="p-6 text-center">Quantity</th>
                    <th className="p-6 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cart.map((item) => (
                    <tr key={item._id || item.productId} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="p-6">
                        <div className="flex gap-6 items-center">
                          {/* Image Fix: item.images?.[0] or item.image handle kiya */}
                          <div className="w-24 h-24 bg-white border border-gray-100 p-1 shrink-0 overflow-hidden">
                            <img 
                              src={item.images?.[0] || item.image || "/placeholder-furniture.png"} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                              alt={item.name} 
                            />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-[13px] font-black text-[#454545] uppercase tracking-tighter leading-tight group-hover:text-[#D61F26] transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase italic">Category: {item.category || "General"}</p>
                            <button 
                              onClick={() => removeFromCart(item._id || item.productId)}
                              className="text-[10px] font-black text-gray-400 hover:text-[#D61F26] uppercase flex items-center gap-1 transition-colors mt-3 border-b border-transparent hover:border-red-600"
                            >
                              <Trash2 size={12} /> Remove Item
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 font-bold text-[#454545] text-sm">
                        Rs.{Number(item.price).toLocaleString()}
                      </td>
                      <td className="p-6">
                        <div className="flex items-center justify-center border border-gray-200 w-28 mx-auto bg-white">
                          <button 
                            onClick={() => updateQuantity(item._id || item.productId, "minus")}
                            className="px-3 py-2 hover:bg-gray-100 font-bold text-[#454545] border-r"
                          >-</button>
                          <input 
                            type="text" 
                            value={item.quantity} 
                            readOnly 
                            className="w-10 text-center text-xs font-black outline-none" 
                          />
                          <button 
                            onClick={() => updateQuantity(item._id || item.productId, "plus")}
                            className="px-3 py-2 hover:bg-gray-100 font-bold text-[#454545] border-l"
                          >+</button>
                        </div>
                      </td>
                      <td className="p-6 text-right font-black text-[#D61F26] text-sm">
                        Rs.{(Number(item.price) * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button 
              onClick={() => router.push("/")}
              className="mt-8 flex items-center gap-2 text-[11px] font-black text-[#454545] uppercase tracking-[0.2em] hover:text-[#D61F26] transition-all"
            >
              <ArrowLeft size={16} /> Return to Shop
            </button>
          </div>

          {/* 2. Order Summary Panel (Theme Matching) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-xl  border-t-8 border-[#D61F26] rounded-none sticky top-29">
              <h2 className="text-xl font-black uppercase border-b-2 border-gray-50 pb-6 mb-8 tracking-tighter text-[#454545]">Order Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-[#454545]">Rs.{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600">Calculated at delivery</span>
                </div>
                <div className="border-t-2 border-gray-50 pt-6 flex justify-between items-center">
                  <span className="text-sm font-black uppercase text-[#454545]">Total Payable</span>
                  <span className="text-2xl font-black text-[#D61F26]">Rs.{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => router.push("/checkout")}
                className="w-full bg-[#D61F26] text-gray-100 py-3 font-bold uppercase tracking-[3px] hover:bg-[#D61F26] transition-all shadow-xl active:scale-95"
              >
                Proceed to Checkout
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-6">
                 <div className="h-[1px] bg-gray-100 flex-1"></div>
                 <p className="text-[9px] text-gray-300 font-black uppercase tracking-widest">Secure Payment</p>
                 <div className="h-[1px] bg-gray-100 flex-1"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}