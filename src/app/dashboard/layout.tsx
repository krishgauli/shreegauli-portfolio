import { ReactNode } from 'react';
import './dashboard.css';

// Providers (AuthProvider + SitePreferencesProvider) are now at root layout level

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
