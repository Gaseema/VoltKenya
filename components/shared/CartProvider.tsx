"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { type Bike } from "@prisma/client";

// Extending Bike to handle parsed images for the frontend
export type CartItem = Omit<Bike, "images"> & {
  images: string[];
  image: string; // The primary image
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (bike: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("volt_kenya_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("volt_kenya_cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (bike: CartItem) => {
    setCart((prev) => {
      // Prevent duplicates - assuming selling one specific bike unit or model at a time
      if (prev.find((item) => item.id === bike.id)) return prev;
      return [...prev, bike];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
