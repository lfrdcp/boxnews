<template>
  <v-container fluid :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
    <v-card class="elevation-24" shaped>
      <v-toolbar>
        <v-toolbar-title>Perfil</v-toolbar-title>
        <v-spacer></v-spacer>
        <ButtonCircular
          @click.native="setUser()"
          tooltip="Recargar"
          color="blue"
          :icon="icons.load"
        />
      </v-toolbar>
      <v-card-actions v-if="loading">
        <ProgressLinear v-bind:loading="loading" color="primary" />
      </v-card-actions>
    </v-card>

    <v-row>
      <v-col cols="12" sm="12" md="6">
        <ProfileRead />
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <ProfileUpdate />
      </v-col>
    </v-row>
    <Snackbar
      :icon="snackbarIcon"
      :state="snackbarState"
      :color="snackbarColor"
      :content="snackbarContent"
    />
  </v-container>
</template>
<script>
import { icons } from '../data/icons';
import { errorUser } from '../data/errors';
import { mixinUser, mixinSnackbar } from '../mixins/mixins.js';

export default {
  name: 'PageProfile',
  data: () => ({
    icons: icons,
    errorUser: errorUser,
  }),
  mixins: [mixinUser, mixinSnackbar],
  components: {
    ProfileRead: () => import('../components/settings/profile/ProfileRead'),
    ProfileUpdate: () => import('../components/settings/profile/ProfileUpdate'),
    ButtonCircular: () => import('../components/button/ButtonCircular'),
    ProgressLinear: () => import('../components/progressLinear/ProgressLinear'),
    Snackbar: () => import('../components/snackbar/SnackbarDinamic'),
  },
};
</script>
