<template>
  <v-card class="elevation-24" shaped>
    <v-toolbar dark>
      <v-toolbar-title>Crear tarea</v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" sm="12">
              <v-card dark>
                <v-card-text class="ma-0 pa-0" v-show="step">
                  <v-time-picker
                    color="blue"
                    full-width
                    dark
                    flat
                    scrollable
                    locale="es"
                    use-seconds
                    v-model="picker"
                  />
                </v-card-text>
                <v-card-text class=" ma-0 pa-0" v-show="!step">
                  <v-date-picker
                    color="blue"
                    full-width
                    dark
                    flat
                    scrollable
                    locale="es"
                    v-model="date"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-row align="center" justify="center">
                    <v-btn color="blue" text @click="step = false">
                      Fecha
                    </v-btn>
                    <v-btn color="blue" text @click="step = true">
                      Hora
                    </v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="dateAndTime"
                :prepend-icon="icons.calendar"
                outlined
                disabled
              />
              <v-text-field
                label="Titulo"
                name="titulo"
                v-model="title"
                :prepend-icon="icons.title"
                outlined
                color="blue"
                required
              />
              <v-textarea
                label="Descripción"
                name="descripcion"
                v-model="description"
                outlined
                color="blue"
                required
                rows="5"
                auto-grow
                :prepend-icon="icons.description"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-row justify="center">
        <v-col cols="6">
          <v-btn block dark @click="parentMethod()">
            Cerrar
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            dark
            block
            color="blue"
            @click="createTask()"
            type="submit"
            :disabled="!valid"
            >Crear</v-btn
          >
        </v-col>
      </v-row>

      <Snackbar
        :icon="snackbarIcon"
        :state="snackbarState"
        :color="snackbarColor"
        :content="snackbarContent"
      />
    </v-container>
  </v-card>
</template>
<script>
import axios from 'axios';
import { URL } from '../../data/url';
import { icons } from '../../data/icons';
import { errorTask } from '../../data/errors';
import { successTask } from '../../data/sucess';
import { mixinSnackbar } from '../../mixins/mixins.js';

export default {
  name: 'TaskCreate',
  mixins: [mixinSnackbar],
  components: {
    Snackbar: () => import('../snackbar/SnackbarDinamic'),
  },
  props: {
    parentMethod: { type: Function },
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    step: false,
    picker: new Date().toLocaleTimeString(),
    title: '',
    description: '',
    menu2: false,
    valid: false,
    icons: icons,
  }),
  computed: {
    dateAndTime() {
      return this.date.substr(0, 10) + ' ' + this.picker;
    },
  },
  methods: {
    async createTask() {
      try {
        this.loginLoading = true;
        let params = {
          nameStoreDataBase: 'tienda1_dev',
          start: this.dateAndTime,
          end: this.dateAndTime,
          name: this.title,
          color: 'blue',
          details: this.description,
        };
        let response = await axios.post(URL + 'api/user/registertask', params);
        if (response.data.status === 'c8tsk0') {
          this.$store.commit('task/setAddTask', response.data.task);
          this.setSnackbar(this.icons.check, 'success', successTask.created);
          (this.title = ''), (this.description = ''); // this.$refs.form.reset();
          setTimeout(() => this.parentMethod(), 5000);
        } else if (response.data.status === '444') {
          this.setSnackbar(this.icons.error, 'red', errorTask.createDB);
        }
      } catch (error) {
        const m = errorTask;
        this.setSnackbarCatch(error, m.create404, m.create500, m.createUn);
      } finally {
        this.loginLoading = false;
      }
    },
  },
};
</script>
