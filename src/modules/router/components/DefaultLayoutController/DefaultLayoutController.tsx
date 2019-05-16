import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import startsWithSegment from '../../helpers/startsWithSegment';
import { LAYOUT_ROOT } from '../../shared/layouts';
import { IRoutesLayout } from '../../decorators/DefaultRoutesDecorator';

export interface ILayoutBaseProps extends RouteComponentProps {
  route: any;
}

const getLayout = (pathname: string, routes: IRoutesLayout, props: any): JSX.Element | null => {
  for (let route in routes) {
    if (routes.hasOwnProperty(route) && startsWithSegment(pathname, route)) {
      const Layout: any = routes[route].component;
      return <Layout _route={props.route} {...props} route={routes[route]} />;
    }
  }
  const Layout = routes[LAYOUT_ROOT].component;
  if (Layout) {
    return <Layout _route={props.route} {...props} route={routes[LAYOUT_ROOT]} />;
  }
  return null;
};

export const DefaultLayoutController: React.FC<ILayoutBaseProps> = (props): JSX.Element | null => {
  const { route, location } = props;

  return getLayout(location.pathname, route.routes, props);
};

export default DefaultLayoutController;
