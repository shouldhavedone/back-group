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
    redirect: '/blog/home'
  },
  {
    path: "/blog",
    component: Home,
    children: [
      {
        path: "/blog/home",
        name: "home",
        component: () => import("./views/blog/home"),
      },
      {
        path: "/blog/article",
        name: "article",
        component: () => import("./views/blog/article"),
      },
      {
        path: "/blog/label",
        name: "label",
        component: () => import("./views/blog/label"),
      },
      {
        path: "/blog/project",
        name: "project",
        component: () => import("./views/blog/project"),
      },
      {
        path: "/blog/message",
        name: "message",
        component: () => import("./views/blog/message"),
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
