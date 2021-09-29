<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon>{{ icon }} </v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>{{ title }} </v-list-item-title>
      <v-list-item-subtitle>{{ subtitle }} </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    icon: { type: String },
    title: { type: String },
    subtitle: { type: String },
  },
};
</script>
