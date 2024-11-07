import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define translations in multiple languages
const resources = {
  en: {
    translation: {
      search: 'Search',
      crops: 'Crops',
      diseases: 'Diseases',
    }
  },
  np: {
    translation: {
      search: 'खोज्नुहोस्',
      crops: 'बाली',
      diseases: 'रोगहरू',
    }
  },
};

// Initialize i18next with language detection and React integration
i18n
  .use(LanguageDetector) // Detects the user's language
  .use(initReactI18next)  // Passes i18n instance to react-i18next
  .init({
    resources,           // Translations resources
    fallbackLng: 'en',    // Default language
    interpolation: {
      escapeValue: false, // React already escapes by default
    }
  });

export default i18n;
