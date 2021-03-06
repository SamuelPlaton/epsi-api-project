<template>
  <div>
    <ul v-if="totalGroups.length > 0">
      <p class="text-lg font-bold my-2 text-left w-2/3 mx-auto">Mes groupes :</p>
      <li v-for="group in totalGroups" class="mb-4 w-2/3 mx-auto cursor-pointer" @click="redirectGroup(group)">
        <GroupListItem :prop-group="group"/>
      </li>
    </ul>
    <div v-if="totalGroups.length === 0">
      <p  class="w-full text-center font-bold text-lg">Vous n'êtes pas encore dans un groupe</p>
    </div>
  </div>
</template>

<script>
import Api from "../../../api/Api";
import GroupListItem from "./local-components/GroupListItem";
import router from "../../../router";

export default {
  name: "GroupList",
  components: {GroupListItem},
  data() {
    return {
      totalGroups: []
    }
  },
  methods: {
    redirectGroup(group){
      router.push(`/groups/${group.group.id}`)
    }
  },
  async beforeCreate() {
    const activeUser = JSON.parse(localStorage.activeUser);
    if (activeUser) {
      const usersGroups = await Api.UsersGroupsApi.getByUser(activeUser.id);
      const groups = await Api.GroupsApi.list(usersGroups.map(us => us.relationships.group));
      this.totalGroups = groups.map(group => {
        return {group: group, user: usersGroups.find(us => us.relationships.group === group.id)}
      });
    }
  }
}
</script>

<style scoped>

</style>