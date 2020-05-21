<template>
  <div>
    <Cnav />
    <nuxt />
  </div>
</template>

<script>
import Cnav from "../components/nav";

export default {
  components: {
    Cnav
    // KFooter1,
  },
  mounted() {
    // this.$store.dispatch("GET_LLAMADAS", this.$route.params.llamadas);
    this.$store.dispatch("GET_TRAMITES");
    this.$store.dispatch("GET_USUARIOS");
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  font-size: 18px;

  /* outline: none; */
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}
</style>
