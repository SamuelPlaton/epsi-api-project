<template>
  <Navigation title="Mon groupe">
    <div v-if="activeUser && group">
      <group-detail :active-user="activeUser" :group="group" :users="users" :users-groups="usersGroups"/>
    </div>
  </Navigation>
</template>
<script>
import router from "../router";
import Api from "../api/Api";
import GroupDetail from "../components/details/group-detail/GroupDetail";
import {Navigation} from "../components";

export default {
  name: "Group",
  components: {GroupDetail, Navigation},
  data() {
    return {
      group: undefined,
      activeUser: undefined,
      users: [],
      usersGroups: []
    }
  },
  async beforeCreate() {
    const groupId = this.$route.params.id
    const activeUser = JSON.parse(localStorage.activeUser);
    if (activeUser) {
      // Retrieve our group with his affiliated users groups
      const data = await Api.GroupsApi.get(groupId, ['users']);
      const {group, usersGroups} = data;
      // Now retrieve our users
      const usersIds = usersGroups.map(u => u.relationships.user);
      const users = await Api.UsersApi.list(usersIds);
      this.group = group;
      this.usersGroups = usersGroups;
      this.users = users;
      this.activeUser = activeUser;
    } else {
      await router.push('/');
    }
  }
}
</script>

<style scoped>

</style>