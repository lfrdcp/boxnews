<template>
  <v-col cols="12" sm="12" md="6">
    <CardDark title="Tiendas actuales">
      <v-card-text>
        <v-container class="text-center">
          <v-row>
            <StoreSVG width="30%" />

            <v-col>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">No. de tienda</th>
                      <th class="text-left">Nombre de las tiendas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(store, i) in $store.state.user.user.stores"
                      :key="i"
                    >
                      <td class="text-left">
                        {{ i + 1 }}
                      </td>
                      <td class="text-left">
                        {{ store.nameStoreDataBase }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </CardDark>
  </v-col>
</template>

<script>
import CardDark from '../../components/cardDark/CardDark';
export default {
  name: 'CardStores',
  components: {
    CardDark,
    StoreSVG: () => import('../../assets/img/store.svg'),
  },
};
</script>
