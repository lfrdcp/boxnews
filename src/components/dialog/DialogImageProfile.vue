<template>
  <v-dialog v-model="dialog" width="750">
    <template v-slot:activator="{ on }">
      <v-btn block color="primary" v-on="on">
        Fotos sugeridas
      </v-btn>
    </template>

    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>Fotos sugeridas por el sistema</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon>create </v-icon>
      </v-toolbar>
      <v-card-title primary-title class="justify-center">
        <v-avatar class="profile justify-center" size="200">
          <!-- <v-img
            :src="require(`../../assets/imgProfile/profile (${img}).jpg`)"
          ></v-img> -->
        </v-avatar>
      </v-card-title>

      <v-container>
        <h3 class="text-md-center">De click a la imagen que desea</h3>
        <v-row>
          <v-col v-for="i in 25" :key="i">
            <v-avatar class="profile" size="100">
              <!-- <v-img
                style="cursor:pointer;"
                :src="require(`../../assets/imgProfile/profile (${i}).jpg`)"
                v-on:click="inputImg(i)"
              ></v-img> -->
            </v-avatar>
          </v-col>
        </v-row>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog = false" dark>
          Listo
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'DialogImageProfile',
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapState('user', ['img']),
  },
  methods: {
    inputImg(i) {
      this.$store.dispatch('user/setUpImg', i);
    },
  },
};
</script>
