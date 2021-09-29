<template>
  <v-card class="elevation-24" shaped>
    <v-toolbar dark>
      <v-toolbar-title>Editar tarea</v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" sm="12">
              <v-card dark>
                <v-card-text class="ma-0 pa-0" v-show="step">
                  <v-time-picker
                    color="orange"
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
                    color="orange"
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
                    <v-btn color="orange" text @click="step = false">
                      Fecha
                    </v-btn>
                    <v-btn color="orange" text @click="step = true">
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
                v-model="selectedEvent.name"
                :prepend-icon="icons.title"
                outlined
                color="orange"
                required
              />
              <v-textarea
                label="Descripción"
                name="descripcion"
                v-model="selectedEvent.details"
                outlined
                color="orange"
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
            color="orange"
            @click="updateTask()"
            type="submit"
            :disabled="!valid"
            >Editar</v-btn
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
import { mapState } from 'vuex';
export default {
  name: 'TaskUpdate',
  mixins: [mixinSnackbar],
  components: {
    Snackbar: () => import('../snackbar/SnackbarDinamic'),
  },
  props: {
    parentMethod: { type: Function },
    selectedEvent: { type: Object },
  },
  data: () => ({
    step: false,
    menu2: false,
    valid: false,
    icons: icons,
    picker: '',
    date: '',
  }),
  //PRIMERO SE MONTA LA INFORMACIÓN CON LOS PROPS
  mounted() {
    this.picker = this.selectedEvent.start.substr(10);
    this.date = this.selectedEvent.start.substr(0, 10);
  },
  //SE OBSERVA SI CAMBIO EL PROPS Y REASIGNA
  watch: {
    selectedEvent(val) {
      this.picker = val.start.substr(10);
      this.date = val.start.substr(0, 10);
      console.log('cambio');
    },
  },
  //SE VUELVE A CONCATENAR LA FECHA Y HORA
  computed: {
    dateAndTime() {
      return this.date + this.picker;
    },
    ...mapState('task', ['events']),
  },
  methods: {
    async updateTask() {
      try {
        this.loginLoading = true;
        let params = {
          nameStoreDataBase: 'tienda1_dev',
          idTask: this.selectedEvent.id,
          name: this.selectedEvent.name,
          details: this.selectedEvent.details,
          start: this.dateAndTime,
          end: this.dateAndTime,
          color: this.selectedEvent.color,
        };

        let response = await axios.post(URL + 'api/user/updatetask', params);

        console.table(response.data);
        if (response.data.status === 'c8tsk1') {
          delete params.nameStoreDataBase;

          const filter = this.events.filter((i) => i.id !== params.idTask);
          filter.push(params);

          this.$store.commit('task/setTasks', filter);
          this.setSnackbar(this.icons.check, 'success', successTask.updated);
          (this.title = ''), (this.description = ''); // this.$refs.form.reset();
          setTimeout(() => this.parentMethod(), 5000);
        } else if (response.data.status === '444') {
          this.setSnackbar(this.icons.error, 'red', errorTask.updStaDB);
        }
      } catch (error) {
        const m = errorTask;
        this.setSnackbarCatch(error, m.upd404, m.upd500, m.updUn);
      } finally {
        this.loginLoading = false;
      }
    },
  },
};
</script>
