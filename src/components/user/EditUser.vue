<template>
    <v-card class="elevation-24" shaped>
    <v-toolbar dark>
      <v-toolbar-title>Información de {{user.nickname}} </v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" sm="12">

              <v-text-field
                label="Nickname"
                name="nickname"
                v-model="user.nickname"
                
                :prepend-icon="icons.person"
                
                outlined
                color="blue"
                required
              />
              <v-text-field
                label="Apellido Paterno"
                name="first_name"
                v-model="user.first_name"
                :prepend-icon="icons.person"
                outlined
                color="blue"
                required
              />
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                label="Nombre"
                name="name"
                v-model="user.name"
                :prepend-icon="icons.person"
                outlined
                color="blue"
                required
              />
              <v-text-field
                label="Apellido Materno"
                name="last_name"
                v-model="user.last_name"
                :prepend-icon="icons.person"
                outlined
                color="blue"
                required
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-row justify="center">
        <v-col cols="6">
          <v-btn block dark @click="parentMethod()">
            Cerrar
          </v-btn>
        </v-col>

        <v-col cols="6">
          <v-btn
            dark
            block
            color="blue"
            @click="edit()"
            type="submit"
            :disabled="!valid"
            >Guardar</v-btn
          >
        </v-col>
      </v-row>

      <Snackbar
        :icon="snackbarIcon"
        :state="snackbarState"
        :color="snackbarColor"
        :content="snackbarContent"
      />
    </v-container>
  </v-card>
</template>
<script>
import axios from 'axios';
import { URL } from '../../data/url';
import { icons } from '../../data/icons';
import { errorUser } from '../../data/errors';
import { mixinSnackbar } from '../../mixins/mixins.js';

export default {
  name: 'TaskCreate',
  mixins: [mixinSnackbar],
  components: {
    Snackbar: () => import('../snackbar/SnackbarDinamic'),
  },
  props: {
    parentMethod: { type: Function },
    user: {type: Object },
  },
  data: () => ({
    step: false,
    idUser: '',
    name: '',
    first_name: '',
    last_name: '',
    fullname: '',
    password: '',
    type: '', 
    menu2: false,
    valid: false,
    icons: icons,
    dialog: false,
  }),
  computed: {
    
  },
  methods: {
    async edit(){
      this.parentMethod();
      try {
        let response = await axios.post(URL + `/api/EditUser/`, {user: {...this.user}})
        console.log(response.data.message);
        response.data.message ===  'Se ha actualizado el usuario' &&  this.setAlert(this.icons.success, response.data.message, 'green')
        } catch (error) {
        this.setAlert(this.icons.warning, errorUser.reg404, 'orange')
      }
    },
    },
};
</script>
