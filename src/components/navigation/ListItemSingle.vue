<template>
  <v-list-item :to="link" link>
    <v-list-item-action>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{ text }} </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: 'ListItem',
  props: {
    text: { type: String },
    icon: { type: String },
    link: { type: String },
  },
};
</script>
