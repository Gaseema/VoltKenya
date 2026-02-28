import React from "react";
import Link from "next/link";
import { Battery, Zap, ArrowRight } from "lucide-react";
import * as motion from "framer-motion/client";
import { Bike } from "@/lib/data";

export function MotorcycleCard({ bike }: { bike: Bike }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl overflow-hidden shadow-xl border border-asphalt/5 flex flex-col h-full"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          src={bike.image}
          alt={bike.name}
        />
        {bike.tag && (
          <div
            className={`absolute top-4 left-4 ${bike.tagColor || "bg-primary"} text-asphalt px-3 py-1 rounded-full text-xs font-black uppercase`}
          >
            {bike.tag}
          </div>
        )}
      </div>
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-asphalt text-2xl font-black mb-2">{bike.name}</h4>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Battery className="text-primary w-4 h-4" />
              <span className="text-xs font-semibold text-asphalt/60">
                {bike.range} Range
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="text-primary w-4 h-4" />
              <span className="text-xs font-semibold text-asphalt/60">
                {bike.topSpeed} Max
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-asphalt/5 p-4 rounded-2xl border border-asphalt/10">
            <div>
              <p className="text-[10px] uppercase font-bold text-asphalt/40 tracking-wider">
                Full Price
              </p>
              <p className="text-xl font-black text-asphalt">
                KES {bike.price.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-primary tracking-wider">
                Deposit
              </p>
              <p className="text-xl font-black text-primary">
                KES {bike.deposit.toLocaleString()}
              </p>
            </div>
          </div>
          <Link
            href={`/product/${bike.id}`}
            className="block w-full bg-asphalt text-white py-4 rounded-2xl font-bold text-center hover:opacity-90 transition-opacity"
          >
            Apply for Lipa Pole Pole
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
