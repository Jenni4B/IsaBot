'use client';
import React from 'react';
import Link from 'next/link';


export const OopsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Try again later!</h1>
      <Link href="/landingPage" className="text-pink-500">Go back to home</Link>
    </div>
  );
}