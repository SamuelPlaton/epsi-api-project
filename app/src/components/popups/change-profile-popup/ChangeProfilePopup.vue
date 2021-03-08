<template>
  <Popup @onLeave="$emit('onLeave')">
    <ChangeProfileForm :user="user"/>
  </Popup>
</template>

<script>
import Popup from "../popup/Popup";
import {ChangeProfileForm} from "../../forms";

export default {
name: "ChangeProfilePopup",
  components: {ChangeProfileForm, Popup},
  props: { user: Object}
}
</script>

<style scoped>

</style>