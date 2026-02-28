"use client";

import { Search, ShoppingCart, Zap } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/shared/CartProvider";

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10 px-4 py-3">
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="text-primary fill-primary" size={28} />
          <h1 className="text-xl font-black tracking-tight text-asphalt">
            VoltKenya
          </h1>
        </Link>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
            <Search size={20} className="text-asphalt" />
          </button>
          <Link
            href="/checkout"
            className="relative p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <ShoppingCart size={20} className="text-asphalt" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-asphalt">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
