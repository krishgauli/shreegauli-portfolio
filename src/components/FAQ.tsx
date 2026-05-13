'use client';

import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSitePreferences } from '@/components/SitePreferencesProvider';

export default function FAQ({ faqs }: { faqs: { q: string, a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const { theme } = useSitePreferences();
  const isDark = theme === 'dark';
  
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className={`rounded-[2rem] border transition-all duration-300 ${
          open === i 
            ? isDark 
              ? 'bg-[#F5F0E8] border-stone-200 shadow-2xl shadow-slate-900/20' 
              : 'bg-emerald-50 border-emerald-200 shadow-2xl shadow-emerald-500/10'
            : isDark 
              ? 'bg-[#EDE8DF] border-stone-300 hover:border-emerald-500/30' 
              : 'bg-white border-slate-200 hover:border-emerald-500/30'
        }`}>
          <button 
            onClick={() => setOpen(open === i ? null : i)} 
            className="w-full px-8 py-8 text-left flex justify-between items-center group"
          >
            <span className={`pr-8 text-xl font-black tracking-tight transition-colors ${
              open === i 
                ? isDark ? 'text-white' : 'text-emerald-700'
                : isDark ? 'text-gray-700' : 'text-slate-900'
            }`}>
              {faq.q}
            </span>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${open === i ? 'bg-emerald-500 rotate-180' : isDark ? 'bg-[#D8D0C5] group-hover:bg-emerald-500/10' : 'bg-slate-100 group-hover:bg-emerald-500/10'}`}>
              <ChevronDown className={`h-5 w-5 transition-colors ${open === i ? 'text-white' : isDark ? 'text-gray-500 group-hover:text-emerald-400' : 'text-gray-500 group-hover:text-emerald-600'}`} />
            </div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div 
                initial={{height: 0, opacity: 0}} 
                animate={{height: 'auto', opacity: 1}} 
                exit={{height: 0, opacity: 0}} 
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="overflow-hidden"
              >
                <div className={`px-8 pb-8 text-lg leading-relaxed border-t pt-6 ${
                  isDark ? 'text-gray-500 border-stone-300' : 'text-slate-600 border-emerald-100'
                }`}>
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
