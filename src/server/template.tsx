import { HelmetData } from 'react-helmet';

type TemplateType = {
  helmet?: HelmetData;
  client?: any;
  initialReduxState?: any;
  content?: string;
  bundles?: any;
  lang?: string;
  reactLoadableJson?: any;
  styleTags?: string;
};

// html skeleton provider
export const template = (props: TemplateType): string => {
  const {
    helmet,
    client: { cache },
    initialReduxState = {},
    content = '',
    bundles,
    lang,
    reactLoadableJson,
    styleTags,
  } = props;

  const scripts = `
    <script>
       window.PRELOADED_REDUX_STATE = ${JSON.stringify(initialReduxState)}
    </script>
    <script>
       window.APOLLO_STATE = ${JSON.stringify(cache.extract())}
    </script>
    <script>
       window.REACT_LOADABLE_STATS = ${JSON.stringify(reactLoadableJson)}
    </script>
    <script src="/bundle.js"></script>`;

  return `<!DOCTYPE html>
    <html lang="${lang}">
    <head>
      ${helmet && helmet.title.toString()}
      ${helmet && helmet.meta.toString()}
      ${helmet && helmet.link.toString()}
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#810051">

      <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
      <link rel="manifest" href="/assets/favicon/site.webmanifest">
      <link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#5bbad5">
      <meta name="msapplication-TileColor" content="#da532c">
      <meta name="theme-color" content="#ffffff">

      <link rel="stylesheet" href="/assets/global.css">
      <script>
        if ((!location.port || location.port === "80") && location.protocol !== 'https:') {
          location.protocol = 'https:';
        }
      </script>
      ${styleTags}
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="app" class="wrap-inner">${content}</div>
      ${bundles &&
        bundles.map((bundle: any) => `<script src='${bundle.file}'></script>`).join('\\n')}
      ${scripts}
    </body>`;
};
export default template;
