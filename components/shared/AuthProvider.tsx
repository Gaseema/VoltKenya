"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthModal } from "./AuthModal";

type UserSession = {
  userId: string;
  role: string;
} | null;

interface AuthContextType {
  user: UserSession;
  loading: boolean;
  openAuthModal: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  openAuthModal: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((err) => console.error("Session fetch error", err))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        openAuthModal: () => setIsModalOpen(true),
        logout,
      }}
    >
      {children}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
