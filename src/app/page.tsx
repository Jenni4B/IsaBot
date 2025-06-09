// import Dashboard from "./dashboard/page";
'use client';

import LandingPage from "./landingpage/page";
import NavBar from "./components/navbar";
import { AuthProvider } from "./context/AuthContext";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* AuthProvider wraps the entire application to provide authentication context */}
      <AuthProvider>
        <NavBar />
      </AuthProvider>
      <LandingPage />
      <footer className="text-center">
        <p className="text-sm text-gray-500">© Isa Media Inc</p>
      </footer>
    </div>
  );
}
