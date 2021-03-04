<template>
  <div id="nav">
    <div class="goback">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
    </div>
    <h1>{{ title }}</h1>
    <div class="menu" v-on:click="interactmenu()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
      </svg>
    </div>
    <div v-bind:class="displayMenu">
      <Overlay class="overley" @onLeave="onLeave()">
        <div class="menuContent">
        <router-link to="/">Home</router-link>
        <router-link to="/list">List</router-link>
        <router-link to="/quiz">Quiz</router-link>
        <router-link to="/hangman">Hangman</router-link>
        <router-link to="/curr-converter">Currency Converter</router-link>
        </div>
      </Overlay>
    </div>
  </div>
</template>

<script>
import Overlay from "../components/popups/popup/local-components/Overlay";
export default {
  name: "Layout",
  data(){
    return{
      displayMenu:"menuHide"
    }
  },
  props:{
    title:String,
  },
  methods:{
    interactmenu(){
      if(this.displayMenu=="menuHide"){
        this.displayMenu="menuShow";
      }
      else{
        this.displayMenu="menuHide";

      }
    },
    onLeave(){
      //console.log("coucou");
      this.displayMenu="menuHide";
    }
  },
  components: {Overlay}

}

</script>

<style scoped>

.goback {
  width: 50px;
  height: 50px;
  POSITION: ABSOLUTE;
  top: 20px;
}
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

.overley{
  right: 0!important;
  left: unset!important;
  width: 400px;
}
#crossButton {
  right: 330px!important;
  left: unset!important;
}
</style>