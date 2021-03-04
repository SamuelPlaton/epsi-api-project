import Vue from "vue";
import VueRouter from "vue-router";
import {CreateGroup, Home, Login, Register} from "../views";

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
