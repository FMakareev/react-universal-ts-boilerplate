/** @link https://github.com/TypeStrong/ts-loader/issues/37#issuecomment-381375624 */

type Window = {
  PRELOADED_REDUX_STATE: any;
  APOLLO_STATE: any;
  location: {
    search: string;
  };
  navigator: {
    languages: string[];
    language: string;
  };
};

declare const isBrowser: boolean;
declare const PORT: number;
declare const ENDPOINT_CLIENT: string;
declare const ENDPOINT_SERVER: string;
declare const output: string;
declare const defaultLocale: any;
declare const process: any;
declare const apolloFaker: any;
declare const window: Window;

const _isBrowser = isBrowser;
const _PORT = PORT;
const _ENDPOINT_CLIENT = ENDPOINT_CLIENT;
const _ENDPOINT_SERVER = ENDPOINT_SERVER;
const _output = output;
const _defaultLocale = defaultLocale;
const _process = process;
const _apolloFaker = apolloFaker;
const _window = _isBrowser ? window : null;

export const cookieLangKey = 'lang';

export { _isBrowser as isBrowser };
export { _PORT as PORT };
export { _ENDPOINT_CLIENT as ENDPOINT_CLIENT };
export { _ENDPOINT_SERVER as ENDPOINT_SERVER };
export { _output as output };
export { _window as window };
export { _apolloFaker as apolloFaker };
export { _defaultLocale as defaultLocale };
export { _process as process };
