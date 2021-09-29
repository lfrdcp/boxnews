<template>
  <v-card class="elevation-24 text-center" shaped>
    <v-toolbar dark>
      <v-toolbar-title>Datos actuales</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>{{ icons.calendar }} </v-icon>
    </v-toolbar>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-col sm="12" md="6">
          <v-avatar size="180">
            <v-img :src="user.img" class="rounded-circle" />
          </v-avatar>
        </v-col>

        <v-col sm="12" md="6">
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <th class="text-leftt">Nombre</th>
                  <td class="text-left">{{ user.name }}</td>
                </tr>
                <tr>
                  <th class="text-leftt">Rol</th>
                  <td class="text-left" v-if="user.type === 0">
                    Administrador
                  </td>
                  <td class="text-left" v-else-if="user.type === 1">
                    Empleado
                  </td>
                </tr>
                <tr>
                  <th class="text-leftt">Correo</th>
                  <td class="text-left">{{ user.email }}</td>
                </tr>
                <tr>
                  <th class="text-leftt">Proxima fecha de pago</th>
                  <td class="text-left">06/06/2020</td>
                </tr>
                <tr>
                  <th class="text-leftt">Cuenta</th>
                  <td class="text-left">Activada</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { icons } from '../../../data/icons';
export default {
  name: 'ProfileRead',
  data: () => ({
    icons: icons,
  }),
  computed: {
    ...mapState('user', ['user']),
  },
};
</script>
