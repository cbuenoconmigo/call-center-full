<template>
  <v-app>
    <div class="content">
      <div class="content2">
        <div class="cabecera">llamadas</div>
        <v-form ref="form" class="content-form">
          <v-text-field v-model="telefono" label="Ingerese Numero" required></v-text-field>
          <v-btn color="success" @click="llamar" class="btn">Iniciar llamada</v-btn>
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
      telefono: ""
    };
  },
  methods: {
    llamar() {
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      let params = new FormData();
      params.append("telefono", this.telefono);
      axios
        .post(
          "https://tu-id.000webhostapp.com/tu-id/callcenter.php?action=llamar",
          params,
          config
        )
        .then(res => {
          if (res.data.message == 1) {
            this.telefono = "";
          }
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