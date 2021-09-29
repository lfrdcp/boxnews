<template>
  <v-col cols="12" sm="12" md="6">
    <v-card class="elevation-24" dark shaped color="#090a16">
      <v-card-text>
        <div>
          <v-alert
            dark
            :color="color"
            border="left"
            elevation="24"
            colored-border
          >
            <v-row align="center">
              <v-col class="grow">
                <v-icon left :color="color" v-html="icon" />
                {{ msg }}
              </v-col>
              <v-col class="shrink">
                <v-btn @click="checkConnection()">Verificar conexión</v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </div>

        <v-container class="text-center">
          <InternetSVG width="25%" />
        </v-container>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'CardCheckInternet',
  components: {
    InternetSVG: () => import('../../assets/img/internet.svg'),
  },
  data: () => ({
    icon: 'check',
    msg: '',
    color: 'success',
  }),
  mounted() {
    this.checkConnection();
  },
  methods: {
    setUser() {
      console.log('hola');
    },
    checkConnection() {
      navigator.onLine ? this.setConnectionOn() : this.setConnectionOff();
    },
    setConnectionOn() {
      this.msg = '¡Estas conectado a internet!';
      this.color = 'success';
      this.icon = this.icons.check;
    },
    setConnectionOff() {
      this.msg = '¡Estas desconectado a internet!';
      this.color = 'warning';
      this.icon = this.icons.error;
    },
  },
};
</script>
