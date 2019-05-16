import * as React from 'react';

export class LayoutApp extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>LayoutApp</h1>
        {this.props.children}
      </div>
    );
  }
}

export default LayoutApp;
