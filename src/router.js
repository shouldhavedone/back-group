import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("./views/login/index.vue"),
  },
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("./views/home"),
      },
    ],
  },
  {
    path: "/setting",
    component: Home,
    children: [
      {
        path: "",
        name: "setting",
        component: () => import("./views/setting"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
