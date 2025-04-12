import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

// Initialize i18next
i18n
  .use(HttpBackend) // Load translations using HttpBackend
  .use(LanguageDetector) // Detect language from browser settings or URL
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: "en", // Fallback language if the user's language is not available
    returnObjects:true,
    debug: import.meta.env.MODE === "development", // Enable debugging in development mode
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to load translations
    },
    react: {
      useSuspense: false, // Enable suspense for lazy loading translations
    },
  });

export default i18n;
