import webpack from "webpack";

/** @param definitions - переменные которуе нужно внедрить в сборку */
export const definePluginConfig = (definitions) => {
  return new webpack.DefinePlugin({
    isBrowser: 'true',
    DEV: process.env.NODE_ENV === 'development',
    SSR_FETCH: true,
    PORT: process.env.port || 3000,
    ENDPOINT_CLIENT: process.env.endpointClient || "'http://localhost:5001'",
    ENDPOINT_SERVER: process.env.endpointServer || "'http://localhost:5001'",
    defaultLocale: process.env.defaultLocale || "'en'",
    apolloFaker: process.env.apolloFaker,
    output: `'${process.env.output}'`,
    ...definitions,
  })
};

export default definePluginConfig;
