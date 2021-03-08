import Vue from "vue";
import VueRouter from "vue-router";
import {CreateGroup, Group, Home, Login, Profile, Register} from "../views";

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
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/groups/:id",
        name: "Group",
        component: Group
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile
    }
];

const router = new VueRouter({
    routes
});

export default router;
