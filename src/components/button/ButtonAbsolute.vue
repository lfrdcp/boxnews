<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          :color="color"
          :to="{ path: link }"
          dark
          small
          absolute
          bottom
          left
          fab
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
  name: 'ButtonAbsolute',
  props: {
    tooltip: { type: String },
    color: { type: String },
    icon: { type: String },
    link: { type: String },
  },
};
</script>
