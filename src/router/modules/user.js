import PageEditUser from '../../pages/PageDashboard/PageUser/PageEditUser.vue';
import PageSearchUser from '../../pages/PageDashboard/PageUser/PageSearchUser.vue';

export default [
  {
    path: '/EditUser',
    component: PageEditUser,
    name: 'EditUser',
    meta: { owner: true },
  },
  {
    path: '/SearchUser',
    component: PageSearchUser,
    name: 'SearchUser',
    meta: { owner: true },
  },
];