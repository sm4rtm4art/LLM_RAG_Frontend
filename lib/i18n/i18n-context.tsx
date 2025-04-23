'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { translations, formatDate, formatNumber } from './translations';

type I18nContextType = {
  t: (key: string) => string;
  formatDate: (date: Date) => string;
  formatNumber: (num: number) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Function to get a translation by key path (e.g., "chat.welcome")
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      value = value[k];
    }

    return value;
  };

  return (
    <I18nContext.Provider
      value={{
        t,
        formatDate,
        formatNumber,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
