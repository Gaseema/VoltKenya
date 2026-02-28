"use client";
import { useAuth } from "@/components/shared/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut, User } from "lucide-react";

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user)
    return (
      <div className="p-8 text-center pt-24 text-slate-500">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 pb-24">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Profile Settings
            </h1>
            <p className="text-slate-500 text-sm">Manage your account</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Account Role
            </label>
            <p className="text-slate-900 font-medium flex items-center gap-2">
              {user.role}
              {user.role === "ADMIN" && (
                <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">
                  PRO
                </span>
              )}
            </p>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                logout();
              }
            }}
            className="w-full py-4 px-4 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={20} className="stroke-[2.5]" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
