<template>
  <v-main>
    <v-container fluid :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
      <resetpassword />
    </v-container>
  </v-main>
</template>
<script>
export default {
  name: 'PageResetPassword',
  components: {
    resetpassword: () => import('../components/resetpassword/ResetPassword'),
  },
};
</script>
