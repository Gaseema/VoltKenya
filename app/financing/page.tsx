import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, TrendingUp } from "lucide-react";

export default function FinancingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              Lipa Pole Pole
            </span>
            <h1 className="text-4xl lg:text-5xl font-black text-asphalt tracking-tight mb-6">
              Flexible Financing for Everyone.
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              Don't let upfront costs stop you from transitioning to electric
              mobility. Our Lipa Pole Pole financing plans allow you to pay a
              small deposit and manage the rest through affordable daily,
              weekly, or monthly installments.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Low initial deposit starting from KES 15,000",
                "Flexible payment periods (3, 6, 9, or 12 months)",
                "Zero hidden fees",
                "Instant approval with National ID",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-asphalt font-semibold"
                >
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/catalog"
              className="inline-flex bg-asphalt text-white font-black py-4 px-8 rounded-xl shadow-lg hover:bg-slate-800 transition-all"
            >
              Find Your Bike
            </Link>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-0"></div>
              <h3 className="text-2xl font-black text-asphalt mb-2 relative z-10">
                Standard Plan
              </h3>
              <p className="text-slate-500 mb-6 text-sm relative z-10">
                Most popular for bodaboda riders
              </p>

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Deposit</span>
                  <span className="font-bold text-asphalt">KES 15,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">
                    Daily Installment
                  </span>
                  <span className="font-bold text-asphalt">KES 500</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Duration</span>
                  <span className="font-bold text-asphalt">12 Months</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100">
              <TrendingUp className="shrink-0" />
              <p className="text-sm font-semibold text-emerald-800">
                You save up to <span className="font-black">KES 10,000</span>{" "}
                compared to traditional petrol bikes over a 12 month period!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
