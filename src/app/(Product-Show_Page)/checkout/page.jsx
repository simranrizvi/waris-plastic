"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react"; // Session se userId lene ke liye
import { API_ENDPOINTS } from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Truck, User, Phone, MapPin, CheckCircle, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { data: session } = useSession(); // Session data nikala
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Pattern ke mutabiq state management
  const [formData, setFormData] = useState({
    address: "",
    city: "Karachi",
    postalCode: "75300",
    country: "Pakistan",
    paymentMethod: "Stripe" // Postman pattern ke mutabiq default
  });

  const totalPrice = cart.reduce((acc, item) => acc + (item.details?.price * item.quantity), 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!session) {
      return toast.error("Please login to place an order");
    }

    if (cart.length === 0) {
      return toast.error("Aapka cart khali hai!");
    }

    setLoading(true);
    try {
     // src/app/checkout/page.jsx mein map logic ko aise change karein:

const orderPayload = {
  userId: session?.user?.id,
  orderItems: cart.map(item => ({
    // VIP Fix: Optional chaining (?) aur default values ka use
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
      console.error("Order Error:", error);
      toast.error("Server connection issue!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-black uppercase mb-10 border-b-4 border-[#2E3192] inline-block pb-2 tracking-tighter">
          Finalize Your Order
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* 1. SHIPPING ADDRESS (As per Pattern) */}
          <div className="bg-white p-8 shadow-sm rounded-sm space-y-6 border border-gray-100">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800 uppercase border-b pb-4">
              <MapPin className="text-[#2E3192]" /> Shipping Address
            </h2>

            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Complete Address *</label>
                <textarea 
                  required
                  placeholder="Block, House Number, Street..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-[#2E3192] focus:bg-white transition-all min-h-[100px]"
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">City</label>
                  <input 
                    type="text" 
                    defaultValue="Karachi"
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-sm cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Postal Code</label>
                  <input 
                    required
                    type="text" 
                    placeholder="75300"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-[#2E3192]"
                    onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. SUMMARY & SUBMIT */}
          <div className="space-y-6">
            <div className="bg-white p-8 shadow-sm rounded-sm border-t-8 border-[#2E3192]">
              <h2 className="text-xl font-bold uppercase border-b pb-4 mb-6 text-gray-800">Review Summary</h2>
              
              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <div className="flex gap-4">
                      <img src={item.details?.images?.[0]} className="w-14 h-14 object-cover border rounded-sm" alt="" />
                      <div>
                        <p className="text-xs font-bold text-gray-800 uppercase">{item.details?.name}</p>
                        <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-black text-sm text-[#2E3192]">Rs.{(item.details?.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3 pt-6 border-t">
                <div className="flex justify-between text-2xl font-black text-[#2E3192]">
                  <span>Total Payable:</span>
                  <span>Rs.{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-dashed border-gray-300">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Payment Method selected:</p>
                <p className="font-bold text-sm text-gray-700">{formData.paymentMethod}</p>
              </div>

              <button 
                disabled={loading}
                className="w-full bg-[#2E3192] text-white py-5 mt-8 rounded-sm font-black uppercase tracking-[2px] hover:bg-blue-900 transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20"
              >
                {loading ? "Syncing with Server..." : "Place Order Now"}
              </button>
            </div>
            
            <button onClick={() => router.push("/cart")} className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase hover:text-[#2E3192]">
              <ArrowLeft size={14} /> Edit Cart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}