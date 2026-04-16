'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { readLocalStorage, writeLocalStorage } from '@/lib/browser-storage';
import { translateText, type Language } from '@/lib/translations';

type Theme = 'light' | 'dark';

interface SitePreferencesContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (text: string) => string;
}

const SitePreferencesContext = createContext<SitePreferencesContextValue | undefined>(undefined);

const LANGUAGE_KEY = 'site-language';
const THEME_KEY = 'site-theme';

export function SitePreferencesProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const t = useCallback((text: string) => translateText(language, text), [language]);

  useEffect(() => {
    const storedLanguage = readLocalStorage(LANGUAGE_KEY);
    const storedTheme = readLocalStorage(THEME_KEY);

    if (storedLanguage === 'en' || storedLanguage === 'es') {
      setLanguage(storedLanguage);
    }

    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    writeLocalStorage(LANGUAGE_KEY, language);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  useEffect(() => {
    writeLocalStorage(THEME_KEY, theme);

    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-light', 'theme-dark', 'dark');
      document.documentElement.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  }, [theme]);

  const value = useMemo(
    () => ({ language, setLanguage, theme, setTheme, t }),
    [language, theme, t]
  );

  return (
    <SitePreferencesContext.Provider value={value}>
      {children}
    </SitePreferencesContext.Provider>
  );
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);
  if (!context) {
    throw new Error('useSitePreferences must be used within SitePreferencesProvider');
  }
  return context;
}
