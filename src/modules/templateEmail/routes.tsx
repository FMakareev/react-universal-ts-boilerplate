import { LAYOUT_RENDER_EMAIL } from '../../shared/layouts';

export const routes: any[] = [
  {
    layout: LAYOUT_RENDER_EMAIL,
    exact: true,
    name: 'Registration Confirmation',
    path: '/registration-confirmation',
    order: 0,
    hidden: false,
    load: () =>
      import(/* webpackChunkName: "RegistrationConfirmation" */ './view/registrationConfirmation'),
    resolvers: [],
  },
];

export default routes;
