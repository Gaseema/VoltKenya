"use client";
import { useState } from "react";
import { Mail, Check, AlertCircle, Loader2 } from "lucide-react";

export function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("OTP");
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });
      const data = await res.json();
      if (res.ok) {
        // Reload page to reflect session
        window.location.reload();
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 size-8 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black text-asphalt mb-2">
          {step === "EMAIL" ? "Welcome Back" : "Verify Email"}
        </h2>
        <p className="text-slate-500 mb-6 text-sm">
          {step === "EMAIL"
            ? "Enter your email to receive a secure login code. No passwords required."
            : `We've sent a 6-digit code to ${email}`}
        </p>

        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {step === "EMAIL" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-3.5 text-slate-400"
                  size={20}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-asphalt font-bold py-3 rounded-xl hover:bg-primary/90 transition-all flex justify-center items-center h-12"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Send Login Code"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                6-Digit Code
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-center text-2xl font-black tracking-[0.5em] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="000000"
              />
            </div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-asphalt text-white font-bold py-3 rounded-xl hover:bg-asphalt/90 transition-all flex justify-center items-center h-12 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Verify Code"}
            </button>
            <button
              type="button"
              onClick={() => setStep("EMAIL")}
              className="w-full text-slate-400 text-sm font-semibold mt-2 hover:text-asphalt"
            >
              Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
