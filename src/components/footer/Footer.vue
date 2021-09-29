<template>
  <v-footer dark padless>
    <v-card class="flex ">
      <v-card-title>
        Siguenos en redes sociales

        <v-spacer></v-spacer>
        <v-btn v-for="red in redes" :key="red.key" icon>
          <a v-bind:href="red.url" target="hrefTarget">
            <v-icon>{{ red.icono }}</v-icon>
          </a>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-2 text-center">
        {{ new Date().getFullYear() }} — <strong>Boxcode</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    redes: [
      {
        key: 'facebook',
        icono: 'fa fa-facebook',
        url: 'https://www.facebook.com/boxcode.oficial/',
      },
      {
        key: 'instagram',
        icono: 'fa fa-instagram',
        url: 'https://www.instagram.com/boxcode.oficial/',
      },
    ],
  }),
};
</script>
<style>
a:link {
  text-decoration: none;
}
</style>
