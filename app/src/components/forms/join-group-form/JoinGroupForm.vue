<template>
  <form class="flex flex-col items-center my-8 w-2/3 mx-auto" name="join-group" @submit="joinGroup">
    <p class="font-semibold text-lg">Entrez le numéro de groupe :</p>
    <input type="text" required pattern="^[0-9]{6}$" placeholder="123456" class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="code">
    <button type="submit" class="p-2 bg-blue-400 rounded text-white">
      Rejoindre
    </button>
  </form>
</template>

<script>
import Api from "../../../api/Api";
import router from "../../../router";

export default {
  name: "JoinGroupForm",
  data(){
    return{
      code: ''
    }
  },
  methods: {
    async joinGroup() {
      const activeUser = JSON.parse(localStorage.activeUser);
      if (!activeUser) {
        this.$vToastify('Erreur', 'Connectez-vous pour rejoindre un groupe');
        return;
      }
      const idGroup = await Api.UsersGroupsApi.post(activeUser.id, activeUser.attributes.token, this.code);
      if(idGroup === -1){ // No group found
        this.$vToastify('Erreur', 'Groupe introuvable');
        return;
      }else if(idGroup === -2){ // Already in the group
        this.$vToastify('Erreur', 'Vous êtes déjà dans ce groupe');
        return;
      }else{
        await router.push(`/group/${idGroup}`);
      }
    }
  }
}
</script>

<style scoped>

</style>