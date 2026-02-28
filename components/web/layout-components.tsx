"use client";

import React from "react";
import Link from "next/link";
import { Bolt, Search, ShoppingBag, Menu, User } from "lucide-react";
import { useAuth } from "@/components/shared/AuthProvider";

import { useCart } from "@/components/shared/CartProvider";

export function Navbar() {
  const { user, openAuthModal, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-asphalt/10 px-6 lg:px-20 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary p-1.5 rounded-lg text-asphalt">
              <Bolt className="w-6 h-6 fill-current" />
            </div>
            <h2 className="text-asphalt text-xl font-black tracking-tight">
              VoltKenya
            </h2>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/catalog"
              className="text-asphalt/80 hover:text-primary text-sm font-semibold transition-colors"
            >
              Electric Bikes
            </Link>
            <Link
              href="/how-it-works"
              className="text-asphalt/80 hover:text-primary text-sm font-semibold transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/financing"
              className="text-asphalt/80 hover:text-primary text-sm font-semibold transition-colors"
            >
              Financing
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <Link
            href="/checkout"
            className="p-2 rounded-full bg-primary/10 text-asphalt hover:bg-primary/20 transition-colors relative"
          >
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-asphalt">
                {cart.length}
              </span>
            )}
          </Link>
          <Link
            href="/checkout"
            className="hidden sm:block bg-primary hover:bg-primary/90 text-asphalt px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm"
          >
            Apply for Credit
          </Link>
          <div className="flex gap-2">
            {!user ? (
              <button
                onClick={openAuthModal}
                className="size-10 rounded-full border-2 border-primary overflow-hidden flex items-center justify-center bg-asphalt text-primary"
              >
                <User className="size-5" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="text-xs font-bold bg-primary text-asphalt px-3 py-1.5 rounded-full hover:bg-primary/80"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="size-10 rounded-full border-2 border-red-500 overflow-hidden flex items-center justify-center bg-red-50 text-red-500"
                >
                  <User className="size-5" />
                </button>
              </div>
            )}
          </div>
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-asphalt text-white pt-20 pb-10 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-1.5 rounded-lg text-asphalt">
                <Bolt className="w-6 h-6 fill-current" />
              </div>
              <h2 className="text-white text-xl font-black tracking-tight">
                VoltKenya
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pioneering electric mobility in Kenya. Sustainable, affordable,
              and accessible for everyone.
            </p>
            <div className="flex gap-4">
              <div className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-asphalt transition-all cursor-pointer">
                <span className="text-sm font-bold">FB</span>
              </div>
              <div className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-asphalt transition-all cursor-pointer">
                <span className="text-sm font-bold">TW</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <Link
                  href="/catalog"
                  className="hover:text-primary transition-colors"
                >
                  Our Bikes
                </Link>
              </li>
              <li>
                <Link
                  href="/financing"
                  className="hover:text-primary transition-colors"
                >
                  Financing Plans
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Safety Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Refer a Friend
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Support</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Help Centre
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Find a Garage
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Battery Swap Points
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Stay Updated</h4>
            <p className="text-sm text-slate-400">
              Join 5,000+ riders receiving weekly tips.
            </p>
            <div className="flex">
              <input
                className="bg-white/5 border-none focus:ring-0 text-sm p-3 rounded-l-lg w-full"
                placeholder="Email address"
                type="email"
              />
              <button className="bg-primary text-asphalt px-4 rounded-r-lg">
                <Bolt className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© 2024 VoltKenya Mobility Ltd. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
