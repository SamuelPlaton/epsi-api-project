<template>
  <form class="flex flex-col items-center my-8 w-2/3 mx-auto" name="join-group" @submit="modifyProfile">
    <p class="font-semibold text-lg">Modifier le profil</p>
    <label :for="email" class="text-sm text-left w-full">Email</label>
    <input type="text" required class="mb-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="email">
    <label :for="firstName" class="text-sm text-left w-full">Prénom</label>
    <input type="text" required class="mb-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="firstName">
    <label :for="lastName" class="text-sm text-left w-full">Nom</label>
    <input type="text" required class="mb-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="lastName">
    <button type="submit" class="p-2 bg-blue-400 rounded text-white">
      Modifier
    </button>
  </form>
</template>

<script>
import Api from "../../../api/Api";
import type {ModifyUsersData} from "../../../api/users/UsersApi";

export default {
  name: "ChangeProfileForm",
  props: {user: Object},
  data() {
    return {
      email: this.user.attributes.email,
      firstName: this.user.attributes.firstName,
      lastName: this.user.attributes.lastName
    }
  },
  methods:{
    async modifyProfile(){
      const data: ModifyUsersData = {
        email: this.email,
        token: this.user.attributes.token,
        firstName: this.firstName,
        lastName: this.lastName,
      }
      const newUser = await Api.UsersApi.modify(this.user.id, data);
      if(newUser === -1){
        this.$vToastify.error('Cet email existe déjà', 'Erreur');
        return;
      }
      localStorage.activeUser = JSON.stringify(newUser);
      window.location.reload();
    }
  }
}
</script>

<style scoped>

</style>