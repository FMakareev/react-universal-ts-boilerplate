import * as React from 'react';
import Loadable from 'react-loadable';
import { IRoute } from '..';

export const DefaultComponentDecorator = (
  route: IRoute,
  LoadingComponent: React.FC,
  ErrorComponent: React.FC,
) => {
  try {
    return Loadable({
      loader: route.load,
      loading: () => <LoadingComponent />,
      // delay: 300,
    });
  } catch (error) {
    console.error(error);
    return <ErrorComponent />;
  }
};
export default DefaultComponentDecorator;
