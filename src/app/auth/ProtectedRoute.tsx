'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/loginPage'); // Redirect to your login page
    }
  }, [isLoggedIn, router]);

  // Optionally, show a loading spinner while checking auth
  if (!isLoggedIn) return null;

  return <>{children}</>;
};

export default ProtectedRoute;