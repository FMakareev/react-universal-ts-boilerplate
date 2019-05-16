import { cookieLangKey, defaultLocale, window } from '../../../shared/constants';
import queryString from 'query-string';

/**
 * @link https://developer.mozilla.org/ru/docs/Web/API/NavigatorLanguage
 * @desc метод получает все доступные пользователю локали
 * */
export const getUserLocaleFromNavigator = (): { language: string; languages: string[] } => {
  /** получаем текущую локаль пользователя */
  let language: string = defaultLocale;
  let languages: string[] = [defaultLocale];
  if (window) {
    const matchResult: string[] | string | null = window.navigator.language.match(/([A-z]{2})/i);

    if (matchResult) {
      language = matchResult[1].toLowerCase();
    } else {
      language = defaultLocale;
    }

    /** список всех доступных пользователю локалей */
    languages = window.navigator.languages.map((item: string) => {
      const result = item.match(/([A-z]{2})/i);
      if (result && result[0]) {
        return result[0];
      }
      return defaultLocale;
    });
  }

  return {
    language,
    languages,
  };
};

/**
 * @desc получаем пользовательскую локаль из querystring
 * */
export const getUserLocaleFromQueryString = (langKey: string = cookieLangKey): string | null => {
  if (window) {
    const result: any = window.location.search ? queryString.parse(window.location.search) : null;
    if (result && result[langKey]) {
      return result[langKey];
    }
  }
  return null;
};
