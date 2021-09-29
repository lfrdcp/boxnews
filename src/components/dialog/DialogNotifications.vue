<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click.stop="dialog = true">
          <v-badge
            :content="notifications"
            :value="notifications"
            overlap
            bottom
            left
          >
            <v-icon>{{ icons.notification }}</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <span>Notificaciones</span>
    </v-tooltip>

    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        :width="$vuetify.breakpoint.mobile ? `90%` : `15%`"
      >
        <v-card class="elevation-24" shaped>
          <v-toolbar dark>
            <v-toolbar-title>
              {{ notifications }} Notificaciones
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon color="blue">{{ icons.notification }}</v-icon>
          </v-toolbar>

          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Notificación</th>
                    <th class="text-left">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Ya casi se acerca tu pago
                    </td>
                    <td>
                      <DialogConfirmClose
                        color="red"
                        title="¿Estas seguro de elimiar la notificación?"
                        content="Una vez eliminada la notificación, no se podra recuperar"
                        textButtonConfirm="Eliminar notificación"
                        textButtonClose="Cancelar"
                        :icon="icons.delete"
                        tooltip="Eliminar notificación"
                        v-bind:elevation="true"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Ya casi se acerca tu pago
                    </td>
                    <td>
                      <DialogConfirmClose
                        color="red"
                        title="¿Estas seguro de elimiar la notificación?"
                        content="Una vez eliminada la notificación, no se podra recuperar"
                        textButtonConfirm="Eliminar notificación"
                        textButtonClose="Cancelar"
                        :icon="icons.delete"
                        tooltip="Eliminar notificación"
                        v-bind:elevation="true"
                      />
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">
              Disagree
            </v-btn>

            <v-btn color="green darken-1" text @click="dialog = false">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { icons } from '../../data/icons';
export default {
  name: 'DialogNotifications',
  components: {
    DialogConfirmClose: () => import('../dialog/DialogConfirmClose'),
  },
  props: {
    notifications: { type: Number },
  },
  data: () => ({
    icons: icons,
    dialog: false,
  }),
};
</script>
