import * as React from 'react';
import { ErrorComponent, DefaultLayoutController, LoadingComponent } from '../components';
import CreateRoutes from './CreateRoutes';
import {
  DefaultRoutesDecorator,
  IRoutesDecoratorProps,
  IRoutesLayout,
} from '../decorators/DefaultRoutesDecorator';
import DefaultComponentDecorator from '../decorators/DefaultComponentDecorator';
import { RouteProps } from 'react-router';

export interface IRoute extends RouteProps {
  /** промис возвращающий JSX*/
  load?: any;
  /** тип проверки пути (обратитесь в документацию react-router */
  exact?: boolean;
  /** Название маршрута */
  name?: string;
  /** путь */
  path?: string;
  /** дочерние маршруты */
  routes?: IRoute[] | IRoutesLayout;

  [propName: string]: any;
}

export interface IModule {
  /** Список маршрутов модуля */
  routes?: IRoute[];
  /** Название модуля */
  moduleName: string;

  [propName: string]: any;
}

export interface IConfigRouter {
  /** Список модулей */
  modules?: IModule[];
  /** */
  _routes?: IRoute[];
  /** Компонент определяющий к какому лейауту отноится текущий маршрут */
  layoutController?: any;
  /** прелоадер для асинхронной загрузке страницы */
  LoadingComponent?: JSX.Element;
  /** компонент ошибки для асинхронной загрузке страницы */
  ErrorComponent?: JSX.Element;

  /** это декоратор для компонентов страниц, в нем можно выполнять какие либо проверки либо загрузки перед тем как компонент будет загружен */
  componentDecorator?(
    route: IRoute,
    LoadingComponent?: React.FC,
    ErrorComponent?: React.FC,
  ): JSX.Element;

  /** метод сортирует маршруты по слоям */
  routesDecorator?(props: IRoutesDecoratorProps): IRoutesLayout;

  [propName: string]: any;
}

/** */
const getRoutesWithModules = (
  modules: IModule[],
  errorComponent: JSX.Element,
  loadingComponent: JSX.Element,
  componentDecorator: any,
): IRoute[] => {
  let routes: IRoute[] = [];

  /** */
  modules.map(({ moduleName, routes: moduleRoutes }) => {
    if (moduleRoutes) {
      routes = [
        ...routes,
        ...CreateRoutes(
          moduleRoutes,
          [],
          moduleName,
          errorComponent,
          loadingComponent,
          componentDecorator,
        ),
      ];
      return null;
    }
    console.error(
      `ERROR:in the module "${moduleName}" there is no property "routes".
        Add the property "routes" to the module "${moduleName}" and determine at least
        one route otherwise the module will be inaccessible to users.`,
    );
    return null;
  });

  return routes;
};

/** */
export const CreateRouterConfig = (props: IConfigRouter): IRoute[] => {
  const {
    modules,
    _routes,
    layoutController = DefaultLayoutController,
    loadingComponent = LoadingComponent,
    errorComponent = ErrorComponent,
    componentDecorator = DefaultComponentDecorator,
    routesDecorator = DefaultRoutesDecorator,
  } = props;

  /** */
  let routes: IRoute[] = [];

  if (modules) {
    routes = getRoutesWithModules(modules, errorComponent, loadingComponent, componentDecorator);
  } else if (_routes) {
    routes = _routes;
  }

  /** Если есть декоратор на лейауты */
  if (routesDecorator) {
    return [
      {
        component: layoutController,
        routes: routesDecorator({ routes: routes }),
      },
    ];
  }
  return [
    {
      component: layoutController,
      routes,
    },
  ];
};

export default CreateRouterConfig;
