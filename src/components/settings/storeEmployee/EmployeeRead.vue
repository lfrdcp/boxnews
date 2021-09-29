<template>
  <v-card class="elevation-24" shaped>
    <v-toolbar dark>
      <v-toolbar-title>Empleados</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>{{ icons.employee }} </v-icon>
    </v-toolbar>

    <v-card-text>
      <EmployeeCreate />
      <v-list>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Empleado</th>
                <th class="text-left">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in employees" :key="i">
                <td>
                  <ListItem
                    :title="item.email"
                    subtitle="Correo"
                    :icon="icons.employee"
                  />
                </td>
                <td>
                  <DialogConfirmClose
                    color="red"
                    title="¿Estas seguro de elimiar el empleado?"
                    content="Una vez eliminada la tarea no tendra acceso"
                    textButtonConfirm="Eliminar empleado"
                    textButtonClose="Cancelar"
                    :icon="icons.delete"
                    :parentMethod="employeeDelete"
                    tooltip="Eliminar empleado"
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { icons } from '../../../data/icons';
export default {
  name: 'EmployeeRead',
  components: {
    DialogConfirmClose: () => import('../../dialog/DialogConfirmClose'),
    ListItem: () => import('../../listItem/ListItem'),
    EmployeeCreate: () => import('./EmployeeCreate'),
  },
  data: () => ({
    icons: icons,
  }),
  computed: {
    ...mapState('employee', ['employees']),
  },
  methods: {
    employeeDelete() {
      alert('Eliminar empleado');
    },
  },
};
</script>
