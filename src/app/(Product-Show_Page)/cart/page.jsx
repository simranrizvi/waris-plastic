"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  // Total price calculate karne ke liye logic
  const subtotal = cart.reduce((acc, item) => acc + (item.details?.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <ShoppingBag size={100} className="text-gray-100 mb-6" />
        <h2 className="text-2xl font-black uppercase text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2 mb-8 text-center">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className="bg-[#2E3192] text-white px-10 py-4 rounded-sm font-black uppercase tracking-widest hover:bg-blue-900 transition-all">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-10">
        
        <h1 className="text-2xl font-black uppercase mb-8 border-l-4 border-[#2E3192] pl-4">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* 1. Product Table (As seen in image_7d7aa7.png) */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm border border-gray-100 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-black uppercase text-gray-500 tracking-widest">
                    <th className="p-4 w-[50%]">Product</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-center">Quantity</th>
                    <th className="p-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cart.map((item) => (
                    <tr key={item.productId} className="group">
                      <td className="p-4">
                        <div className="flex gap-4 items-start">
                          <img 
                            src={item.details?.images?.[0]} 
                            className="w-20 h-20 object-cover border border-gray-100 shrink-0" 
                            alt={item.details?.name} 
                          />
                          <div className="space-y-1">
                            <h3 className="text-sm font-bold text-gray-800 uppercase leading-tight">{item.details?.name}</h3>
                            <p className="text-[10px] text-gray-400 italic font-medium">Category: {item.details?.category}</p>
                            <button 
                              onClick={() => removeFromCart(item.productId)}
                              className="bg-[#444] text-white text-[10px] font-bold px-3 py-1.5 uppercase hover:bg-red-600 transition-colors mt-2"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-black text-gray-700 text-sm">
                        Rs.{item.details?.price?.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center border border-gray-200 w-24 mx-auto">
                          <button 
                            onClick={() => updateQuantity(item.productId, "minus")}
                            className="px-2 py-1 hover:bg-gray-100 font-bold"
                          >-</button>
                          <input 
                            type="text" 
                            value={item.quantity} 
                            readOnly 
                            className="w-10 text-center border-x text-xs font-black" 
                          />
                          <button 
                            onClick={() => updateQuantity(item.productId, "plus")}
                            className="px-2 py-1 hover:bg-gray-100 font-bold"
                          >+</button>
                        </div>
                      </td>
                      <td className="p-4 text-right font-black text-gray-800 text-sm">
                        Rs.{(item.details?.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button 
              onClick={() => router.push("/")}
              className="mt-6 flex items-center gap-2 text-xs font-black text-[#2E3192] uppercase tracking-widest hover:underline"
            >
              <ArrowLeft size={16} /> Continue Shopping
            </button>
          </div>

          {/* 2. Order Summary Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-sm border-t-4 border-[#2E3192] rounded-sm sticky top-24">
              <h2 className="text-xl font-black uppercase border-b pb-4 mb-6 tracking-tighter">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span>Rs.{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-black text-[#2E3192]">
                  <span>Total</span>
                  <span>Rs.{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => router.push("/checkout")}
                className="w-full bg-[#2E3192] text-white py-4 font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
              >
                Proceed to Checkout
              </button>
              
              <p className="text-[10px] text-gray-400 text-center mt-4 font-bold uppercase tracking-widest">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}