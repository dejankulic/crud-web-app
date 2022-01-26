import Vue from "vue";
import VueRouter from "vue-router";
import Komentari from "../views/Komentari.vue";
import Novi from "../views/Novi.vue";
import Izmena from "../views/Izmena.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "komentari",
        component: Komentari,
    },
    {
        path: "/novi",
        name: "novi",
        component: Novi,
    },
    {
        path: "/komentari/:id",
        name: "izmena",
        component: Izmena,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
