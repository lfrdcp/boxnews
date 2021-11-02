<template>
  <v-main>
    <v-container fluid :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
      <forgotpassword />
    </v-container>
  </v-main>
</template>
<script>
export default {
  name: 'PageForgotPassword',
  components: {
    forgotpassword: () => import('../components/forgotpassword/ForgotPassword'),
  },
};
</script>
