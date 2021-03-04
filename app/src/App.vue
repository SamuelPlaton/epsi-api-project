<template>
  <div id="app">
    <!-- Bootstrap icons -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
    />
    <Layout v-bind:title="this.$route.name"/>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  color: white;
  padding: 30px;
  display: grid;

  margin-bottom: 1rem;
  background: linear-gradient(
    90deg,
    rgba(85, 106, 243, 1) 0%,
    rgba(6, 149, 145, 1) 100%
  );
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #f57761;
}
</style>
<script>
import Layout from "@/components/Layout";
export default {
  components: {Layout},
  data(){
    return{
      title:    'Home'
  }
  }
}
</script>