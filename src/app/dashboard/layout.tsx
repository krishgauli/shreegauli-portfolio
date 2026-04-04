'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/components/AuthProvider';
import { SitePreferencesProvider } from '@/components/SitePreferencesProvider';

// Noindex is added via robots.txt / vercel.json path config since this is a client component

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SitePreferencesProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SitePreferencesProvider>
  );
}
