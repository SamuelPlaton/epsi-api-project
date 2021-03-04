<template>
  <div id="menu">
    <div class="menu" v-on:click="interactmenu()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
      </svg>
    </div>
    <div v-bind:class="displayMenu">
      <Overlay class="overlay" @onLeave="onLeave()">
        <div class="bg-grey fixed top-12 w-2/3 m-12 z-50">
          <div class="menuContent">
            <router-link to="/">Home</router-link>
            <router-link to="/list">List</router-link>
            <router-link to="/quiz">Quiz</router-link>
            <router-link to="/hangman">Hangman</router-link>
            <router-link  to="/curr-converter">Currency Converter</router-link>
         </div>
        </div>
      </Overlay>
    </div>
  </div>
</template>

<script>
import Overlay from "@/components/popups/popup/local-components/Overlay";

export default {
  name: "burgerMenu",
  components: {Overlay},

  data(){
    return{
      displayMenu:"menuHide"
    }
  },
  methods: {
    interactmenu() {
      if (this.displayMenu == "menuHide") {
        this.displayMenu = "menuShow";
      } else {
        this.displayMenu = "menuHide";

      }
    },
    onLeave() {
      console.log("coucou");
      this.displayMenu = "menuHide";
    },
  },


}
</script>

<style scoped>
.menu{
  width: 50px;
  height: 50px;
  top: 20px;
  position: absolute;
  right: 20px;
}
.menuContent{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.menuHide{
  display:none;
}
</style>