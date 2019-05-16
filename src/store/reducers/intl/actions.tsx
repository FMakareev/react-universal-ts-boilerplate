import { Dispatch } from 'redux';
import { updateIntl } from 'react-intl-redux';
import { addLocaleData } from 'react-intl';
import isomorphicFetch from 'isomorphic-fetch';
import findIndex from 'lodash/findIndex';
import jsCookie from 'js-cookie';
import history from '../../../history';

import { cookieLangKey, defaultLocale, isBrowser, PORT } from '../../../shared/constants';
import { ApplicationState } from '../../types';
import { LocaleAction, LocaleActionTypes, LocaleState } from './types';
import { getUserLocaleFromQueryString, getUserLocaleFromNavigator } from './helpers';

interface ILocaleResponse {
  languages: [string];
}

/** @desc инициализация словаря на клиенте */
export const initLocalesClient = () => {
  return async (dispatch: Dispatch<LocaleActionTypes>) => {
    // @ts-ignore
    await dispatch(getLocales());

    // @ts-ignore
    const currentLocale = dispatch(getCurrentLocalize());

    // @ts-ignore
    const messages = await dispatch(getMessages(currentLocale));
    return null;
  };
};
/** @desc инициализация словаря на сервере */
export const initLocalesServer = (currentLocale: string, languages: LocaleState) => {
  return async (dispatch: Dispatch<LocaleActionTypes>) => {
    // @ts-ignore
    await dispatch(updateLocales(languages));

    // @ts-ignore
    return await dispatch(getMessages(currentLocale));
  };
};

/** @desc Получить список доступных языков */
export const getLocales = () => {
  return (dispatch: Dispatch<LocaleActionTypes>) => {
    return isomorphicFetch('translations/languages.json')
      .then(response => response.json())
      .then((response: ILocaleResponse) => {
        dispatch(
          updateLocales(Object.assign({}, ...response.languages.map(item => ({ [item]: null })))),
        );
        return response;
      })
      .catch((error: any) => {
        console.error('Error getLocales:', error);
      });
  };
};

const universalFetch = (path: string, options?: any) => {
  if (!isBrowser) {
    return isomorphicFetch(`http://0.0.0.0:${PORT}${path}`, options);
  }
  return isomorphicFetch(path, options);
};

/** @desc Загрузить словарь для указанного языка */
export const getMessages = (locale: string) => {
  return (dispatch: Dispatch<LocaleActionTypes>, getState: any) => {
    const state: ApplicationState = getState();

    addLanguageLocaleData(locale);
    changeLocale(locale);

    if (state.locales && getState().locales[locale]) {
      if (state.intl.locale !== locale) {
        dispatch(
          // @ts-ignore
          updateIntl({
            locale,
            messages: getState().locales[locale],
          }),
        );
      }
      return null;
    }
    // /lang/:lang
    return universalFetch(`/translations/${locale}.json`)
      .then(response => response.json())
      .then(response => {
        dispatch(
          updateLocaleMessages({
            [locale]: response,
          }),
        );

        dispatch(
          // @ts-ignore
          updateIntl({
            locale,
            messages: response,
          }),
        );
        return response;
      })
      .catch((error: any) => {
        console.error('Error getMessages:', error);
      });
  };
};

/**
 * Попробуйте указать язык в данных языкового стандарта «react-intl»
 * и добавьте данные локали, если они были найдены.
 *
 * @param locale {String}
 */
const addLanguageLocaleData = (locale: string): any => {
  try {
    const localeData = require(`react-intl/locale-data/${locale}`);
    addLocaleData(localeData);
    return true;
  } catch (error) {
    console.warn(
      `⚠️ It looks like the language "${locale}" is not supported by "react-intl" module.`,
    );
    return false;
  }
};

/** @desc изменяем текущую локаль в cookie и в queryString если они есть */
export const changeLocale = (lang: string): void => {
  if (isBrowser) {
    jsCookie.set(cookieLangKey, lang, { expires: 700 });

    const queryLocale: string | null = isBrowser ? getUserLocaleFromQueryString() : null;

    if (queryLocale) {
      history && history.push(`?${cookieLangKey}=${lang}`);
    }
  }
};

/** @desc */
export const getCurrentLocalize = () => {
  return (_dispatch: any, getState: any): string => {
    const state: ApplicationState = getState();
    let currentLocale = defaultLocale;

    /** получаем текущую локаль из параметров адресной строки, /?lang=en*/
    const queryLocale: string | null = isBrowser ? getUserLocaleFromQueryString() : defaultLocale;

    if (queryLocale) {
      const localesArray = Object.entries(state.locales).map((item: any[]) => item[0]);
      /** поиск найденной локали в списке доступных локалей */
      if (findIndex(localesArray, (item: {}) => item === queryLocale.toLowerCase()) !== -1) {
        currentLocale = queryLocale;
      }
    } else if (isBrowser) {
      /** получаем текущую локаль из куки*/
      const cookieLocale = jsCookie.get(cookieLangKey);
      if (cookieLocale) {
        currentLocale = cookieLocale;
      } else {
        /** получаем текущую локаль пользователя */
        currentLocale = getUserLocaleFromNavigator().language;
      }
    }
    changeLocale(currentLocale);
    return currentLocale;
  };
};

const updateLocaleMessages = (messages: LocaleState): LocaleActionTypes => {
  return {
    type: LocaleAction.UPDATE_LOCALE_MESSAGES,
    messages,
  };
};

const updateLocales = (messages: LocaleState): LocaleActionTypes => {
  return {
    type: LocaleAction.UPDATE_LOCALES,
    messages,
  };
};
