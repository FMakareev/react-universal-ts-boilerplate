const has = Object.prototype.hasOwnProperty;

// TODO: типизировать аргументы

export const CreateRoutes = (
  modulesRoutes: any[],
  newRoutes: any[],
  moduleName: string,
  ErrorComponent: any,
  LoadingComponent: any,
  componentDecorator: any,
): any => {
  const routes = newRoutes;

  if (!modulesRoutes) return null;

  for (let i = 0; i < modulesRoutes.length; i += 1) {
    if (has.call(modulesRoutes[i], 'load')) {
      if (!modulesRoutes[i].path) {
        console.error(
          `Error: in the module ${moduleName} in one of the routes there is no property "path".`,
        );
      }

      routes.push({
        ...modulesRoutes[i],
        component: componentDecorator(modulesRoutes[i], LoadingComponent, ErrorComponent),
      });
    } else if (has.call(modulesRoutes[i], 'component')) {
      if (!modulesRoutes[i].path) {
        console.error(
          `Error: in the module ${moduleName} in one of the routes there is no property "path".`,
        );
      }
      routes.push(modulesRoutes[i]);
    } else if (has.call(modulesRoutes[i], 'routes')) {
      routes.push({
        ...modulesRoutes[i],
        routes: [
          ...CreateRoutes(
            modulesRoutes[i].routes,
            [],
            moduleName,
            ErrorComponent,
            LoadingComponent,
            componentDecorator,
          ),
        ],
      });
    } else {
      console.error(
        `Error: in the module ${moduleName} there is no component at
            the address ${
              modulesRoutes[i].path
            }. Make sure that you added the "load: () => import('...')"
            property with the component import or React component. `,
      );
    }
  }
  return routes;
};

export default CreateRoutes;
