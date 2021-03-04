<template>
  <div class="home flex flex-col items-center">
    <div v-if="!activeUser">
      <button type="button" @click="login" class="p-2 bg-blue-400 rounded text-white w-48"> Se connecter </button>
      <p class="text-gray-400 my-4">OU</p>
      <button type="button" @click="register" class="p-2 bg-blue-400 rounded text-white w-48"> Créer mon compte </button>
    </div>
    <div v-if="activeUser" class="w-full">
      <button type="button" @click="isPopupOpened = true" class="p-2 bg-blue-400 rounded text-white w-48 mb-4"> Rejoindre un groupe </button>
      <p class="text-lg font-bold my-2 text-left w-2/3 mx-auto">Mes groupes :</p>
      <GroupList/>
      <JoinGroupPopup v-if="isPopupOpened" @onLeave="isPopupOpened = false"/>
    </div>
  </div>
</template>

<script>
import Overlay from "../components/popups/popup/local-components/Overlay";
import Popup from "../components/popups/popup/Popup";
import JoinGroupPopup from "../components/popups/join-group-popup/JoinGroupPopup";
import LoginForm from "../components/forms/login-form/LoginForm";
import router from "../router";
import GroupList from "../components/lists/group-list/GroupList";

export default {
  name: "Home",
  components: {GroupList, LoginForm, JoinGroupPopup, Popup, Overlay},
  data(){
    return{
      activeUser: JSON.parse(localStorage.activeUser),
      isPopupOpened: false
    }
  },
  methods: {
    login(){
      router.push('/login');
    },
    register(){
      router.push('/register');
    }
  }
};
</script>
