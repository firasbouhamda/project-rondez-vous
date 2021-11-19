import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./dist/locales/en/translation.json";
import translationFR from "./dist/locales/fr/translation.json";

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    }
};

i18n
    .use(Backend)
    .use(detector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        whitelist: ["en", "fr"],
        keySeparator: ".",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;