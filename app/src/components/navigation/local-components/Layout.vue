<template>
  <div class="shadow-xl flex flex-row justify-between items-center px-8 py-4" id="nav">
    <button class="w-8 h-8" type="button" @click="goBack">
      <img
          alt="logo"
          src="@/assets/back.svg"
      />
    </button>
    <p class="text-lg font-semibold">{{ title }}</p>
    <button class="w-8 h-8" type="button" @click="menuOpened = true">
      <img
          alt="logo"
          src="@/assets/menu.svg"
      />
    </button>
    <NavigationMenu v-if="menuOpened" @onLeave="menuOpened = false"/>
  </div>
</template>

<script>
import router from "../../../router";
import NavigationMenu from "./NavigationMenu";

export default {
  name: "Layout",
  components: {NavigationMenu},
  props: {title: String},
  data(){
    return{
      menuOpened: false
    }
  },
  methods: {
    goBack() {
      router.back();
    }
  }
}
</script>

<style scoped>
#nav {
  color: white;
  margin-bottom: 1rem;
  background: linear-gradient(
      90deg,
      rgba(0, 136, 255, 1) 0%,
      rgba(0, 136, 187, 1) 100%
  );
}
</style>