import * as React from 'react';
import { Request } from 'express';
import { renderToStringWithData } from 'react-apollo';

import { getBundles } from 'react-loadable/webpack';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { client } from '../../apollo/index.server';
import { template } from '../template';
import reactLoadableJson from '../../../dist/react-loadable.json';
import languagesJson from '../../translations/languages.json';
import AppProvidersServer from '../../containers/AppProvidersServer';
import { RouterConfig } from '../../config/router';
import store from '../../store';
import { initLocalesServer } from '../../store/reducers/intl/actions';

const lang = Object.assign({}, ...languagesJson.languages.map(item => ({ [item]: null })));
console.log('lang: ', lang);

export const RenderApp = async (request: Request) => {
  try {
    // @ts-ignore
    await store.dispatch(initLocalesServer(request.language, lang));

    /** */
    const initialReduxState: any = store.getState();
    /** */
    const RouterContext: any = {};
    /** */
    const STStyleRenderer = new ServerStyleSheet();

    const ApolloClient = client(request);

    /** Сброс кеша */
    await ApolloClient.resetStore();

    const modules: any[] = [];

    // @ts-ignore
    const bundles = getBundles(reactLoadableJson, modules);
    const helmet = Helmet.renderStatic();

    const content = await renderToStringWithData(
      STStyleRenderer.collectStyles(
        <AppProvidersServer
          request={request}
          modules={modules}
          routes={RouterConfig}
          RouterContext={RouterContext}
          ApolloClient={ApolloClient}
          STStyleRenderer={STStyleRenderer}
          store={store}
        />,
      ),
    );
    console.log('content: ', content);
    const styleTags = STStyleRenderer.getStyleTags();

    return template({
      styleTags,
      helmet,
      initialReduxState,
      content,
      bundles,
      client: ApolloClient,
      reactLoadableJson,
    });
  } catch (error) {
    console.error('Error RenderApp: ', error);
    return '';
  }
};

export default RenderApp;
