<template>
  <Overlay @onLeave="$emit('onLeave')">
    <div class="fixed top-0 bottom-0 right-0 w-2/3 lg:w-1/4 bg-white text-black">
      <div class="flex flex-row items-end my-8 mx-4">
        <img
            alt="logo"
            src="@/assets/saving.svg"
            class="w-20 h-20 mr-2"
        />
        <p class="text-3xl color text-blue-300">Budget</p>
      </div>
      <div class="flex flex-col text-left ml-4 font-semibold text-lg">
        <router-link to="/" class="mb-1">Accueil</router-link>
        <router-link to="/create-group" v-if="activeUser">Créer un groupe</router-link>
        <router-link to="/profile" v-if="activeUser">Mon profil</router-link>
        <router-link to="/login" v-if="!activeUser" class="mb-1">Se connecter</router-link>
        <router-link to="/register" v-if="!activeUser">S'inscrire</router-link>
        <button v-if="activeUser" class="absolute bottom-0 mb-8 mx-auto rounded bg-blue-400 p-2 text-white" type="button" @click="disconnect">Se déconnecter</button>
      </div>
    </div>
  </Overlay>
</template>

<script>
import Overlay from "../../popups/popup/local-components/Overlay";
import router from "../../../router";

export default {
  name: "NavigationMenu",
  components: {Overlay},
  data(){
    return{
      activeUser: JSON.parse(localStorage.activeUser)
    }
  },
  methods: {
    disconnect(){
      localStorage.activeUser = undefined;
      router.replace('/login');
    }
  }
}
</script>

<style scoped>

</style>