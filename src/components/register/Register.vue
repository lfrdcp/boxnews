<template>
  <v-row align="center" justify="center">
    <v-col cols="12" xs="12" sm="6" md="4" lg="3">
      <CardTransparent
        title="Registrarse"
        subtitle="¡Bienvenido! Estas a un paso de ser parte de los servicios de BOXCODE"
      >
        <v-card-text>
          <v-img
            :src="require(`../../assets/boxnews.gif`)"
            contain
            aspect-ratio="1.5"
          />

          <v-form v-model="valid">
            <v-container>
              <Alert
                :color="alertColor"
                :icon="alertIcon"
                :text="alertText"
                v-if="alertState"
              />
            </v-container>
            <v-text-field
              label="Nombre"
              name="name"
              :prepend-icon="icons.person"
              type="text"
              outlined
              color="primary"
              required
              :rules="emptyRules"
              v-model="user.name"
            />

            <v-text-field
              label="Apellido"
              name="lastName"
              :prepend-icon="icons.person"
              type="text"
              outlined
              color="primary"
              required
              :rules="emptyRules"
              v-model="user.lastName"
            />

            <v-text-field
              label="Correo "
              name="email"
              :prepend-icon="icons.email"
              type="email"
              outlined
              color="primary"
              required
              :rules="emailRules"
              v-model="user.email"
            />

            <v-text-field
              label="Contraseña"
              name="password"
              :prepend-icon="icons.password"
              outlined
              color="primary"
              required
              :rules="passwordRules"
              v-model="user.password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? icons.eyeOn : icons.eyeOff"
              @click:append="showPassword = !showPassword"
            />

            <v-text-field
              label="Confirmar contraseña"
              name="password"
              :prepend-icon="icons.password"
              outlined
              color="primary"
              required
              :rules="passwordRules.concat(passwordMatch)"
              v-model="user.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-icon="showConfirmPassword ? icons.eyeOn : icons.eyeOff"
              @click:append="showConfirmPassword = !showConfirmPassword"
            />
          </v-form>

          <ProgressLinear v-bind:loading="registerLoading" color="primary" />
        </v-card-text>

        <v-card-actions>
          <v-btn
            block
            color="primary"
            type="submit"
            @click="register"
            :disabled="!valid"
            >Registarse
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            text
            to="login"
            color="white"
            block
            :x-small="$vuetify.breakpoint.mobile"
          >
            ¿YA TIENES UNA CUENTA? ENTONCES Inicia sesion
          </v-btn>
        </v-card-actions>
      </CardTransparent>
    </v-col>
  </v-row>
</template>

<script>
import { rules } from '../../utils/components/rules'
import { icons } from '../../data/icons'
import axios from 'axios'
import { URL } from '../../data/url'
import { convertObjectErrors } from '../../utils/convertObjectErrors'
import { errorUser } from '../../data/errors'
import { mixinAlert } from '../../mixins/mixins.js'

export default {
  name: 'Register',
  components: {
    Alert: () => import('../alert/Alert'),
    ProgressLinear: () => import('../progressLinear/ProgressLinear'),
    CardTransparent: () => import('../cardDark/CardTransparent'),
  },
  mixins: [mixinAlert],
  data: () => ({
    registerLoading: false,

    valid: true,
    showPassword: false,
    showConfirmPassword: false,
    user: {
      name: '',
      lastName: '',
      verifierCode: '',
      email: '',
      password: '',
      confirmPassword: '',
      foto_perfil: '',
    },
    icons: icons,
    passwordRules: [rules.empty, rules.minimumEight],
    emailRules: [rules.empty, rules.email],
    emptyRules: [rules.empty],
    onlyFourCharacters: [rules.onlyFourCharacters],
  }),
  computed: {
    passwordMatch() {
      return (
        this.user.password === this.user.confirmPassword ||
        'La contraseña no coincide'
      )
    },
  },

  methods: {
    async register() {
      this.registerLoading = true
      try {
        let response = await axios.post(URL + '/api/registeruser', this.user)
        //alert(JSON.stringify(response.data) )
        if (response.data.status === 'c8usu0') {
          this.$store.dispatch('user/setUpRegisterSuccessMsg')
          this.$router.push('/login')
        } else if (response.data.status === '1F4usu0') {
          // CÓDIGO ERRONEO DE LÓGICA 🔥
          this.setAlert(this.icons.warning, errorUser.regServ, 'orange')
        } else if (response.data.errors) {
          let errors = convertObjectErrors(response.data.errors)
          this.setAlert(this.icons.warning, errors, 'orange')
        }
      } catch (error) {
        //alert(JSON.stringify(error) )
        if (error.response.status === 404) {
          this.setAlert(this.icons.warning, errorUser.reg404, 'orange')
        } else if (error.response.status === 500) {
          this.setAlert(this.icons.warning, errorUser.reg500, 'orange')
        } else {
          this.setAlert(this.icons.warning, errorUser.regUn, 'orange')
        }
      } finally {
        this.registerLoading = false
      }
    },
  },
}
</script>
