import { hot } from 'react-hot-loader';

import * as React from 'react';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

import { IntlProvider } from 'react-intl-redux';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Store } from 'redux';

import { GlobalStyle } from '../styles/GlobalStyle';
import { StyledThemeProvider } from '../styles/StyledThemeProvider';
import { ApplicationState } from '../store/types';

type Props = {
  routes: any;
  client: any;
  store: Store<ApplicationState>;
  [prop: string]: any;
};

export class AppProvidersClient extends React.Component<Props> {
  render() {
    const { routes, client, store } = this.props;

    return (
      // @ts-ignore
      <StyledThemeProvider>
        <Provider store={store}>
          <IntlProvider>
            <ApolloProvider client={client}>
              <React.Fragment>
                <GlobalStyle />
                <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
              </React.Fragment>
            </ApolloProvider>
          </IntlProvider>
        </Provider>
      </StyledThemeProvider>
    );
  }
}

export default hot(module)(AppProvidersClient);
