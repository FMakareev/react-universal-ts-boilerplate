import { LAYOUT_ROOT } from '../router/shared/layouts';

export const routes: any[] = [
  {
    layout: LAYOUT_ROOT,
    exact: true,
    name: 'Home',
    path: '/',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: "Home" */ './view/home'),
    resolvers: [],
  },
];

export default routes;
