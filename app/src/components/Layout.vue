<template>
  <div id="nav">
    <div class="goback">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
    </div>
    <h1>{{ title }}</h1>
    <burger-menu/>
  </div>
</template>

<script>
import BurgerMenu from "@/components/burgerMenu";
export default {
  name: "Layout",
  components: {BurgerMenu},
  props:{
    title:String,
  },


}

</script>

<style scoped>

.goback {
  width: 50px;
  height: 50px;
  POSITION: ABSOLUTE;
  top: 20px;
}

</style>