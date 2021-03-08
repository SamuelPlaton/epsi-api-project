<template>
  <div class="text-left mx-8 font-semibold">
    <p>Prénom : {{ user.attributes.firstName }}</p>
    <p>Nom : {{ user.attributes.lastName }}</p>
    <p>Email : {{ user.attributes.email }}</p>
    <div class="flex flex-row">
      <button role="button" class="p-2 bg-blue-400 rounded text-white mt-4 mr-4" @click="popupModifyProfile = true">
        Modifier profil
      </button>
      <button role="button" class="p-2 bg-red-400 rounded text-white mt-4" @click="popupDeleteProfile = true">
        Supprimer mon compte
      </button>
    </div>
    <ChangeProfilePopup v-if="popupModifyProfile" :user="user" @onLeave="popupModifyProfile = false"/>
    <DeleteProfilePopup v-if="popupDeleteProfile" @onLeave="popupDeleteProfile = false"/>
  </div>
</template>

<script>
import {ChangeProfilePopup, DeleteProfilePopup} from "../../popups";

export default {
  name: "UserDetails",
  components: {DeleteProfilePopup, ChangeProfilePopup},
  props: {user: Object},
  data() {
    return {
      popupDeleteProfile: false,
      popupModifyProfile: false
    }
  }
}
</script>

<style scoped>

</style>