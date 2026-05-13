'use client';
import { useEffect, useState } from 'react';

interface Props {
  title: string;
}

export default function SocialShare({ title }: Props) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-stone-300 bg-white dark:bg-[#EDE8DF] shadow-sm p-4 sm:p-5">
      <p className="text-sm font-semibold text-slate-800 dark:text-gray-800 mb-3">Share this article</p>
      <div className="social-share flex flex-wrap gap-3">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-slate-200 dark:border-stone-300 bg-[#FDFAF5] dark:bg-[#D8D0C5] px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-800 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
        >
          Twitter
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-slate-200 dark:border-stone-300 bg-[#FDFAF5] dark:bg-[#D8D0C5] px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-800 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
