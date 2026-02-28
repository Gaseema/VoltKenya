import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getIsMobile } from "@/lib/device";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  ChevronRight,
  Phone,
  MessageSquare,
  Bolt,
  FileText,
  Download,
  Loader2,
  AlertCircle,
} from "lucide-react";
import * as motion from "framer-motion/client";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const isMobile = await getIsMobile();
  const { id: transactionId } = await searchParams;

  if (!transactionId) {
    redirect("/catalog");
  }

  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
    include: { bike: true },
  });

  if (!transaction) {
    redirect("/catalog");
  }

  const bike = transaction.bike;
  const isPending = transaction.status === "PENDING";

  if (isMobile) {
    return (
      <div className="flex flex-col">
        {/* Success Header */}
        <div className="flex flex-col items-center py-10 text-center space-y-4">
          <div
            className={`size-20 ${isPending ? "bg-amber-100 text-amber-500" : "bg-primary/20 text-primary"} rounded-full flex items-center justify-center`}
          >
            {isPending ? (
              <Loader2 size={40} className="animate-spin" />
            ) : (
              <CheckCircle2 size={40} />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-black text-asphalt">
              {isPending ? "Verifying Payment..." : "Order Confirmed!"}
            </h1>
            <p className="text-slate-500 text-sm italic">
              {isPending
                ? "We are confirming your M-Pesa transaction"
                : `Deposit of KES ${transaction.amount.toLocaleString()} received`}
            </p>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-8 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-asphalt">Payment Status</h3>
            <span
              className={`text-[10px] ${isPending ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"} px-2 py-1 rounded-full font-bold uppercase`}
            >
              {transaction.status}
            </span>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`size-8 ${isPending ? "bg-slate-100 text-slate-400" : "bg-primary text-asphalt"} rounded-full flex items-center justify-center shadow-sm`}
                >
                  {isPending ? <AlertCircle size={16} /> : <Bolt size={16} />}
                </div>
                {!isPending && <div className="w-0.5 h-8 bg-slate-100"></div>}
              </div>
              <div>
                <p className="font-bold text-asphalt text-sm">
                  {isPending ? "Confirming Code" : "Payment Verified"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {isPending ? "Code: " + transaction.mpesaCode : "Just now"}
                </p>
              </div>
            </div>
            {!isPending && (
              <div className="flex gap-4 opacity-40">
                <div className="size-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <Package size={16} />
                </div>
                <div>
                  <p className="font-bold text-asphalt text-sm">Assembling</p>
                  <p className="text-[10px] text-slate-400">
                    Scheduled: Within 24 Hours
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 pb-8">
          {!isPending && (
            <button className="w-full bg-asphalt text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
              <FileText size={18} /> View Agreement
            </button>
          )}
          <Link
            href={isPending ? `/checkout/success?id=${transactionId}` : "/"}
            className="w-full bg-primary/10 text-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            {isPending ? "Refresh Status" : "Back to Showroom"}
          </Link>
        </div>
      </div>
    );
  }

  // Web Layout
  return (
    <div className="min-h-screen flex flex-col">
      <main className="max-w-5xl mx-auto px-6 lg:px-20 py-16 w-full text-center">
        <div
          className={`size-24 ${isPending ? "bg-amber-100 text-amber-500" : "bg-primary/20 text-primary"} rounded-full flex items-center justify-center mx-auto mb-8`}
        >
          {isPending ? (
            <Loader2 size={48} className="animate-spin" />
          ) : (
            <CheckCircle2 size={48} />
          )}
        </div>
        <h1 className="text-5xl font-black text-asphalt tracking-tight mb-4">
          {isPending ? "Hold on, we're verifying..." : "You're all set!"}
        </h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-16 italic">
          {isPending
            ? "Our team is verifying your M-Pesa code " +
              transaction.mpesaCode +
              ". This usually takes a few minutes."
            : `Your ${bike.name} is being prepared. We've sent the Lipa Pole Pole agreement to your email.`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl">
            <h3 className="text-2xl font-black text-asphalt mb-8">
              Order Status
            </h3>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div
                  className={`size-12 rounded-2xl ${isPending ? "bg-amber-500" : "bg-emerald-500"} text-white flex items-center justify-center shrink-0`}
                >
                  {isPending ? <AlertCircle size={24} /> : <Bolt size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-asphalt">
                    {isPending ? "Payment Pending" : "Payment Confirmed"}
                  </h4>
                  <p className="text-slate-500">
                    {isPending
                      ? "M-Pesa transaction code submitted and awaiting admin approval."
                      : "Your deposit has been successfully verified."}
                  </p>
                </div>
              </div>
              <div className={`flex gap-6 ${isPending ? "opacity-30" : ""}`}>
                <div className="size-12 rounded-2xl bg-asphalt text-white flex items-center justify-center shrink-0">
                  <Package size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-asphalt">
                    Safety Inspection
                  </h4>
                  <p className="text-slate-500">
                    We'll perform a 24-point safety check once payment is
                    verified.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-asphalt text-white rounded-3xl p-8 shadow-lg">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">
                Order Reference
              </p>
              <p className="text-2xl font-black text-primary mb-6">
                #VK-{transaction.id.slice(-6).toUpperCase()}
              </p>
              <div className="flex gap-4">
                <button
                  disabled={isPending}
                  className="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-30"
                >
                  <Download size={18} /> Receipt
                </button>
                <button
                  disabled={isPending}
                  className="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-30"
                >
                  <FileText size={18} /> Contract
                </button>
              </div>
            </div>
            <Link
              href={isPending ? `/checkout/success?id=${transactionId}` : "/"}
              className="w-full bg-primary text-asphalt py-5 rounded-3xl font-black flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
            >
              {isPending ? "Refresh Status" : "Back to Showroom"}{" "}
              <ChevronRight size={24} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
