<template>
  <v-card class="elevation-24" shaped>
    <v-toolbar dark>
      <v-toolbar-title>Editar datos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon color="orange">{{ icons.update }} </v-icon>
    </v-toolbar>

    <v-card-text>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-switch
                inset
                v-model="swtichs.switchImg"
                label="Foto de perfil"
              />
            </v-col>

            <v-col cols="12" md="6" sm="12" v-if="swtichs.switchImg">
              <v-select
                :prepend-icon="icons.image"
                item-text="text"
                item-value="value"
                :items="optionsImg"
                label="Seleccione opción"
                outlined
                v-model="swtichs.switchImgOption"
              />
            </v-col>

            <v-col cols="12" md="6" sm="12" v-if="swtichs.switchImg">
              <DialogImageProfile v-if="swtichs.switchImgOption === 0" />

              <v-file-input
                v-if="swtichs.switchImgOption === 1"
                required
                label="Subir foto"
                v-model="user.img"
                outlined
              />
            </v-col>
          </v-row>
          <v-divider />
          <v-row>
            <v-col cols="12" md="4" sm="12">
              <v-switch inset v-model="swtichs.switchEmail" label="Correo" />
            </v-col>
            <v-col cols="12" md="8" sm="12" v-if="swtichs.switchEmail">
              <v-text-field
                :required="swtichs.switchEmail"
                outlined
                label="Correo electrónico"
                name="email"
                :prepend-icon="icons.email"
                type="email"
                color="primary"
                :rules="emailRules"
                v-model="user.email"
              />
            </v-col>
          </v-row>
          <v-divider />
          <v-row>
            <v-col cols="12">
              <v-switch
                inset
                v-model="swtichs.switchVerifierCode"
                label="Código de caja"
              />
            </v-col>
            <v-col cols="12" v-if="swtichs.switchVerifierCode">
              <v-text-field
                :required="swtichs.switchVerifierCode"
                outlined
                label="Código de caja"
                name="code"
                :prepend-icon="icons.key"
                type="number"
                color="primary"
                :rules="onlyFourCharacters"
                v-model="user.verifierCode"
              />
            </v-col>
          </v-row>
          <v-divider />
          <v-row>
            <v-col cols="12">
              <v-switch
                inset
                v-model="swtichs.switchPassword"
                label="Contraseña"
              />
            </v-col>
            <v-col cols="12" v-if="swtichs.switchPassword">
              <v-text-field
                :required="swtichs.switchPassword"
                outlined
                label="Contraseña nueva"
                name="password"
                :prepend-icon="icons.password"
                type="password"
                color="primary"
                :rules="passwordRules"
                v-model="user.password"
              />
            </v-col>
            <v-col cols="12" v-if="swtichs.switchPassword">
              <v-text-field
                :required="swtichs.switchPassword"
                outlined
                label="Confirmar contraseña "
                name="password"
                :prepend-icon="icons.password"
                type="password"
                color="primary"
                :rules="passwordRules.concat(passwordMatch)"
                v-model="user.confirmPassword"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <ProgressLinear v-bind:loading="loading" color="primary" />
    </v-card-text>

    <v-card-actions>
      <v-row justify="center">
        <v-col cols="12" sm="4" md="4">
          <v-btn
            dark
            block
            color="orange"
            @click="update"
            type="submit"
            :disabled="!valid"
            >Editar</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>

    <Snackbar
      :icon="snackbarIcon"
      :state="snackbarState"
      :color="snackbarColor"
      :content="snackbarContent"
    />
  </v-card>
</template>

<script>
import { rules } from '../../../utils/components/rules';
import { icons } from '../../../data/icons';
import axios from 'axios';
import { URL } from '../../../data/url';
import { convertObjectErrors } from '../../../utils/convertObjectErrors';
import { errorUser } from '../../../data/errors';
import { successUser } from '../../../data/sucess';
import { mixinUser, mixinSnackbar } from '../../../mixins/mixins.js';

export default {
  name: 'ProfileUpdate',
  mixins: [mixinUser, mixinSnackbar],
  components: {
    ProgressLinear: () => import('../../progressLinear/ProgressLinear'),
    DialogImageProfile: () => import('../../dialog/DialogImageProfile'),
    Snackbar: () => import('../../snackbar/SnackbarDinamic'),
  },

  data: () => ({
    errorUser: errorUser,
    loading: false,
    valid: true,
    icons: icons,
    passwordRules: [rules.empty, rules.minimumEight],
    emailRules: [rules.empty, rules.email],
    emptyRules: [rules.empty],
    onlyFourCharacters: [rules.onlyFourCharacters],

    optionsImg: [
      { text: 'Subir  foto', value: 1 },
      { text: 'Seleccionar foto', value: 0 },
    ],
    swtichs: {
      switchEmail: false,
      switchVerifierCode: false,
      switchPassword: false,
      switchImg: false,
      switchImgOption: true,
    },
    user: {
      img: [],
      verifierCode: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  }),

  computed: {
    passwordMatch() {
      return (
        this.user.password === this.user.confirmPassword ||
        'La contraseña no coincide'
      );
    },
  },

  methods: {
    async update() {
      let params = { user: this.user, switchs: this.swtichs };
      this.loading = true;
      try {
        let response = await axios.post(
          URL + 'api/user/updateuser/' + this.$store.state.user.user.id,
          JSON.stringify({ ...params })
        );
        if (response.data.status === 'c8usu1') {
          this.setUser();
          this.setSnackbar(this.icons.check, 'success', successUser.updated);
        } else if (response.data.status === '1F4usu1') {
          this.setSnackbar(this.icons.check, 'orange', errorUser.updServ); // CÓDIGO ERRONEO DE LÓGICA 🔥
        } else if (response.data.errors) {
          let errors = convertObjectErrors(response.data.errors); // CREDENCIALES INCORRECTAS ❌
          this.setSnackbar(this.icons.check, 'orange', errors);
        }
      } catch (error) {
        const m = errorUser;
        this.setSnackbarCatch(error, m.upd404, m.upd500, m.updUn);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
