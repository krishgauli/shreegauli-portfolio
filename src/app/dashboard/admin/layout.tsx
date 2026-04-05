import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminPreferencesProvider } from '@/components/AdminPreferencesProvider';
import { APP_AUTH_COOKIE, verifyAppAuthToken } from '@/lib/app-session';
import { hasAdminAccess } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(APP_AUTH_COOKIE)?.value;

  if (!token) {
    redirect('/login?next=/dashboard/admin');
  }

  try {
    const decoded = verifyAppAuthToken(token);
    if (!hasAdminAccess(decoded.role)) {
      redirect('/dashboard/client');
    }
  } catch {
    redirect('/login?next=/dashboard/admin');
  }

  return (
    <AdminPreferencesProvider>
      {children}
    </AdminPreferencesProvider>
  );
}
