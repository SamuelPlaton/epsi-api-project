<template>
  <Navigation title="Mon profil">
    <div v-if="activeUser">
      <UserDetails :user="activeUser"/>
    </div>
  </Navigation>
</template>

<script>
import router from "../router";
import UserDetails from "../components/details/user-details/UserDetails";
import Navigation from "../components/navigation/Navigation";

export default {
  name: "Profile",
  components: {Navigation, UserDetails},
  data() {
    return {
      activeUser: JSON.parse(localStorage.activeUser)
    }
  },
  beforeCreate() {
    if(!localStorage.activeUser){
      router.replace('/login');
    }
  }
}
</script>

<style scoped>

</style>