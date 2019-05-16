import * as React from 'react';
import { matchRoutes } from 'react-router-config';

const getCurrentRouteHOC = (routes: any, pathname: string, props: any): any => {
  try {
    const result = matchRoutes(routes, pathname).reverse();
    if (result[0]) {
      const { route, match } = result[0];
      return {
        ...props,
        Component: route.component,
        route: route,
        location: props.location,
        match: match,
      };
    }
  } catch (error) {
    console.error('getCurrentRouteByPathname: ', error);
  }
};

export const GetCurrentRouteHOC = (WrappedComponent: any) => {
  return (props: any) => {
    const {
      route: { routes },
      location,
    } = props;

    const { Component, ...rest } = getCurrentRouteHOC(routes, location.pathname, props);

    return <WrappedComponent {...props}>{Component && <Component {...rest} />}</WrappedComponent>;
  };
};

export default GetCurrentRouteHOC;
