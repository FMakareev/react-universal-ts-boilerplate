/* global process */
import webpack from 'webpack';
import { serverConfigGenerator } from '../../.configs/webpack.server';
import { browserConfigGenerator } from '../../.configs/webpack.client';
import { Clear } from '../../.tools/clear';
import { getVariablesesEnvironment } from '../../.tools/getVariablesesEnvironment';
import { init as createIndex } from '../../.tools/createIndex';

const build = async () => {
  await Clear();
  createIndex();
  getVariablesesEnvironment();

  const clientConfig = browserConfigGenerator();
  const serverConfig = serverConfigGenerator();
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers[0];
  const serverCompiler = multiCompiler.compilers[1];



  clientCompiler.run((error, stats) => {
    if(error && stats.hasErrors()){
      console.log(error);
    }
    console.log('Client compiler has finished execution. RUN');
    process.stdout.write(stats.toString() + "\n");

    serverCompiler.run((error, stats) => {
      if(error && stats.hasErrors()){
        console.log(error);
      }
      console.log('Server compiler has finished execution.');
      process.stdout.write(stats.toString() + "\n");
    });

  });




};

build();
