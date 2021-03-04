<template>
  <div>
    <ul>
      <li v-for="group in totalGroups" class="mb-4 w-2/3 mx-auto">
        <GroupListItem :prop-group="group"/>
      </li>
    </ul>
    <p v-if="totalGroups === 0" class="w-full text-center font-bold text-lg">Vous n'êtes pas encore dans un groupe</p>
  </div>
</template>

<script>
import Api from "../../../api/Api";
import GroupListItem from "./local-components/GroupListItem";

export default {
  name: "GroupList",
  components: {GroupListItem},
  data() {
    return {
      totalGroups: []
    }
  },
  async beforeCreate() {
    const activeUser = JSON.parse(localStorage.activeUser);
    console.log(activeUser);
    if (activeUser) {
      const usersGroups = await Api.UsersGroupsApi.getByUser(activeUser.id);
      const groups = await Api.GroupsApi.list(usersGroups.map(us => us.relationships.group));
      this.totalGroups = groups.map(group => {
        return {group: group, user: usersGroups.find(us => us.relationships.group === group.id)}
      });
      console.log(this.totalGroups);
      this.totalGroups.map(t => console.log(t));
    }
  }
}
</script>

<style scoped>

</style>