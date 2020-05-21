<template>
  <div>
    <v-app>
      <div class="wrapper-index">
        <v-form ref="form" class="content-form">
          <v-text-field v-model="numero" label="Numero" required></v-text-field>
          <v-text-field v-model="estado" label="Estado" required></v-text-field>
          <v-select
            v-model="selecttramite"
            :items="tramites"
            item-text="nombre_tra"
            item-value="idtramites"
            label="Tramite"
            required
          ></v-select>
          <div class="wrapper-btn">
            <v-btn color="success" @click="cambiardato" class="btn">Siguiente llamada</v-btn>
            <v-btn color="error" @click="terminarllamada" class="btn">Terminar Llamada</v-btn>
            <v-btn color="warning" @click="pasarllamada" class="btn">Pasar llamada</v-btn>
          </div>
        </v-form>
        <div class="content-list">
          <v-simple-table :dense="dense" :fixed-header="fixedHeader" :height="height">
            <thead>
              <tr>
                <th class="text-center">Numero</th>
                <th class="text-left">Tramite</th>
                <th class="text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in llamadas" :key="item.name">
                <td>{{ item.numero }}</td>
                <td>{{ item.nombre_tra }}</td>
                <td>{{ item.nombre_estado }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
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
      id: this.$route.params.llamadas,
      usuario: "",
      llamadas: []
    };
  },
  created() {
    if (this.usuarios) {
      this.usuarios.filter(item => {
        if (item.idusuarios == this.id) {
          this.usuario = item;
          this.traerllamadas();
        }
      });
    }
  },
  computed: {
    // llamadas() {
    //   return this.$store.state.llamadas;
    // },
    tramites() {
      return this.$store.state.tramites;
    },
    usuarios() {
      return this.$store.state.usuarios;
    }
  },
  methods: {
    traerllamadas() {
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      let params = new FormData();
      params.append("idtipo", this.usuario.idtipo_usuario);
      axios
        .post(
          "https://tu-id.000webhostapp.com/tu-id/callcenter.php?action=traerllamadas",
          params,
          config
        )
        .then(res => {
          this.llamadas = res.data.llamadas;
        });
    },
    cambiardato() {
      this.atendiendo = this.llamadas[0];
      this.atendiendo.nombre_estado = "Atendiendo";
      this.llamadas.splice(0, 1);
      this.numero = this.atendiendo.numero;
      this.estado = this.atendiendo.nombre_estado;
      this.selecttramite = this.atendiendo.idtramite;
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      let params = new FormData();
      params.append("idusuario", 1);
      params.append("idllamada", this.atendiendo.idllamadas);
      axios
        .post(
          "https://tu-id.000webhostapp.com/tu-id/callcenter.php?action=iniciaratencion",
          params,
          config
        )
        .then(res => {
          this.respuesta = res.data.message;
        });
    },
    terminarllamada() {
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      let params = new FormData();
      params.append("idllamada", this.atendiendo.idllamadas);
      params.append("idtramite", this.selecttramite);
      axios
        .post(
          "https://tu-id.000webhostapp.com/tu-id/callcenter.php?action=terminarllamada",
          params,
          config
        )
        .then(res => {
          this.respuesta = res.data.message;
          if (this.respuesta == 1) {
            this.atendiendo = "";
            this.numero = this.atendiendo.numero;
            this.estado = this.atendiendo.nombre_estado;
            this.selecttramite = this.atendiendo.idtramite;
            this.traerllamadas();
          }
        });
    },
    pasarllamada() {
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      let params = new FormData();
      params.append("idllamada", this.atendiendo.idllamadas);
      params.append("idtramite", this.selecttramite);
      axios
        .post(
          "https://tu-id.000webhostapp.com/tu-id/callcenter.php?action=pasarllamada",
          params,
          config
        )
        .then(res => {
          this.respuesta = res.data.message;
          if (this.respuesta == 1) {
            this.atendiendo = "";
            this.numero = this.atendiendo.numero;
            this.estado = this.atendiendo.nombre_estado;
            this.selecttramite = this.atendiendo.idtramite;
            this.traerllamadas();
          }
        });
    }
  },
  watch: {
    usuarios(value) {
      if (value) {
        value.filter(item => {
          if (item.idusuarios == this.id) {
            this.usuario = item;
            this.traerllamadas();
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.wrapper-index {
  padding: 20px;
  display: flex;
  flex-direction: row;
}
.content-form {
  flex: 1;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  display: flex;
  max-height: 400px;
}
.content-list {
  flex: 2;
  margin-left: 10px;
  width: 100%;
  max-height: 400px;
}
.wrapper-btn {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.btn {
  margin-bottom: 10px;
}
</style>
