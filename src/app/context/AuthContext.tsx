'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";

// Define the shape of the authentication context.
// Includes login status and functions to log in or out.
type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  
  // State to track whether the user is logged in.
  // Initializes from localStorage (client-side only).
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isLoggedIn") === "true";
    }
    return false;
  });

  // Persist login state to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
  }, [isLoggedIn]);

  // mark user as logged in.
  const login = () => setIsLoggedIn(true);

  //mark user as logged out.
  const logout = () => setIsLoggedIn(false);

  // Memoize the context value to avoid unnecessary re-renders.
  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context.
// Throws an error if used outside the AuthProvider.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
