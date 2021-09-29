<template>
  <v-container fluid :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
    <v-card class="elevation-24" shaped>
      <v-toolbar>
        <v-toolbar-title>Dashboard</v-toolbar-title>
        <v-spacer></v-spacer>
        <ButtonCircular
          @click.native="setUser()"
          tooltip="Recargar"
          color="blue"
          :icon="icons.load"
        />
      </v-toolbar>
      <!-- <v-card-actions v-if="loading">
        <ProgressLinear v-bind:loading="loading" color="primary" />
      </v-card-actions> -->
    </v-card>

    <v-row>
      <CardWelcome />
      <CardStores />
      <CardEmployees />
      <CardCheckInternet />
    </v-row>
  </v-container>
</template>
<script>
import { icons } from '../../data/icons';

export default {
  name: 'PageDashboard',
  data: () => ({
    icons: icons,
    icon: 'check',
    msg: '',
    color: 'success',
  }),

  components: {
    ButtonCircular: () => import('../../components/button/ButtonCircular'),

    CardStores: () => import('./CardStores'),
    CardWelcome: () => import('./CardWelcome'),
    CardEmployees: () => import('./CardEmployees'),
    CardCheckInternet: () => import('./CardCheckInternet'),
  },
};
</script>
