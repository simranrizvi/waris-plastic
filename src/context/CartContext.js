"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS } from "@/lib/constants";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);

  // 1. Load Cart: Pehle LocalStorage se, phir agar login ho to DB se sync
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    if (session) {
      fetch(API_ENDPOINTS.ADDED_TO_CART)
        .then((res) => res.json())
        .then((result) => {
          if (result.success && result.data?.length > 0) {
            setCart(result.data); // DB wala cart priority hai
          }
        })
        .catch((err) => console.error("Error loading cart from DB:", err));
    }
  }, [session]);

  // 2. Sync Function: LocalStorage aur Database dono ko update karta hai
  const syncCart = async (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    if (session) {
      try {
        await fetch(API_ENDPOINTS.ADDED_TO_CART, {
          method: "POST",
          body: JSON.stringify({ items: newCart }),
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Cart sync failed:", error);
      }
    }
  };

  // 3. Add to Cart Logic: Quantity handling ke saath
  const addToCart = (product) => {
    const quantityToAdd = product.quantity || 1;
    const existing = cart.find((item) => item.productId === product._id);
    let newCart;

    if (existing) {
      newCart = cart.map((item) =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      );
    } else {
      // Product ki saari zaroori info top-level par rakhein taake NaN na aaye
      newCart = [
        ...cart,
        { 
          productId: product._id, 
          quantity: quantityToAdd, 
          name: product.name,
          price: product.price,
          image: product.images?.[0] || product.image,
          category: product.category,
          details: product // Backup ke liye
        },
      ];
    }
    syncCart(newCart);
  };
  // 4. Remove from Cart
  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.productId !== productId);
    syncCart(newCart);
  };

  // 5. Update Quantity (Plus/Minus)
  const updateQuantity = (productId, action) => {
    const newCart = cart.map((item) => {
      if (item.productId === productId) {
        const newQty = action === "plus" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    syncCart(newCart);
  };

  // 6. VIP Fix: Clear Cart (Order confirm hone ke baad ke liye)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    // Agar DB se bhi clear karna ho to yahan delete API hit kar sakte hain
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart, // Ab Checkout page pe error nahi aayega
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};