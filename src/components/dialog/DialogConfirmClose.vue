<template>
  <div class="text-center ">
    <v-dialog
      transition
      v-model="dialog"
      :width="$vuetify.breakpoint.mobile ? `90%` : `15%`"
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" dark fab x-small :color="color">
          <!-- AQUI INICIA EL TOOLTIP, TIENE LOS MISMOS ACTIVATOR QUE EL DIALOG, HAY QUE TENER CUIDADO -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <!-- SE MOSTRARA EL TOOLTIP CUANDO SE PASE POR EL ICONO, NO EL BOTON -->
              <v-icon v-bind="attrs" v-on="on">{{ icon }}</v-icon>
            </template>
            <span>{{ tooltip }}</span>
          </v-tooltip>
        </v-btn>
      </template>

      <v-card class="elevation-24" dark shaped>
        <v-toolbar color="red" dark>
          {{ title }}
        </v-toolbar>
        <br />
        <v-card-text>
          {{ content }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="[parentMethod(), (dialog = false)]" dark>
            {{ textButtonConfirm }}
          </v-btn>
          <v-btn @click="dialog = false" dark>
            {{ textButtonClose }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'DialogConfirmClose',
  data: () => ({
    dialog: false,
  }),
  props: {
    parentMethod: { type: Function },
    title: { type: String },
    content: { type: String },
    textButtonClose: { type: String },
    textButtonConfirm: { type: String },
    color: { type: String },
    icon: { type: String },
    tooltip: { type: String },
  },
};
</script>
