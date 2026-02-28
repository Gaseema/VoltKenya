import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getIsMobile } from "@/lib/device";
import prisma from "@/lib/db";
import { MotorcycleCard } from "@/components/shared/MotorcycleCard";
import {
  Battery,
  Zap,
  ChevronRight,
  ChevronLeft,
  Search,
  Palette,
  CreditCard,
  Heart,
  MessageCircle,
  MapPin,
} from "lucide-react";
import * as motion from "framer-motion/client";

export default async function CatalogPage() {
  const isMobile = await getIsMobile();

  const rawBikes = await prisma.bike.findMany({
    orderBy: { createdAt: "desc" },
  });

  const bikes = rawBikes.map((b: any) => ({
    ...b,
    images: JSON.parse(b.images),
    image:
      JSON.parse(b.images)[0] || "https://picsum.photos/seed/default/500/500",
  }));

  if (isMobile) {
    return (
      <div className="flex flex-col">
        {/* Filter Bar */}
        <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar bg-white border-b border-primary/10 -mx-4 sticky top-0 z-40">
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-background-light px-4 border border-primary/20">
            <span className="text-sm font-semibold">Range</span>
          </button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-background-light px-4 border border-primary/20">
            <span className="text-sm font-semibold">Type</span>
          </button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-background-light px-4 border border-primary/20">
            <span className="text-sm font-semibold">NTSA License</span>
          </button>
        </div>

        <main className="py-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-asphalt">
              Lipa Pole Pole Models
            </h2>
            <p className="text-sm text-slate-500">
              Available for instant delivery in Nairobi
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {bikes.map((bike: any) => (
              <div
                key={bike.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200"
              >
                <div className="relative h-52 bg-slate-200">
                  <Image
                    src={bike.image}
                    alt={bike.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                      bike.licenseRequired
                        ? "bg-asphalt text-white"
                        : "bg-primary text-asphalt"
                    }`}
                  >
                    {bike.licenseRequired
                      ? "License Required"
                      : "No License Required"}
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-asphalt">
                      {bike.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Battery size={14} className="text-primary" />{" "}
                        {bike.range}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Zap size={14} className="text-primary" />{" "}
                        {bike.topSpeed}
                      </span>
                    </div>
                  </div>
                  <div className="bg-asphalt/5 border border-asphalt/10 rounded-xl p-3 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                        Deposit from
                      </p>
                      <p className="text-lg font-black text-primary">
                        KES {bike.deposit.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/product/${bike.id}`}
                      className="bg-primary text-asphalt px-4 py-2 rounded-lg font-bold text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Web Layout
  return (
    <div className="min-h-screen flex flex-col">
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-8 w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-asphalt font-medium">Electric Motorcycles</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-2">
            Electric Motorcycle Catalog
          </h1>
          <p className="text-slate-600 max-w-2xl text-lg">
            Sustainable mobility with flexible{" "}
            <span className="text-primary font-bold">'Lipa Pole Pole'</span>{" "}
            financing plans for every Kenyan.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
                  Filters
                </h3>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-asphalt">
                      <Battery className="text-primary w-5 h-5" /> Range (km)
                    </label>
                    <input
                      className="w-full accent-primary"
                      type="range"
                      min="40"
                      max="200"
                      defaultValue="120"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-asphalt">
                      <Zap className="text-primary w-5 h-5" /> Top Speed
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm cursor-pointer text-asphalt/70 italic hover:text-asphalt">
                        <input
                          className="rounded border-slate-300 text-primary focus:ring-primary"
                          type="checkbox"
                        />
                        <span>City (45-60 km/h)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bikes.map((bike: any) => (
                <MotorcycleCard key={bike.id} bike={bike} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
