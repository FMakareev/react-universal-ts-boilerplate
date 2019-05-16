
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const scriptsLoaderConfig = require('../.configs/loaders/scriptsLoaderConfig');
const graphqlLoaderConfig = require('../.configs/loaders/graphqlLoaderConfig');

module.exports = ({config}) => {

  config.module.rules.push(scriptsLoaderConfig());

  config.module.rules.push(graphqlLoaderConfig);

  config.plugins.push(new ForkTsCheckerWebpackPlugin());

  config.resolve.extensions.push('.ts', '.tsx', '.jsx', '.js');
  return config;
};
