import { Action } from 'redux';

export const UPDATE_LOCALES: string = 'UPDATE_LOCALES';
export const UPDATE_LOCALE_MESSAGES: string = 'UPDATE_LOCALE_MESSAGES';

export interface IMessage {
  [prop: string]: string;
}

export interface LocaleState {
  [prop: string]: IMessage | null;
}

export enum LocaleAction {
  UPDATE_LOCALES = 'UPDATE_LOCALES',
  UPDATE_LOCALE_MESSAGES = 'UPDATE_LOCALE_MESSAGES',
}

interface UpdateLocalesAction extends Action {
  type: typeof LocaleAction.UPDATE_LOCALES;
  messages: LocaleState;
}

interface UpdateLocaleMessagesAction extends Action {
  type: typeof LocaleAction.UPDATE_LOCALE_MESSAGES;
  messages: LocaleState;
}

export type LocaleActionTypes = UpdateLocalesAction | UpdateLocaleMessagesAction;
