

'use client';

import LandingPage from "./landingpage/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingPage />
      <footer className="text-center">
        <p className="text-sm text-gray-500">© Isa Media Inc</p>
      </footer>
    </div>
  );
}