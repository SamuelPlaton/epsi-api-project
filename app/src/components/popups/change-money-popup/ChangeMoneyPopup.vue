<template>
  <Popup @onLeave="$emit('onLeave')">
    <ChangeMoneyForm :group="group" :user-group="userGroup"/>
  </Popup>
</template>

<script>
import Popup from "../popup/Popup";
import {ChangeMoneyForm} from "../../forms";

export default {
name: "ChangeMoneyPopup",
  components: {ChangeMoneyForm, Popup},
  props: { group: Object, userGroup: Object}
}
</script>

<style scoped>

</style>