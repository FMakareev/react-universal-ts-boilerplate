/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import * as React from 'react';

import { IntlProvider } from 'react-intl';
// import { defaultsDeep } from 'lodash';
//
//
// // @ts-ignore
// const {Consumer,Provider} = React.createContext();

export class LanguageProvider extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    {
      /*<IntlProvider locale={this.props.locale} defaultLocale={'ru'} messages={messages}>*/
    }
    // const messages = defaultsDeep(this.props.messages[this.props.locale], this.props.messages.ru);
    return (
      <IntlProvider locale={'ru'} defaultLocale={'ru'} messages={{}}>
        <React.Fragment>{this.props.children}</React.Fragment>
      </IntlProvider>
    );
  }
}

export default LanguageProvider;
