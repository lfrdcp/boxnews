<template>
    <v-row align="center" justify="center">
        <v-col cols="12" xs="12" sm="6" md="4" lg="3">
            <CardTransparent :title="loginText.title" :subtitle="loginText.subtitle">
                <v-card-text>
                    <v-img
                        :src="require(`gif o imagen`)"
                        contain
                        aspect-ratio="1.5"
                    />
                    <v-form v-model="valid">
                    <ProgressLinear v-bind:loading="loginLoading" color="primary" />
                    </v-form>
                </v-card-text>
            </CardTransparent>
        </v-col>
        <v-col cols="12" sm="6" md="6">
            <v-btn
              text
              to="nombreMetodo"
              color="white"
              block
              :x-small="$vuetify.breakpoint.mobile"
            >
            Nombre boton
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    
}
</script>