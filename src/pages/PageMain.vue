<template>
  <v-main>
    <v-container fluid :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-img :src="require(`../assets/boxnews.gif`)" height="400px" />

          <v-divider></v-divider>
          <br /><br />
          <v-row align="center" justify="center">
            <v-col>
              <ButtonGeneral title="Iniciar sesion" link="/login" blue />
            </v-col>

            <v-col>
              <ButtonGeneral title="Registrarse" link="/register" />
            </v-col>
          </v-row>

          <br /><br />
          <v-divider></v-divider>

          <v-container class="text-center">
            <h3 align="center" justify="center">
              Punto de venta desarrollado por:
            </h3>
            <v-img
              :src="require(`../assets/BoxcodeLogoBlanco.png`)"
              aspect-ratio="5"
              contain
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'PageMain',
  components: {
    ButtonGeneral: () => import('../components/button/ButtonGeneral'),
  },
};
</script>
