"use client";

import { useAuth } from "@/components/shared/AuthProvider";
import { useCart, CartItem } from "@/components/shared/CartProvider";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

export function AddToCartButton({
  bike,
  className = "flex-1 bg-primary text-asphalt font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-emerald-400 transition-colors w-full",
  children = (
    <>
      <ShoppingBag size={20} /> Buy with Finance
    </>
  ),
}: {
  bike: any;
  className?: string;
  children?: React.ReactNode;
}) {
  const { user, openAuthModal } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAction = () => {
    // Determine whether to force login at add to cart stage
    if (!user) {
      openAuthModal();
      return;
    }

    addToCart(bike);
    router.push("/checkout");
  };

  return (
    <button onClick={handleAction} className={className}>
      {children}
    </button>
  );
}
