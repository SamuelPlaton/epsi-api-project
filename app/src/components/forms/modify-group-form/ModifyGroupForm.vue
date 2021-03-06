<template>
  <form class="flex flex-col items-center my-8 w-2/3 mx-auto" name="join-group" @submit="modifyGroup">
    <p class="font-semibold text-lg">Modifier le groupe :</p>
    <label :for="title" class="text-sm text-left w-full">Titre</label>
    <input type="text" required class="mb-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="title">
    <label :for="description" class="text-sm text-left w-full">Description</label>
    <input type="text" required class="mb-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="description">
    <label :for="budget" class="text-sm text-left w-full">Budget</label>
    <input type="number" required class="mb-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="budget">
    <button type="submit" class="p-2 bg-blue-400 rounded text-white">
      Modifier
    </button>
  </form>
</template>

<script>
import Api from "../../../api/Api";
import type {ModifyGroupData} from "../../../api/groups/GroupsApi";

export default {
  name: "ModifyGroupForm",
  props: { group: Object},
  data(){
    return{
      title: this.group.attributes.title,
      description: this.group.attributes.description,
      budget: parseInt(this.group.attributes.budget),
    }
  },
  methods: {
    async modifyGroup() {
      const activeUser = JSON.parse(localStorage.activeUser);
      const data: ModifyGroupData = {
        id: activeUser.id,
        token: activeUser.attributes.token,
        title: this.title,
        description: this.description,
        budget: this.budget
      }
      await Api.GroupsApi.modify(this.group.id, data);
      window.location.reload();
    }
  },
}
</script>

<style scoped>

</style>