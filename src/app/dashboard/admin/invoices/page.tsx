'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
    <div className="dashboard-scope dashboard-shell min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-2 text-[#e2e8f0] hover:text-[#f8fafc] mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        <InvoiceDashboard />
      </div>
    </div>
  );
}
