<template>
  <form class="flex flex-col items-center my-8 w-2/3 mx-auto" name="register" @submit="register">
    <label class="font-semibold text-lg">Entrez votre prénom :</label>
        <input type="text" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="firstName">
    <label class="font-semibold text-lg">Entrez votre nom :</label>
        <input type="text" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="lastName">
    <label class="font-semibold text-lg">Entrez votre Email :</label>
        <input type="email" placeholder="john.doe@email.com" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="email">
    <label class="font-semibold text-lg">Entrez votre mot de passe :</label>
        <input type="password" placeholder="******" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="password">
    <button type="submit" class="p-2 bg-blue-400 rounded text-white">
      Créer mon compte
    </button>
  </form>
</template>

<script>
import Api from "../../../api/Api";
import type {NewUsersData} from "../../../api/users/UsersApi";
import router from "../../../router";

export default {
  name: "RegisterForm",
  data(){
    return{
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      const user: NewUsersData = {firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password};
      const newUser = await Api.UsersApi.post(user);
      if(newUser === -1){
        this.$vToastify.error('Cet email est déjà pris', 'Erreur');
      }else{
        localStorage.activeUser = JSON.stringify(newUser);
        await router.push('/');
      }
    }
  }
}
</script>

<style scoped>

</style>