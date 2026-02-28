import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/shared/AddToCartButton";
import { getIsMobile } from "@/lib/device";
import prisma from "@/lib/db";
import {
  ChevronRight,
  Zap,
  Battery,
  Clock,
  Weight,
  ShieldCheck,
  ShoppingCart,
  ArrowLeft,
  ShoppingBag,
  Heart,
  Truck,
  Leaf,
  Power,
  Mountain,
  CreditCard,
} from "lucide-react";
import * as motion from "framer-motion/client";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const isMobile = await getIsMobile();

  const rawBike = await prisma.bike.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!rawBike) {
    return (
      <div className="p-20 text-center font-bold text-xl">Bike not found.</div>
    );
  }

  const bike = {
    ...rawBike,
    images: JSON.parse(rawBike.images),
    image:
      JSON.parse(rawBike.images)[0] ||
      "https://picsum.photos/seed/default/500/500",
  };

  if (isMobile) {
    return (
      <div className="flex flex-col">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-4 -mx-4 px-4 py-2 border-b border-slate-100">
          <Link
            href="/catalog"
            className="flex items-center gap-2 text-asphalt font-bold"
          >
            <ArrowLeft size={20} /> Back
          </Link>
          <h2 className="text-base font-bold text-asphalt">{bike.name}</h2>
          <div className="w-10"></div>
        </div>

        {/* Gallery */}
        <div className="relative aspect-square -mx-4 bg-slate-100 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
          {bike.images.map((img: string, idx: number) => (
            <div
              key={idx}
              className="relative w-full flex-none snap-center aspect-square"
            >
              <Image
                src={img}
                alt={`${bike.name} - Image ${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
          {/* Snap indicators could go here */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {bike.images.map((_: any, idx: number) => (
              <div
                key={idx}
                className="w-2 h-2 rounded-full bg-white/70 shadow-sm"
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="py-6 space-y-6">
          <div>
            <span className="inline-block px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-2">
              {bike.tag}
            </span>
            <h1 className="text-2xl font-black text-asphalt leading-tight">
              {bike.name}
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Zap className="text-primary mb-1" size={20} />
              <p className="text-[10px] text-slate-500 uppercase font-bold">
                Max Speed
              </p>
              <p className="font-bold text-sm text-asphalt">{bike.topSpeed}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Battery className="text-primary mb-1" size={20} />
              <p className="text-[10px] text-slate-500 uppercase font-bold">
                Range
              </p>
              <p className="font-bold text-sm text-asphalt">{bike.range}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Clock className="text-primary mb-1" size={20} />
              <p className="text-[10px] text-slate-500 uppercase font-bold">
                Charge
              </p>
              <p className="font-bold text-sm text-asphalt">4 Hrs</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
              Lipa Pole Pole Deposit
            </p>
            <p className="text-3xl font-black text-primary mb-4">
              KES {bike.deposit.toLocaleString()}
            </p>

            <div className="space-y-3">
              <div className="flex justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-500">6 Months Period</span>
                <span className="font-bold text-asphalt">KES 520 / day</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-500">9 Months Period</span>
                <span className="font-bold text-asphalt">KES 350 / day</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <AddToCartButton bike={bike as any} />
          </div>
        </div>
      </div>
    );
  }

  // Web Layout
  return (
    <div className="min-h-screen flex flex-col">
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-8 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/catalog" className="hover:text-primary">
            Catalog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-asphalt font-medium">{bike.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="space-y-4">
              <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 hide-scrollbar">
                {bike.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative w-full flex-none snap-center aspect-video rounded-3xl overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={img}
                      alt={`${bike.name} - Image ${idx + 1}`}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-black text-asphalt mb-6">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { icon: Zap, label: "Top Speed", value: bike.topSpeed },
                  { icon: Battery, label: "Range", value: bike.range },
                  { icon: Clock, label: "Charge Time", value: "4-5 Hours" },
                  { icon: Weight, label: "Load Cap", value: "200 kg" },
                  { icon: ShieldCheck, label: "Warranty", value: "2 Years" },
                  { icon: Mountain, label: "Terrain", value: "All Terrain" },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                  >
                    <spec.icon className="text-primary w-6 h-6 mb-3" />
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      {spec.label}
                    </p>
                    <p className="text-lg font-bold text-asphalt">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                  In Stock
                </span>
                <h1 className="text-4xl lg:text-5xl font-black text-asphalt tracking-tight mb-4">
                  {bike.name}
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed italic">
                  Kenya's favorite electric motorcycle, now available with Lipa
                  Pole Pole.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-4xl font-black text-asphalt">
                    KES {bike.price.toLocaleString()}
                  </span>
                  <span className="text-slate-400 line-through">
                    KES {(bike.price * 1.1).toLocaleString()}
                  </span>
                </div>

                <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6 mb-8">
                  <p className="text-sm font-bold text-asphalt mb-4 flex items-center gap-2">
                    <CreditCard className="text-primary w-5 h-5" /> Lipa Pole
                    Pole Financing
                  </p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-500 text-sm">
                      Initial Deposit
                    </span>
                    <span className="text-2xl font-black text-primary">
                      KES {bike.deposit.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[3, 6, 9].map((m) => (
                      <div
                        key={m}
                        className="p-3 rounded-xl bg-white border border-slate-100 text-center"
                      >
                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">
                          {m} Months
                        </p>
                        <p className="text-sm font-black text-asphalt">
                          KES {m === 3 ? "1.2k" : m === 6 ? "700" : "500"}/d
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <AddToCartButton
                  bike={bike as any}
                  className="w-full bg-asphalt text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg"
                >
                  <ShoppingCart size={24} /> Confirm Order
                </AddToCartButton>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Truck className="text-primary w-5 h-5" />
                  <span className="text-xs font-bold text-asphalt">
                    Free Delivery
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-primary w-5 h-5" />
                  <span className="text-xs font-bold text-asphalt">
                    2 Year Warranty
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
