<template>
  <v-alert dark colored-border border="left" :color="color" :icon="icon">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    icon: { type: String },
    text: { type: String },
    color: { type: String },
  },
};
</script>
