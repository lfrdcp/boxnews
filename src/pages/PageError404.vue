<template>
  <v-main>
    <v-container>
      <v-row align="center" justify="center">
        <v-container>
          <v-btn to="/dashboard" block dark>Regresar</v-btn></v-container
        >
        <h1>
          La página que intentas buscar no se encontro
        </h1>
        <NotFound />
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
export default {
  name: 'PageError404',
  components: {
    NotFound: () => import('../assets/img/NotFound.svg'),
  },
};
</script>
