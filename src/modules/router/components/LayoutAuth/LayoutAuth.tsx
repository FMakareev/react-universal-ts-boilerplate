import * as React from 'react';

export class LayoutAuth extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>LayoutAuth</h1>
        {this.props.children}
      </div>
    );
  }
}

export default LayoutAuth;
