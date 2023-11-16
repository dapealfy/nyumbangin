"use client";

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

export default function App({ children }) {
  const router = useRouter();
  const address = typeof window !== 'undefined' ? localStorage.getItem('address') : null;

  useEffect(() => {
    if (!address && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [address, router.pathname]);

  return (
    <>
      {children}
    </>
  )
}
