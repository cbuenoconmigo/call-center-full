import axios from "axios";
export const strict = false;

export const state = () => ({
  llamadas: [],
  tramites: [],
  usuarios: [],
  logueo: ""
});

export const mutations = {
  SET_LLAMADAS(state, value) {
    state.llamadas = value;
  },
  SET_TRAMITES(state, value) {
    state.tramites = value;
  },
  SET_USUARIOS(state, value) {
    state.usuarios = value;
  },
  SET_LOGIN(state, value) {
    state.logueo = value;
  }
};
export const actions = {
  GET_LLAMADAS({ state, commit }, id) {
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    // let params = new FormData();
    // params.append("idtipo", id);
    axios
      .get(
        "https://tu-id.000webhostapp.com/tu-id/callcenter.php?action=traerllamadas",
        config
      )
      .then(res => {
        commit("SET_LLAMADAS", res.data.llamadas);
      });
  },
  GET_TRAMITES({ state, commit }) {
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios
      .get(
        "https://tu-id.000webhostapp.com/tu-id/callcenter.php?action=traertramites",
        config
      )
      .then(res => {
        commit("SET_TRAMITES", res.data.tramites);
      });
  },
  GET_USUARIOS({ state, commit }) {
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios
      .get(
        "https://tu-id.000webhostapp.com/tu-id/callcenter.php?action=traerusuarios",
        config
      )
      .then(res => {
        commit("SET_USUARIOS", res.data.usuarios);
      });
  },
  GET_LOGIN({ state, commit }, id) {
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    let params = new FormData();
    params.append("idusuario", id);
    axios
      .post(
        "https://tu-id.000webhostapp.com/tu-id/callcenter.php?action=traerlogueo",
        params,
        config
      )
      .then(res => {
        commit("SET_LOGIN", res.data.usuario);
      });
  }
  ///////////////////////////////////////////////////
};
export const getters = {};
