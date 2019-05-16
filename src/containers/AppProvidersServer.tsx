import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import reactLoadable from 'react-loadable';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import { StyledThemeProvider } from '../styles/StyledThemeProvider';
import { GlobalStyle } from '../styles/GlobalStyle';

export const AppProvidersServer: React.FC<any> = ({
  ApolloClient,
  request,
  RouterContext,
  modules,
  routes,
  location,
  store,
}) => (
  <ApolloProvider client={ApolloClient}>
    <StyledThemeProvider>
      <Provider store={store}>
        <IntlProvider>
          <React.Fragment>
            <GlobalStyle />
            <StaticRouter
              location={{
                pathname: request.originalUrl,
                ...location,
              }}
              context={RouterContext}>
              <reactLoadable.Capture report={moduleName => modules.push(moduleName)}>
                {renderRoutes(routes)}
              </reactLoadable.Capture>
            </StaticRouter>
          </React.Fragment>
        </IntlProvider>
      </Provider>
    </StyledThemeProvider>
  </ApolloProvider>
);

export default AppProvidersServer;
