<template>
  <v-main>
    <v-container fluid :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
      <Register />
    </v-container>
  </v-main>
</template>
<script>
export default {
  name: 'PageRegister',
  components: {
    Register: () => import('../components/register/Register'),
  },
};
</script>
