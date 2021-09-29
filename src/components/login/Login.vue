<template>
  <v-row align="center" justify="center">
    <v-col cols="12" xs="12" sm="6" md="4" lg="3">
      <CardTransparent :title="loginText.title" :subtitle="loginText.subtitle">
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
              label="Correo "
              v-model="user.email"
              name="login"
              :prepend-icon="icons.person"
              type="email"
              outlined
              color="primary"
              required
              :rules="emailRules"
            />

            <v-text-field
              label="Contraseña"
              v-model="user.password"
              color="primary"
              name="password"
              outlined
              required
              :rules="passwordRules"
              :prepend-icon="icons.password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? icons.eyeOn : icons.eyeOff"
              @click:append="showPassword = !showPassword"
              @keyup.enter="valid ? login() : false"
            />
          </v-form>

          <ProgressLinear v-bind:loading="loginLoading" color="primary" />
        </v-card-text>

        <v-card-actions>
          <v-btn
            :style="{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'black !important',
            }"
            block
            type="submit"
            @click="login"
            :disabled="!valid"
            >Iniciar sesion
          </v-btn>
        </v-card-actions>
        <v-divider />

        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="6">
            <v-btn
              text
              to="register"
              color="white"
              block
              :x-small="$vuetify.breakpoint.mobile"
            >
              ¿Olvidaste tu contraseña?
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              text
              to="register"
              color="white"
              block
              :x-small="$vuetify.breakpoint.mobile"
            >
              ¿Sin cuenta? Registrate aquí
            </v-btn>
          </v-col>
        </v-row>
      </CardTransparent>
    </v-col>
  </v-row>
</template>
<script>
import { rules } from '../../utils/components/rules'
import { mapState } from 'vuex'
import { icons } from '../../data/icons'
import axios from 'axios'
import router from '../../router/index'
import { URL } from '../../data/url'
import { errorUser } from '../../data/errors'
import { loginText } from '../../data/viewText'
import { mixinAlert } from '../../mixins/mixins.js'

export default {
  name: 'Login',
  components: {
    CardTransparent: () => import('../cardDark/CardTransparent'),
    Alert: () => import('../alert/Alert'),
    ProgressLinear: () => import('../progressLinear/ProgressLinear'),
    // LoginSVG: () => import('../../assets/img/loginn.svg'),
  },
  mixins: [mixinAlert],
  data: () => ({
    loginLoading: false,
    valid: true,
    showPassword: false,
    passwordRules: [rules.minimumEight],
    emailRules: [rules.empty, rules.email],
    icons: icons,
    loginText: loginText,
    user: {
      email: '',
      password: '',
    },
  }),
  computed: {
    ...mapState('user', ['registerSuccessMsg']),
  },
  methods: {
    async login() {
      this.loginLoading = true
      try {
        let response = await axios.post(URL + 'api/user/login', this.user)
        if (response.data.access_token) {
          localStorage.setItem('QpKWqBXI', response.data.access_token)
          localStorage.setItem('type_user', response.data.user.type)
          router.push('/dashboard')
        } else {
          this.setAlert(this.icons.warning, response.data.message, 'warning')
        }
      } catch (error) {
        if (error.response.status === 404) {
          this.setAlert(this.icons.warning, errorUser.login404, 'error')
        } else if (error.response.status === 500) {
          this.setAlert(this.icons.warning, errorUser.login500, 'error')
        } else {
          this.setAlert(this.icons.warning, errorUser.loginUn, 'error')
        }
      } finally {
        this.loginLoading = false
      }
    },
  },
}
</script>
