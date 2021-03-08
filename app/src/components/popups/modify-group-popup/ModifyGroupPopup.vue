<template>
  <Popup @onLeave="$emit('onLeave')">
    <ModifyGroupForm :group="group"/>
  </Popup>
</template>

<script>
import Popup from "../popup/Popup";
import {ModifyGroupForm} from "../../forms";

export default {
  name: "ModifyGroupPopup",
  components: {ModifyGroupForm, Popup},
  props: {group: Object}
}
</script>

<style scoped>

</style>