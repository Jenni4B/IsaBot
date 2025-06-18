'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const PublicRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/dashboard'); // Redirect authenticated users to dashboard
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;

  return <>{children}</>;
};

export default PublicRoute;