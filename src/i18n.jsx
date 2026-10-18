import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LangContext = createContext({ lang: 'en', setLang: () => {}, t: (v) => v });
const STORAGE_KEY = 'gg-portfolio-lang';

function readStoredLang() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'es' || stored === 'en' ? stored : 'en';
  } catch {
    return 'en';
  }
}

// Resolves a bilingual value: { en, es } -> string for the current language.
// Plain strings, numbers and arrays without language keys are returned as is.
export function pick(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value) && ('en' in value || 'es' in value)) {
    return value[lang] ?? value.en;
  }
  return value;
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable: the choice simply isn't remembered */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((value) => pick(value, lang), [lang]);
  const ctx = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LangContext.Provider value={ctx}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
