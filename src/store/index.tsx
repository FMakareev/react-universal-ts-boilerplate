import { createStore, applyMiddleware, Store } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Reducers } from './reducers';
import { ApplicationState } from './types';
import { isBrowser } from '../shared/constants';

const initialState: ApplicationState = isBrowser
  ? window.PRELOADED_REDUX_STATE
  : {
      /** @desc текущий активный язык и его словарь */
      intl: {
        locale: 'ru',
        messages: {},
      },
      /** @desc списк языков */
      locales: {},
    };
// const initialState: ApplicationState = {
//   /** @desc текущий активный язык и его словарь */
//   intl: {
//     locale: 'ru',
//     messages: {},
//   },
//   /** @desc списк языков */
//   locales: {},
// };

export const store: Store<ApplicationState> = createStore(
  Reducers,
  initialState,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

export default store;
