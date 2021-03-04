import Vue from "vue";
import VueRouter from "vue-router";
import { Home, CreateGroup } from "../views";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/create-group",
    name: "CreateGroup",
    component: CreateGroup
  }
];

const router = new VueRouter({
  routes
});

export default router;
