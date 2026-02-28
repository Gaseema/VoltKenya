import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getIsMobile } from "@/lib/device";
import prisma from "@/lib/db";
import { MotorcycleCard } from "@/components/shared/MotorcycleCard";
import {
  Battery,
  Zap,
  Truck,
  ArrowRight,
  MessageCircle,
  CreditCard,
  Bike as BikeIcon,
} from "lucide-react";
import * as motion from "framer-motion/client";

export default async function HomePage() {
  const isMobile = await getIsMobile();

  // Fetch from Prisma instead of mock
  const rawBikes = await prisma.bike.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const featuredBikes = rawBikes.map((b: any) => ({
    ...b,
    images: JSON.parse(b.images),
    image:
      JSON.parse(b.images)[0] || "https://picsum.photos/seed/default/500/500", // fallback
  }));

  if (isMobile) {
    return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[420px] -mx-4 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhngLJ_0ftKrpJeKpSMrVI7rg7qC9ABi9Pol4PPZ-rGjp-zIef3cFI6C6prp05IZ78zUnxtF9fz03881y2tb4SAJwzSDXVEzbEwWsGRBB12ltxxOLW92P0Qd3aNbrTnG_x56xEOtvWyXb9JG9abPwXxyPQW2aQ2a64QJfBDhiQvqemgh4BeLqUcPnIfGwBmlRIPrj1qsXcPIfJt_mGNefM1cHUGbGUCFC14IVjskhXOHClrDCB_fO1Yjof1g8bw0ZJ3YI1Fqdv06M"
            alt="Electric motorcycles in Nairobi"
            fill
            className="object-cover brightness-50"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10 flex flex-col gap-4 max-w-md">
            <span className="inline-block self-center px-3 py-1 bg-primary text-asphalt text-xs font-bold rounded-full uppercase tracking-wider">
              Electric Revolution
            </span>
            <h1 className="text-white text-4xl font-black leading-tight tracking-tight">
              No License? No Problem. Ride Electric Today.
            </h1>
            <p className="text-slate-200 text-sm font-medium">
              Experience the future of Nairobi transport with our sleek,
              eco-friendly electric bikes. Starting at just 10% deposit.
            </p>
            <div className="flex flex-col gap-3 w-full mt-4">
              <Link
                href="/catalog"
                className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-asphalt text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                View Catalog
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-8 bg-white -mx-4 px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-asphalt">
              How It Works
            </h2>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
                <Zap size={24} />
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-bold text-asphalt">
                  1. Choose Your Bike
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Browse our collection of premium electric motorcycles.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
                <Battery size={24} />
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-bold text-asphalt">
                  2. Pay 10% Deposit
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Unlock ownership with our 'Lipa Pole Pole' plan.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
                <Truck size={24} />
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-bold text-asphalt">
                  3. We Deliver
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Receive your bike within 24 hours at your doorstep.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Bikes */}
        <section className="py-8 bg-slate-50 -mx-4 px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-asphalt">
              Featured Bikes
            </h2>
            <Link
              href="/catalog"
              className="text-primary text-sm font-bold flex items-center gap-1"
            >
              See All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {featuredBikes.map((bike: any) => (
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
                  {bike.tag && (
                    <span className="absolute top-3 left-3 bg-primary text-asphalt text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                      {bike.tag}
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-asphalt">
                      {bike.name}
                    </h3>
                    <p className="text-slate-500 text-xs">
                      {bike.range} Range | {bike.topSpeed} Max
                    </p>
                  </div>
                  <div className="bg-asphalt/5 border border-asphalt/10 rounded-xl p-3 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                        Lipa Pole Pole
                      </p>
                      <p className="text-lg font-black text-primary">
                        KES {bike.deposit.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/product/${bike.id}`}
                      className="bg-primary text-asphalt px-4 py-2 rounded-lg font-bold text-sm"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chat Bubble */}
        <button className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-asphalt shadow-xl shadow-primary/40">
          <MessageCircle size={28} />
        </button>
      </div>
    );
  }

  // Web Layout
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[650px] w-full flex items-center justify-center px-6 lg:px-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover brightness-[0.4]"
              src="https://picsum.photos/seed/hero/1920/1080"
              alt="Hero"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto w-full text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Lipa Pole Pole Available
              </div>
              <h1 className="text-white text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                No License? No Problem.{" "}
                <span className="text-primary">Ride Electric Today.</span>
              </h1>
              <p className="text-slate-300 text-lg lg:text-xl font-medium max-w-xl">
                Experience the future of mobility with Lipa Pole Pole financing.
                Own an electric bike for as low as 10% deposit. Zero emissions,
                zero license required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Link
                  href="/catalog"
                  className="bg-primary hover:bg-primary/90 text-asphalt px-10 py-4 rounded-xl text-lg font-bold transition-all text-center"
                >
                  View Catalog
                </Link>
                <Link
                  href="/financing"
                  className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 px-10 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center"
                >
                  Calculate Monthly Pay
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto py-24 px-6 lg:px-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-asphalt text-4xl font-black">How It Works</h2>
            <p className="text-asphalt/60 font-medium">
              Get on the road in 3 easy steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-10 rounded-3xl border border-asphalt/5 hover:border-primary/50 transition-all shadow-sm">
              <div className="bg-primary/10 text-primary size-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-asphalt transition-colors">
                <BikeIcon className="w-8 h-8" />
              </div>
              <h3 className="text-asphalt text-2xl font-bold mb-4">
                1. Choose Bike
              </h3>
              <p className="text-asphalt/60 leading-relaxed">
                Browse our collection of city-smart electric bikes designed for
                the streets of Nairobi.
              </p>
            </div>
            <div className="group bg-white p-10 rounded-3xl border border-asphalt/5 hover:border-primary/50 transition-all shadow-sm">
              <div className="bg-primary/10 text-primary size-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-asphalt transition-colors">
                <CreditCard className="w-8 h-8" />
              </div>
              <h3 className="text-asphalt text-2xl font-bold mb-4">
                2. Pay 10% Deposit
              </h3>
              <p className="text-asphalt/60 leading-relaxed">
                Secure your ride with a small commitment fee. No complicated
                bank approvals needed.
              </p>
            </div>
            <div className="group bg-white p-10 rounded-3xl border border-asphalt/5 hover:border-primary/50 transition-all shadow-sm">
              <div className="bg-primary/10 text-primary size-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-asphalt transition-colors">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-asphalt text-2xl font-bold mb-4">
                3. We Deliver
              </h3>
              <p className="text-asphalt/60 leading-relaxed">
                We bring your new bike right to your doorstep, fully charged and
                ready for your first trip.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Bikes */}
        <section className="bg-asphalt/5 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            <div className="flex items-end justify-between mb-16">
              <div className="space-y-4">
                <h2 className="text-asphalt text-4xl font-black">
                  Featured Electric Bikes
                </h2>
                <p className="text-asphalt/60 font-medium italic">
                  Available for immediate delivery in Nairobi
                </p>
              </div>
              <Link
                href="/catalog"
                className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                Browse All Models <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBikes.map((bike: any) => (
                <MotorcycleCard key={bike.id} bike={bike} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Chat Bubble */}
      <button className="fixed bottom-8 right-8 bg-primary text-asphalt size-14 rounded-full shadow-2xl flex items-center justify-center z-[100] hover:scale-110 active:scale-95 transition-all">
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-white"></span>
        </span>
      </button>
    </div>
  );
}
