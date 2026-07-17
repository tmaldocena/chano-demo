import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { translations, type Locale, type TranslationKey } from './translations';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
  tv: (key: TranslationKey) => unknown;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, seg) => {
    if (acc && typeof acc === 'object' && seg in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[seg];
    }
    return path;
  }, obj);
}

function detectLocale(): Locale {
  const saved = localStorage.getItem('locale');
  if (saved === 'es' || saved === 'en') return saved;
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === 'es' ? 'es' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('locale', l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const value = getNestedValue(translations[locale] as Record<string, unknown>, key);
      return typeof value === 'string' ? value : key;
    },
    [locale],
  );

  const tv = useCallback(
    (key: TranslationKey): unknown => {
      return getNestedValue(translations[locale] as Record<string, unknown>, key);
    },
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tv }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
