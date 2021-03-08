<template>
  <Popup @onLeave="$emit('onLeave')">
    <form class="flex flex-col items-center my-8 w-2/3 mx-auto" name="join-group" @submit="deleteProfile">
      <p class="font-semibold text-lg text-center">Êtes-vous sûr de vouloir supprimer votre compte ?</p>
      <div class="flex flex-row w-full justify-around">
        <button type="button" class="p-2 bg-red-400 rounded text-white" @click="$emit('onLeave')">
          Annuler
        </button>
        <button type="submit" class="p-2 bg-blue-400 rounded text-white">
          Oui
        </button>
      </div>
    </form>
  </Popup>
</template>

<script>
import Popup from "../popup/Popup";
import Api from "../../../api/Api";
import router from "../../../router";

export default {
  name: "DeleteProfilePopup",
  components: {Popup},
  methods: {
    async deleteProfile(){
      const user = JSON.parse(localStorage.activeUser);
      await Api.UsersApi.delete(user.id, user.attributes.token);
      await Api.UsersGroupsApi.deleteUser(user.id, user.attributes.token);
      localStorage.activeUser = undefined;
      await router.replace('/login');
    }
  }
}
</script>

<style scoped>

</style>