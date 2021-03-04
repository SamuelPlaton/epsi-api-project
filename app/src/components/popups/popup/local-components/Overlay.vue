<template>
  <div class="fixed bottom-0 left-0 right-0 top-0 bg-black z-50 bg-opacity-50 flex justify-center items-center">
    <button class="fixed w-8 h-8 m-4 z-50 top-0 left-0" type="button" @click="$emit('onLeave')">
      <img
          alt="logo"
          src="@/assets/cancel.svg"
      />
    </button>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "Overlay",
}
</script>

<style scoped>

</style>