import { isBrowser } from './shared/constants';
const createBrowserHistory = require('history').createBrowserHistory;

export const history = isBrowser && createBrowserHistory();
export default isBrowser && createBrowserHistory();
