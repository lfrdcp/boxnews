<template>
  <v-card class="elevation-24">
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" mensaje-tour="4" />
      <v-spacer />
      <DialogNotifications :notifications="2" />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="logout()" v-bind="attrs" v-on="on">
            <v-icon v-text="icons.power" />
          </v-btn>
        </template>
        <span v-text="`Cerrar sesion`" />
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer
      dark
      v-model="drawer"
      app
      class="elevation-24"
      mensaje-tour="1"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="user.img" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="user.name" />
            <v-list-item-subtitle
              v-text="user.type === 0 ? `Dueño` : `Empleado`"
            />
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider />

      <v-list dense>
        <ListItemSingle
          link="/dashboard"
          :icon="icons.dashboard"
          text="Dashboard"
        />
        <ListItemSingle link="/tareas" :icon="icons.task" text="Tareas" />

        <v-list-group no-action :prepend-icon="icons.settings" color="white">
          <template v-slot:activator>
            <v-list-item-content mensaje-tour="2">
              <v-list-item-title v-text="`Configuración`" />
            </v-list-item-content>
          </template>

          <ListItemGroup
            link="/profile"
            :icon="icons.fingerprint"
            text="Perfil"
          />

          <ListItemGroup
            link="/storeEmployee"
            :icon="icons.storeEmployee"
            text="Tienda/Empleado"
          />
        </v-list-group>
      </v-list>
      <template v-slot:append>
        <v-container class="text-center">
          <v-img
            :src="require(`../../assets/BoxcodeLogoBlanco.png`)"
            aspect-ratio="4"
            contain
          />
        </v-container>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { icons } from '../../data/icons'

export default {
  name: 'Navigation',
  data: () => ({
    icons: icons,
    drawer: null,
    time: '',
    date: '',
  }),
  components: {
    ListItemSingle: () => import('./ListItemSingle'),
    ListItemGroup: () => import('./ListItemGroup'),
    DialogNotifications: () => import('../dialog/DialogNotifications'),
  },
  computed: {
    ...mapState('user', ['user']),
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>
