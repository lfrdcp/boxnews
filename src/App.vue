<template>
  <v-app id="app">
    <v-container class="fill-height" fluid>
      <router-view />
    </v-container>
    <Footer v-if="footer" />
  </v-app>
</template>

<script>
import Footer from './components/footer/Footer';
export default {
  name: 'App',
  components: {
    Footer,
  },
  data: () => ({
    token: null,
    drawer: null,
  }),
  computed: {
    footer() {
      return this.$route.path === '/login' || this.$route.path === '/register'
        ? true
        : false;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Abel&family=Manrope&family=Montserrat:ital,wght@0,100;0,200;1,200&family=Permanent+Marker&display=swap');

.v-application {
  font-family: 'Abel', sans-serif !important;
}

#app {
  /* background-image: linear-gradient(#e1e1fd, #1e96fc); */
  background-color: #13131b;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
