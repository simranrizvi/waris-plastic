"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS } from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MapPin, ArrowLeft, CreditCard, ShieldCheck, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    city: "Karachi",
    postalCode: "75300",
    country: "Pakistan",
    paymentMethod: "Stripe"
  });

  // Theme ke mutabiq total price calculation
  const totalPrice = cart.reduce((acc, item) => acc + (item.details?.price * item.quantity), 0);

  // handlePlaceOrder function ke andar ye tabdeeli karein:

const handlePlaceOrder = async (e) => {
  e.preventDefault();
  
  // FIX: Login check hata diya taake guest order kar sakay
  if (cart.length === 0) return toast.error("Aapka cart khali hai!");

  setLoading(true);
  try {
    const orderPayload = {
      // FIX: Agar session hai to ID bhejo, warna null
      userId: session?.user?.id || null, 
      orderItems: cart.map(item => ({
        name: item.details?.name || "Product Name Missing", 
        quantity: item.quantity,
        image: item.details?.images?.[0] || "/placeholder.png",
        price: item.details?.price || 0,
        product: item.productId 
      })),
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country
      },
      totalPrice: totalPrice,
      paymentMethod: formData.paymentMethod
    };

    const res = await fetch(API_ENDPOINTS.CHECKOUT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    const result = await res.json();
    if (result.success) {
      toast.success("Order placed successfully!");
      clearCart();
      router.push("/order-success");
    } else {
      toast.error(result.message || "Order fail ho gaya");
    }
  } catch (error) {
    toast.error("Server connection issue!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 font-sans text-[#454545]">
      
      {/* 1. WARIS THEME HEADER BANNER */}
      <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden flex items-center justify-center">
  
  <img 
    src="https://images.unsplash.com/photo-1699831302264-936de1cd016a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="Banner" 
    className="absolute inset-0 w-full h-full object-cover"
  />
    <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-[0.2em]">
            Checkout
          </h1>
          <p className="text-[#D61F26] text-[11px] font-bold uppercase tracking-widest mt-2 bg-white/10 inline-block px-4 py-1">
            Secure Payment Gateway
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* LEFT: Shipping Details (8 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border border-gray-100 shadow-sm rounded-none overflow-hidden">
              <h2 className="p-5 bg-[#454545] text-white font-bold text-[14px] uppercase tracking-widest flex items-center gap-3">
                <div className="w-1.5 h-4 bg-[#D61F26]"></div>
                <MapPin size={18} /> Shipping Address
              </h2>
              
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#454545] uppercase tracking-widest">Street Address *</label>
                  <textarea 
                    required
                    placeholder="Enter your full home or office address..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-[#D61F26] transition-all min-h-[120px] text-sm"
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-[#454545] uppercase tracking-widest">City</label>
                    <input 
                      type="text" 
                      defaultValue="Karachi"
                      className="w-full p-4 bg-gray-100 border border-gray-200 rounded-none font-bold text-gray-500 cursor-not-allowed text-sm"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-[#454545] uppercase tracking-widest">Postal Code *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="75300"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-[#D61F26] text-sm font-bold"
                      onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-red-50 border-l-4 border-[#D61F26] flex gap-4 items-center">
                <ShieldCheck className="text-[#D61F26]" size={30} />
                <div>
                    <p className="text-[12px] font-black text-[#D61F26] uppercase">Secure Checkout</p>
                    <p className="text-[11px] text-gray-600 font-medium">Your personal data will be used to process your order and support your experience throughout this website.</p>
                </div>
            </div>
          </div>

          {/* RIGHT: Order Summary (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-100 shadow-xl rounded-none sticky top-24">
              <h2 className="p-5 bg-[#D61F26] text-white font-bold text-[14px] uppercase tracking-widest text-center">
                Order Summary
              </h2>
              
              <div className="p-6">
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex gap-4 items-center border-b border-gray-50 pb-4">
                      <div className="w-16 h-16 shrink-0 border border-gray-100 p-1">
                        <img src={item.details?.images?.[0]} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-black text-[#454545] uppercase leading-tight line-clamp-1">{item.details?.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">QTY: {item.quantity}</p>
                        <p className="font-bold text-[#D61F26] text-xs mt-1">Rs.{(item.details?.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                  <div className="flex justify-between items-center text-gray-500 text-[11px] font-bold uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-[#454545]">Rs.{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 text-[11px] font-bold uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t-2 border-[#454545]">
                    <span className="text-lg font-black text-[#454545] uppercase tracking-tighter">Total Payable</span>
                    <span className="text-2xl font-black text-[#D61F26]">Rs.{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 border border-dashed border-gray-300 flex items-center gap-3">
                  <CreditCard size={18} className="text-gray-400" />
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase">Payment Method</p>
                    <p className="font-bold text-xs text-[#454545] uppercase">{formData.paymentMethod}</p>
                  </div>
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-[#D61F26] text-white py-3 mt-8 rounded-none font-bold uppercase tracking-[3px] hover:bg-[#D61F26] transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3 shadow-lg"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Place Order Now"}
                </button>
                
                <button 
                  type="button"
                  onClick={() => router.push("/cart")} 
                  className="w-full mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase hover:text-[#D61F26] transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Shopping Bag
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}