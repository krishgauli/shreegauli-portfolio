'use client';

import dynamic from 'next/dynamic';

const InvoiceDashboard = dynamic(() => import('@/components/InvoiceDashboard'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin h-8 w-8 border-4 border-violet-500 border-t-transparent rounded-full" />
    </div>
  ),
});

export default function InvoicesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <InvoiceDashboard />
    </div>
  );
}
