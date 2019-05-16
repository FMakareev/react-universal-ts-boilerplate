import { IRoute } from '..';
import layoutApp from '../components/layoutApp/layoutApp';
import { LAYOUT_ROOT, LAYOUT_APP, LAYOUT_ADMIN, LAYOUT_AUTH } from '../shared/layouts';
import { PageNotFound as _PageNotFound } from '../components';
import GetCurrentRouteHOC from './GetCurrentRouteHOC';

/** */
export interface ILayout {
  /** название лейаута */
  layout: string;
  /** путь лейаута, он добавляется в начало принадлежащих лейауту маршрутов*/
  path: string;
  /** компонент лейаута */
  // component(component: JSX.Element): JSX.Element,
  component: any;
  /** маршруты лейаута */
  routes: IRoute[];
}

/**  */
export interface IRoutesLayout {
  [propName: string]: ILayout;
}

/** Пропсы которые принимает метод */
export interface IRoutesDecoratorProps {
  /** Список всех маршрутов из модулей */
  routes: IRoute[];
  /** конфиг для лейаутов */
  routesLayout?: IRoutesLayout;
  /** JSX компонент страницы 404 */
  PageNotFound?: any;
}

/** */
export const _defaultRoutesLayout: IRoutesLayout = {
  [LAYOUT_ROOT]: {
    layout: LAYOUT_ROOT,
    path: '/',
    component: GetCurrentRouteHOC(layoutApp),
    routes: [],
  },
  [LAYOUT_APP]: {
    layout: LAYOUT_APP,
    path: `/${LAYOUT_APP}`,
    component: GetCurrentRouteHOC(layoutApp),
    routes: [],
  },
  [LAYOUT_ADMIN]: {
    layout: LAYOUT_ADMIN,
    path: `/${LAYOUT_ADMIN}`,
    component: GetCurrentRouteHOC(layoutApp),
    routes: [],
  },
  [LAYOUT_AUTH]: {
    layout: LAYOUT_AUTH,
    path: `/${LAYOUT_AUTH}`,
    component: GetCurrentRouteHOC(layoutApp),
    routes: [],
  },
};

/** */
export const DefaultRoutesDecorator = (props: IRoutesDecoratorProps): IRoutesLayout => {
  const { routes, routesLayout = _defaultRoutesLayout, PageNotFound = _PageNotFound } = props;

  /** */
  routes.forEach((route: IRoute) => {
    /** */
    for (let layoutKey in routesLayout) {
      if (routesLayout.hasOwnProperty(layoutKey)) {
        let layout: ILayout = routesLayout[layoutKey];
        if (layoutKey === route.layout && layout.routes) {
          layout.routes.push({
            ...route,
            /** */
            path: `${layout.path !== '/' ? layout.path : ''}${route.path}`,
          });
        }
      }
    }
  });

  /** */
  for (let layoutKey in routesLayout) {
    if (routesLayout.hasOwnProperty(layoutKey)) {
      let layout: ILayout = routesLayout[layoutKey];
      layout.routes.push({
        component: PageNotFound,
        path: `*`,
      });
    }
  }

  return routesLayout;
};

export default DefaultRoutesDecorator;
