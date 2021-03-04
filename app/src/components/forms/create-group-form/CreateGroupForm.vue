<template>
  <form name="create-group" @submit="register">
    <label class="font-semibold text-lg">Entrez le titre :</label>
        <input type="text" placeholder="Voyage au ski" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="title">
    <label class="font-semibold text-lg">Entrez une description :</label>
        <input type="text" placeholder="Economiser suffisament pour aller en vacance" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="description">
    <label class="font-semibold text-lg">Entrez le budget :</label>
        <input type="text" placeholder="300€" required class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="budget">
    <button type="submit" class="p-2 bg-blue-400 rounded text-white">
      Register
    </button>
  </form>
</template>

<script>
export default {
  name: "CreateGroupForm",
  data(){
    return{
      title: '',
      description: '',
      budget: '',
    }
  },
  methods: {
    async register() {
      console.log(this.title);
      console.log(this.description);
      console.log(this.budget);
      const group: NewGroupData = {title: this.title, description: this.description, budget: this.budget};
      const newGroup = await Api.GroupsApi.post(group);

      localStorage.activeGroup = JSON.stringify(group);
      // rediriger vers la home page
    }
  }
}
</script>
