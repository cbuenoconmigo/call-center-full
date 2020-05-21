<template>
  <div>
    <v-app>
      <div class="wrapper-index">
        <v-data-table
          dense
          :headers="desserts"
          :items="usuarios"
          item-key="nombre_usua"
          class="elevation-1"
        ></v-data-table>
      </div>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: "default2",
  data() {
    return {
      desserts: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "nombre_usua"
        },
        {
          text: "Apellido",
          value: "apellido_usu"
        },
        {
          text: "Identificacion",
          value: "identi_usu"
        },
        {
          text: "Correo",
          value: "email_usu"
        },
        {
          text: "Contraseña",
          value: "contraseña_usu"
        }
      ]
    };
  },
  computed: {
    usuarios() {
      return this.$store.state.usuarios;
    }
  },

  methods: {}
};
</script>

<style scoped>
.wrapper-index {
  padding: 80px;
  /* display: flex; */
  /* flex-direction: row; */
}
</style>
