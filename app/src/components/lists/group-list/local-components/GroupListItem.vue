<template>
  <div :class="`${isAdmin ? 'bg-blue-300' : 'bg-gray-50'} rounded p-2 text-left shadow-lg`">
    <div class="flex flew-row justify-between items-center">
      <p class="font-semibold">{{ group.attributes.title }}</p>
      <p v-if="isAdmin" class="text-xs">ADMIN</p>
    </div>
    <p class="text-sm mb-4">{{ group.attributes.description }}</p>
    <div class="flex flew-row justify-between items-center text-xs">
      <p>Budget: {{ group.attributes.budget }}€</p>
      <p>Vous avez donné: {{ user.attributes.money }}€</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "GroupListItem",
  props: {propGroup: Object},
  data() {
    return {
      group: this.propGroup.group,
      user: this.propGroup.user,
      isAdmin: this.propGroup.user.attributes.role === "admin" ,
    }
  }
}
</script>

<style scoped>

</style>