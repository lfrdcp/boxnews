import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import VueAxios from 'vue-axios';
import axios from 'axios';
import VueTour from 'vue-tour';
require('pusher-js');
require('vue-tour/dist/vue-tour.css');

Vue.use(VueAxios, axios);
Vue.use(VueTour);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
