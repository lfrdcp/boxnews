<template>
  <v-card color="#090a16" shaped>
    <v-card-title class="primary--text justify-center">
      {{ title }}
    </v-card-title>
    <slot />
  </v-card>
</template>

<script>
export default {
  name: 'CardDark',
  props: {
    title: { type: String },
  },
};
</script>
