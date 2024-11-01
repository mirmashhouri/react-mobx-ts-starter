import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import config from '../../../public/config.json';
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const supportedLanguages = config.supportedLanguages;

const options = {
  'lookupQuerystring': 'lang',
  'supportedLngs': supportedLanguages,
};

i18n
// load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
// learn more: https://github.com/i18next/i18next-http-backend
  .use(HttpApi)
// detect user language
// learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
// pass the i18n instance to react-i18next.
  .use(initReactI18next)
// init i18next
// for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['localTranslations'],
    defaultNS: 'localTranslations',
    debug: false,
    detection: options,
    supportedLngs: supportedLanguages,
  });

const localLang = localStorage.getItem('language');

if (localLang) {
  i18n.changeLanguage(JSON.parse(localLang));
}

export default i18n;