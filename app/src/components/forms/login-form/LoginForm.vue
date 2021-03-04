<template>
    <form class="flex flex-col items-center my-8 w-2/3 mx-auto" name="join-group" @submit="login">
      <label class="font-semibold text-lg">Entrez votre Email :</label>
      <input type="email" placeholder="john.doe@email.com" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="email">
      <label class="font-semibold text-lg">Entrez votre mot de passe :</label>
      <input type="password" placeholder="******" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="password">
      <button type="submit" class="p-2 bg-blue-400 rounded text-white">
        Se connecter
      </button>
    </form>
</template>

<script>
import Api from "../../../api/Api";
import type {NewUsersData} from "../../../api/users/UsersApi";

export default {
  name: "LoginForm",
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log('group joined');
      console.log(this.email);
      console.log(this.password);
      const user: NewUsersData = { email: this.email};
      const newUser = Api.UsersApi.post(user);
      // new User ->stocker dans le store JSON.stringify(user)
      // user = JSON.parse(getFromStore(user))
      // Rediriger vers la home page
      Api.UsersApi.login(this.email, this.password);
    }
  }
}
</script>

<style scoped>

</style>