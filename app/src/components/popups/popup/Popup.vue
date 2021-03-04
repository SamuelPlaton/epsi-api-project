<template>
  <Overlay @onLeave="$emit('onLeave')">
    <div class="bg-white rounded-lg w-4/5 lg:w-2/3 mx-auto">
      <slot/>
    </div>
  </Overlay>
</template>

<script>
import Overlay from "./local-components/Overlay";
export default {
name: "Popup",
  components: {Overlay}
}
</script>

<style scoped>

</style>