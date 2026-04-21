"use client";

import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import germanTranslations from "@/locales/german.json";
import englishTranslations from "@/locales/english.json";

// Language types
export type Language = "de" | "en";

// Context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => any;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    de: {
      translation: germanTranslations,
    },
    en: {
      translation: englishTranslations,
    },
  },
  lng: "de", // Default language (German)
  fallbackLng: "de",
  interpolation: {
    escapeValue: false,
  },
});

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("de");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
  };

  const t = (key: string, options?: any) => i18n.t(key, options);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
