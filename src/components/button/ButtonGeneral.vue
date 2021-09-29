<template>
  <v-btn
    block
    :to="link"
    :style="{
      background: `linear-gradient(90deg, 
      ${blue ? '#2196F3' : '#424242'}
       30%, ${blue ? '#21CBF3' : '#9e9e9e'} 45%)`,
      color: 'black !important',
    }"
  >
    {{ title }}
  </v-btn>
</template>

<script>
export default {
  name: 'ButtonGeneral',
  props: {
    title: { type: String },
    link: { type: String, defaulf: '/login' },
    //Si le pones blue, es blue, sino pones nada es gris
    blue: { type: Boolean, defaulf: false },
  },
};
</script>
