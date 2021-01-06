import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MonthEvent from "../views/MonthEvent.vue";
import CityDish from "../views/CityDish.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/montevent",
    name: "montevent",
    component: MonthEvent
  },
  {
    path: "/citydish",
    name: "citydish",
    component: CityDish
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
