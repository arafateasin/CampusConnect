"use client";

import { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create demo user
    const demoUser = {
      uid: "demo-user-" + Date.now(),
      email: email,
      displayName: email.split("@")[0],
      photoURL: null,
    };

    setUser(demoUser);
    setLoading(false);
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create demo user
    const demoUser = {
      uid: "demo-user-" + Date.now(),
      email: email,
      displayName: name,
      photoURL: null,
    };

    setUser(demoUser);
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    setLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create demo Google user
    const demoUser = {
      uid: "demo-google-user-" + Date.now(),
      email: "demo@gmail.com",
      displayName: "Demo User",
      photoURL: "https://via.placeholder.com/40",
    };

    setUser(demoUser);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);

    // Simulate logout delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setUser(null);
    setLoading(false);
  };

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
