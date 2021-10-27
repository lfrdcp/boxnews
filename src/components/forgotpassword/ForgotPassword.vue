<template>
  <v-row align="center" justify="center">
    <v-col cols="12" xs="12" sm="6" md="4" lg="3">
      <CardTransparent :title="forgotPassText.title" :subtitle="forgotPassText.subtitle">
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
              name="email"
              :prepend-icon="icons.person"
              type="email"
              outlined
              color="primary"
              required
              :rules="emailRules"
            />
            
          </v-form>

          <ProgressLinear v-bind:loading="forgotPassLoading" color="primary" />
        </v-card-text>

        <v-card-actions>
          <v-btn
            :style="{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'black !important',
            }"
            block
            type="submit"
            @click="resetpassword"
            :disabled="!valid"
            >Recuperar contraseña
          </v-btn>
        </v-card-actions>
        <v-divider />

        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="6">
            <v-btn
              text
              to="login"
              color="white"
              block
              :x-small="$vuetify.breakpoint.mobile"
            >
              ¿Con cuenta? Iniciar sesión
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
//import router from '../../router/index'
import { URL } from '../../data/url'
import { errorUser } from '../../data/errors'
import { forgotPasswordText } from '../../data/viewText'
import { mixinAlert } from '../../mixins/mixins.js'

export default {
  name: 'ForgotPass',
  components: {
    CardTransparent: () => import('../cardDark/CardTransparent'),
    Alert: () => import('../alert/Alert'),
    ProgressLinear: () => import('../progressLinear/ProgressLinear'),
    // LoginSVG: () => import('../../assets/img/loginn.svg'),
  },
  mixins: [mixinAlert],
  data: () => ({
    forgotPassLoading: false,
    valid: true,
    emailRules: [rules.empty, rules.email],
    icons: icons,
    forgotPassText: forgotPasswordText,
    user: {
      email: '',
    },
  }),
  computed: {
    ...mapState('user', ['registerSuccessMsg']),
  },
  methods: {
    async resetpassword() {
      this.forgotPassLoading = true
      try {
        let response = await axios.post(URL + '/api/forgot-password', this.user)
        //alert(JSON.stringify(response.data))
        if (response.data.token) {
          //localStorage.setItem('QpKWqBXI', response.data.status)
          this.setAlert(this.icons.email, response.data.message, 'success')
        } else {
          this.setAlert(this.icons.email, response.data.message, 'success')
        }
      } catch (error) {
        //alert(JSON.stringify('error'))
        if (error.response.status === 404) {
          this.setAlert(this.icons.warning, errorUser.reset404, 'error')
        } else if (error.response.status === 500) {
          this.setAlert(this.icons.warning, errorUser.reset500, 'error')
        } else {
          this.setAlert(this.icons.warning, errorUser.resetUn, 'error')
        }
      } finally {
        this.forgotPassLoading = false
      }
    },
  },
}
</script>
