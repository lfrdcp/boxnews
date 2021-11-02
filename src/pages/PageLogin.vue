<template>
  <v-main>
    <v-container fluid :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
      <Login />
    </v-container>
  </v-main>
</template>

<script>
import { icons } from '../data/icons';

export default {
  name: 'PageLoginlogin',
  components: {
    Login: () => import('../components/login/Login')
  },
  data: () => ({
    icons: icons,
  }),
};
</script>
