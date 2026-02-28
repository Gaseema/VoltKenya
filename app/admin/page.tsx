"use client";
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Bike,
  Users,
  Plus,
  Loader2,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

interface BikeData {
  id: string;
  name: string;
  price: number;
}

export default function AdminDashboard() {
  const [bikes, setBikes] = useState<BikeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bikes")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBikes(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-asphalt">Admin Dashboard</h1>
          <p className="text-asphalt/60">Manage your electric bike inventory</p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/admin/transactions"
            className="bg-asphalt text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <CreditCard size={20} className="text-primary" /> Transactions
          </Link>
          <Link
            href="/admin/add-bike"
            className="bg-primary text-asphalt px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Plus size={20} /> Add New Bike
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-asphalt/5 shadow-sm">
          <div className="bg-primary/10 text-primary size-12 rounded-xl flex items-center justify-center mb-4">
            <Bike size={24} />
          </div>
          <p className="text-asphalt/40 text-sm font-bold uppercase tracking-wider">
            Total Bikes
          </p>
          <p className="text-3xl font-black text-asphalt">
            {loading ? "-" : bikes.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-asphalt/5 shadow-sm">
          <div className="bg-purple-500/10 text-purple-500 size-12 rounded-xl flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <p className="text-asphalt/40 text-sm font-bold uppercase tracking-wider">
            Active Users
          </p>
          <p className="text-3xl font-black text-asphalt">1</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-asphalt/5 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-asphalt/5">
          <h2 className="text-xl font-bold text-asphalt">Live Inventory</h2>
        </div>
        {loading ? (
          <div className="p-20 flex justify-center">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-asphalt/5 text-asphalt/40 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Bike Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-asphalt/5">
              {bikes.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-10 text-slate-400 font-bold"
                  >
                    No bikes added yet.
                  </td>
                </tr>
              )}
              {bikes.map((bike) => (
                <tr
                  key={bike.id}
                  className="hover:bg-asphalt/5 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-asphalt text-sm">
                    {bike.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-asphalt/60">
                    KES {bike.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-500 font-bold text-sm hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
