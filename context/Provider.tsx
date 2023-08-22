"use client";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: React.ReactNode; // replace 'any' with the actual type of session
}
const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
