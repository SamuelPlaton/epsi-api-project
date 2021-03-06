<template>
  <Navigation title="Se connecter">
    <LoginForm/>
  </Navigation>
</template>

<script>
import LoginForm from "../components/forms/login-form/LoginForm";
import {Navigation} from "../components";

export default {
  name: "Login",
  components: {LoginForm, Navigation}
}
</script>

<style scoped>

</style>