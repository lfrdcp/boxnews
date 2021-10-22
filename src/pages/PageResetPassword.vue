<template>
  <v-main>
    <v-container fluid :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
      <ResetPassword />
    </v-container>
  </v-main>
</template>

<script>

export default {
  name: 'PageResetPassword',
  components: {
    ResetPassword: () => import('../components/resetpassword/ResetPassword')
  }
};
</script>
