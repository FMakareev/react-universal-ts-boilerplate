import { hot } from 'react-hot-loader';

import * as React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC<any> = () => (
  <div>
    <Link to={'/contact'}>example</Link>
  </div>
);

export default hot(module)(HomePage);
