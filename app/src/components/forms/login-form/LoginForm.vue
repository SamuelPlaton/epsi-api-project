<template>
    <form class="flex flex-col items-center my-8 w-2/3 mx-auto" name="login" @submit="login">
      <label class="font-semibold text-lg">Entrez votre Email :</label>
      <input type="email" placeholder="john.doe@email.com" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="email">
      <label class="font-semibold text-lg">Entrez votre mot de passe :</label>
      <input type="password" placeholder="******" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="password">
      <button type="submit" class="p-2 bg-blue-400 rounded text-white">
        Se connecter
      </button>
      <button class="p-2 bg-blue-400 rounded text-white">
        <router-link to="/Register">Pas encore de Compte</router-link>
      </button>
    </form>
</template>

<script>
import Api from "../../../api/Api";
import router from "../../../router";

export default {
  name: "LoginForm",
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      const user = await Api.UsersApi.login(this.email, this.password);
      if(user){
        localStorage.activeUser = JSON.stringify(user);
        await router.push('/');
      }else{
        this.$vToastify.error('Email ou mot de passe incorrect', 'Erreur');
      }
    }
  }
}
</script>

<style scoped>

</style>