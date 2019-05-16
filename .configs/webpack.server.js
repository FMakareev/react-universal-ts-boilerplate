/* global process */
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import ManifestPlugin from 'webpack-manifest-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import WriteFileWebpackPlugin from 'write-file-webpack-plugin';

import {fileLoaderConfig} from './loaders/fileLoaderConfig';
import graphqlLoaderConfig from './loaders/graphqlLoaderConfig';
import scriptsLoaderConfig from './loaders/scriptsLoaderConfig';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import definePluginConfig from "./plugin/definePluginConfig";


export const serverConfigGenerator = () => {
  const reStyle = /\.(css|less|styl|scss|sass|sss|svg)$/;
  return {
    name: 'server',
    mode: process.env.NODE_ENV || 'development',
    watch: process.env.watch === 'true' || true,
    entry: ['@babel/polyfill', process.env.server_entry || './src/server/index.ts'],
    target: 'node',
    externals: [nodeExternals()],
    node: {
      __dirname: true,
    },
    devtool: process.env.NODE_ENV === 'development' ?'eval-source-map': '',
    output: {
      path: path.resolve(process.cwd(), process.env.output || 'dist'),
      filename: 'server.js',
      publicPath: '/',
      chunkFilename:
        process.env.NODE_ENV === 'development'
          ? 'static/js/[name].chunk.js'
          : 'static/js/[name].[chunkhash:8].chunk.js',
    },
    module: {
      rules: [
        scriptsLoaderConfig(["react-loadable/babel",'dynamic-import-node'],),
        graphqlLoaderConfig,
        fileLoaderConfig,
        {
          test: reStyle,
          loader: 'ignore-loader',
        },{
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
    resolve: {
      // extensions: ['.js', '.json', '.ts', '.tsx'],
      extensions: ['.js', '.mjs', '.gql', '.graphql', '.json', '.ts', '.tsx'],
      modules: ['node_modules'],
      /** @link https://webpack.js.org/configuration/resolve/#resolve-alias */
      alias: {
        'react-dom': '@hot-loader/react-dom',
        /** маска пути для глобальных компонентов проекта */
        '@lib/ui': path.resolve('src/components/'),
        /** маска пути для стилей проекта */
        '@lib/styles': path.resolve('src/styles/'),
        /** маска пути для утилит проекта проекта */
        '@lib/utils': path.resolve('src/utils/'),
      },
    },
    plugins: [
      new DuplicatePackageCheckerPlugin(),
      new ForkTsCheckerWebpackPlugin(),

      new WriteFileWebpackPlugin(),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),

      definePluginConfig({
        isBrowser: false,
        SSR_FETCH: process.env.ssrFetch,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};

export default serverConfigGenerator;
