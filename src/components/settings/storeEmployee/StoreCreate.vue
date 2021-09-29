<template>
  <v-card>
    <h1>crear tienda</h1>
    <v-btn small @click="create()">Normal</v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'StoreUpdate',
  methods: {
    create() {
      this.$store.commit('store/setCRUDButton', 'R');
    },
  },
};
</script>
