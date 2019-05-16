import { LAYOUT_AUTH } from '../../shared/layouts';

export const routes: any[] = [
  {
    layout: LAYOUT_AUTH,
    exact: true,
    name: 'login',
    path: '/',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: "LoginPage" */ './view/login'),
    resolvers: [],
  },
  {
    layout: LAYOUT_AUTH,
    exact: true,
    name: 'login',
    path: '/login',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: "LoginPage" */ './view/login'),
    resolvers: [],
  },
  {
    layout: LAYOUT_AUTH,
    exact: true,
    name: 'passwordRecovery',
    path: '/passwordRecovery',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: "PasswordRecoveryPage" */ './view/passwordRecovery'),
    resolvers: [],
  },
  {
    layout: LAYOUT_AUTH,
    exact: true,
    name: 'registration',
    path: '/registration',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: "RegistrationPage" */ './view/registration'),
    resolvers: [],
  },
];

export default routes;
