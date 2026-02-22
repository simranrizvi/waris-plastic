"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS } from "@/lib/constants";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([]);
  const isInitialMount = useRef(true);

  // 1. Load Cart: Priority based logic
  useEffect(() => {
    // Pehle LocalStorage se uthao taake UI turant update ho
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (savedCart.length > 0) {
      setCart(savedCart);
    }

    // Agar session login hai, to DB se fetch karo
    if (status === "authenticated") {
      fetch(API_ENDPOINTS.ADDED_TO_CART)
        .then((res) => res.json())
        .then((result) => {
          // VIP FIX: Sirf tabhi update karo agar DB mein kuch hai
          // Warna LocalStorage wala data hi rehne do
          if (result.success && result.data?.length > 0) {
            setCart(result.data);
            localStorage.setItem("cart", JSON.stringify(result.data));
          }
        })
        .catch((err) => console.error("Error loading cart from DB:", err));
    }
  }, [status]); // Dependency on status taake login hote hi fetch ho

  // 2. Sync Logic: Jab bhi cart change ho, LocalStorage update karo
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 3. Sync with DB: Isse alag function rakhte hain taake har chhoti change pe DB hit na ho
  const syncWithDB = async (items) => {
    if (status === "authenticated") {
      try {
        await fetch(API_ENDPOINTS.ADDED_TO_CART, {
          method: "POST",
          body: JSON.stringify({ items }),
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Cart DB sync failed:", error);
      }
    }
  };

  const addToCart = (product) => {
    const colorToAdd = product.color || "Default";
    const quantityToAdd = Number(product.quantity) || 1;

    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.productId === product._id && item.color === colorToAdd
      );

      let newCart;
      if (existing) {
        newCart = prevCart.map((item) =>
          item.productId === product._id && item.color === colorToAdd
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        newCart = [
          ...prevCart,
          {
            productId: product._id,
            quantity: quantityToAdd,
            color: colorToAdd,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || product.image,
            category: product.category,
            details: product,
          },
        ];
      }
      syncWithDB(newCart); // DB Sync
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.productId !== productId);
      syncWithDB(newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId, action) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) => {
        if (item.productId === productId) {
          const newQty = action === "plus" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      });
      syncWithDB(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};