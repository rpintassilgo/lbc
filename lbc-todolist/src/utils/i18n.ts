import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import pt from "./translations/pt.json";

// Get the saved language from localStorage OR default to "en"
const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt }
    },
    lng: savedLanguage, // Load saved language from localStorage
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

// Function to change language and persist it in localStorage
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  localStorage.setItem("language", lng); // Only store "en" or "pt"
};

export default i18n;