import nodemon from 'nodemon';
import path from "path";
import {getVariablesesEnvironment, logMessage} from "../../.tools";
import openBrowser from "react-dev-utils/openBrowser";




getVariablesesEnvironment();
console.log('process.env.public: ', process.env.public);
console.log('process.cwd(): ', process.env.port);
console.log(path.resolve(process.cwd(), process.env.public || '../dist'));

const script = nodemon({
  "verbose": true,
  nodeArgs: ['--inspect'],
  script: `${path.resolve(process.cwd(), process.env.public || 'dist')}/server.js`,
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
