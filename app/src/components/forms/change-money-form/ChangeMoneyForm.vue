<template>
  <form class="flex flex-col items-center my-8 w-2/3 mx-auto" name="join-group" @submit="changeMoney">
    <p class="font-semibold text-lg">Changer mes sous :</p>
    <input type="number" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="money">
    <button type="submit" class="p-2 bg-blue-400 rounded text-white">
      Valider
    </button>
  </form>
</template>

<script>
import type {ModifyUserGroupData} from "../../../api/usersGroups/UsersGroupsApi";
import Api from "../../../api/Api";

export default {
  name: "ChangeMoneyForm",
  props: { group: Object, userGroup: Object},
  data(){
    return{
      money: parseInt(this.userGroup.attributes.money)
    }
  },
  methods: {
    async changeMoney() {
      const activeUser = JSON.parse(localStorage.activeUser);
      const data: ModifyUserGroupData = {
        id: activeUser.id,
        money: this.money,
        token: activeUser.attributes.token
      }
      await Api.UsersGroupsApi.modify(this.group.id, data);
      window.location.reload();
    }
  }
}
</script>

<style scoped>

</style>