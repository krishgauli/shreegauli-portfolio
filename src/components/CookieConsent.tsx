'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { readCookie, readLocalStorage, writeCookie, writeLocalStorage } from '@/lib/browser-storage';

type CookiePreferences = {
  necessary: true;
  performance: boolean;
  marketing: boolean;
};

type CookieConsentPayload = {
  accepted: boolean;
  preferences: CookiePreferences;
};

const CONSENT_COOKIE_KEY = 'site_cookie_consent_v2';
const CONSENT_STORAGE_KEY = 'cookieConsentV2';

const defaultPreferences: CookiePreferences = {
  necessary: true,
  performance: true,
  marketing: false,
};

function persistConsent(preferences: CookiePreferences) {
  const payload: CookieConsentPayload = {
    accepted: true,
    preferences,
  };

  const serialized = JSON.stringify(payload);
  writeCookie(CONSENT_COOKIE_KEY, serialized, 180);
  writeLocalStorage(CONSENT_STORAGE_KEY, serialized);
}

function parseCookiePreferences(value: string | null): CookiePreferences | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<CookieConsentPayload>;
    if (!parsed.accepted || !parsed.preferences) {
      return null;
    }

    if (
      typeof parsed.preferences.performance !== 'boolean' ||
      typeof parsed.preferences.marketing !== 'boolean'
    ) {
      return null;
    }

    return {
      necessary: true,
      performance: parsed.preferences.performance,
      marketing: parsed.preferences.marketing,
    };
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const pathname = usePathname();

  useEffect(() => {
    const openSettings = () => {
      setIsVisible(true);
      setIsSettingsOpen(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('open-cookie-settings', openSettings);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('open-cookie-settings', openSettings);
      }
    };
  }, []);

  useEffect(() => {
    const parsedPreferences = parseCookiePreferences(
      readCookie(CONSENT_COOKIE_KEY) || readLocalStorage(CONSENT_STORAGE_KEY)
    );

    if (parsedPreferences) {
      setPreferences(parsedPreferences);
    }

    const hasConsented = !!parsedPreferences;
    if (!hasConsented && pathname === '/') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleAcceptAll = () => {
    const nextPreferences: CookiePreferences = {
      necessary: true,
      performance: true,
      marketing: true,
    };
    setPreferences(nextPreferences);
    persistConsent(nextPreferences);
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleNecessaryOnly = () => {
    const nextPreferences: CookiePreferences = {
      necessary: true,
      performance: false,
      marketing: false,
    };

    setPreferences(nextPreferences);
    persistConsent(nextPreferences);
    setIsSettingsOpen(false);
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    persistConsent(preferences);
    setIsSettingsOpen(false);
    setIsVisible(false);
  };

  const togglePreference = (key: 'performance' | 'marketing') => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
            className="fixed bottom-6 left-6 right-6 z-120 md:left-1/2 md:right-auto md:w-full md:max-w-3xl md:-translate-x-1/2"
          >
            <div className="rounded-2xl border border-outline-variant bg-surface/95 p-5 shadow-[0_24px_70px_rgba(16,24,24,0.18)] backdrop-blur-xl md:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6">
                <div className="flex flex-1 items-start gap-4">
                  <div className="rounded-full bg-primary-container p-3 text-primary">
                    <Cookie className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-extrabold tracking-tight text-on-background">
                      We use cookies to improve your experience
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                      We use essential cookies to keep the site working and optional cookies to measure performance and improve future visits. Read the{' '}
                      <Link href="/cookie-policy" className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dim">
                        Cookie Policy
                      </Link>{' '}
                      or the{' '}
                      <Link href="/privacy" className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dim">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
                  >
                    <Settings2 className="h-4 w-4" />
                    Cookie Settings
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="rounded-full bg-primary px-7 py-3 text-sm font-extrabold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {isSettingsOpen && (
            <div className="fixed inset-0 z-130 flex items-center justify-center bg-inverse-surface/45 p-4 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl rounded-[24px] border border-outline-variant bg-surface p-6 shadow-[0_30px_90px_rgba(16,24,24,0.2)] md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-on-surface-variant">
                      Cookie settings
                    </p>
                    <h3 className="mt-2 font-headline text-2xl font-extrabold tracking-tight text-on-background">
                      Choose how cookies are used
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                      Essential cookies are always on. Optional cookies help measure site performance and tailor future content.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(false)}
                    className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-background"
                    aria-label="Close cookie settings"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-surface-variant bg-surface-container-lowest/70 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-headline text-base font-bold text-on-background">Essential cookies</h4>
                        <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                          Required for security, page navigation, and core website functionality.
                        </p>
                      </div>
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-on-primary">Always active</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-surface-variant bg-surface-container-lowest/70 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-headline text-base font-bold text-on-background">Performance cookies</h4>
                        <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                          Help understand page usage, content engagement, and general site performance.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => togglePreference('performance')}
                        className={`relative h-7 w-12 rounded-full transition-colors ${preferences.performance ? 'bg-primary' : 'bg-surface-variant'}`}
                        aria-pressed={preferences.performance}
                      >
                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${preferences.performance ? 'left-6' : 'left-1'}`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-surface-variant bg-surface-container-lowest/70 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-headline text-base font-bold text-on-background">Marketing cookies</h4>
                        <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                          Used to support campaign measurement, remarketing, and personalized outreach.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => togglePreference('marketing')}
                        className={`relative h-7 w-12 rounded-full transition-colors ${preferences.marketing ? 'bg-primary' : 'bg-surface-variant'}`}
                        aria-pressed={preferences.marketing}
                      >
                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${preferences.marketing ? 'left-6' : 'left-1'}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-surface-variant pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleNecessaryOnly}
                    className="rounded-full border border-outline-variant px-6 py-3 text-sm font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                  >
                    Necessary Only
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-container"
                  >
                    Save Settings
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-on-primary transition-all hover:opacity-90 active:scale-[0.98]"
                  >
                    Accept All
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
