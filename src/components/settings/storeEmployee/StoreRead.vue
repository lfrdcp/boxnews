<template>
  <v-card class="elevation-24" shaped>
    <v-toolbar dark>
      <v-toolbar-title v-text="`Tiendas`" />
      <v-spacer />
      <v-icon v-text="icons.text" />
      <ButtonAbsolute
        @click.native="create()"
        tooltip="Crear tienda"
        color="primary"
        :icon="icons.create"
      />
    </v-toolbar>
    <v-card-text>
      <v-container>
        <v-select :items="items" label="Seleccione una tienda" outlined />
        <v-card>
          <v-toolbar dark>
            <v-toolbar-title>Tienda 1</v-toolbar-title>
          </v-toolbar>
          <ListItem :icon="icons.location" title="Dirección" />
          <v-divider inset />
          <v-row>
            <v-col>
              <ListItem title="Zempoala" subtitle="Calle" />
              <ListItem title="30" subtitle="No. interior" />
              <ListItem title="25" subtitle="No. exterior" />
            </v-col>
            <v-col>
              <ListItem title="Flor" subtitle="Colonia" />
              <ListItem title="Cuernavaca" subtitle="Ciudad" />
              <ListItem title="Morelos" subtitle="Estado" />
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <ButtonCircular
        tooltip="Editar tienda"
        @click.native="update()"
        color="orange"
        :icon="icons.update"
      />
      <DialogConfirmClose
        color="red"
        title="¿Estas seguro de elimiar la tienda?"
        content="Una vez eliminada la tienda, no se podra recuperar"
        textButtonConfirm="Eliminar tienda"
        textButtonClose="Cancelar"
        :icon="icons.delete"
        :parentMethod="exampleAlert"
        tooltip="Eliminar tienda"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { icons } from '../../../data/icons';
export default {
  name: 'StoreRead',
  components: {
    ButtonCircular: () => import('../../button/ButtonCircular'),
    ListItem: () => import('../../listItem/ListItem'),
    ButtonAbsolute: () => import('../../button/ButtonAbsolute'),
    DialogConfirmClose: () => import('../../dialog/DialogConfirmClose'),
  },
  data: () => ({
    items: ['Tienda 1', 'Tienda 2', 'Tienda 3', 'Tienda 4'],
    icons: icons,
  }),

  methods: {
    exampleAlert() {
      alert('Eliminar tienda');
    },
    update() {
      this.$store.commit('store/setCRUDButton', 'U');
    },
    create() {
      this.$store.commit('store/setCRUDButton', 'C');
    },
  },
};
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
