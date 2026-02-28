"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bike, Wallet, User, ShoppingBag, LogOut } from "lucide-react";
import { useAuth } from "@/components/shared/AuthProvider";

export default function BottomNav() {
  const pathname = usePathname();

  const { user, openAuthModal, logout } = useAuth();

  const navItems = [
    { label: "Home", icon: Home, href: "/", onClick: undefined },
    { label: "Catalog", icon: Bike, href: "/catalog", onClick: undefined },
    { label: "Cart", icon: ShoppingBag, href: "/checkout", onClick: undefined },
    {
      label: user ? (user.role === "ADMIN" ? "Admin" : "Profile") : "Login",
      icon: User,
      href: user?.role === "ADMIN" ? "/admin" : user ? "/profile" : "#",
      onClick: (e: React.MouseEvent) => {
        if (!user) {
          e.preventDefault();
          openAuthModal();
        }
      },
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href && item.href !== "#";
        return (
          <Link
            key={item.label as string}
            href={item.href}
            onClick={item.onClick}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-primary" : "text-slate-400 hover:text-asphalt"
            }`}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
