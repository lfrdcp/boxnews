<template>
  <v-card color="transparent" outlined>
    <v-card-title class="primary--text justify-center">
      {{ title }}
    </v-card-title>

    <v-card-subtitle class="text-center">
      {{ subtitle }}
    </v-card-subtitle>
    <slot />
  </v-card>
</template>

<script>
export default {
  name: 'CardTransparent',
  props: {
    title: { type: String },
    subtitle: { type: String },
  },
};
</script>
