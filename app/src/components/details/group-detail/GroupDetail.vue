<template>
  <div>
    <div class="flex flex-row justify-between ml-8 mr-4">
      <div class="text-left">
        <p class="text-lg font-semibold">{{ group.attributes.title }}</p>
        <p class="mt-2 mb-4">{{ group.attributes.description }}</p>
        <p class="bg-blue-200 p-2 my-2 rounded text-white">Code : {{ group.attributes.code }}</p>
        <p>Avancée du budget : {{ budgetUsers }}/{{ group.attributes.budget }}€</p>
        <div class="w-full bg-gray-200 h-4">
          <div class="h-full bg-green-200 py-2 max-w-full" :style="`width: ${(parseInt(budgetUsers)/parseInt(group.attributes.budget))*100}%`"></div>
        </div>
      </div>
      <div>
        <div v-for="user in users" class="mb-4">
          <user-element :user="user" :user-group="getUserGroup(user.id)" :is-admin="isAdmin"/>
        </div>
      </div>
    </div>
    <div class="text-left ml-8 mt-8">
      <button role="button" class="p-2 bg-blue-400 rounded text-white mr-2" @click="moneyPopupOpened = true">
        Modifier mon argent
      </button>
      <ChangeMoneyPopup v-if="moneyPopupOpened" :group="group" :user-group="getUserGroup(activeUser.id)" @onLeave="moneyPopupOpened = false"/>
      <button v-if="!isAdmin" role="button" class="p-2 bg-red-400 rounded text-white mr-2" @click="leaveGroup">
        Quitter le groupe
      </button>
    </div>
    <div v-if="isAdmin && group" class="mt-8">
      <AdminPanel :group="group"/>
    </div>
  </div>
</template>

<script>

import UserElement from "./local-components/UserElement";
import AdminPanel from "./local-components/AdminPanel";
import Api from "../../../api/Api";
import router from "../../../router";
import ChangeMoneyPopup from "../../popups/change-money-popup/ChangeMoneyPopup";

export default {
  name: "GroupDetail",
  components: {ChangeMoneyPopup, AdminPanel, UserElement},
  props: {
    activeUser: Object,
    group: Object,
    usersGroups: Array,
    users: Array,
  },
  data() {
    return {
      budgetUsers: this.usersGroups.reduce((acc, us) => acc + us.attributes.money, 0),
      isAdmin: this.usersGroups.find(u => u.relationships.user === this.activeUser.id).attributes.role === 'admin',
      moneyPopupOpened: false
    }
  },
  methods: {
    getUserGroup(idUser: string) {
      return this.usersGroups.find(us => us.relationships.user === idUser);
    },
    async leaveGroup(){
      await Api.UsersGroupsApi.delete(this.group.id, this.activeUser.attributes.token, this.activeUser.id);
      await router.replace('/')
    }
  }
}
</script>

<style scoped>

</style>