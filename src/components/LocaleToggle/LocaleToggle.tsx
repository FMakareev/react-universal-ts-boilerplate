import * as React from 'react';
import { connect } from 'react-redux';
import { getLocales, getMessages } from '../../store/reducers/intl/actions';

interface IProps {
  currentLocale: string;
  locales: object;
  getLocales: () => any;
  getMessages: (locale: string) => any;
}

class LocaleToggle extends React.Component<IProps> {
  render() {
    const { currentLocale, locales, getMessages } = this.props;
    return (
      <select value={currentLocale} onChange={e => getMessages(e.target.value)}>
        {Object.keys(locales).map((locale: string) => (
          <option key={locale}>{locale}</option>
        ))}
      </select>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentLocale: state.intl && state.intl.locale,
  locales: state.locales,
});

const mapDispatchToProps = (dispatch: any) => ({
  getLocales: () => dispatch(getLocales()),
  getMessages: (locale: string) => dispatch(getMessages(locale)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
