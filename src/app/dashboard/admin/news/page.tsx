'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminNewsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/admin?view=case-studies');
  }, [router]);

  return (
    <div className="dashboard-shell min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
    </div>
  );
}
