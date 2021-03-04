<template>
  <form class="flex flex-col items-center my-8 w-2/3 mx-auto" name="join-group" @submit="joinGroup">
    <p class="font-semibold text-lg">Entrez le numéro de groupe :</p>
    <input type="text" required pattern="^[0-9]{6}$" placeholder="123456" class="my-4 bg-gray-100 w-full px-1 py-2 rounded" v-model="code">
    <button type="submit" class="p-2 bg-blue-400 rounded text-white">
      Rejoindre
    </button>
  </form>
</template>

<script>
export default {
  name: "JoinGroupForm",
  data(){
    return{
      code: ''
    }
  },
  methods: {
    joinGroup() {
      console.log('group joined');
      console.log(this.code);
    }
  }
}
</script>

<style scoped>

</style>