"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  // FIX: Price nikalne ka sahi tareeqa (item level ya details level dono check honge)
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
      {/* Banner Section remains same */}
      <div className="relative w-full h-[200px] md:h-[380px] overflow-hidden flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1699831302264-936de1cd016a?q=80&w=774&auto=format&fit=crop" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative z-10 text-3xl md:text-4xl font-black text-white uppercase tracking-[0.2em]">
          Shopping Bag
        </h1>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
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
                    const currentPrice = getPrice(item); // Price Fix
                    const itemImage = item.image || item.images?.[0] || item.details?.images?.[0] || "/placeholder.png";
                    const itemName = item.name || item.details?.name || "Product";

                    return (
                      <tr key={item.productId || item._id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="p-6">
                          <div className="flex gap-6 items-center">
                            <div className="w-24 h-24 bg-white border border-gray-100 p-1 shrink-0 overflow-hidden">
                              <img 
                                src={itemImage} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                alt={itemName} 
                              />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-[13px] font-black text-[#454545] uppercase tracking-tighter group-hover:text-[#D61F26]">
                                {itemName}
                              </h3>
                              <p className="text-[10px] text-gray-400 font-bold uppercase italic">Category: {item.category || item.details?.category || "General"}</p>
                              <button 
                                onClick={() => removeFromCart(item.productId || item._id)}
                                className="text-[10px] font-black text-gray-400 hover:text-[#D61F26] uppercase flex items-center gap-1 mt-3"
                              >
                                <Trash2 size={12} /> Remove Item
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 font-bold text-[#454545] text-sm">
                          Rs.{currentPrice.toLocaleString()}
                        </td>
                        <td className="p-6">
                          <div className="flex items-center justify-center border border-gray-200 w-28 mx-auto">
                            <button onClick={() => updateQuantity(item.productId || item._id, "minus")} className="px-3 py-2 hover:bg-gray-100 font-bold">-</button>
                            <span className="w-10 text-center text-xs font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId || item._id, "plus")} className="px-3 py-2 hover:bg-gray-100 font-bold">+</button>
                          </div>
                        </td>
                        <td className="p-6 text-right font-black text-[#D61F26] text-sm">
                          Rs.{(currentPrice * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-xl border-t-8 border-[#D61F26] sticky top-24">
              <h2 className="text-xl font-black uppercase border-b-2 border-gray-50 pb-6 mb-8 text-[#454545]">Order Summary</h2>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-[#454545]">Rs.{subtotal.toLocaleString()}</span>
                </div>
                <div className="border-t-2 border-gray-50 pt-6 flex justify-between items-center">
                  <span className="text-sm font-black uppercase text-[#454545]">Total Payable</span>
                  <span className="text-2xl font-black text-[#D61F26]">Rs.{subtotal.toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={() => router.push("/checkout")}
                className="w-full bg-[#D61F26] text-white py-3 font-bold uppercase tracking-[3px] shadow-xl active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}