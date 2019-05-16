import defaultsDeep from 'lodash/defaultsDeep';
import { LocaleActionTypes, LocaleState, LocaleAction } from './types';
import { Reducer } from 'redux';

export const localesReducer: Reducer<LocaleState, LocaleActionTypes> = (
  state: LocaleState = {},
  action: LocaleActionTypes,
): LocaleState => {
  switch (action.type) {
    case LocaleAction.UPDATE_LOCALES:
      return defaultsDeep(state, action.messages);
    case LocaleAction.UPDATE_LOCALE_MESSAGES:
      return {
        ...state,
        ...action.messages,
      };
    default:
      return state;
  }
};

export default localesReducer;
