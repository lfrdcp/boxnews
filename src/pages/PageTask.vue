<template>
  <v-container fluid :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
    <v-card class="elevation-24" shaped>
      <v-toolbar>
        <v-toolbar-title>Calendario de tarea</v-toolbar-title>
        <v-spacer></v-spacer>
        <ButtonCircular
          @click.native="setTasks()"
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
      <v-col>
        <Calendar />
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
import axios from 'axios';
import { icons } from '../data/icons';
import { URL } from '../data/url';
import { errorTask } from '../data/errors';
import { mixinSnackbar } from '../mixins/mixins.js';

export default {
  name: 'Home',
  mixins: [mixinSnackbar],
  data: () => ({
    time: '',
    date: '',
    icons: icons,
    loading: '',
  }),
  components: {
    Calendar: () => import('../components/calendar/Calendar'),
    ProgressLinear: () => import('../components/progressLinear/ProgressLinear'),
    ButtonCircular: () => import('../components/button/ButtonCircular'),
    Snackbar: () => import('../components/snackbar/SnackbarDinamic'),
  },
  async mounted() {
    await this.setTasks();
  },
  methods: {
    async setTasks() {
      try {
        this.loading = true;
        let response = await axios.post(URL + 'api/user/tasks', {
          nameStoreDataBase: 'tienda1_dev',
        });
        this.$store.commit('task/setTasks', response.data.tasks);
      } catch (error) {
        if (error.response.status === 404) {
          this.setSnackbar(this.icons.error, 'red', errorTask.read404);
        } else if (error.response.status === 500) {
          this.setSnackbar(this.icons.error, 'red', errorTask.read500);
        } else {
          this.setSnackbar(this.icons.error, 'red', errorTask.readUn);
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
