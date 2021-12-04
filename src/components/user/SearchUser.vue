<template>
  <div>
      <v-card >

    <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              Nombre
            </th>
            <th class="primary--text">
              Email
            </th>
            <th class="primary--text">
              Tipo de Usuario
            </th>
            <th class="primary--text">
              Fecha de Nacimiento
            </th>
            <th class="primary--text">
              Status
            </th>
            <th class="primary--text">
              Editar
            </th>
            <th class="primary--text">
              Eliminar
            </th>
            
          </tr>
        </thead>

        <tbody>
          <tr 
            v-for="usuario in usuarios"
            :key="usuario.email"
          >    
            <td>{{ usuario.name }} {{ usuario.first_name }} {{ usuario.last_name }}</td>
            <td>{{ usuario.email }}</td>
            <td v-if=" usuario.type === 0" > Administrador </td>
            <td v-else-if="usuario.type === 1" > Autorizador </td>
            <td v-else-if="usuario.type === 2" > Periodista </td>
            <td v-else > Suscriptor </td>
            <td>{{ usuario.birthday }}</td>
            <td>{{ usuario.status }}</td>


            <td style="margin-top:-40px">

              <v-btn
                :small="$vuetify.breakpoint.mobile"
                color="warning"
                @click="openDialogAndSetUser(usuario)"
              >
                <v-icon left v-html="icons.update" /> <span v-text="`Editar`" />
              </v-btn>
            </td> 
            <td>
              <!-- <ButtonCircularNormal tooltip="Eliminar" color="red" :icon="icons.delete" link="asf" :left="false" @click.native="deleteUser(usuario.idUser)"/> -->
              <DeleteUser
                v-if="usuario.status === 1 "
                color="red"
                title="¿Estas seguro de dar de baja?"
                content="Una vez dado de baja puede reactivar la cuenta más adelante"
                textButtonConfirm="Aceptar"
                textButtonClose="Cancelar"
                v-bind:idUser="usuario.idUser"
                v-bind:icon="icons.delete"
                v-bind:parentMethod="DeleteUser"
                tooltip="Eliminar Usuario"
              />

              <DeleteUser
                v-if="usuario.status === 0"
                color="green"
                title="¿Desea Reactivar este usuario?"
                content="Una vez reactivado puede dar de baja la cuenta más adelante"
                textButtonConfirm="Aceptar"
                textButtonClose="Cancelar"
                v-bind:idUser="usuario.idUser"
                v-bind:icon="icons.check"
                v-bind:parentMethod="DeleteUser"
                tooltip="Reactivar Usuario"
              />

            </td>
          </tr>
        </tbody>
      </v-simple-table>
  </v-card>

  <v-dialog
    :fullscreen="$vuetify.breakpoint.mobile"
    v-model="dialogEdit"
    width="35%"
  >

    <EditUser 
      :parentMethod="() => (dialogEdit = false)" 
      :user="userEdit"
    />

  </v-dialog>
  </div>

  
</template>

<script>
import axios from 'axios'
import { icons } from '../../data/icons'
import { URL } from '../../data/url'
import { errorUser } from '../../data/errors'
import { mixinAlert } from '../../mixins/mixins.js'

export default {
  name: "SearchUser",
  components: {
      //Alert: () => import('../alert/Alert'),
      //ButtonCircularNormal: () => import('../button/ButtonCircularNormal.vue'),
      EditUser: () => import('../user/EditUser.vue'),
      DeleteUser: () => import('../user/DeleteUser.vue'),
      
  },
  mixins: [mixinAlert],
  data:()=> ({
    userEdit:{},
    idUser: '',
    name: '',
    first_name: '',
    last_name: '',
    fullname: '',
    icons: icons,
    usuarios: [],
    dialogDelete: false,
    dialogEdit: false,
  }),
  computed: {
    headers(){
      return[
        {text:'Name', value:'name' },
        {text:'Email', value:'email'},
        {text:'Type', value:'type'},
        {text:'Birthday', value:'birthday'},
        {text:'status', value:'status'},
        {text:'Actions', value:'actions'},
      ]
    }
  },
  created(){
    this.getUser()
  },
  methods: {
    
    async edit(id){
      this.dialogEdit = true
      try {
        let response = await axios.get(URL + `/api/EditUser/${id}`)
        if (response.data.user) {
          this.usuarios = response.data.user
          this.setAlert(this.icons.success, response.data.message, 'green')
        }
      } catch (error) {
        this.setAlert(this.icons.warning, errorUser.reg404, 'orange')
      }
    },

    async DeleteUser(id){
      try {
        let response = await axios.get(URL + `/api/deleteUser/${id}`)
        if (response.data.user) {
          this.setAlert(this.icons.success, response.data.message, 'green')
          this.usuarios = this.usuarios.map(usuario => usuario.idUser === id 
          ? {...usuario, status: Number(!usuario.status)}
          :usuario);
          console.log(this.usuarios)
        }
      } catch (error) {
        this.setAlert(this.icons.warning, errorUser.reg404, 'orange')
      }
    },
    //userSearch
    /*async getUser() {
      try {
        let response = await axios.get(URL + '/api/userSearch')
        if (response.data.user) {
          this.usuarios = response.data.user
          console.log(this.usuarios);
        }
      } catch (error) {
        this.setAlert(this.icons.warning, errorUser.reg404, 'orange')
      }
    }, */

    getUser(){
      axios.get(URL + '/api/userSearch').then((response)=>{
        if (response.data.user) {
          this.usuarios = response.data.user
          console.log(this.usuarios);
        }
      }).catch((error)=>{
        this.setAlert(this.icons.warning, 'no existe', 'orange')
        console.log(error);
      })
    },

    openDialogAndSetUser(usuario){
      //alert(JSON.stringify(usuario))
      this.dialogEdit = true;
      this.userEdit = usuario;
    }
  }

};

</script>