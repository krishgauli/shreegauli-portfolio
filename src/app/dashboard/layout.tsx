'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/components/AuthProvider';
import { SitePreferencesProvider } from '@/components/SitePreferencesProvider';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SitePreferencesProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SitePreferencesProvider>
  );
}
