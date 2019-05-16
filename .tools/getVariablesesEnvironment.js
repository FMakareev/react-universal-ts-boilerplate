/* global process */

export const getVariablesesEnvironment = () => {
  console.info('run: Get Variableses Environment', process.env.npm_lifecycle_event);
  try {
    const env = {};
    let CA_CONFIG = null;

    try {
      CA_CONFIG = require('../ca-config');
    } catch (e) {
      console.log(e);
    }
    if (!CA_CONFIG) {
      // обрабатываем в случае если конфиг не найден
      process.argv.forEach(item => {
        if (item.indexOf('--') !== -1) {
          env[item.substring(2, item.indexOf('='))] = item.substring(item.indexOf('=') + 1);
          process.env[item.substring(2, item.indexOf('='))] = item.substring(
            item.indexOf('=') + 1,
          );
        }
        return null;
      });
    } else {
      if (process.env.npm_lifecycle_event.indexOf('ssr') !== -1) {
        if (CA_CONFIG.ssr.hasOwnProperty(process.env.npm_lifecycle_event)) {
          process.env = {...process.env, ...CA_CONFIG.ssr[process.env.npm_lifecycle_event]}
        }
      } else if (process.env.npm_lifecycle_event.indexOf('csr') !== -1) {
        if (CA_CONFIG.csr.hasOwnProperty(process.env.npm_lifecycle_event)) {
          process.env = {...process.env, ...CA_CONFIG.csr[process.env.npm_lifecycle_event]}
        }
      } else {
        reject((`Для скрипта ${process.env.npm_lifecycle_event} не найдено конфигурации в ca-config.json`))
      }
    }
    return env;
  } catch (error) {
    console.error('ERROR:', error);
    return error;
  }

};

export default getVariablesesEnvironment;
