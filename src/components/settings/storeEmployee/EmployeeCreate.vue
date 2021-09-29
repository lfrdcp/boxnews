<template>
  <v-form v-model="valid">
    <v-container>
      <Alert
        :color="alertColor"
        :icon="alertIcon"
        :text="alertText"
        v-if="alertState"
      />
      <v-row>
        <v-col cols="9" md="11">
          <v-text-field
            label="Ingrese correo de empleado"
            name="email"
            :prepend-icon="icons.person"
            type="email"
            outlined
            color="primary"
            required
            :rules="emailRules"
            v-model="employee.email"
          />
        </v-col>
        <v-col cols="3" md="1">
          <v-btn fab small :disabled="!valid">
            <ButtonCircular
              @click.native="employeeCreate"
              tooltip="Crear empleado"
              color="blue"
              :icon="icons.check"
            />
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <ProgressLinear v-bind:loading="createLoading" color="primary" />
  </v-form>
</template>

<script>
import { rules } from '../../../utils/components/rules';
import { icons } from '../../../data/icons';
import axios from 'axios';
import { URL } from '../../../data/url';
import { convertObjectErrors } from '../../../utils/convertObjectErrors';
import { errorEmployee } from '../../../data/errors';
import { successEmployee } from '../../../data/sucess';
import { mixinAlert } from '../../../mixins/mixins.js';
export default {
  name: 'EmployeeCreate',
  mixins: [mixinAlert],
  components: {
    ButtonCircular: () => import('../../button/ButtonCircular'),
    Alert: () => import('../../alert/Alert'),
    ProgressLinear: () => import('../../progressLinear/ProgressLinear'),
  },

  data: () => ({
    createLoading: false,

    valid: true,
    icons: icons,
    emailRules: [rules.empty, rules.email],

    employee: {
      email: '',
    },
  }),

  methods: {
    async employeeCreate() {
      this.createLoading = true;

      try {
        let response = await axios.post(
          URL + 'api/user/employee',
          this.employee
        );
        if (response.data.status === '') {
          this.$store.commit('employee/setAddEmployee', this.employee);
          this.setAlert(this.icons.warning, successEmployee.created, 'success');
        } else if (response.data.status === '1F4usu0') {
          this.setAlert(
            this.icons.warning,
            errorEmployee.createServer,
            'orange'
          ); // CÓDIGO ERRONEO DE LÓGICA 🔥
        } else if (response.data.errors) {
          let errors = convertObjectErrors(response.data.errors); // CREDENCIALES INCORRECTAS ❌
          this.setAlert(this.icons.warning, errors, 'orange');
        }
      } catch (error) {
        if (error.response.status === 404) {
          this.setAlert(this.icons.warning, errorEmployee.create404, 'orange');
        } else if (error.response.status === 500) {
          this.setAlert(this.icons.warning, errorEmployee.create500, 'orange');
        } else {
          this.setAlert(this.icons.warning, errorEmployee.createUn, 'orange');
        }
      } finally {
        this.createLoading = false;
      }
    },
  },
};
</script>
