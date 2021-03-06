<template>
  <div class="flex flex-row mx-8">
    <button type="button" @click="popupGroupOpened = true" class="p-2 bg-blue-400 rounded text-white mr-4">
      Modifier le groupe
    </button>
    <button type="button" @click="deleteGroup" class="p-2 bg-red-400 rounded text-white">
      Supprimer le groupe
    </button>
    <ModifyGroupPopup v-if="popupGroupOpened" :group="group" @onLeave="popupGroupOpened = false"/>
  </div>
</template>

<script>
import ModifyGroupPopup from "../../../popups/modify-group-popup/ModifyGroupPopup";
import Api from "../../../../api/Api";
import router from "../../../../router";

export default {
  name: "AdminPanel",
  components: {ModifyGroupPopup},
  props: {group: Object},
  data() {
    return {
      popupGroupOpened: false,
    }
  },
  methods: {
    async deleteGroup(){
      const activeUser = JSON.parse(localStorage.activeUser);
      await Api.GroupsApi.delete(this.group.id, activeUser.id, activeUser.attributes.token);
      await router.replace('/');
    }
  }
}
</script>

<style scoped>

</style>