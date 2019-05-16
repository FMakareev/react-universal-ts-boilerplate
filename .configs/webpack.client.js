/* global process */

import path from 'path';
import webpack from 'webpack';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import fileLoaderConfig from './loaders/fileLoaderConfig';
import graphqlLoaderConfig from './loaders/graphqlLoaderConfig';
import styleLoaderConfig from './loaders/styleLoaderConfig';
import scriptsLoaderConfig from './loaders/scriptsLoaderConfig';
import ManifestPlugin from 'webpack-manifest-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';


import {ReactLoadablePlugin} from 'react-loadable/webpack';

import languagesJson from '../src/translations/languages.json'
import definePluginConfig from "./plugin/definePluginConfig";

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let languagesRegExp = '';


languagesJson.languages.forEach((item, index) => {
  languagesRegExp += item;
  if (index < languagesJson.languages.length - 1) {
    languagesRegExp += '|';
  }
});
languagesRegExp = new RegExp(languagesRegExp);


export const browserConfigGenerator = () => {
  return {
    mode: process.env.NODE_ENV || 'development',
    watch: process.env.watch === 'true',
    name: 'client',
    entry: [
      '@babel/polyfill',
      process.env.client_entry || './src/client/index.tsx'
    ],
    output: {
      path: path.resolve(process.cwd(), process.env.output || 'dist'),
      publicPath: '/',
      filename: 'bundle.js',
      chunkFilename:
        process.env.NODE_ENV === 'development'
          ? 'static/js/[name].chunk.js'
          : 'static/js/[name].[chunkhash:8].chunk.js',
    },
    module: {
      rules: [
        scriptsLoaderConfig(["react-loadable/babel", '@babel/plugin-syntax-dynamic-import'],),
        /** Rules for GraphQL */
        graphqlLoaderConfig,
        /** Rules for image */
        fileLoaderConfig,
        /** Rules for style */
        styleLoaderConfig,
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|json)$/,
          use: {
            loader: 'file-loader',
            query: {
              name: 'assets/[name].[ext]'
            }
          }
        }, {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        }
      ],
    },
    plugins: [
      ...(process.env.analyzer ? [new BundleAnalyzerPlugin({
        analyzerMode: 'static'
      })] : []),
      new DuplicatePackageCheckerPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new WriteFileWebpackPlugin(),
      new webpack.ContextReplacementPlugin(/react-intl[/\\]locale-data$/, languagesRegExp),

      definePluginConfig({
        isBrowser: 'true',
        SSR_FETCH: true,
      }),

      /** Create module list */
      new ReactLoadablePlugin({
        filename: `${path.resolve(process.cwd(), process.env.output || 'dist')}/react-loadable.json`,
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),
      /** Move assets to build directory */
      new CopyPlugin([
        {
          from: 'src/assets',
          to: `${path.resolve(process.cwd(), process.env.output || 'dist')}/assets`,
        },
        {
          from: 'src/translations',
          to: `${path.resolve(process.cwd(), process.env.output || 'dist')}/translations`,
        }
      ])
    ],
    resolve: {
      extensions: ['.js', '.mjs', '.gql', '.graphql', '.json', '.ts', '.tsx'],
      modules: ['node_modules'],
      /** @link https://webpack.js.org/configuration/resolve/#resolve-alias */
      alias: {
        /** маска пути для глобальных компонентов проекта */
        '@lib/ui': path.resolve('src/components/'),
        /** маска пути для стилей проекта */
        '@lib/styles': path.resolve('src/styles/'),
        /** маска пути для утилит проекта проекта */
        '@lib/utils': path.resolve('src/utils/'),
        '~': path.resolve(''),

        ...(process.env.hmr ? {
          'react-dom': '@hot-loader/react-dom',
        } : {}),

      },
    },
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : '',
    stats: {
      cached: false,
      cachedAssets: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      timings: true,
      version: false,
    },
  };
};

export default browserConfigGenerator;
