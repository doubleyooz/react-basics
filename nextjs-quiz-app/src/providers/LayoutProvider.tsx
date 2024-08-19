'use client';

import { usePathname } from 'next/navigation';
import { fetchUsers } from '@/app/(auth)/actions/fetchUsers';
import { useUser } from '@clerk/nextjs';
import type React from 'react';
import { useEffect, useState } from 'react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = ['sign-in', 'sign-up', 'sign-out'].includes(
    pathname.split('/')[1]
  );
  const { isLoaded, isSignedIn, user } = useUser(); // Use the useUser hook

  const getNavbar = () => {
    if (isPublicRoute) return null;
    return <Navbar />;
  };

  const getFooter = () => {
    if (isPublicRoute) return null;
    return <Footer />;
  };

  const getContent = () => {
    if (isPublicRoute && isSignedIn) return null;
    return <>{children}</>;
  };

  const getCurrentUser = async () => {
    try {
      const response: any = await fetchUsers();
      if (response?.error) throw new Error(response.error.message);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  useEffect(() => {
    if (!isPublicRoute) getCurrentUser();
  }, [isPublicRoute]);

  return (
    <div className='min-h-screen bg-secondary-50 flex flexCol justify-between'>
      {getNavbar()}
      {getContent()}
      {getFooter()}
    </div>
  );
}

export default LayoutProvider;
