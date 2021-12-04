import PageCreatePublication from '../../pages/PageDashboard/PagePublication/PageCreatePublication';
import PageEditPublication from '../../pages/PageDashboard/PagePublication/PageEditPublication';
import PageOnlyPublication from '../../pages/PageDashboard/PagePublication/PageOnlyPublication';
import PageSearchPublication from '../../pages/PageDashboard/PagePublication/PageSearchPublication';

export default [
  {
    path: '/createPublication',
    component: PageCreatePublication,
    name: 'createPublication',
    meta: { owner: true },
  },
  {
    path: '/editPublication',
    component: PageEditPublication,
    name: 'editPublication',
    meta: { owner: true },
  },
  {
    path: '/onlyPublication',
    component: PageOnlyPublication,
    name: 'onlyPublication',
    meta: { owner: true },
  },
  {
    path: '/searchPublication',
    component: PageSearchPublication,
    name: 'searchPublication',
  },

];

