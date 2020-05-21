<template>
  <div class="header">
    <div class="wrapper">
      <div>
        <router-link to="/llamadas">
          <a class="text-header" href="#">Logo</a>
        </router-link>
      </div>
      <div class="items" v-if="this.usuarios.length">
        <router-link class="text-header" :to="'/'+this.$route.params.llamadas">Inicio</router-link>
        <router-link
          class="text-header"
          to="/inspire"
          v-show="this.usuario.idtipo_usuario != 1"
        >usuarios</router-link>
        <div class="dropdown">
          <button class="text-header">{{this.usuario.nombre_usua}}</button>
          <div class="dropdown-content">
            <router-link class="text-header" to="/">Perfil</router-link>
            <router-link class="text-header" to="/">Cerrar sesión</router-link>
          </div>
        </div>
        <!-- <router-link class="text-header" to="/inspire">{{this.usuario.nombre_usua}}</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    if (this.usuarios) {
      this.usuarios.filter(item => {
        if (item.idusuarios == this.id) {
          this.usuario = item;
        }
      });
    }
    // this.$store.dispatch("GET_LLAMADAS", this.usuario.idtipo_usuario);
  },
  data() {
    return {
      usuario: "",
      id: this.$route.params.llamadas
    };
  },
  computed: {
    usuarios() {
      return this.$store.state.usuarios;
    }
  },
  watch: {
    usuarios(value) {
      if (value) {
        value.filter(item => {
          if (item.idusuarios == this.id) {
            this.usuario = item;
          }
        });
      }
    }
  }
};
</script>

<style scoped>
p {
  color: white;
}
.header {
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 100%;
  -webkit-box-shadow: -2px 7px 16px -2px rgba(0, 0, 0, 0.52);
  box-shadow: -2px 7px 16px -2px rgba(0, 0, 0, 0.52);
  background: #121212;
}
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  width: 100%;
  padding: 10px 20px;
}
.wrapper > div {
  flex: 1;
}
.items {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
  width: 100%;
  max-width: 300px;
}
.text-header {
  font-size: 18px;
  color: white;
  text-decoration: none;
  transition: all 200ms ease-in;
}
.text-header:hover {
  color: aqua;
}

.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  right: 0;
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background-color: #ddd;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>
