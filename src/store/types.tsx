import { IntlState } from 'react-intl-redux';
import { LocaleState } from './reducers/intl/types';

export interface ApplicationState {
  intl: IntlState;
  locales: LocaleState;
  [prop: string]: any;
}
