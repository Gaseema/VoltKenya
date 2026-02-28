import React from "react";
import Link from "next/link";
import { Zap, CreditCard, ShoppingBag, Truck } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Simple Process
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-asphalt tracking-tight mb-6">
            How VoltKenya Works
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Getting your electric motorcycle has never been easier. Follow these
            simple steps to start riding today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Zap,
              title: "1. Choose Your Ride",
              desc: "Browse our catalog of electric bikes and select the perfect model for your needs.",
            },
            {
              icon: CreditCard,
              title: "2. Secure Financing",
              desc: "Select our Lipa Pole Pole financing option or pay upfront. Verify your ID in minutes.",
            },
            {
              icon: ShoppingBag,
              title: "3. Place Your Order",
              desc: "Pay your deposit via MPESA securely and confirm your delivery details.",
            },
            {
              icon: Truck,
              title: "4. Free Delivery",
              desc: "We deliver the bike straight to you fully charged and ready to go!",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-100 p-8 rounded-3xl relative overflow-hidden group hover:border-primary transition-colors"
            >
              <div className="size-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-slate-200">
                <step.icon className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-asphalt mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/catalog"
            className="inline-flex bg-primary text-asphalt font-black py-4 px-8 rounded-xl shadow-lg shadow-primary/20 hover:bg-emerald-400 transition-all"
          >
            Start Browsing Now
          </Link>
        </div>
      </main>
    </div>
  );
}
