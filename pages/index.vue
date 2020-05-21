<template>
  <v-app>
    <div class="content">
      <div class="content2">
        <div class="cabecera">Login</div>
        <v-form ref="form" class="content-form">
          <v-text-field v-model="identificacion" label="identificacion" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            label="contraseña"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn color="success" @click="login" class="btn">Iniciar sesion</v-btn>
        </v-form>
      </div>
    </div>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      identificacion: "",
      show1: false,
      password: ""
    };
  },

  methods: {
    login() {
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      let params = new FormData();
      params.append("identificacion", this.identificacion);
      params.append("contraseña", this.password);
      axios
        .post(
          "https://tu-id.000webhostapp.com/tu-id/callcenter.php?action=login",
          params,
          config
        )
        .then(res => {
          if (res.data.message === 1) {
            document.cookie =
              "user=" +
              encodeURIComponent(res.data.usuario[0].idusuarios) +
              ";" +
              "path=/";
          }
          this.$router.push({ path: "/" + res.data.usuario[0].idusuarios });
        });
    }
  }
};
</script>
<style  scoped>
.content-form {
  flex-direction: column;
  display: flex;
  max-height: 400px;
}
.content {
  position: relative;
  width: 565px;
  height: 300px;
  margin: 0px auto;
  text-align: center;
  float: left;
  top: 20%;
}
</style>