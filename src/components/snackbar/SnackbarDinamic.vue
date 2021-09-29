<template>
  <div class="text-center">
    <v-snackbar
      centered
      :value="state"
      :color="color"
      shaped
      :timeout="timeout"
    >
      <p class="font-weight-thin">
        <v-icon>{{ icon }}</v-icon> {{ content }}
      </p>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'SnackbarDinamic',
  data: () => ({
    timeout: 8000,
  }),
  props: {
    icon: { type: String, required: true },
    state: { type: Boolean, required: true, default: false },
    color: { type: String, required: true },
    content: { type: String, required: true },
  },
};
</script>
