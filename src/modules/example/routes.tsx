import { LAYOUT_ROOT } from '../router/shared/layouts';

export const routes: any[] = [
  {
    layout: LAYOUT_ROOT,
    exact: true,
    name: 'example',
    path: '/example',
    load: () => import(/* webpackChunkName: "ExamplePage" */ './view/example'),
  },
];

export default routes;
