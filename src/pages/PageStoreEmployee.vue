<template>
  <v-container fluid :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
    <v-card class="elevation-24" shaped>
      <v-toolbar>
        <v-toolbar-title>
          Tienda/Empleado
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon>{{ icons.storeEmployee }} </v-icon>
      </v-toolbar>
    </v-card>

    <v-row>
      <v-col cols="12" sm="12" md="6">
        <transition mode="out-in">
          <StoreCreate v-if="CRUDButton === 'C'" />
          <StoreRead v-else-if="CRUDButton === 'R'" />
          <StoreUpdate v-else-if="CRUDButton === 'U'" />
        </transition>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <EmployeeRead />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { icons } from '../data/icons';

export default {
  name: 'PageSoreEmployee',
  data: () => ({ icons: icons }),
  components: {
    StoreCreate: () =>
      import('../components/settings/storeEmployee/StoreCreate'),
    StoreRead: () => import('../components/settings/storeEmployee/StoreRead'),
    StoreUpdate: () =>
      import('../components/settings/storeEmployee/StoreUpdate'),
    EmployeeRead: () =>
      import('../components/settings/storeEmployee/EmployeeRead'),
  },
  computed: {
    ...mapState('store', ['CRUDButton']),
  },
};
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
