import Vue from 'vue';

import VueRouter from 'vue-router';
import axios from 'axios';
Vue.use(VueRouter);

import PageInicio from '../pages/PageInicio.vue';

import sign from './modules/sign';
import dashboard from './modules/dashboard';
import task from './modules/task';
import profile from './modules/profile';
import storeEmployee from './modules/storeEmployee';
import publication from './modules/publication';
import user from './modules/user';

const routes = [
  //TODAS LAS RUTAS QUE NO NECESITEN INICIAR SESION
  ...sign,
  //TODAS LAS RUTAS QUE NECESITAN INICIAR SESION
  {
    path: '/pagecontent',
    component: PageInicio,
    children: [...dashboard, ...task, ...profile, ...storeEmployee, ...publication, ...user],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  setToken();

  // SI EL USUARIO ES  DUEÑO
  if (to.matched.some((record) => record.meta.owner)) {
    console.log('entro a validar dueño');
    if (localStorage.getItem('type_user') === '0') next();
    else
      next({
        name: 'dashboard',
      });

    // SI EL USUARIO ES EMPLEADO
  } else if (to.matched.some((record) => record.meta.employee)) {
    console.log('entro a validar empleado');
    if (localStorage.getItem('type_user') === '1') next();
    else
      next({
        name: 'dashboard',
      });
  }
  //SINO ESTA AUTENTICADO
  else if (to.matched.some((record) => record.meta.noAuth)) {
    if (localStorage.getItem('type_user') === null) {
      next();
    } else {
      switch (localStorage.getItem('type_user')) {
        case '0':
          next({ name: 'dashboard' });
          break;
        case '1':
          next({ name: 'dashboard' });
          break;
        default:
          localStorage.clear();
          next({ name: 'login' });
          break;
      }
    }
  } else {
    //SINO SE REQUIERE DE NINGUNA VALIDACIÓN
    next();
  }
});

const setToken = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('QpKWqBXI');
};
export default router;
