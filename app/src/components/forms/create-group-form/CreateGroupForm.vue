<template>
  <form name="create-group" @submit="register" class="w-2/3 mx-auto">
    <label class="font-semibold text-lg">Nom du groupe :</label>
        <input type="text" placeholder="Titre" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="title">
    <label class="font-semibold text-lg">Description :</label>
        <input type="text" placeholder="Description" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="description">
    <label class="font-semibold text-lg">Budget :</label>
        <input type="number" placeholder="0.00" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="budget">
    <button type="submit" class="p-2 bg-blue-400 rounded text-white">
      Créer mon groupe
    </button>
  </form>
</template>

<script>
import Api from "../../../api/Api";
import type {NewGroupData} from "../../../api/groups/GroupsApi";
import router from "../../../router";

export default {
  name: "CreateGroupForm",
  data(){
    return{
      title: '',
      description: '',
      budget: '',
      activeUser: JSON.parse(localStorage.activeUser)
    }
  },
  methods: {
    async register() {
      if(!this.activeUser){
        this.$vToastify.error('Connectez-vous pour créer un groupe', 'Erreur');
        return;
      }
      const group: NewGroupData = {title: this.title,
        description: this.description,
        budget: this.budget,
        id: this.activeUser.id,
        token: this.activeUser.attributes.token};
      const newGroupId = await Api.GroupsApi.post(group);
      await router.push(`/groups/${newGroupId}`)
    }
  }
}
</script>
