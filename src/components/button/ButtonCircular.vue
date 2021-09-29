<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          dark
          fab
          x-small
          :color="color"
          :to="{ path: link }"
        >
          <v-icon>{{ icon }} </v-icon>
        </v-btn>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ButtonCircular',
  props: {
    tooltip: { type: String },
    color: { type: String },
    icon: { type: String },
    link: { type: String },
  },
};
</script>
