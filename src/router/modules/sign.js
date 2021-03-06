import PageError404 from '../../pages/PageError404.vue';
import PageLogin from '../../pages/PageLogin.vue';
import PageRegister from '../../pages/PageRegister.vue';
import PageMain from '../../pages/PageMain.vue';

export default [
  {
    path: '*',
    component: PageError404,
  },
  {
    path: '/',
    component: PageMain,
    meta: { noAuth: true },
  },
  {
    path: '/login',
    component: PageLogin,
    name: 'login',
    meta: { noAuth: true },
  },
  {
    path: '/register',
    component: PageRegister,
    name: 'register',
    meta: { noAuth: true },
  },
];
