"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Bike,
  CreditCard,
  Hash,
  Loader2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Transaction {
  id: string;
  amount: number;
  mpesaCode: string;
  nationalId: string;
  status: string;
  createdAt: string;
  user: { email: string };
  bike: { name: string; images: string };
}

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/admin/transactions");
      const data = await res.json();
      if (Array.isArray(data)) setTransactions(data);
    } catch (error) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/transactions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success(`Transaction marked as ${status}`);
        fetchTransactions();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <Link
            href="/admin"
            className="text-primary font-bold flex items-center gap-1 text-sm mb-2 hover:underline"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-asphalt">
            Transaction Management
          </h1>
          <p className="text-asphalt/60">
            Verify M-Pesa payments and approve orders
          </p>
        </div>
        <button
          onClick={fetchTransactions}
          className="p-3 rounded-xl border border-asphalt/5 hover:bg-asphalt/5 transition-colors"
        >
          <Clock size={20} className="text-asphalt/40" />
        </button>
      </header>

      {loading ? (
        <div className="p-20 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-primary mb-4" size={48} />
          <p className="text-asphalt/60 font-bold tracking-widest uppercase text-xs">
            Fetching Transactions...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {transactions.length === 0 ? (
            <div className="bg-white rounded-3xl p-20 border border-dashed border-asphalt/10 text-center">
              <CreditCard size={48} className="text-asphalt/10 mx-auto mb-4" />
              <p className="text-asphalt/40 font-bold">No transactions found</p>
            </div>
          ) : (
            transactions.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl border border-asphalt/5 shadow-sm p-6 flex flex-col lg:flex-row gap-8 items-start lg:items-center"
              >
                <div className="flex-1 space-y-4 w-full">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        t.status === "PENDING"
                          ? "bg-amber-100 text-amber-600"
                          : t.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {t.status}
                    </span>
                    <span className="text-[10px] text-asphalt/40 font-bold">
                      {new Date(t.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-asphalt/5 rounded-xl flex items-center justify-center text-asphalt/40">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-asphalt/40 font-bold uppercase tracking-wider">
                          Customer
                        </p>
                        <p className="text-sm font-bold text-asphalt">
                          {t.user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-asphalt/5 rounded-xl flex items-center justify-center text-asphalt/40">
                        <Bike size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-asphalt/40 font-bold uppercase tracking-wider">
                          Bike Ordered
                        </p>
                        <p className="text-sm font-bold text-asphalt">
                          {t.bike.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-asphalt/5 rounded-xl flex items-center justify-center text-asphalt/40">
                        <Hash size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-asphalt/40 font-bold uppercase tracking-wider">
                          National ID
                        </p>
                        <p className="text-sm font-bold text-asphalt">
                          {t.nationalId}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border-l-2 border-primary/20 pl-4 bg-primary/5 py-2 pr-4 rounded-r-xl">
                      <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-primary font-black uppercase tracking-wider">
                          M-Pesa Code
                        </p>
                        <p className="text-sm font-black text-asphalt tracking-widest">
                          {t.mpesaCode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 border-t lg:border-t-0 lg:border-l border-asphalt/5 pt-6 lg:pt-0 lg:pl-8">
                  <div className="text-right mr-4 hidden lg:block">
                    <p className="text-[10px] text-asphalt/40 font-bold uppercase tracking-wider">
                      Deposit
                    </p>
                    <p className="text-xl font-black text-asphalt">
                      KES {t.amount.toLocaleString()}
                    </p>
                  </div>

                  {t.status === "PENDING" && (
                    <div className="flex gap-2 w-full lg:w-auto">
                      <button
                        onClick={() => handleUpdateStatus(t.id, "COMPLETED")}
                        className="flex-1 lg:flex-none bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
                      >
                        <CheckCircle size={18} /> Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(t.id, "CANCELLED")}
                        className="flex-1 lg:flex-none bg-red-50 text-red-500 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                      >
                        <XCircle size={18} /> Reject
                      </button>
                    </div>
                  )}

                  {t.status !== "PENDING" && (
                    <div className="text-asphalt/40 italic text-sm font-medium pr-4">
                      Processed • {t.status}
                    </div>
                  )}

                  <Link
                    href={`/checkout/success?id=${t.id}`}
                    target="_blank"
                    className="p-3 bg-asphalt/5 rounded-xl text-asphalt/40 hover:text-primary transition-colors"
                  >
                    <ExternalLink size={20} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
