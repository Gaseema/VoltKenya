"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/shared/AuthProvider";
import { useCart } from "@/components/shared/CartProvider";
import {
  ArrowLeft,
  MapPin,
  BadgeCheck,
  ShieldCheck,
  ArrowRight,
  ShoppingCart,
  ChevronRight,
  CreditCard,
  Lock,
  Headphones,
  X,
  FileText,
} from "lucide-react";

export default function CheckoutPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"details" | "verify">(
    "details",
  );
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [nationalId, setNationalId] = useState("");
  const [paybill, setPaybill] = useState("");
  const [account, setAccount] = useState("");
  const [mpesaCode, setMpesaCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cart, clearCart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Client-side mobile detection
    setIsMobile(window.innerWidth < 1024);

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleConfirmDetails = () => {
    if (!nationalId) {
      toast.error("Please enter your National ID number");
      return;
    }
    if (paybill.length !== 6) {
      toast.error("Paybill number must be exactly 6 digits");
      return;
    }
    if (!account) {
      toast.error("Please enter your Account number");
      return;
    }
    setPaymentStep("verify");
  };

  const handleVerifyTransaction = async () => {
    if (!mpesaCode || mpesaCode.length < 8) {
      toast.error("Please enter a valid M-Pesa transaction code");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bikeId: cart[0].id,
          amount: cart[0].deposit,
          nationalId,
          mpesaCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Transaction submitted for verification!");
      clearCart();
      router.push(`/checkout/success?id=${data.id}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <div className="p-20 text-center font-bold">Loading...</div>;

  if (cart.length === 0) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingCart size={48} className="text-slate-300" />
        <h2 className="text-xl font-bold text-asphalt">Your cart is empty</h2>
        <Link
          href="/catalog"
          className="text-primary font-bold hover:underline"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const bike = cart[0];

  if (isMobile) {
    return (
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 -mx-4 px-4 py-2 border-b border-slate-100">
          <Link
            href="/catalog"
            className="text-asphalt font-bold flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Checkout
          </Link>
          <div className="flex h-1.5 w-16 gap-1">
            <div className="h-full flex-1 rounded-full bg-primary"></div>
            <div className="h-full flex-1 rounded-full bg-slate-200"></div>
          </div>
        </div>

        <main className="space-y-8 py-4">
          {/* Summary */}
          <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="flex gap-4">
              <div className="relative size-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={bike.image}
                  alt={bike.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-asphalt">{bike.name}</h3>
                <p className="text-xs text-slate-500">
                  Lipa Pole Pole financing
                </p>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between items-center bg-primary/5 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">
                      Deposit
                    </p>
                    <p className="font-black text-asphalt">
                      KES {bike.deposit.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center px-3 py-1">
                    <p className="text-[10px] text-slate-400 font-bold">
                      Monthly
                    </p>
                    <p className="text-xs font-bold text-asphalt">KES 8,500</p>
                  </div>
                  <div className="flex justify-between items-center px-3 py-1">
                    <p className="text-[10px] text-slate-400 font-bold">
                      Duration
                    </p>
                    <p className="text-xs font-bold text-asphalt">24 Months</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Identity */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-full bg-primary flex items-center justify-center font-black text-asphalt text-xs">
                1
              </span>
              <h3 className="text-lg font-black text-asphalt">
                Identity Verification
              </h3>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-asphalt/40 uppercase font-black tracking-widest">
                  National ID Number
                </label>
                <input
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors font-bold mb-3 text-asphalt"
                  placeholder="12345678"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {idFront ? (
                      <div className="flex-1 flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText
                            size={18}
                            className="text-emerald-500 shrink-0"
                          />
                          <span className="text-xs font-bold text-emerald-700 truncate">
                            {idFront.name}
                          </span>
                        </div>
                        <button
                          onClick={() => setIdFront(null)}
                          className="p-1 hover:bg-emerald-100 rounded-full transition-colors"
                        >
                          <X size={14} className="text-emerald-500" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex-1 flex items-center gap-3 border-2 border-dashed border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            setIdFront(e.target.files?.[0] || null)
                          }
                        />
                        <div className="size-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300 shrink-0">
                          <CreditCard size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          Upload ID Front
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {idBack ? (
                      <div className="flex-1 flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText
                            size={18}
                            className="text-emerald-500 shrink-0"
                          />
                          <span className="text-xs font-bold text-emerald-700 truncate">
                            {idBack.name}
                          </span>
                        </div>
                        <button
                          onClick={() => setIdBack(null)}
                          className="p-1 hover:bg-emerald-100 rounded-full transition-colors"
                        >
                          <X size={14} className="text-emerald-500" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex-1 flex items-center gap-3 border-2 border-dashed border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            setIdBack(e.target.files?.[0] || null)
                          }
                        />
                        <div className="size-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300 shrink-0">
                          <CreditCard size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          Upload ID Back
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="space-y-3 pb-32">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-full bg-primary flex items-center justify-center font-black text-asphalt text-xs">
                2
              </span>
              <h3 className="text-lg font-black text-asphalt">
                Payment Method
              </h3>
            </div>
            <div className="bg-white rounded-2xl border-2 border-primary p-5 shadow-lg relative overflow-hidden">
              <div className="absolute -right-4 -top-4 size-24 bg-primary/10 rounded-full"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="size-10 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-white text-[10px]">
                  M-PESA
                </div>
                <div>
                  <p className="font-bold text-asphalt">M-Pesa Express</p>
                  <p className="text-[10px] text-slate-500">
                    STK Push to your phone
                  </p>
                </div>
              </div>
              <div className="space-y-3 relative z-10">
                {paymentStep === "details" ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] text-asphalt/40 uppercase font-black tracking-widest">
                        Paybill Number
                      </label>
                      <input
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors font-bold text-asphalt"
                        placeholder="123456"
                        maxLength={6}
                        value={paybill}
                        onChange={(e) =>
                          setPaybill(e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-asphalt/40 uppercase font-black tracking-widest">
                        Account Number
                      </label>
                      <input
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors font-bold text-asphalt"
                        placeholder="VOLT-1234"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] text-asphalt/40 uppercase font-black tracking-widest">
                        M-Pesa Transaction Code
                      </label>
                      <input
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors font-bold uppercase text-asphalt"
                        placeholder="QK81YTZ..."
                        value={mpesaCode}
                        onChange={(e) =>
                          setMpesaCode(e.target.value.toUpperCase())
                        }
                      />
                    </div>
                    <button
                      onClick={() => setPaymentStep("details")}
                      className="text-xs text-slate-500 font-bold hover:text-primary transition-colors"
                    >
                      ← Back to details
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>

        <div className="fixed bottom-20 left-0 right-0 p-4 pb-6 bg-white/90 backdrop-blur-lg border-t border-slate-100 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          {paymentStep === "details" ? (
            <button
              onClick={handleConfirmDetails}
              className="w-full bg-primary text-asphalt font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              Confirm Payment <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleVerifyTransaction}
              disabled={isSubmitting}
              className="w-full bg-asphalt text-emerald-400 font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Verifying..." : "Verify Transaction"}{" "}
              <ShieldCheck size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Web Layout
  return (
    <div className="min-h-screen flex flex-col">
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-asphalt tracking-tight mb-2">
              Checkout & Financing
            </h1>
            <p className="text-asphalt/60 text-lg">
              Complete your purchase with secure M-Pesa payments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-primary rounded-full"></div>
            </div>
            <span className="text-[10px] font-black text-asphalt/40 uppercase tracking-widest">
              Step 1 of 2
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <span className="size-10 rounded-full bg-primary flex items-center justify-center font-black text-asphalt">
                  1
                </span>
                <h2 className="text-2xl font-black text-asphalt">
                  Identity Verification
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs text-asphalt/40 uppercase font-black tracking-wider">
                    National ID Number
                  </label>
                  <input
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary font-bold text-asphalt"
                    placeholder="12345678"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs text-asphalt/40 uppercase font-black tracking-wider block">
                    Upload ID Documents
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {idFront ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText
                            size={18}
                            className="text-emerald-500 shrink-0"
                          />
                          <span className="text-xs font-bold text-emerald-700 truncate">
                            {idFront.name}
                          </span>
                        </div>
                        <button
                          onClick={() => setIdFront(null)}
                          className="p-1 hover:bg-emerald-100 rounded-full transition-colors"
                        >
                          <X size={14} className="text-emerald-500" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center gap-3 border-2 border-dashed border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            setIdFront(e.target.files?.[0] || null)
                          }
                        />
                        <div className="size-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300 shrink-0">
                          <CreditCard size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          Upload ID Front
                        </span>
                      </label>
                    )}

                    {idBack ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText
                            size={18}
                            className="text-emerald-500 shrink-0"
                          />
                          <span className="text-xs font-bold text-emerald-700 truncate">
                            {idBack.name}
                          </span>
                        </div>
                        <button
                          onClick={() => setIdBack(null)}
                          className="p-1 hover:bg-emerald-100 rounded-full transition-colors"
                        >
                          <X size={14} className="text-emerald-500" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center gap-3 border-2 border-dashed border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            setIdBack(e.target.files?.[0] || null)
                          }
                        />
                        <div className="size-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300 shrink-0">
                          <CreditCard size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          Upload ID Back
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <span className="size-10 rounded-full bg-primary flex items-center justify-center font-black text-asphalt">
                  2
                </span>
                <h2 className="text-2xl font-black text-asphalt">
                  Order Summary
                </h2>
              </div>
              <div className="flex items-center gap-6 p-6 border border-slate-100 rounded-2xl">
                <div className="size-24 relative rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={bike.image}
                    alt={bike.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-asphalt">
                    {bike.name}
                  </h3>
                  <p className="text-slate-500">Lipa Pole Pole • 12 Months</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                    Total Price
                  </p>
                  <p className="text-2xl font-black text-asphalt">
                    KES {bike.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-asphalt text-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-lg font-black mb-8 flex items-center gap-3">
                <CreditCard size={20} className="text-primary" /> Finance
                Summary
              </h3>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-5">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Required Deposit
                  </span>
                  <span className="text-2xl font-black text-primary">
                    KES {bike.deposit.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Monthly Installment</span>
                    <span className="font-bold">KES 8,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Duration</span>
                    <span className="font-bold">24 Months</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 text-asphalt mb-8">
                <p className="text-xs font-bold text-emerald-600 mb-4 flex items-center gap-2">
                  <Lock size={14} /> M-Pesa Express
                </p>
                {paymentStep === "details" ? (
                  <>
                    <div className="space-y-3 mb-4">
                      <div>
                        <label className="text-xs text-slate-500 uppercase font-bold">
                          Paybill Number
                        </label>
                        <input
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-lg outline-none focus:border-primary"
                          placeholder="123456"
                          maxLength={6}
                          value={paybill}
                          onChange={(e) =>
                            setPaybill(e.target.value.replace(/\D/g, ""))
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 uppercase font-bold">
                          Account Number
                        </label>
                        <input
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-lg outline-none focus:border-primary"
                          placeholder="VOLT-1234"
                          value={account}
                          onChange={(e) => setAccount(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleConfirmDetails}
                      className="w-full bg-primary text-asphalt font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all"
                    >
                      Confirm Payment <ArrowRight size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      <div>
                        <label className="text-xs text-slate-500 uppercase font-bold">
                          Transaction Code
                        </label>
                        <input
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-lg outline-none focus:border-primary uppercase"
                          placeholder="QK81YTZ..."
                          value={mpesaCode}
                          onChange={(e) =>
                            setMpesaCode(e.target.value.toUpperCase())
                          }
                        />
                      </div>
                      <button
                        onClick={() => setPaymentStep("details")}
                        className="text-xs text-slate-500 font-bold hover:text-primary transition-colors"
                      >
                        ← Back to details
                      </button>
                    </div>
                    <button
                      onClick={handleVerifyTransaction}
                      disabled={isSubmitting}
                      className="w-full bg-asphalt text-emerald-400 font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? "Verifying..." : "Verify Transaction"}{" "}
                      <ShieldCheck size={20} />
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest justify-center">
                <ShieldCheck size={14} /> Secure Transaction
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
