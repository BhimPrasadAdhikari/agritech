"use client"; // Mark this as a client component

import { ReactNode } from "react";
import { useTranslation } from "react-i18next"; // Import this in client components only
import '../i18n'; // Ensure this is client-side by using it inside a client component

interface I18nProviderProps {
  children: ReactNode;
}

const I18nProvider = ({ children }: I18nProviderProps) => {
  useTranslation(); // Initialize i18n inside client-side component
  return <>{children}</>; // Render children with translation enabled
};

export default I18nProvider;
