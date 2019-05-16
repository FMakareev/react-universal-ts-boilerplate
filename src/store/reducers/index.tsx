import { combineReducers, Reducer } from 'redux';
import { intlReducer } from 'react-intl-redux';
import { localesReducer } from './intl/reducers';
import { ApplicationState } from '../types';

export const Reducers: Reducer<ApplicationState> = combineReducers<any>({
  intl: intlReducer,
  locales: localesReducer,
});

export default Reducers;
export type AppState = ReturnType<typeof Reducers>;
