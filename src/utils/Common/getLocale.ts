/* eslint-disable no-restricted-globals */

import i18n from './i18n';

/**
 * Function for matching language.
 * 
 * Functionality:
 * 1. Detect if regex is matching the language.
 * 2. Change the language if it's matching the regex.
 * 
 */
export function getLocale() {
  const regex = /^en-[A-Za-z]{2}/;
  const found = i18n.language.match(regex);
  if (found !== null) {
    i18n.changeLanguage('en');
    return 'en';
  }

  const bgRegex = /^bg-[A-Za-z]{2}/;
  const bgFound = i18n.language.match(bgRegex);
  if (bgFound !== null) {
    i18n.changeLanguage('de');
    return 'de';
  }
}
