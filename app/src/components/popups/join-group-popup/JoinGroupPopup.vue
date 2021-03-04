<template>
  <Popup @onLeave="$emit('onLeave')">
    <JoinGroupForm/>
  </Popup>
</template>

<script>
import Popup from "../popup/Popup";
import JoinGroupForm from "../../forms/join-group-form/JoinGroupForm";

export default {
name: "JoinGroupPopup",
  components: {JoinGroupForm, Popup}
}
</script>

<style scoped>

</style>