import { configureLocalization } from '@lit/localize';
// We'll import generated locale source files
import { sourceLocale, targetLocales } from './generated/locale-codes.js';

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`./generated/locales/${locale}.js`),
});
