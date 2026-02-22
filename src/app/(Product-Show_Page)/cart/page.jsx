"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const getPrice = (item) => {
    return Number(item.price) || Number(item.details?.price) || 0;
  };

  const subtotal = cart.reduce((acc, item) => {
    const price = getPrice(item);
    return acc + (price * item.quantity);
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 bg-white">
        <ShoppingBag size={80} className="text-gray-100 mb-6" />
        <h2 className="text-xl md:text-2xl font-black uppercase text-[#454545] tracking-widest text-center">Your Cart is Empty</h2>
        <p className="text-gray-400 mt-2 mb-8 text-center text-sm font-bold uppercase">Furniture shopping awaits you!</p>
        <Link href="/" className="bg-[#454545] text-white px-8 md:px-10 py-4 rounded-none font-black uppercase tracking-[3px] hover:bg-[#D61F26] transition-all text-sm">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 font-sans">
      {/* Banner - Responsive Height */}
      <div className="relative w-full h-[150px] md:h-[300px] lg:h-[380px] overflow-hidden flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1699831302264-936de1cd016a?q=80&w=774&auto=format&fit=crop" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative z-10 text-2xl md:text-4xl font-black text-white uppercase tracking-[0.2em]">
          Shopping Bag
        </h1>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2">
            
            {/* --- MOBILE VIEW: Items as Cards (Visible ONLY on Mobile/Tablet) --- */}
            <div className="block lg:hidden space-y-4">
              {cart.map((item) => {
                const currentPrice = getPrice(item);
                const itemImage = item.image || item.images?.[0] || item.details?.images?.[0] || "/placeholder.png";
                const itemName = item.name || item.details?.name || "Product";
                const itemColor = item.color || item.details?.color;

                return (
                  <div key={item.productId || item._id} className="bg-white border border-gray-100 p-4 flex gap-4 shadow-sm relative">
                    <div className="w-24 h-24 shrink-0 border border-gray-50 p-1">
                      <img src={itemImage} className="w-full h-full object-cover" alt={itemName} />
                    </div>
                    <div className="flex-1 space-y-1 pr-8">
                      <h3 className="text-[12px] font-bold text-[#454545] uppercase leading-tight line-clamp-2">{itemName}</h3>
                      {itemColor && <p className="text-[10px] font-bold uppercase text-gray-500">Color: <span className="text-[#D61F26]">{itemColor}</span></p>}
                      <p className="text-[12px] font-black text-[#D61F26] pt-1">Rs.{currentPrice.toLocaleString()}</p>
                      
                      {/* Quantity Controls for Mobile */}
                      <div className="flex items-center border border-gray-200 w-24 mt-3">
                        <button onClick={() => updateQuantity(item.productId || item._id, "minus")} className="px-2 py-1"><Minus size={12}/></button>
                        <span className="flex-1 text-center text-[11px] font-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId || item._id, "plus")} className="px-2 py-1"><Plus size={12}/></button>
                      </div>
                    </div>
                    {/* Delete button absolute for Mobile UI */}
                    <button 
                      onClick={() => removeFromCart(item.productId || item._id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-[#D61F26]"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* --- DESKTOP VIEW: Table (Visible ONLY on Desktop) --- */}
            <div className="hidden lg:block bg-white border border-gray-100 shadow-sm">
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
                  {cart.map((item) => {
                    const currentPrice = getPrice(item);
                    const itemImage = item.image || item.images?.[0] || item.details?.images?.[0] || "/placeholder.png";
                    const itemName = item.name || item.details?.name || "Product";
                    const itemColor = item.color || item.details?.color;

                    return (
                      <tr key={item.productId || item._id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="p-6">
                          <div className="flex gap-6 items-center">
                            <div className="w-24 h-24 bg-white border border-gray-100 p-1 shrink-0 overflow-hidden">
                              <img src={itemImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={itemName} />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-[13px] font-bold text-[#454545] uppercase tracking-tighter group-hover:text-[#D61F26]">{itemName}</h3>
                              {itemColor && <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Color: <span className="text-[#D61F26]">{itemColor}</span></p>}
                              <p className="text-[10px] text-gray-400 font-bold uppercase">Category: {item.category || item.details?.category || "General"}</p>
                              <button onClick={() => removeFromCart(item.productId || item._id)} className="text-[10px] font-black text-gray-400 hover:text-[#D61F26] uppercase flex items-center gap-1 mt-3 transition-colors">
                                <Trash2 size={12} /> Remove Item
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 font-bold text-[#454545] text-sm">Rs.{currentPrice.toLocaleString()}</td>
                        <td className="p-6">
                          <div className="flex items-center justify-center border border-gray-200 w-28 mx-auto">
                            <button onClick={() => updateQuantity(item.productId || item._id, "minus")} className="px-3 py-2 hover:bg-gray-100 font-bold">-</button>
                            <span className="w-10 text-center text-xs font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId || item._id, "plus")} className="px-3 py-2 hover:bg-gray-100 font-bold">+</button>
                          </div>
                        </td>
                        <td className="p-6 text-right font-black text-[#D61F26] text-sm">Rs.{(currentPrice * item.quantity).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar (Order Summary) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 shadow-xl border-t-4 border-[#D61F26] lg:sticky lg:top-24">
              <h2 className="text-lg md:text-xl font-bold uppercase border-b-2 border-gray-50 pb-6 mb-8 text-[#454545]">Order Summary</h2>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-[#454545]">Rs.{subtotal.toLocaleString()}</span>
                </div>
                <div className="border-t-2 border-gray-50 pt-6 flex justify-between items-center">
                  <span className="text-sm font-bold uppercase text-[#454545]">Total Payable</span>
                  <span className="text-lg md:text-xl font-bold text-[#D61F26]">Rs.{subtotal.toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={() => router.push("/checkout")}
                className="w-full bg-[#D61F26] text-white py-4 font-bold uppercase tracking-[1px] shadow-xl active:scale-95 transition-transform"
              >
                Proceed to Checkout
              </button>
              <div className="mt-4 text-center">
                 <Link href="/" className="text-[10px] font-bold uppercase text-gray-400 hover:text-[#454545] transition-colors inline-flex items-center gap-2">
                    <ArrowLeft size={10}/> Continue Shopping
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}