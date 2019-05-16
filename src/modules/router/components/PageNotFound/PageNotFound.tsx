import * as React from 'react';
import { Link } from 'react-router-dom';

export class PageNotFound extends React.Component {
  static defaultProps = {
    staticContext: {},
  };

  render() {
    return (
      <div>
        <h1>
          Error
          <br /> 404
        </h1>
        <h2>Page is Not Found</h2>
        <p>
          the reasons for the emergence of the problem:
          <br />
          1. the page has been moved or renamed
          <br />
          2. the page no longer exists <br />
          3. URL does not correspond to reality
        </p>
        <div>
          <Link to="/">Home</Link>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
