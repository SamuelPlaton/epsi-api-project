import Vue from "vue";
import VueRouter from "vue-router";
import { Home } from "../views";
import { Register } from "../views";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  routes
});

export default router;
