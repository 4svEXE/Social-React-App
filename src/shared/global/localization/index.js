import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "shared/assets/locale/en";
import ua from "shared/assets/locale/uk-UA";

const defaultFallback = "en";
const defaultTrnslationNamespace = "translation";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false, //true
    defaultNS: defaultTrnslationNamespace,
    fallbackLng: defaultFallback,
    resources: {
      en: {
        translation: en,
      },
      "uk-UA": {
        translation: ua,
      },
    },
    react: {
      useSuspence: true,
    },
  });

export default i18next;
