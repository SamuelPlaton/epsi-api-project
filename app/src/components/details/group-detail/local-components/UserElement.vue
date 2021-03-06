<template>
  <div class="text-left">
    <p class="text-medium font-semibold">{{ user.attributes.firstName }} {{ user.attributes.lastName }}</p>
    <div v-if="userGroup" class="text-sm ml-2">
      <p>Role : {{ role }}</p>
      <p>{{ money }}€</p>
    </div>
    <div v-if="isAdmin && !adminHimself" class="flex flex-row">
      <button role="button" class="p-2 bg-red-400 rounded text-white mr-2" @click="exclude">
        Exclure
      </button>
      <button role="button" class="p-2 bg-green-400 rounded text-white" @click="promote">
        Promouvoir
      </button>
    </div>
  </div>
</template>

<script>
import Api from "../../../../api/Api";

export default {
  name: "UserElement",
  props: {user: Object, userGroup: Object, isAdmin: Boolean},
  data() {
    return {
      role: this.userGroup.attributes.role === 'admin' ? 'Admin' : 'Invité',
      money: this.userGroup.attributes.money,
      adminHimself: this.isAdmin && this.userGroup.attributes.role === 'admin',
      activeUser: JSON.parse(localStorage.activeUser)
    }
  },
  methods:{
    async exclude(){
      const activeUser = JSON.parse(localStorage.activeUser);
      await Api.UsersGroupsApi.delete(this.userGroup.relationships.group, activeUser.attributes.token, this.user.id, activeUser.id)
      window.location.reload();
    },
    async promote(){
      const activeUser = JSON.parse(localStorage.activeUser);
      await Api.UsersGroupsApi.promote(this.userGroup.relationships.group, this.user.id, activeUser.id, activeUser.attributes.token)
      window.location.reload();
    }
  }
}
</script>

<style scoped>

</style>