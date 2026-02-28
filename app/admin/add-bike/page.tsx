"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";

export default function AddBikePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([""]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      deposit: formData.get("deposit"),
      range: formData.get("range"),
      topSpeed: formData.get("topSpeed"),
      description: formData.get("description"),
      chargeTime: formData.get("chargeTime"),
      images: images.filter((img) => img.trim() !== ""),
    };

    try {
      const res = await fetch("/api/bikes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to save bike");
      }

      router.push("/admin");
    } catch (err) {
      setError("An error occurred while saving the bike.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, ""]);
  };

  const removeImageField = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="flex items-center gap-4 mb-10">
        <Link
          href="/admin"
          className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-asphalt transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-asphalt">Add New Bike</h1>
          <p className="text-asphalt/60">
            Enter the specifications and images for the new electric motorcycle.
          </p>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl border border-asphalt/5 shadow-sm space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Bike Name
            </label>
            <input
              name="name"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary font-bold"
              placeholder="e.g. Volt-X Nairobi"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Full Price (KES)
            </label>
            <input
              name="price"
              type="number"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary font-bold"
              placeholder="100000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Deposit (KES)
            </label>
            <input
              name="deposit"
              type="number"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary font-bold"
              placeholder="10000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Range
            </label>
            <input
              name="range"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary font-bold"
              placeholder="e.g. 80km"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Top Speed
            </label>
            <input
              name="topSpeed"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary font-bold"
              placeholder="e.g. 60km/h"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Charge Time
            </label>
            <input
              name="chargeTime"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary font-bold"
              placeholder="e.g. 4 hrs"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary font-bold resize-none"
            placeholder="Details about this bike..."
          ></textarea>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Image URLs
            </label>
            <button
              type="button"
              onClick={addImageField}
              className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
            >
              <Plus size={16} /> Add Image
            </button>
          </div>
          {images.map((img, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                value={img}
                onChange={(e) => handleImageChange(idx, e.target.value)}
                required={idx === 0}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary font-bold"
                placeholder="https://..."
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(idx)}
                  className="p-3 text-red-500 bg-red-50 rounded-xl hover:bg-red-100"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="pt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-asphalt font-black py-4 rounded-xl hover:bg-primary/90 transition-all flex justify-center items-center h-14 text-lg shadow-lg shadow-primary/20"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                <Save size={20} /> Save Bike to Inventory
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
