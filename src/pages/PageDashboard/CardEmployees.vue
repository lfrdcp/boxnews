<template>
  <v-col cols="12" sm="12" md="6">
    <v-card class="elevation-24" shaped color="#090a16">
      <v-toolbar dark>
        <v-toolbar-title>Empleados actuales</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">No. de empleado</th>
                    <th class="text-left">Nombre del empleado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left">
                      1
                    </td>
                    <td class="text-left">
                      Juan
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>

          <EmployeeSVG width="45%" height="45%" />
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'CardEmployees',
  components: {
    EmployeeSVG: () => import('../../assets/img/employee.svg'),
  },
};
</script>
