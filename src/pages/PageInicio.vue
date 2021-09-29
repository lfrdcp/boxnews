<template>
  <v-main>
    <v-tour name="myTour" :steps="steps" :options="myOptions"></v-tour>
    <Navigation />
    <router-view />
    <Snackbar
      :icon="snackbarIcon"
      :state="snackbarState"
      :color="snackbarColor"
      :content="snackbarContent"
    />
  </v-main>
</template>

<script>
import axios from 'axios';
import { URL } from '../data/url';
import { icons } from '../data/icons';
import { errorUser } from '../data/errors';
import { mixinSnackbar, mixinUser } from '../mixins/mixins';
import { steps, myOptions } from '../data/vueTour';

export default {
  name: 'PageInicio',
  mixins: [mixinSnackbar, mixinUser],
  components: {
    Navigation: () => import('../components/navigation/Navigation'),
    Snackbar: () => import('../components/snackbar/SnackbarDinamic'),
  },
  data: () => ({
    icons: icons,
    errorUser: errorUser,
    myOptions: myOptions,
    steps: steps,
  }),
  created() {
    this.setUser();
  },
  async beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('QpKWqBXI') !== null) {
      try {
        await axios.get(URL + 'api/user/vtoken');
        console.log('token correcto');
        next();
      } catch (error) {
        console.log('token incorrecto');
        localStorage.clear();
        next({ name: 'login' });
      }
    } else {
      console.log('token null');
      localStorage.clear();
      next({ name: 'login' });
    }
  },
  // mounted: function() {
  //   this.$tours['myTour'].start();
  // },
};
</script>
