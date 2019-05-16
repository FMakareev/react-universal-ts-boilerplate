import * as React from 'react';
import LocaleToggle from '../LocaleToggle/LocaleToggle';

export class LayoutApp extends React.Component<any, any> {
  state: any = {};

  constructor(props: any) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    return (
      <div>
        <div>
          <LocaleToggle />
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default LayoutApp;
