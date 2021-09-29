<template>
  <v-col cols="12" sm="12" md="6">
    <CardDark title="">
      <v-card-text>
        <v-container class="text-center">
          <h3>¡ Hola {{ $store.state.user.user.name }} !</h3>
          <YouSVG width="40%" height="40%" />
          <h4>Bienvenido de regreso</h4>
        </v-container>
      </v-card-text>
    </CardDark>
  </v-col>
</template>

<script>
export default {
  name: 'CardWelcome',
  components: {
    CardDark: () => import('../../components/cardDark/CardDark'),
    YouSVG: () => import('../../assets/img/you.svg'),
  },
};
</script>
