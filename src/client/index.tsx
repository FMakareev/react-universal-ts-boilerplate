import * as React from 'react';
import { render } from 'react-dom';
import reactLoadable from 'react-loadable';
import { client } from '../apollo/index.client';
import AppProvidersClient from '../containers/AppProvidersClient';
import { store } from '../store';

import { RouterConfig } from '../config/router';
import { initLocalesClient } from '../store/reducers/intl/actions';

const appContainer = document.getElementById('app');

const apolloClient = client();

// @ts-ignore
store.dispatch(initLocalesClient());

reactLoadable.preloadReady().then(() => {
  render(
    <AppProvidersClient store={store} routes={RouterConfig} client={apolloClient} />,
    appContainer,
  );
});

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('../containers/AppProvidersClient.tsx', () => {
    const NextAppProvidersClient = require('../containers/AppProvidersClient.tsx').default;
    reactLoadable.preloadReady().then(() => {
      render(
        <NextAppProvidersClient store={store} routes={RouterConfig} client={apolloClient} />,
        appContainer,
      );
    });
  });
}
