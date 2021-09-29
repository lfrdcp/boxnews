<template>
  <v-card class="elevation-24" shaped>
    <v-toolbar dark>
      <v-toolbar-title>Tareas para hoy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>{{ icons.task }} </v-icon>
      <ButtonAbsolute
        @click.native="$store.commit('task/setCRUDButton', 'C')"
        tooltip="Crear"
        color="primary"
        :icon="icons.create"
      />
    </v-toolbar>

    <v-card-text>
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <TimeLine
          v-for="task in tasks"
          :key="task.id"
          :titulo="task.title"
          :date="task.date"
          :contenido="task.description"
          :id="task.id"
          color="primary"
        />
      </v-timeline>
    </v-card-text>
    <v-container> </v-container>
  </v-card>
</template>

<script>
import { icons } from '../../data/icons';
import { mapState } from 'vuex';

export default {
  name: 'TaskRead',
  components: {
    TimeLine: () => import('../timeLine/TimeLine'),
    ButtonAbsolute: () => import('../button/ButtonAbsolute'),
  },
  data: () => ({
    icons: icons,
  }),
  computed: {
    ...mapState('task', ['tasks']),
  },
  mounted() {
    // window.Echo = new Echo({
    //   broadcaster: 'pusher',
    //   key: '085553fa518ea5fefd0e',
    //   wsHost: '192.168.0.103',
    //   wsPort: 6001,
    //   disableStats: true,
    //   forceTLS: false,
    // });
    // window.Echo.channel('DemoChannel').listen('WebsocketDemoEvent', (e) => {
    //   this.mensaje.push(e.somedata);
    //   console.log(e);
    // });
  },
};
</script>
