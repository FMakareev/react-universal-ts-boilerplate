import { CreateRouterConfig, transformModulesObjectToArray } from '../modules/router';
import * as Modules from '../modules';
import {
  _defaultRoutesLayout,
  DefaultRoutesDecorator,
} from '../modules/router/decorators/DefaultRoutesDecorator';
import { LAYOUT_AUTH, LAYOUT_RENDER_EMAIL, LAYOUT_ROOT } from '../shared/layouts';
import GetCurrentRouteHOC from '../modules/router/decorators/GetCurrentRouteHOC';
import * as React from 'react';
import { LayoutAuth } from '../components/LayoutAuth/layoutAuth';
import LayoutApp from '../components/LayoutApp/LayoutApp';

_defaultRoutesLayout[LAYOUT_RENDER_EMAIL] = {
  layout: LAYOUT_RENDER_EMAIL,
  path: `/${LAYOUT_RENDER_EMAIL}`,
  component: GetCurrentRouteHOC(({ children }: any) => <React.Fragment>{children}</React.Fragment>),
  routes: [],
};
_defaultRoutesLayout[LAYOUT_ROOT] = {
  layout: LAYOUT_ROOT,
  path: '/',
  component: GetCurrentRouteHOC((props: any) => <LayoutApp {...props} />),
  routes: [],
};

_defaultRoutesLayout[LAYOUT_AUTH] = {
  layout: LAYOUT_AUTH,
  path: `/${LAYOUT_AUTH}`,
  component: GetCurrentRouteHOC((props: any) => <LayoutAuth {...props} />),
  routes: [],
};

export const RouterConfig: any = CreateRouterConfig({
  modules: transformModulesObjectToArray(Modules),
  routesDecorator: props => {
    return DefaultRoutesDecorator({ ...props, routesLayout: _defaultRoutesLayout });
  },
});

export default RouterConfig;
