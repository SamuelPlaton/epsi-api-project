import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/assets/css/tailwind.css";
import VueToastify from 'vue-toastify';

Vue.config.productionTip = false;

Vue.use(VueToastify);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
