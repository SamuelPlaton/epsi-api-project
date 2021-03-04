import Vue from "vue";
import VueRouter from "vue-router";
import {CreateGroup, Home, Login} from "../views";

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
    }, {
        path: "/login",
        name: "Login",
        component: Login
    }
];

const router = new VueRouter({
    routes
});

export default router;
