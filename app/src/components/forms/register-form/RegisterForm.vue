<template>
  <form class="flex flex-col items-center my-8 w-2/3 mx-auto" name="register" @submit="register">
    <p>Entrez vos nouveau identifiants</p>
    <label class="font-semibold text-lg">Entrez votre prénom :</label>
        <input type="text" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="firstName">
    <label class="font-semibold text-lg">Entrez votre nom :</label>
        <input type="text" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="lastName">
    <label class="font-semibold text-lg">Entrez votre Email :</label>
        <input type="email" placeholder="john.doe@email.com" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="email">
    <label class="font-semibold text-lg">Entrez votre mot de passe :</label>
        <input type="password" placeholder="******" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="password">
    <button type="submit">
      Register
    </button>
  </form>
</template>

<script>
import Api from "../../../api/Api";
import type {NewUsersData} from "../../../api/users/UsersApi";

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
      console.log(this.firstName);
      console.log(this.lastName);
      console.log(this.email);
      console.log(this.password);
      const user: NewUsersData = {firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password};
      const newUser = await Api.UsersApi.post(user);
      localStorage.activeUser = JSON.stringify(newUser);
    }
  }
}
</script>

<style scoped>

</style>