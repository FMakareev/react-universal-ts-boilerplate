/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your plugin.
 *
 */

import { addLocaleData } from 'react-intl';
import reduce from 'lodash/reduce';

// Import config
import { languages } from '../../translations/languages.json';

/**
 * Try to require translation file.
 *
 * @param language {String}
 */
const requireTranslations = (language: string) => {
  try {
    return require(`./translations/${language}.json`); // eslint-disable-line global-require
  } catch (error) {
    console.error(
      `Unable to load "${language}" translation. Please make sure "${language}.json" file exists in "admin/public/app/translations" folder.`,
    ); // eslint-disable-line no-console
    return false;
  }
};

/**
 * Попробуйте указать язык в данных языкового стандарта «react-intl»
 * и добавьте данные локали, если они были найдены.
 *
 * @param language {String}
 */
const addLanguageLocaleData = (language: string) => {
  try {
    const localeData = require(`react-intl/locale-data/${language}`);
    addLocaleData(localeData);
    return true;
  } catch (error) {
    console.warn(
      `⚠️ It looks like the language "${language}" is not supported by "react-intl" module.`,
    );
    return false;
  }
};

/**
 * Dynamically generate `translationsMessages object`.
 */
const translationMessages = reduce(
  languages,
  (result: any, language: any) => {
    const obj: any = result;
    obj[language] = requireTranslations(language);
    addLanguageLocaleData(language);
    return obj;
  },
  {},
);

export { languages, translationMessages };
