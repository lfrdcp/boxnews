<template>
  <v-card class="elevation-24" shaped>
    <v-toolbar dark class="justify-center">
      <v-spacer />
      <v-btn text :x-small="$vuetify.breakpoint.mobile" @click="prev">
        <v-icon v-html="icons.back" />
      </v-btn>
      <v-toolbar-title v-if="$refs.calendar" v-html="$refs.calendar.title" />
      <v-btn text :x-small="$vuetify.breakpoint.mobile" @click="next">
        <v-icon v-html="icons.next" />
      </v-btn>
      <v-spacer />
    </v-toolbar>
    <v-toolbar flat>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn dark :small="$vuetify.breakpoint.mobile" v-on="on">
            <v-icon left v-html="icons.search" />
            <span v-html="typeToLabel[type]" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="type = 'month'">
            <v-list-item-title v-text="`MES`" />
          </v-list-item>
          <v-list-item @click="type = 'week'">
            <v-list-item-title v-text="`SEMANA`" />
          </v-list-item>
          <v-list-item @click="type = '4day'">
            <v-list-item-title v-text="`4 DÍAS`" />
          </v-list-item>
          <v-list-item @click="type = 'day'">
            <v-list-item-title v-text="`DÍA`" />
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn
        :small="$vuetify.breakpoint.mobile"
        color="primary"
        @click="dialogCreate = true"
      >
        <v-icon left v-html="icons.create" /> <span v-text="`crear`" />
      </v-btn>
      <v-spacer />
      <v-btn :small="$vuetify.breakpoint.mobile" dark @click="setToday">
        <v-icon left v-html="icons.calendar_today" />
        <span v-text="`Hoy`" />
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-sheet>
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
          locale="es"
        />
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card dark shaped>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-icon left v-html="selectedStatusCurrent" />
              <v-toolbar-title v-html="selectedEvent.name" />
            </v-toolbar>

            <ProgressLinear :loading="loading" color="white" />

            <v-card-text>
              <h5 v-html="selectedEvent.details" />
            </v-card-text>

            <v-card-actions>
              <ButtonCircular
                @click.native="updateStatusTask(selectedEvent)"
                :tooltip="selectedTooltip"
                :color="selectedColor"
                :icon="selectedStatus"
              />
              <ButtonCircular
                @click.native="dialogUpdate = true"
                tooltip="Editar"
                color="orange"
                :icon="icons.update"
              />

              <DialogConfirmClose
                color="red"
                title="¿Estas seguro de elimiar la tarea?"
                content="Una vez eliminada la tarea, no se podra recuperar"
                textButtonConfirm="Eliminar tarea"
                textButtonClose="Cancelar"
                :icon="icons.delete"
                :parentMethod="deleteTask"
                tooltip="Eliminar"
              />
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-card-text>

    <v-dialog
      :fullscreen="$vuetify.breakpoint.mobile"
      v-model="dialogCreate"
      width="35%"
    >
      <TaskCreate :parentMethod="() => (dialogCreate = false)" />
    </v-dialog>

    <v-dialog
      :fullscreen="$vuetify.breakpoint.mobile"
      v-model="dialogUpdate"
      width="35%"
    >
      <TaskUpdate
        :selectedEvent="selectedEventProp"
        :parentMethod="() => (dialogUpdate = false)"
      />
    </v-dialog>
    <Snackbar
      :icon="snackbarIcon"
      :state="snackbarState"
      :color="snackbarColor"
      :content="snackbarContent"
    />
  </v-card>
</template>

<script>
import axios from 'axios';
import { URL } from '../../data/url';
import { icons } from '../../data/icons';
import { mapState } from 'vuex';
import { errorTask } from '../../data/errors';
import { successTask } from '../../data/sucess';
import { mixinSnackbar } from '../../mixins/mixins.js';

export default {
  components: {
    ButtonCircular: () => import('../button/ButtonCircular'),
    DialogConfirmClose: () => import('../dialog/DialogConfirmClose'),
    TaskCreate: () => import('../task/TaskCreate'),
    TaskUpdate: () => import('../task/TaskUpdate'),
    ProgressLinear: () => import('../progressLinear/ProgressLinear'),
    Snackbar: () => import('../snackbar/SnackbarDinamic'),
  },
  mixins: [mixinSnackbar],
  data: () => ({
    dialogCreate: false,
    dialogUpdate: false,
    icons: icons,
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'MES',
      week: 'SEMANA',
      day: 'DÍA',
      '4day': '4 DÍAS',
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    loading: false,
  }),

  computed: {
    ...mapState('task', ['events']),
    selectedEventProp() {
      return Object.assign({}, this.selectedEvent); //Eso hace que se pierda el vinculo del object padre a hijo
    },
    selectedTooltip() {
      return this.selectedEvent.status === 0 ? 'Realizada' : 'Pendiente';
    },
    selectedStatusCurrent() {
      return this.selectedEvent.status === 1
        ? icons.checkbox
        : icons.checkbox_blank;
    },
    selectedStatus() {
      return this.selectedEvent.status === 0
        ? icons.checkbox
        : icons.checkbox_blank;
    },
    selectedColor() {
      return this.selectedEvent.color === 'blue' ? 'green' : 'blue';
    },
  },

  async mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    async updateStatusTask(event) {
      try {
        this.loading = true;
        let response = await axios.post(URL + 'api/user/updatestatustask', {
          idTask: event.id,
          status: event.status,
          nameStoreDataBase: 'tienda1_dev',
        });
        if (response.data.status === 'c8tsk3') {
          event.color = event.color === 'blue' ? 'green' : 'blue';
          event.status = event.status === 1 ? 0 : 1;
          const aux = this.events.filter((i) => i.id !== event.id);
          aux.push(event);
          this.$store.commit('task/setTasks', aux);
        } else if (response.data.status === '1F4tsk3') {
          this.setSnackbar(icons.error, 'red', errorTask.updStaDB);
        }
      } catch (error) {
        const m = errorTask;
        this.setSnackbarCatch(error, m.updSta404, m.updSta500, m.updStaUn);
      } finally {
        this.loading = false;
      }
    },
    async deleteTask() {
      try {
        this.loading = true;
        let response = await axios.post(URL + 'api/user/deletetask', {
          idTask: this.selectedEvent.id,
          nameStoreDataBase: 'tienda1_dev',
        });
        if (response.data.status === 'c8tsk2') {
          const aux = this.events.filter((i) => i.id !== this.selectedEvent.id);
          this.$store.commit('task/setTasks', aux);
          this.setSnackbar(this.icons.check, 'success', successTask.deleted);
          this.selectedOpen = false;
        } else {
          this.setSnackbar(icons.error, 'red', errorTask.deleteTask);
        }
      } catch (error) {
        const m = errorTask;
        this.setSnackbarCatch(error, m.del404, m.del500, m.delUn);
      } finally {
        this.loading = false;
      }
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = '';
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
  },
};
</script>
