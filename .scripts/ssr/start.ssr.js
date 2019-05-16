/* global process */

import path from "path";
import webpack from 'webpack';
import nodemon from 'nodemon';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import openBrowser from 'react-dev-utils/openBrowser';

import {serverConfigGenerator} from '../../.configs/webpack.server';
import {browserConfigGenerator} from '../../.configs/webpack.client';

import {
  createIndex,
  logMessage,
  compilerPromise,
  getVariablesesEnvironment,
  clear,
} from '../../.tools';


const start = async () => {
  /** Удалить временные файлы */
  await clear();

  /** создаем index.tsx в src/modules */
  createIndex();

  /** в process.env добавляются настройки из ca-config.json */
  getVariablesesEnvironment();


  const app = express();
  const WEBPACK_PORT = process.env.port ? process.env.port + 1 : 3001;
  const clientConfig = browserConfigGenerator();
  const serverConfig = serverConfigGenerator();

  /** Добавляются пути для сервера и hmr */
  clientConfig.entry = [
    ...(process.env.hmr ? [`webpack-hot-middleware/client?path=http://localhost:${WEBPACK_PORT}/__webpack_hmr`]:[]),
    ...clientConfig.entry,
  ];

  /** Добавляем пути для кеша HMR */
  if (process.env.hmr) {
    clientConfig.output.hotUpdateMainFilename = 'cache/updates/[hash].hot-update.json';
    clientConfig.output.hotUpdateChunkFilename = 'cache/updates/[id].[hash].hot-update.js';
  }

  /** если есть HMR добавляем плагин */
  if (process.env.hmr) {
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  /** Создается webpack compiler */
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers[0];
  const serverCompiler = multiCompiler.compilers[1];

  const clientPromise = compilerPromise(clientCompiler);
  const serverPromise = compilerPromise(serverCompiler);

  const watchOptions = {
    ignored: /node_modules/,
  };


  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });

  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats,
      watchOptions,
    }),
  );

  app.use(
    webpackHotMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
    }),
  );

  app.use(express.static(process.env.output));

  app.listen(WEBPACK_PORT);


  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && stats &&!stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }

    if (error) {
      logMessage(error, 'error');
    }
    if (stats && stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].split('\n');
      errors.forEach((error) => {
        logMessage(error, 'error');
      });
    }
  });

  try {
    await serverPromise;
    await clientPromise;
  } catch (error) {
    logMessage(error, 'error');
  }

  const script = nodemon({
    "verbose": true,
    nodeArgs: ['--inspect'],
    script: `${path.resolve(process.cwd(), process.env.output || 'dist')}/server.js`,
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
  });
  script.on('restart', () => {
    logMessage('Server side app has been restarted.', 'warning');
  });

  script.on('quit', () => {
    console.log('Process ended');
    process.exit();
  });

  script.on('error', (error) => {
    logMessage('An error occured. Exiting', 'error');
    logMessage(error, 'error');
    process.exit(1);
  });
  openBrowser(`http://localhost:${process.env.port || 3000}`);
};

start();
