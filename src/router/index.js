import Vue from "vue";
import VueRouter from "vue-router";
import WallList from "@/views/WallList.vue";
// import About from "@/views/About.vue"
import Mold from "@/views/Mold.vue";
import FollowUp from "@/views/FollowUp.vue";
import StartPage from "@/views/StartPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: StartPage,
    navbar: false,
  },
  {
    path: "/mold",
    name: "Mold",
    component: WallList,
    navbar: "Gjut",
  },
  {
    path: "/mold/new/:id",
    name: "New Mold",
    component: Mold,
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/aftercheck",
    name: "Aftercheck",
    component: WallList,
    navbar: "Efterkontroll",
  },
  {
    path: "/aftercheck/new/:id",
    name: "New Aftercheck",
    component: FollowUp,
  },

  {
    path: "/ship",
    name: "Send",
    component: WallList,
    navbar: "Skicka",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
